'use client'

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { requestPasswordReset } from './action';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleResetRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setIsError(false);
    
    try {
      const formData = new FormData();
      formData.append('email', email);
      
      const result = await requestPasswordReset(formData);
      
      if (result?.success) {
        setIsSent(true);
        setMessage('Password reset instructions have been sent to your email.');
      } else {
        setIsError(true);
        setMessage(result?.error || 'Failed to send reset email. Please try again.');
      }
    } catch (error) {
      console.error('Reset request error:', error);
      setIsError(true);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen bg-black">
      <Head>
        <title>Kanban - Reset Password</title>
        <meta name="description" content="Reset your Kanban password" />
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

          {/* Notification Message */}
          {message && (
            <div className={`text-center ${isError ? 'bg-red-600/20 border border-red-500 text-red-400' : 'bg-green-600/20 border border-green-500 text-green-400'} px-4 py-2 mb-6 rounded-md shadow-md`}>
              {message}
            </div>
          )}

          <div className="flex-grow">
            <h1 className="text-white text-3xl font-bold mb-2 text-center">Reset Password</h1>
            <p className="text-gray-400 mb-8 text-center">Enter your email to receive a password reset link</p>

            {!isSent ? (
              <form onSubmit={handleResetRequest}>
                <div className="mb-6">
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
                <button
                  type="submit"
                  className={`w-full py-2 px-4 flex items-center justify-center rounded text-white font-medium transition duration-200 ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" className="opacity-25" />
                        <path fill="white" className="opacity-75" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
                      </svg>
                      Sending...
                    </>
                  ) : 'Send Reset Link'}
                </button>
              </form>
            ) : (
              <div className="text-center">
                <div className="mb-6 flex items-center justify-center">
                  <svg className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-300 mb-6">Check your email for the password reset link.</p>
                <button
                  onClick={() => {
                    setIsSent(false);
                    setEmail('');
                    setMessage('');
                  }}
                  className="text-purple-500 hover:text-purple-400 underline"
                >
                  Try another email?
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8">
            <div className="text-center text-gray-400 text-sm mb-4">
              Remember your password?{' '}
              <Link href="/login" className="text-purple-500 hover:text-purple-400">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}