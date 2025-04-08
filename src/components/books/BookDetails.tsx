'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FiBook, FiHeadphones, FiTablet, FiHeart, FiShare2, FiDownload } from 'react-icons/fi';
import ChatInterface from '@/components/chat/ChatInterface';

interface BookDetailsProps {
  book: {
    id: string;
    title: string;
    author?: string;
    publication_date?: string;
    publisher?: string;
    summary?: string;
    categories?: string[];
    tags?: string[];
    availability: string;
    cover_image?: string;
  };
  chatHistory?: {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }[];
  onSendMessage: (message: string) => Promise<void>;
}

export default function BookDetails({ book, chatHistory = [], onSendMessage }: BookDetailsProps) {
  const [activeTab, setActiveTab] = useState('details');

  // Function to determine availability icons
  const getAvailabilityIcons = () => {
    const icons = [];
    if (book.availability.includes('Physical')) {
      icons.push(
        <div key="physical" className="flex items-center gap-2 text-primary">
          <FiBook className="h-5 w-5" />
          <span>Physical Book</span>
        </div>
      );
    }
    if (book.availability.includes('EBook')) {
      icons.push(
        <div key="ebook" className="flex items-center gap-2 text-accent">
          <FiTablet className="h-5 w-5" />
          <span>E-Book</span>
        </div>
      );
    }
    if (book.availability.includes('Audio')) {
      icons.push(
        <div key="audio" className="flex items-center gap-2 text-secondary">
          <FiHeadphones className="h-5 w-5" />
          <span>Audio Book</span>
        </div>
      );
    }
    return icons;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Book Cover and Basic Info */}
          <div className="md:w-1/3 p-6">
            <div className="relative h-80 w-full md:h-96 bg-gray-200 rounded-lg overflow-hidden mb-4">
              {book.cover_image ? (
                <Image
                  src={book.cover_image}
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-primary-light">
                  <span className="text-primary text-6xl">📚</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {book.categories?.map((category, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 text-sm rounded-full bg-primary-light text-primary"
                  >
                    {category}
                  </span>
                ))}
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-700">Available as:</h3>
                <div className="space-y-2">
                  {getAvailabilityIcons()}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                  <FiHeart className="h-4 w-4" />
                  <span>Add to Favorites</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <FiShare2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
                {book.availability.includes('EBook') && (
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <FiDownload className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Book Details and Chat */}
          <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-gray-200">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'details'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Book Details
                </button>
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'chat'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Chat About This Book
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'details' ? (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
                    {book.author && <p className="text-xl text-gray-600 mt-1">by {book.author}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {book.publication_date && (
                      <div>
                        <span className="font-medium text-gray-700">Publication Date:</span>{' '}
                        <span>{book.publication_date}</span>
                      </div>
                    )}
                    {book.publisher && (
                      <div>
                        <span className="font-medium text-gray-700">Publisher:</span>{' '}
                        <span>{book.publisher}</span>
                      </div>
                    )}
                  </div>

                  {book.tags && book.tags.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Tags:</h3>
                      <div className="flex flex-wrap gap-2">
                        {book.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {book.summary && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Summary:</h3>
                      <p className="text-gray-600 leading-relaxed">{book.summary}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-[600px]">
                  <ChatInterface
                    bookId={book.id}
                    bookTitle={book.title}
                    initialMessages={chatHistory}
                    onSendMessage={onSendMessage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
