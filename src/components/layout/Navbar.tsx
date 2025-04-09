'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX, FiSearch, FiUser, FiBook, FiLogIn, FiLogOut } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface NavbarProps {
  user?: any;
}

export default function Navbar({ user }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.svg"
                  alt="Digital Library Logo"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <span className="text-primary font-heading font-bold text-xl">Digital Library</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`${
                  pathname === '/'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Home
              </Link>
              <Link
                href="/books"
                className={`${
                  pathname === '/books' || pathname.startsWith('/books/')
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Books
              </Link>
              <Link
                href="/mood-match"
                className={`${
                  pathname === '/mood-match'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Mood Match
              </Link>
              <Link
                href="/about"
                className={`${
                  pathname === '/about'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                About
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Link
              href="/search"
              className="p-2 text-gray-500 hover:text-primary rounded-full hover:bg-gray-100"
            >
              <FiSearch className="h-5 w-5" />
            </Link>
            {user ? (
              <>
                {(user.role === 'admin' || user.role === 'librarian') && (
                  <Link
                    href="/admin"
                    className="p-2 text-gray-500 hover:text-primary rounded-full hover:bg-gray-100"
                  >
                    <FiBook className="h-5 w-5" />
                  </Link>
                )}
                <div className="relative">
                  <Link
                    href="/profile"
                    className="p-2 text-gray-500 hover:text-primary rounded-full hover:bg-gray-100"
                  >
                    <FiUser className="h-5 w-5" />
                  </Link>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-2 text-gray-500 hover:text-primary rounded-full hover:bg-gray-100"
                >
                  <FiLogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="p-2 text-gray-500 hover:text-primary rounded-full hover:bg-gray-100"
              >
                <FiLogIn className="h-5 w-5" />
              </Link>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className={`${
              pathname === '/'
                ? 'bg-primary-light text-primary'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            } block pl-3 pr-4 py-2 border-l-4 ${
              pathname === '/' ? 'border-primary' : 'border-transparent'
            } text-base font-medium`}
          >
            Home
          </Link>
          <Link
            href="/books"
            className={`${
              pathname === '/books' || pathname.startsWith('/books/')
                ? 'bg-primary-light text-primary'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            } block pl-3 pr-4 py-2 border-l-4 ${
              pathname === '/books' || pathname.startsWith('/books/')
                ? 'border-primary'
                : 'border-transparent'
            } text-base font-medium`}
          >
            Books
          </Link>
          <Link
            href="/mood-match"
            className={`${
              pathname === '/mood-match'
                ? 'bg-primary-light text-primary'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            } block pl-3 pr-4 py-2 border-l-4 ${
              pathname === '/mood-match' ? 'border-primary' : 'border-transparent'
            } text-base font-medium`}
          >
            Mood Match
          </Link>
          <Link
            href="/about"
            className={`${
              pathname === '/about'
                ? 'bg-primary-light text-primary'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            } block pl-3 pr-4 py-2 border-l-4 ${
              pathname === '/about' ? 'border-primary' : 'border-transparent'
            } text-base font-medium`}
          >
            About
          </Link>
          <Link
            href="/search"
            className={`${
              pathname === '/search'
                ? 'bg-primary-light text-primary'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            } block pl-3 pr-4 py-2 border-l-4 ${
              pathname === '/search' ? 'border-primary' : 'border-transparent'
            } text-base font-medium`}
          >
            Search
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {user ? (
            <div className="space-y-1">
              <Link
                href="/profile"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              >
                Profile
              </Link>
              {(user.role === 'admin' || user.role === 'librarian') && (
                <Link
                  href="/admin"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={handleSignOut}
                className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              <Link
                href="/login"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
