import React from 'react';
import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin, FiTwitter, FiInstagram, FiFacebook } from 'react-icons/fi';

export function Footer() {
  return (
    <footer className="bg-[#0072bc] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Digital Library</h3>
            <p className="mb-4">
              Our digital library provides access to a vast collection of books in various formats.
              Discover, learn, and engage with our AI-powered recommendations and interactive features.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#8cc63f]">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="hover:text-[#8cc63f]">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="hover:text-[#8cc63f]">
                <FiInstagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-[#8cc63f]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/books" className="hover:text-[#8cc63f]">
                  Books
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-[#8cc63f]">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-[#8cc63f]">
                  Login / Register
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#8cc63f]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <FiMapPin />
                <span>Dubai, United Arab Emirates</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone />
                <span>+971 4 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail />
                <span>info@digitallibrary.ae</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="bg-[#005a95] py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Digital Library. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
