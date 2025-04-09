import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden p-8 text-center">
        <h1 className="text-4xl font-bold text-[#0072bc] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-[#8cc63f] text-white px-6 py-3 rounded-lg hover:bg-[#7ab52e]"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
