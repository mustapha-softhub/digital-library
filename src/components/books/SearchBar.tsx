'use client';

import React, { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';

interface SearchBarProps {
  onSearch: (query: string, filters: any) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isNlpSearch, setIsNlpSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    availability: [] as string[],
    categories: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, { ...filters, nlp: isNlpSearch });
  };

  const toggleFilter = (type: 'availability' | 'categories', value: string) => {
    setFilters(prev => {
      const current = [...prev[type]];
      if (current.includes(value)) {
        return { ...prev, [type]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [type]: [...current, value] };
      }
    });
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-md p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-grow">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isNlpSearch ? "Try 'Books like Harry Potter but for adults'" : "Search by title, author..."}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
            >
              <FiSearch className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50"
            >
              <FiFilter className="h-4 w-4" />
              <span>Filters</span>
            </button>
            
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              Search
            </button>
          </div>
        </div>
        
        <div className="mt-2">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isNlpSearch}
              onChange={() => setIsNlpSearch(!isNlpSearch)}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            <span className="ms-3 text-sm font-medium text-gray-700">Natural Language Search</span>
          </label>
        </div>
        
        {showFilters && (
          <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="font-medium text-gray-700 mb-2">Availability</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {['Physical', 'EBook', 'Audio'].map((type) => (
                <label key={type} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.availability.includes(type)}
                    onChange={() => toggleFilter('availability', type)}
                    className="form-checkbox h-4 w-4 text-primary rounded focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
            
            <h3 className="font-medium text-gray-700 mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {['Fiction', 'Non-fiction', 'Science', 'History', 'Biography', 'Self-help'].map((category) => (
                <label key={category} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => toggleFilter('categories', category)}
                    className="form-checkbox h-4 w-4 text-primary rounded focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
