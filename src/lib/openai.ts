import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to get book information using OpenAI
export async function getBookInformation(title: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that provides accurate information about books. Respond with JSON format only.'
        },
        {
          role: 'user',
          content: `Provide detailed information about the book "${title}" in the following JSON format:
          {
            "title": "Full title of the book",
            "author": "Author's name",
            "publication_date": "Year of publication",
            "publisher": "Publisher name",
            "summary": "A brief summary of the book (100-150 words)",
            "categories": ["Category1", "Category2"],
            "tags": ["Tag1", "Tag2"]
          }`
        }
      ],
      response_format: { type: 'json_object' }
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Error fetching book information:', error);
    throw error;
  }
}

// Function for NLP search
export async function nlpBookSearch(query: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that helps users find books based on their queries. 
          Analyze the query and extract search parameters that could be used to find relevant books.
          Consider the following aspects:
          1. Specific book titles or series mentioned
          2. Authors mentioned or similar to
          3. Genres or categories implied
          4. Themes, topics, or concepts mentioned
          5. Target audience (children, young adult, adult)
          6. Writing style or tone preferences
          7. Time period or setting preferences`
        },
        {
          role: 'user',
          content: `Based on this search query: "${query}", provide search parameters in JSON format that could be used to find relevant books. Include possible titles, authors, genres, themes, topics, and keywords.`
        }
      ],
      response_format: { type: 'json_object' }
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Error processing NLP search:', error);
    throw error;
  }
}

// Function for interactive book chat
export async function bookChat(bookInfo: any, question: string, chatHistory: any[] = []) {
  try {
    // Format chat history for OpenAI
    const formattedHistory = chatHistory.map(msg => ({
      role: msg.role,
      content: msg.content
    }));
    
    const messages = [
      {
        role: 'system',
        content: `You are a helpful assistant that provides information about the book "${bookInfo.title}" by ${bookInfo.author}. 
        Use the following book information to answer questions:
        Summary: ${bookInfo.summary}
        Categories: ${bookInfo.categories?.join(', ')}
        Publication Date: ${bookInfo.publication_date}
        Publisher: ${bookInfo.publisher}
        
        Your responses should be:
        1. Accurate based on the provided information
        2. Engaging and conversational
        3. Helpful for readers wanting to learn more about the book
        4. Concise but informative (aim for 2-3 paragraphs maximum)
        
        If you don't know the answer based on the provided information, say so politely and suggest what information might help answer the question better.
        
        Do not make up information that isn't provided or implied by the book information.`
      },
      ...formattedHistory,
      {
        role: 'user',
        content: question
      }
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error in book chat:', error);
    throw error;
  }
}

// Function for mood-based book recommendations
export async function moodBasedRecommendations(mood: string, userPreferences: any = {}) {
  try {
    let preferencesText = '';
    if (userPreferences.preferredCategories && userPreferences.preferredCategories.length > 0) {
      preferencesText += `Preferred categories: ${userPreferences.preferredCategories.join(', ')}. `;
    }
    if (userPreferences.preferredAuthors && userPreferences.preferredAuthors.length > 0) {
      preferencesText += `Preferred authors: ${userPreferences.preferredAuthors.join(', ')}. `;
    }
    
    const moodDescriptions = {
      happy: "uplifting, joyful, positive, inspiring, humorous",
      down: "comforting, hopeful, empathetic, relatable, gentle",
      calm: "peaceful, meditative, soothing, mindful, relaxing",
      stressed: "escapist, engaging, distracting, absorbing, captivating",
      curious: "informative, thought-provoking, educational, fascinating, mind-expanding",
      tired: "easy-to-read, light, entertaining, refreshing, rejuvenating"
    };
    
    const moodDescription = moodDescriptions[mood as keyof typeof moodDescriptions] || mood;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that recommends books based on the user's mood. You provide thoughtful recommendations with clear explanations for why each book matches the specified mood.`
        },
        {
          role: 'user',
          content: `The user is feeling "${mood}" (described as: ${moodDescription}). 
          ${preferencesText ? `They have these preferences: ${preferencesText}` : ''}
          Suggest 5 books that would be suitable for this mood, with a brief explanation for each recommendation. 
          Include a diverse range of genres and authors.
          Respond in JSON format with an array of book objects, each containing title, author, and reason fields.`
        }
      ],
      response_format: { type: 'json_object' }
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Error generating mood-based recommendations:', error);
    throw error;
  }
}

// Function to train the system with book information
export async function trainBookSystem(bookData: any) {
  try {
    // Create a comprehensive prompt that includes all available book information
    const bookInfo = `
      Title: ${bookData.title}
      Author: ${bookData.author || 'Unknown'}
      Publication Date: ${bookData.publication_date || 'Unknown'}
      Publisher: ${bookData.publisher || 'Unknown'}
      Availability: ${bookData.availability}
      Categories: ${bookData.categories?.join(', ') || 'None specified'}
      Tags: ${bookData.tags?.join(', ') || 'None specified'}
      Summary: ${bookData.summary || 'No summary available'}
    `;

    // Use OpenAI to generate enhanced metadata for the book
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a literary expert that analyzes books and extracts key information. Based on the provided book information, generate enhanced metadata that will help with search, recommendations, and chat functionality.`
        },
        {
          role: 'user',
          content: `Analyze this book information and provide enhanced metadata:
          ${bookInfo}
          
          Generate a JSON response with the following fields:
          1. enhanced_summary: A more detailed summary if the original is brief or missing
          2. themes: Major themes in the book
          3. keywords: Important keywords for search
          4. mood_matches: How well this book matches different moods (happy, down, calm, stressed, curious, tired) on a scale of 0-10
          5. similar_books: Titles of 3-5 similar books
          6. reading_level: Estimated reading level (children, young adult, adult)
          7. content_warnings: Any potential content warnings, if applicable`
        }
      ],
      response_format: { type: 'json_object' }
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Error training book system:', error);
    throw error;
  }
}
