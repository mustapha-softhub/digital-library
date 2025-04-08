'use client';

import React from 'react';
import { FiBook, FiHeadphones, FiTablet } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

interface BookCardProps {
  id: string;
  title: string;
  author?: string;
  coverImage?: string;
  availability: string;
  categories?: string[];
}

export default function BookCard({ id, title, author, coverImage, availability, categories }: BookCardProps) {
  // Function to determine availability icons
  const getAvailabilityIcons = () => {
    const icons = [];
    if (availability.includes('Physical')) {
      icons.push(
        <span key="physical" className="tooltip" data-tip="Physical Book">
          <FiBook className="text-primary h-5 w-5" />
        </span>
      );
    }
    if (availability.includes('EBook')) {
      icons.push(
        <span key="ebook" className="tooltip" data-tip="E-Book">
          <FiTablet className="text-accent h-5 w-5" />
        </span>
      );
    }
    if (availability.includes('Audio')) {
      icons.push(
        <span key="audio" className="tooltip" data-tip="Audio Book">
          <FiHeadphones className="text-secondary h-5 w-5" />
        </span>
      );
    }
    return icons;
  };

  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      <Link href={`/books/${id}`}>
        <div className="relative h-48 bg-gray-200">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-primary-light">
              <span className="text-primary text-4xl">📚</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{title}</h3>
          {author && <p className="text-sm text-gray-600 mt-1">{author}</p>}
          
          <div className="flex flex-wrap gap-1 mt-2">
            {categories?.slice(0, 2).map((category, index) => (
              <span 
                key={index} 
                className="px-2 py-1 text-xs rounded-full bg-primary-light text-primary"
              >
                {category}
              </span>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-2">
              {getAvailabilityIcons()}
            </div>
            <button className="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
              Details
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
