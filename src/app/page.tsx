import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiBook, FiSearch, FiUser } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-[#0072bc] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Digital Library</h1>
              <p className="text-xl mb-8">Discover a world of knowledge with our AI-powered digital library system.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/books" 
                  className="bg-[#8cc63f] text-white px-6 py-3 rounded-lg hover:bg-[#7ab52e] text-center"
                >
                  Browse Books
                </Link>
                <Link 
                  href="/auth/login" 
                  className="bg-white text-[#0072bc] px-6 py-3 rounded-lg hover:bg-gray-100 text-center"
                >
                  Sign In
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md h-64 md:h-80">
                <Image
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                  alt="Digital Library"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#0072bc] mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-[#0072bc] text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                <FiBook size={32} />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Extensive Collection</h3>
              <p className="text-gray-600 text-center">
                Access thousands of books in various formats including physical copies, e-books, and audiobooks.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-[#0072bc] text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                <FiSearch size={32} />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Natural Language Search</h3>
              <p className="text-gray-600 text-center">
                Find books using natural language queries like "books similar to Harry Potter but for adults."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-[#0072bc] text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                <FiUser size={32} />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Mood-Based Matching</h3>
              <p className="text-gray-600 text-center">
                Select your current mood and get personalized book recommendations that match how you're feeling.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* About Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="relative w-full max-w-md h-64 md:h-80 mx-auto">
                <Image
                  src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                  alt="About Digital Library"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-bold text-[#0072bc] mb-4">About Digital Library</h2>
              <p className="text-gray-600 mb-4">
                Our digital library provides access to a vast collection of books in various formats. 
                Powered by artificial intelligence, we offer unique features like natural language search, 
                interactive book chats, and mood-based recommendations.
              </p>
              <p className="text-gray-600 mb-6">
                Whether you're a casual reader or a dedicated bookworm, our platform helps you discover 
                new books, explore different genres, and engage with literature in innovative ways.
              </p>
              <Link 
                href="/books" 
                className="inline-block bg-[#8cc63f] text-white px-6 py-3 rounded-lg hover:bg-[#7ab52e]"
              >
                Explore Our Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
