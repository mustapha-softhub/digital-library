import React from 'react';

// Static version of the books page to avoid React not defined errors
export default function Books() {
  // Using static data instead of useState
  const books = [
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      categories: ['Fiction', 'Classic'],
      availability: 'EBook,Physical',
      cover_image: 'https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg'
    },
    {
      id: '2',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      categories: ['Fiction', 'Classic'],
      availability: 'EBook,Audio',
      cover_image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg'
    },
    {
      id: '3',
      title: 'Dune',
      author: 'Frank Herbert',
      categories: ['Science Fiction'],
      availability: 'EBook,Physical,Audio',
      cover_image: 'https://m.media-amazon.com/images/I/81ym3QUd3KL._AC_UF1000,1000_QL80_.jpg'
    },
    {
      id: '4',
      title: 'The Power of Now',
      author: 'Eckhart Tolle',
      categories: ['Self-help'],
      availability: 'Physical,Audio',
      cover_image: 'https://m.media-amazon.com/images/I/714FbKtXS+L._AC_UF1000,1000_QL80_.jpg'
    },
    {
      id: '5',
      title: 'Harry Potter and the Philosopher\'s Stone',
      author: 'J.K. Rowling',
      categories: ['Fantasy', 'Fiction'],
      availability: 'EBook,Physical,Audio',
      cover_image: 'https://m.media-amazon.com/images/I/81m1s4wIPML._AC_UF1000,1000_QL80_.jpg'
    },
    {
      id: '6',
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      categories: ['Fiction', 'Fantasy'],
      availability: 'EBook,Physical',
      cover_image: 'https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg'
    },
    {
      id: '7',
      title: 'Sapiens: A Brief History of Humankind',
      author: 'Yuval Noah Harari',
      categories: ['Non-fiction', 'History'],
      availability: 'EBook,Audio',
      cover_image: 'https://m.media-amazon.com/images/I/713jIoMO3UL._AC_UF1000,1000_QL80_.jpg'
    },
    {
      id: '8',
      title: 'The Da Vinci Code',
      author: 'Dan Brown',
      categories: ['Fiction', 'Mystery'],
      availability: 'Physical',
      cover_image: 'https://m.media-amazon.com/images/I/91Q5dCjc2KL._AC_UF1000,1000_QL80_.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#0072bc] mb-6">Digital Library</h1>
        
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Ask a question like 'books similar to Harry Potter but for adults'"
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0072bc]"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-[#0072bc]">How are you feeling today?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Happy', 'Down', 'Calm', 'Stressed', 'Curious', 'Tired'].map((mood) => (
              <a
                key={mood}
                href={`/api/mood/${mood.toLowerCase()}`}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-[#8cc63f] hover:shadow-md transition-all text-center"
              >
                {mood}
              </a>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#0072bc]">Browse Books</h2>
          <a 
            href="/books?showFilters=true"
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-md shadow-sm border border-gray-200"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map(book => (
            <a href={`/books/${book.id}`} key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 relative">
                <img
                  src={book.cover_image}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 text-[#0072bc]">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {book.categories.map(category => (
                    <span key={category} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {category}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {book.availability.split(',').map(type => (
                    <span 
                      key={type} 
                      className={`px-2 py-1 text-xs rounded-full ${
                        type === 'EBook' 
                          ? 'bg-purple-100 text-purple-800' 
                          : type === 'Physical' 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// Force static generation and disable all client-side features
export const dynamic = 'force-static';
export const runtime = 'nodejs';
export const revalidate = false;
export const fetchCache = 'force-no-store';
export const preferredRegion = 'auto';
export const maxDuration = 5;
