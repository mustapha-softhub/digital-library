import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { trainBookSystem } from '@/lib/openai';

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
    
    // Only librarians and admins can train books
    if (userData.role !== 'librarian' && userData.role !== 'admin') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }
    
    const { bookId } = await request.json();
    
    if (!bookId) {
      return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
    }
    
    // Get the book information
    const { data: book, error: bookError } = await supabase
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
        book_categories (
          categories (name)
        ),
        book_tags (
          tags (name)
        )
      `)
      .eq('id', bookId)
      .single();
    
    if (bookError) {
      return NextResponse.json({ error: bookError.message }, { status: 500 });
    }
    
    // Format book data for OpenAI
    const bookData = {
      title: book.title,
      author: book.author || 'Unknown',
      publication_date: book.publication_date || 'Unknown',
      publisher: book.publisher || 'Unknown',
      availability: book.availability,
      summary: book.summary || 'No summary available',
      categories: book.book_categories?.map((bc: any) => bc.categories.name) || [],
      tags: book.book_tags?.map((bt: any) => bt.tags.name) || []
    };
    
    // Train the system with book information
    const enhancedData = await trainBookSystem(bookData);
    
    // Update the book with enhanced summary if available
    if (enhancedData.enhanced_summary && (!book.summary || book.summary === 'No summary available')) {
      await supabase
        .from('books')
        .update({
          summary: enhancedData.enhanced_summary
        })
        .eq('id', bookId);
    }
    
    // Add new tags if available
    if (enhancedData.keywords && enhancedData.keywords.length > 0) {
      for (const keyword of enhancedData.keywords) {
        // Check if tag exists, create if not
        let { data: tag, error: tagError } = await supabase
          .from('tags')
          .select('id')
          .eq('name', keyword)
          .single();
        
        if (tagError) {
          // Create the tag
          const { data: newTag, error: newTagError } = await supabase
            .from('tags')
            .insert({ name: keyword })
            .select()
            .single();
          
          if (newTagError) {
            console.error('Error creating tag:', newTagError);
            continue;
          }
          
          tag = newTag;
        }
        
        // Check if book already has this tag
        const { data: existingTag } = await supabase
          .from('book_tags')
          .select('id')
          .eq('book_id', bookId)
          .eq('tag_id', tag.id)
          .single();
        
        if (!existingTag) {
          // Link book to tag
          await supabase
            .from('book_tags')
            .insert({
              book_id: bookId,
              tag_id: tag.id
            });
        }
      }
    }
    
    // Add mood matches if available
    if (enhancedData.mood_matches) {
      for (const [mood, score] of Object.entries(enhancedData.mood_matches)) {
        // Get mood ID
        const { data: moodData } = await supabase
          .from('moods')
          .select('id')
          .eq('name', mood)
          .single();
        
        if (moodData) {
          // Check if book-mood relationship exists
          const { data: existingMood } = await supabase
            .from('book_moods')
            .select('id')
            .eq('book_id', bookId)
            .eq('mood_id', moodData.id)
            .single();
          
          if (existingMood) {
            // Update existing relationship
            await supabase
              .from('book_moods')
              .update({
                score: score
              })
              .eq('id', existingMood.id);
          } else {
            // Create new relationship
            await supabase
              .from('book_moods')
              .insert({
                book_id: bookId,
                mood_id: moodData.id,
                score: score
              });
          }
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      enhancedData
    });
  } catch (error: any) {
    console.error('Error training book:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
