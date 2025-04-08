export default function Books() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Digital Library</h1>
        
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search books or ask a question..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Happy', 'Down', 'Calm', 'Stressed', 'Curious', 'Tired'].map((mood) => (
              <button
                key={mood}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-primary hover:shadow-md transition-all"
              >
                {mood}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Browse Books</h2>
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-md shadow-sm border border-gray-200">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">Book Title {index + 1}</h3>
                <p className="text-gray-600 text-sm mb-2">Author Name</p>
                <div className="flex gap-2 mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Fiction</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Fantasy</span>
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">EBook</span>
                  <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">Physical</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
