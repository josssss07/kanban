'use client'

import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { login, signinWithGoogle } from './action';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    
    const result = await login(formData);
    if (result?.error) {
      setErrorMessage(result.error);
    }
  };
  
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    const result = await signinWithGoogle();
    if (result?.error) {
      setErrorMessage(result.error);
    }
  };

  return (
    <div className="relative flex min-h-screen bg-black">
      <Head>
        <title>Kanban - Sign in</title>
        <meta name="description" content="Sign in to your Kanban account" />
      </Head>
      
      {/* Background grid pattern - fixed to be behind content */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="purple" strokeWidth="0.5" strokeOpacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Container for centered content */}
      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-6xl mx-auto">
        {/* Centered Panel */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center mx-auto max-w-md">
          {/* Logo */}
          <div className="mb-10 text-center">
            <div className="flex items-center justify-center">
              <div className="text-purple-500 mr-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21.5 12.5C21.5 16.366 18.366 19.5 14.5 19.5H4.5C3.948 19.5 3.5 19.052 3.5 18.5V8.5C3.5 4.634 6.634 1.5 10.5 1.5H20.5C21.052 1.5 21.5 1.948 21.5 2.5V12.5Z"
                    fill="#8B5CF6"
                    stroke="#8B5CF6"
                  />
                  <path
                    d="M3.5 14.5C3.5 10.634 6.634 7.5 10.5 7.5H20.5C21.052 7.5 21.5 7.948 21.5 8.5V18.5C21.5 19.052 21.052 19.5 20.5 19.5H10.5C6.634 19.5 3.5 16.366 3.5 12.5V14.5Z"
                    fill="currentColor"
                    fillOpacity="0.3"
                  />
                </svg>
              </div>
              <span className="text-white text-3xl font-medium">
                <a href='./' className="hover:text-purple-400 transition-colors">kanban</a>
              </span>
            </div>
          </div>

          {/* Login Form */}
          <div className="flex-grow">
            <h1 className="text-white text-3xl font-bold mb-2 text-center">Welcome back</h1>
            <p className="text-gray-400 mb-8 text-center">Sign in to your account</p>

            {errorMessage && (
              <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-2 rounded mb-4">
                {errorMessage}
              </div>
            )}

            <div className="space-y-4 mb-4">
              <button 
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center w-full py-2 px-4 bg-black border border-gray-700 rounded text-white hover:bg-gray-900 transition duration-200"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>
            </div>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-700"></div>
              <span className="px-4 text-sm text-gray-400">or</span>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="block text-gray-400 text-sm" htmlFor="password">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-sm text-gray-400 hover:text-purple-500">
                    Forgot Password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded text-white font-medium transition duration-200"
              >
                Sign In
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="mt-8">
            <div className="text-center text-gray-400 text-sm mb-4">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-purple-500 hover:text-purple-400">
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}