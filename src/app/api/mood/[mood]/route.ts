import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { moodBasedRecommendations } from '@/lib/openai';

export async function GET(
  request: NextRequest,
  { params }: { params: { mood: string } }
) {
  const supabase = createRouteHandlerClient({ cookies });
  const mood = params.mood;
  
  // Validate mood
  const validMoods = ['happy', 'down', 'calm', 'stressed', 'curious', 'tired'];
  if (!validMoods.includes(mood)) {
    return NextResponse.json({ error: 'Invalid mood' }, { status: 400 });
  }
  
  try {
    // Get the current user for personalized recommendations
    const { data: { user } } = await supabase.auth.getUser();
    
    let userPreferences = {};
    
    if (user) {
      // Get user preferences if available
      const { data: preferences } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (preferences) {
        userPreferences = {
          preferredCategories: preferences.preferred_categories,
          preferredAuthors: preferences.preferred_authors
        };
      }
    }
    
    // First check if we have pre-computed mood-based recommendations
    const { data: moodBooks, error: moodError } = await supabase
      .from('book_moods')
      .select(`
        book_id,
        score,
        books (
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
        )
      `)
      .eq('mood_id', (await supabase.from('moods').select('id').eq('name', mood).single()).data?.id)
      .order('score', { ascending: false })
      .limit(10);
    
    if (!moodError && moodBooks && moodBooks.length > 0) {
      // Transform the data to a more usable format
      const formattedBooks = moodBooks.map(item => {
        const book = item.books;
        return {
          ...book,
          categories: book.book_categories?.map((bc: any) => bc.categories.name) || [],
          tags: book.book_tags?.map((bt: any) => bt.tags.name) || [],
          score: item.score,
          // Remove the nested relations
          book_categories: undefined,
          book_tags: undefined
        };
      });
      
      return NextResponse.json(formattedBooks);
    }
    
    // If no pre-computed recommendations, use OpenAI to generate them
    try {
      const recommendations = await moodBasedRecommendations(mood, userPreferences);
      
      // For each recommended book, try to find it in our database
      const books = [];
      
      for (const rec of recommendations.books) {
        // Try to find the book by title and author
        const { data: foundBooks } = await supabase
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
          .ilike('title', `%${rec.title}%`)
          .limit(1);
        
        if (foundBooks && foundBooks.length > 0) {
          const book = foundBooks[0];
          books.push({
            ...book,
            categories: book.book_categories?.map((bc: any) => bc.categories.name) || [],
            tags: book.book_tags?.map((bt: any) => bt.tags.name) || [],
            reason: rec.reason,
            // Remove the nested relations
            book_categories: undefined,
            book_tags: undefined
          });
        }
      }
      
      return NextResponse.json(books);
    } catch (error: any) {
      console.error('OpenAI error:', error);
      return NextResponse.json({ error: 'Failed to generate mood-based recommendations' }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
