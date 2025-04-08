'use client';

import React, { useState } from 'react';
import { FiMessageSquare, FiSend, FiInfo } from 'react-icons/fi';

interface ChatInterfaceProps {
  bookId: string;
  bookTitle: string;
  initialMessages?: {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }[];
  onSendMessage: (message: string) => Promise<void>;
}

export default function ChatInterface({ 
  bookId, 
  bookTitle, 
  initialMessages = [], 
  onSendMessage 
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      role: 'user' as const,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    try {
      await onSendMessage(newMessage);
      // The response would typically be added by the parent component
      // through the initialMessages prop update
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again later.',
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-primary p-4 text-white flex items-center">
        <FiMessageSquare className="h-5 w-5 mr-2" />
        <h3 className="font-semibold">Chat about "{bookTitle}"</h3>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-6">
            <FiInfo className="h-12 w-12 mb-4" />
            <h4 className="text-lg font-medium mb-2">Start a conversation about this book</h4>
            <p className="text-sm">
              Ask questions about the plot, characters, themes, or request a summary. The AI will provide information based on the book content.
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-md">
              <button 
                onClick={() => setNewMessage("Can you summarize this book for me?")}
                className="text-sm p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
              >
                Summarize this book
              </button>
              <button 
                onClick={() => setNewMessage("What are the main themes in this book?")}
                className="text-sm p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
              >
                What are the main themes?
              </button>
              <button 
                onClick={() => setNewMessage("Who are the main characters?")}
                className="text-sm p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
              >
                Who are the main characters?
              </button>
              <button 
                onClick={() => setNewMessage("Is this book suitable for children?")}
                className="text-sm p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
              >
                Is it suitable for children?
              </button>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-white rounded-tr-none'
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800 rounded-tl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask a question about this book..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-r-lg hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={isLoading || !newMessage.trim()}
          >
            <FiSend className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
