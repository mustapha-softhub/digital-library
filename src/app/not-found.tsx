// Explicitly import React to ensure it's available during build
import * as React from 'react';

// This is a static 404 Not Found page
const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-[#0072bc] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block bg-[#0072bc] text-white px-6 py-3 rounded-md font-medium hover:bg-[#005a99] transition-colors"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

// Export the component as default
export default NotFound;

// Force static generation and disable all client-side features
export const dynamic = 'force-static';
export const runtime = 'nodejs';
export const revalidate = false;
export const fetchCache = 'force-no-store';
export const preferredRegion = 'auto';
export const maxDuration = 5;
