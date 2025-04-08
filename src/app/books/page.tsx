'use client';

import { useState, useEffect } from 'react';
import { BookCard } from '@/components/books/BookCard';
import { SearchBar } from '@/components/books/SearchBar';
import { MoodSelector } from '@/components/books/MoodSelector';
import { FiFilter, FiBook, FiHeadphones, FiTablet } from 'react-icons/fi';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    availability: [],
    categories: [],
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Fetch books from API
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books');
        if (response.ok) {
          const data = await response.json();
          setBooks(data.books || []);
        } else {
          console.error('Failed to fetch books');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const toggleFilter = (type, value) => {
    setFilters(prev => {
      const current = [...prev[type]];
      const index = current.indexOf(value);
      
      if (index === -1) {
        current.push(value);
      } else {
        current.splice(index, 1);
      }
      
      return {
        ...prev,
        [type]: current
      };
    });
  };

  const filteredBooks = books.filter(book => {
    // Filter by availability
    if (filters.availability.length > 0) {
      const bookAvailability = book.availability.split(',');
      const hasMatchingAvailability = filters.availability.some(filter => 
        bookAvailability.includes(filter)
      );
      if (!hasMatchingAvailability) return false;
    }
    
    // Filter by categories
    if (filters.categories.length > 0) {
      const hasMatchingCategory = filters.categories.some(category => 
        book.categories.includes(category)
      );
      if (!hasMatchingCategory) return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Digital Library</h1>
        
        <div className="mb-8">
          <SearchBar />
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
          <MoodSelector />
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Browse Books</h2>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-md shadow-sm border border-gray-200"
          >
            <FiFilter />
            Filters
          </button>
        </div>
        
        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-200">
            <h3 className="font-medium mb-3">Availability</h3>
            <div className="flex flex-wrap gap-3 mb-4">
              <button
                onClick={() => toggleFilter('availability', 'Physical')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
                  filters.availability.includes('Physical') 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <FiBook size={14} />
                Physical
              </button>
              <button
                onClick={() => toggleFilter('availability', 'EBook')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
                  filters.availability.includes('EBook') 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <FiTablet size={14} />
                E-Book
              </button>
              <button
                onClick={() => toggleFilter('availability', 'Audio')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
                  filters.availability.includes('Audio') 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <FiHeadphones size={14} />
                Audio
              </button>
            </div>
            
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="flex flex-wrap gap-3">
              {['Fiction', 'Non-fiction', 'Fantasy', 'Science Fiction', 'Mystery', 'Self-help'].map(category => (
                <button
                  key={category}
                  onClick={() => toggleFilter('categories', category)}
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    filters.categories.includes(category) 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">No books found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters or search criteria.
            </p>
            <button 
              onClick={() => setFilters({ availability: [], categories: [] })}
              className="text-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
