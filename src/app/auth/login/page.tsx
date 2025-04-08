'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiMail, FiLock, FiUser, FiGithub, FiTwitter, FiFacebook } from 'react-icons/fi';
import { LoginForm } from '@/components/auth/LoginForm';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/10 to-background p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-primary mb-6">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h1>
        
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-2 text-center font-medium ${
                isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-500'
              }`}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-2 text-center font-medium ${
                !isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-500'
              }`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>
        </div>
        
        <LoginForm isLogin={isLogin} />
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-3">
            <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              <FiGithub className="h-5 w-5" />
            </button>
            <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              <FiTwitter className="h-5 w-5 text-blue-400" />
            </button>
            <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              <FiFacebook className="h-5 w-5 text-blue-600" />
            </button>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Link href="/" className="text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
