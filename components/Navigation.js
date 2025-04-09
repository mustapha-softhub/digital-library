import React from 'react';
import Logo from './Logo';
import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
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
          <Link 
            href="/auth/login" 
            className="flex items-center gap-2 bg-[#8cc63f] text-white px-4 py-2 rounded-md hover:bg-[#7ab52e]"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
