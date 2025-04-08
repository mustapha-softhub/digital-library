import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: books, error } = await supabase
      .from('books')
      .select(`
        id, 
        title, 
        author, 
        publication_date, 
        publisher, 
        summary, 
        cover_image, 
        availability, 
        created_at,
        book_categories (
          categories (name)
        ),
        book_tags (
          tags (name)
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    // Transform the data to a more usable format
    const formattedBooks = books.map(book => {
      return {
        ...book,
        categories: book.book_categories?.map((bc: any) => bc.categories.name) || [],
        tags: book.book_tags?.map((bt: any) => bt.tags.name) || [],
        // Remove the nested relations
        book_categories: undefined,
        book_tags: undefined
      };
    });
    
    return NextResponse.json(formattedBooks);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get user metadata to check role
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (userError || !userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Only librarians and admins can add books
    if (userData.role !== 'librarian' && userData.role !== 'admin') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }
    
    const bookData = await request.json();
    
    // Validate required fields
    if (!bookData.title || !bookData.availability) {
      return NextResponse.json({ error: 'Title and availability are required' }, { status: 400 });
    }
    
    // Insert the book
    const { data: book, error } = await supabase
      .from('books')
      .insert({
        title: bookData.title,
        author: bookData.author,
        publication_date: bookData.publication_date,
        publisher: bookData.publisher,
        summary: bookData.summary,
        cover_image: bookData.cover_image,
        availability: bookData.availability,
        added_by: user.id
      })
      .select()
      .single();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    // Handle categories if provided
    if (bookData.categories && bookData.categories.length > 0) {
      for (const categoryName of bookData.categories) {
        // Check if category exists, create if not
        let { data: category, error: categoryError } = await supabase
          .from('categories')
          .select('id')
          .eq('name', categoryName)
          .single();
        
        if (categoryError) {
          // Create the category
          const { data: newCategory, error: newCategoryError } = await supabase
            .from('categories')
            .insert({ name: categoryName })
            .select()
            .single();
          
          if (newCategoryError) {
            console.error('Error creating category:', newCategoryError);
            continue;
          }
          
          category = newCategory;
        }
        
        // Link book to category
        await supabase
          .from('book_categories')
          .insert({
            book_id: book.id,
            category_id: category.id
          });
      }
    }
    
    // Handle tags if provided
    if (bookData.tags && bookData.tags.length > 0) {
      for (const tagName of bookData.tags) {
        // Check if tag exists, create if not
        let { data: tag, error: tagError } = await supabase
          .from('tags')
          .select('id')
          .eq('name', tagName)
          .single();
        
        if (tagError) {
          // Create the tag
          const { data: newTag, error: newTagError } = await supabase
            .from('tags')
            .insert({ name: tagName })
            .select()
            .single();
          
          if (newTagError) {
            console.error('Error creating tag:', newTagError);
            continue;
          }
          
          tag = newTag;
        }
        
        // Link book to tag
        await supabase
          .from('book_tags')
          .insert({
            book_id: book.id,
            tag_id: tag.id
          });
      }
    }
    
    return NextResponse.json(book, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
