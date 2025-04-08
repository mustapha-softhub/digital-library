import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { FiBook, FiSearch, FiSmile } from 'react-icons/fi';

export default async function Home() {
  // Redirect to books page if user is logged in
  const { data: { session } } = await supabase.auth.getSession();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">Digital Library</h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl">
            Discover books through AI-powered recommendations, natural language search, and interactive discussions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <FiBook className="text-5xl text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Extensive Collection</h2>
              <p className="text-gray-600">
                Browse our collection of books available in physical, e-book, and audio formats.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <FiSearch className="text-5xl text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Natural Language Search</h2>
              <p className="text-gray-600">
                Ask for "books like Harry Potter but for adults" and get intelligent recommendations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <FiSmile className="text-5xl text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Mood-Based Matching</h2>
              <p className="text-gray-600">
                Select your mood and discover books that match your current state of mind.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <Link 
              href="/books" 
              className="bg-primary text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Browse Books
            </Link>
            <Link 
              href="/auth/login" 
              className="bg-white border border-primary text-primary px-8 py-3 rounded-full text-lg font-medium hover:bg-primary/10 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
