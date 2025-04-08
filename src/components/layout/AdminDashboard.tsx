'use client';

import React, { useState } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiBook, FiUsers, FiMessageSquare, FiBarChart2 } from 'react-icons/fi';

interface AdminDashboardProps {
  userRole: 'admin' | 'librarian';
}

export default function AdminDashboard({ userRole }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('books');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('books')}
              className={`px-6 py-4 text-sm font-medium flex items-center ${
                activeTab === 'books'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FiBook className="mr-2 h-5 w-5" />
              Manage Books
            </button>
            {userRole === 'admin' && (
              <button
                onClick={() => setActiveTab('users')}
                className={`px-6 py-4 text-sm font-medium flex items-center ${
                  activeTab === 'users'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FiUsers className="mr-2 h-5 w-5" />
                Manage Users
              </button>
            )}
            <button
              onClick={() => setActiveTab('chats')}
              className={`px-6 py-4 text-sm font-medium flex items-center ${
                activeTab === 'chats'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FiMessageSquare className="mr-2 h-5 w-5" />
              Chat Analytics
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-6 py-4 text-sm font-medium flex items-center ${
                activeTab === 'stats'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FiBarChart2 className="mr-2 h-5 w-5" />
              Statistics
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'books' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Book Management</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                  <FiPlus className="h-5 w-5" />
                  <span>Add New Book</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Author
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Availability
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Added By
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Added
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Sample book rows */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Harry Potter and the Philosopher's Stone</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">J.K. Rowling</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          EBook, Physical
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Librarian1
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2025-03-15
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary hover:text-primary-dark mr-3">
                          <FiEdit className="h-5 w-5" />
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">The Great Gatsby</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">F. Scott Fitzgerald</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Audio, EBook
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Admin
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2025-02-28
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary hover:text-primary-dark mr-3">
                          <FiEdit className="h-5 w-5" />
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && userRole === 'admin' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                  <FiPlus className="h-5 w-5" />
                  <span>Add New User</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Sample user rows */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">John Doe</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">john.doe@example.com</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Librarian
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2025-01-10
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary hover:text-primary-dark mr-3">
                          <FiEdit className="h-5 w-5" />
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Jane Smith</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">jane.smith@example.com</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Reader
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2025-03-22
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary hover:text-primary-dark mr-3">
                          <FiEdit className="h-5 w-5" />
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'chats' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Chat Analytics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Total Chats</h3>
                  <p className="text-3xl font-bold text-primary">1,248</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Active Users</h3>
                  <p className="text-3xl font-bold text-primary">342</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Avg. Messages per Chat</h3>
                  <p className="text-3xl font-bold text-primary">8.5</p>
                </div>
              </div>
              
              <h3 className="text-xl font-medium text-gray-800 mb-4">Most Common Questions</h3>
              <div className="bg-white shadow overflow-hidden rounded-md">
                <ul className="divide-y divide-gray-200">
                  <li className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-900">Can you summarize this book for me?</div>
                      <div className="text-sm text-gray-500">428 times</div>
                    </div>
                  </li>
                  <li className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-900">What are the main themes in this book?</div>
                      <div className="text-sm text-gray-500">312 times</div>
                    </div>
                  </li>
                  <li className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-900">Who are the main characters?</div>
                      <div className="text-sm text-gray-500">287 times</div>
                    </div>
                  </li>
                  <li className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-900">Is this book suitable for children?</div>
                      <div className="text-sm text-gray-500">201 times</div>
                    </div>
                  </li>
                  <li className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-900">What other books are similar to this one?</div>
                      <div className="text-sm text-gray-500">189 times</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Library Statistics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Total Books</h3>
                  <p className="text-3xl font-bold text-primary">4,872</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">E-Books</h3>
                  <p className="text-3xl font-bold text-primary">2,341</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Physical Books</h3>
                  <p className="text-3xl font-bold text-primary">3,128</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Audio Books</h3>
                  <p className="text-3xl font-bold text-primary">987</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-4">Most Popular Categories</h3>
                  <div className="bg-white shadow overflow-hidden rounded-md">
                    <ul className="divide-y divide-gray-200">
                      <li className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-gray-900">Fiction</div>
                          <div className="text-sm text-gray-500">1,245 books</div>
                        </div>
                      </li>
                      <li className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-gray-900">Science Fiction</div>
                          <div className="text-sm text-gray-500">876 books</div>
                        </div>
                      </li>
                      <li className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-gray-900">Biography</div>
                          <div className="text-sm text-gray-500">654 books</div>
                        </div>
                      </li>
                      <li className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-gray-900">History</div>
                          <div className="text-sm text-gray-500">542 books</div>
                        </div>
                      </li>
                      <li className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-gray-900">Self-Help</div>
                          <div className="text-sm text-gray-500">421 books</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-4">Most Popular Mood Matches</h3>
                  <div className="bg-white shadow overflow-hidden rounded-md">
                    <ul className="divide-y divide-gray-200">
                      <li className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-gray-900">Curious</div>
                          <div className="text-sm text-gray-500">487 searches</div>
                        </div>
                      </li>
                      <li className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-gray-900">Happy</div>
                          <div className="text-sm text-gray-500">356 searches</div>
                        </div>
                      </li>
                      <li className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-gray-900">Calm</div>
                          <div className="text-sm text-gray-500">312 searches</div>
                        </div>
                      </li>
                      <li className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-gray-900">Stressed</div>
                          <div className="text-sm text-gray-500">289 searches</div>
                        </div>
                      </li>
                      <li className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-gray-900">Down</div>
                          <div className="text-sm text-gray-500">201 searches</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
