import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { bookChat } from '@/lib/openai';

export async function GET(
  request: NextRequest,
  { params }: { params: { bookId: string } }
) {
  const supabase = createRouteHandlerClient({ cookies });
  const bookId = params.bookId;
  
  try {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get chat history for this book and user
    const { data: chatHistory, error } = await supabase
      .from('chat_history')
      .select('id')
      .eq('user_id', user.id)
      .eq('book_id', bookId)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    let chatId;
    
    if (!chatHistory) {
      // Create a new chat history entry
      const { data: newChat, error: createError } = await supabase
        .from('chat_history')
        .insert({
          user_id: user.id,
          book_id: bookId
        })
        .select()
        .single();
      
      if (createError) {
        return NextResponse.json({ error: createError.message }, { status: 500 });
      }
      
      chatId = newChat.id;
    } else {
      chatId = chatHistory.id;
    }
    
    // Get messages for this chat
    const { data: messages, error: messagesError } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('timestamp', { ascending: true });
    
    if (messagesError) {
      return NextResponse.json({ error: messagesError.message }, { status: 500 });
    }
    
    return NextResponse.json(messages || []);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { bookId: string } }
) {
  const supabase = createRouteHandlerClient({ cookies });
  const bookId = params.bookId;
  
  try {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
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
        book_categories (
          categories (name)
        )
      `)
      .eq('id', bookId)
      .single();
    
    if (bookError) {
      return NextResponse.json({ error: bookError.message }, { status: 500 });
    }
    
    // Format book data for OpenAI
    const bookInfo = {
      title: book.title,
      author: book.author || 'Unknown',
      summary: book.summary || 'No summary available',
      categories: book.book_categories?.map((bc: any) => bc.categories.name) || [],
      publication_date: book.publication_date || 'Unknown',
      publisher: book.publisher || 'Unknown'
    };
    
    // Get or create chat history
    let { data: chatHistory, error } = await supabase
      .from('chat_history')
      .select('id')
      .eq('user_id', user.id)
      .eq('book_id', bookId)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    let chatId;
    
    if (!chatHistory) {
      // Create a new chat history entry
      const { data: newChat, error: createError } = await supabase
        .from('chat_history')
        .insert({
          user_id: user.id,
          book_id: bookId
        })
        .select()
        .single();
      
      if (createError) {
        return NextResponse.json({ error: createError.message }, { status: 500 });
      }
      
      chatId = newChat.id;
    } else {
      chatId = chatHistory.id;
    }
    
    // Save user message
    const { data: userMessage, error: messageError } = await supabase
      .from('chat_messages')
      .insert({
        chat_id: chatId,
        role: 'user',
        content: message
      })
      .select()
      .single();
    
    if (messageError) {
      return NextResponse.json({ error: messageError.message }, { status: 500 });
    }
    
    // Get previous messages for context
    const { data: previousMessages, error: historyError } = await supabase
      .from('chat_messages')
      .select('role, content')
      .eq('chat_id', chatId)
      .order('timestamp', { ascending: true })
      .limit(10); // Limit to last 10 messages for context
    
    if (historyError) {
      return NextResponse.json({ error: historyError.message }, { status: 500 });
    }
    
    // Generate AI response using OpenAI
    try {
      const aiResponse = await bookChat(bookInfo, message, previousMessages || []);
      
      // Save AI response
      const { data: assistantMessage, error: aiMessageError } = await supabase
        .from('chat_messages')
        .insert({
          chat_id: chatId,
          role: 'assistant',
          content: aiResponse
        })
        .select()
        .single();
      
      if (aiMessageError) {
        return NextResponse.json({ error: aiMessageError.message }, { status: 500 });
      }
      
      return NextResponse.json({
        userMessage,
        assistantMessage
      });
    } catch (error: any) {
      console.error('OpenAI error:', error);
      
      // Save a fallback response
      const { data: fallbackMessage, error: fallbackError } = await supabase
        .from('chat_messages')
        .insert({
          chat_id: chatId,
          role: 'assistant',
          content: "I'm sorry, I couldn't process your request at the moment. Please try again later."
        })
        .select()
        .single();
      
      if (fallbackError) {
        return NextResponse.json({ error: fallbackError.message }, { status: 500 });
      }
      
      return NextResponse.json({
        userMessage,
        assistantMessage: fallbackMessage,
        error: 'AI processing error'
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
