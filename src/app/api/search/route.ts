import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { nlpBookSearch } from '@/lib/openai';

export async function GET(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const searchParams = request.nextUrl.searchParams;
  
  const query = searchParams.get('query') || '';
  const isNlp = searchParams.get('nlp') === 'true';
  const availability = searchParams.getAll('availability');
  const categories = searchParams.getAll('categories');
  
  try {
    let supabaseQuery = supabase
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
      `);
    
    // Handle NLP search
    if (isNlp && query) {
      try {
        // Use OpenAI to analyze the query and extract search parameters
        const nlpParams = await nlpBookSearch(query);
        
        // Apply NLP-derived filters if available
        if (nlpParams.title) {
          supabaseQuery = supabaseQuery.ilike('title', `%${nlpParams.title}%`);
        }
        
        if (nlpParams.author) {
          supabaseQuery = supabaseQuery.ilike('author', `%${nlpParams.author}%`);
        }
        
        if (nlpParams.genres && nlpParams.genres.length > 0) {
          // This is a simplification - in a real app, you'd need to handle this with joins
          // For now, we'll just filter by the first genre
          supabaseQuery = supabaseQuery.contains('book_categories.categories.name', nlpParams.genres[0]);
        }
        
        if (nlpParams.themes && nlpParams.themes.length > 0) {
          // Similar simplification for themes/tags
          supabaseQuery = supabaseQuery.contains('book_tags.tags.name', nlpParams.themes[0]);
        }
      } catch (error) {
        console.error('NLP search error:', error);
        // Fall back to basic search if NLP fails
        if (query) {
          supabaseQuery = supabaseQuery.or(`title.ilike.%${query}%,author.ilike.%${query}%`);
        }
      }
    } else if (query) {
      // Basic search
      supabaseQuery = supabaseQuery.or(`title.ilike.%${query}%,author.ilike.%${query}%`);
    }
    
    // Apply availability filters
    if (availability && availability.length > 0) {
      // This is a simplification - in a real app, you'd need to handle this better
      // For now, we'll just check if the availability string contains any of the selected types
      const availabilityConditions = availability.map(type => `availability.ilike.%${type}%`);
      supabaseQuery = supabaseQuery.or(availabilityConditions.join(','));
    }
    
    // Apply category filters
    if (categories && categories.length > 0) {
      // This would typically be handled with a more complex query using joins
      // For simplicity, we're using a contains check
      const categoryConditions = categories.map(category => `book_categories.categories.name.eq.${category}`);
      supabaseQuery = supabaseQuery.or(categoryConditions.join(','));
    }
    
    const { data: books, error } = await supabaseQuery;
    
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
