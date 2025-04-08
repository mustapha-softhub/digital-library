'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX, FiSearch, FiUser, FiBook, FiHome } from 'react-icons/fi';
import { useAuth } from '@/lib/auth';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading } = { user: null, loading: false }; // Replace with useAuth() when auth is properly set up

  return (
    <header className="bg-white shadow-md">
      {/* Top navigation bar */}
      <div className="bg-[#0072bc] text-white">
        <div className="container mx-auto px-4 py-1 flex justify-end text-sm">
          <button className="px-2 py-1 hover:underline">English</button>
          <span className="mx-2">|</span>
          <button className="px-2 py-1 hover:underline">العربية</button>
        </div>
      </div>
      
      {/* Main header */}
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative h-16 w-48">
            <Image 
              src="/logo.png" 
              alt="Dubai Public Library" 
              width={200}
              height={64}
              className="object-contain"
              priority
            />
          </div>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-[#8cc63f] font-medium">
            Home
          </Link>
          <Link href="/books" className="text-gray-700 hover:text-[#8cc63f] font-medium">
            Books
          </Link>
          <Link href="/categories" className="text-gray-700 hover:text-[#8cc63f] font-medium">
            Categories
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-[#8cc63f] font-medium">
            Contact Us
          </Link>
          
          {loading ? (
            <div className="animate-pulse h-10 w-24 bg-gray-200 rounded"></div>
          ) : user ? (
            <Link 
              href="/dashboard" 
              className="flex items-center gap-2 bg-[#8cc63f] text-white px-4 py-2 rounded-md hover:bg-[#7ab52e]"
            >
              <FiUser />
              Dashboard
            </Link>
          ) : (
            <Link 
              href="/auth/login" 
              className="flex items-center gap-2 bg-[#8cc63f] text-white px-4 py-2 rounded-md hover:bg-[#7ab52e]"
            >
              <FiUser />
              Login
            </Link>
          )}
        </nav>
      </div>
      
      {/* Search bar */}
      <div className="bg-[#f5f5f5] py-4">
        <div className="container mx-auto px-4">
          <div className="flex">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search for books..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#0072bc]"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" size={20} />
              </div>
            </div>
            <button className="bg-[#8cc63f] text-white px-6 py-3 rounded-r-lg hover:bg-[#7ab52e]">
              Search
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="flex items-center gap-2 text-gray-700 hover:text-[#8cc63f] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiHome />
                Home
              </Link>
              <Link 
                href="/books" 
                className="flex items-center gap-2 text-gray-700 hover:text-[#8cc63f] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiBook />
                Books
              </Link>
              <Link 
                href="/categories" 
                className="flex items-center gap-2 text-gray-700 hover:text-[#8cc63f] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiBook />
                Categories
              </Link>
              <Link 
                href="/contact" 
                className="flex items-center gap-2 text-gray-700 hover:text-[#8cc63f] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiUser />
                Contact Us
              </Link>
              {!user && (
                <Link 
                  href="/auth/login" 
                  className="flex items-center gap-2 bg-[#8cc63f] text-white px-4 py-2 rounded-md hover:bg-[#7ab52e]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiUser />
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
