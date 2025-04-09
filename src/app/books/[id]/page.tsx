'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function BookDetails({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: string, content: string, timestamp?: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState({
    id: params.id,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    categories: ['Fiction', 'Classic'],
    availability: 'EBook,Physical',
    cover_image: 'https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg',
    description: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan.',
    publication_date: '1925-04-10',
    publisher: 'Charles Scribner\'s Sons',
    pages: 218,
    language: 'English',
    isbn: '9780743273565'
  });

  // Fetch chat history when component mounts
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`/api/chat/${params.id}`);
        if (response.ok) {
          const messages = await response.json();
          if (Array.isArray(messages) && messages.length > 0) {
            setChatHistory(messages.map(msg => ({
              role: msg.role,
              content: msg.content,
              timestamp: msg.timestamp
            })));
          }
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, [params.id]);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMessage = { role: 'user', content: chatMessage };
    setChatHistory(prev => [...prev, userMessage]);
    setChatMessage('');
    setIsLoading(true);

    try {
      // Call the API endpoint for chat
      const response = await fetch(`/api/chat/${params.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: chatMessage }),
      });

      if (response.ok) {
        const data = await response.json();
        // Add the AI response to chat history
        if (data.assistantMessage) {
          const aiResponse = { 
            role: 'assistant', 
            content: data.assistantMessage.content,
            timestamp: data.assistantMessage.timestamp
          };
          setChatHistory(prev => [...prev, aiResponse]);
        }
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error('Error from chat API:', errorData);
        
        // Add error message to chat history
        setChatHistory(prev => [...prev, { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again later.' 
        }]);
      }
    } catch (error) {
      console.error('Error sending chat message:', error);
      
      // Add error message to chat history
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again later.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/books" className="flex items-center text-[#0072bc] mb-6 hover:underline">
          <FiArrowLeft className="mr-2" />
          Back to Books
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 p-6">
              <div className="relative h-80 w-full">
                <Image
                  src={book.cover_image}
                  alt={book.title}
                  fill
                  className="object-contain"
                />
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium text-gray-700 mb-2">Availability:</h3>
                <div className="flex flex-wrap gap-2">
                  {book.availability.split(',').map(type => (
                    <span 
                      key={type} 
                      className={`px-3 py-1.5 text-sm rounded-full ${
                        type === 'EBook' 
                          ? 'bg-purple-100 text-purple-800' 
                          : type === 'Physical' 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3 p-6">
              <h1 className="text-3xl font-bold text-[#0072bc] mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600 mb-4">{book.author}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {book.categories.map(category => (
                  <span key={category} className="px-3 py-1.5 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {category}
                  </span>
                ))}
              </div>
              
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'overview'
                        ? 'border-[#8cc63f] text-[#0072bc]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'details'
                        ? 'border-[#8cc63f] text-[#0072bc]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Details
                  </button>
                  <button
                    onClick={() => setActiveTab('chat')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'chat'
                        ? 'border-[#8cc63f] text-[#0072bc]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Chat about this Book
                  </button>
                </nav>
              </div>
              
              {activeTab === 'overview' && (
                <div>
                  <p className="text-gray-700 mb-4">{book.description}</p>
                </div>
              )}
              
              {activeTab === 'details' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Publication Details:</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li><span className="font-medium">Publisher:</span> {book.publisher}</li>
                      <li><span className="font-medium">Publication Date:</span> {book.publication_date}</li>
                      <li><span className="font-medium">Language:</span> {book.language}</li>
                      <li><span className="font-medium">Pages:</span> {book.pages}</li>
                      <li><span className="font-medium">ISBN:</span> {book.isbn}</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {activeTab === 'chat' && (
                <div>
                  <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto mb-4">
                    {chatHistory.length === 0 ? (
                      <div className="text-center text-gray-500 mt-10">
                        <p>Ask questions about this book to get AI-powered insights.</p>
                        <p className="text-sm mt-2">Example: "What are the main themes in this book?"</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {chatHistory.map((msg, index) => (
                          <div 
                            key={index} 
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div 
                              className={`max-w-3/4 rounded-lg px-4 py-2 ${
                                msg.role === 'user' 
                                  ? 'bg-[#0072bc] text-white' 
                                  : 'bg-gray-200 text-gray-800'
                              }`}
                            >
                              {msg.content}
                            </div>
                          </div>
                        ))}
                        {isLoading && (
                          <div className="flex justify-start">
                            <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2">
                              <div className="flex space-x-2">
                                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-75"></div>
                                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-150"></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <form onSubmit={handleChatSubmit} className="flex gap-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Ask about this book..."
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0072bc]"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      className="bg-[#8cc63f] text-white px-4 py-2 rounded-lg hover:bg-[#7ab52e] disabled:opacity-50"
                      disabled={isLoading || !chatMessage.trim()}
                    >
                      Send
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
