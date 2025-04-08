import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getBookInformation } from '@/lib/openai';

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
    
    const { title, availability } = await request.json();
    
    if (!title || !availability) {
      return NextResponse.json({ error: 'Title and availability are required' }, { status: 400 });
    }
    
    // Get book information from OpenAI
    const bookInfo = await getBookInformation(title);
    
    // Create the book with information from OpenAI
    const { data: book, error } = await supabase
      .from('books')
      .insert({
        title: bookInfo.title || title,
        author: bookInfo.author,
        publication_date: bookInfo.publication_date,
        publisher: bookInfo.publisher,
        summary: bookInfo.summary,
        availability: availability,
        added_by: user.id
      })
      .select()
      .single();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    // Handle categories if provided by OpenAI
    if (bookInfo.categories && bookInfo.categories.length > 0) {
      for (const categoryName of bookInfo.categories) {
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
    
    // Handle tags if provided by OpenAI
    if (bookInfo.tags && bookInfo.tags.length > 0) {
      for (const tagName of bookInfo.tags) {
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
    
    return NextResponse.json({
      success: true,
      book,
      bookInfo
    });
  } catch (error: any) {
    console.error('Error adding book with OpenAI:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
