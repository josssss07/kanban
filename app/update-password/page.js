'use client'

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { updatePassword } from './action';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export default function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isValidLink, setIsValidLink] = useState(false);
  const router = useRouter();
  
  // Create a Supabase client for client-side use
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  
  // Check if this is a valid password reset link
  useEffect(() => {
    const checkAuthAndRecoveryToken = async () => {
      try {
        // Check URL for recovery token - handle both hash and query params
        const hasRecoveryToken = window.location.hash.includes('type=recovery');
        const urlParams = new URLSearchParams(window.location.search);
        const hasTokenInQuery = urlParams.has('token') || urlParams.has('access_token');
        
        if (hasRecoveryToken || hasTokenInQuery) {
          // Attempt to exchange the token for a session if needed
          try {
            // Only try to exchange if we don't already have a session
            const { data: { session: existingSession } } = await supabase.auth.getSession();
            if (!existingSession) {
              const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
                window.location.href
              );
              
              if (exchangeError) {
                console.error('Token exchange error:', exchangeError);
                setIsValidLink(false);
                setIsError(true);
                setMessage('Invalid or expired password reset link. Please request a new one.');
                setTimeout(() => {
                  router.push('/reset-password');
                }, 3000);
                return;
              }
            }
          } catch (exchangeError) {
            console.error('Error exchanging token:', exchangeError);
          }
        }
        
        // Check if we have a valid session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          setIsValidLink(true);
        } else {
          // No valid session found
          setIsValidLink(false);
          setMessage('Invalid or expired password reset link. Please request a new one.');
          setIsError(true);
          setTimeout(() => {
            router.push('/reset-password');
          }, 3000);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsError(true);
        setMessage('Error verifying password reset link. Please try again.');
      }
    };
    
    checkAuthAndRecoveryToken();
  }, [router]);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setIsError(true);
      setMessage('Passwords do not match.');
      return;
    }
    
    setIsLoading(true);
    setMessage('');
    setIsError(false);
    
    try {
      const formData = new FormData();
      formData.append('password', password);
      
      const result = await updatePassword(formData);
      
      if (result?.success) {
        setIsError(false);
        setMessage('Your password has been updated successfully.');
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setIsError(true);
        setMessage(result?.error || 'Failed to update password. The link may have expired.');
      }
    } catch (error) {
      console.error('Password update error:', error);
      setIsError(true);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen bg-black">
      <Head>
        <title>Kanban - Update Password</title>
        <meta name="description" content="Update your Kanban password" />
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
            {isValidLink ? (
              <>
                <h1 className="text-white text-3xl font-bold mb-2 text-center">Set New Password</h1>
                <p className="text-gray-400 mb-8 text-center">Create a new password for your account</p>

                <form onSubmit={handlePasswordUpdate}>
                  <div className="mb-4">
                    <label className="block text-gray-400 text-sm mb-2" htmlFor="password">
                      New Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                      minLength={6}
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-400 text-sm mb-2" htmlFor="confirmPassword">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                      minLength={6}
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
                        Updating...
                      </>
                    ) : 'Update Password'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="mb-6 flex items-center justify-center">
                  <svg className="h-16 w-16 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-gray-300 mb-4">Verifying reset link...</p>
                {isError && (
                  <p className="text-red-400 mb-4">
                    This link appears to be invalid or expired.
                  </p>
                )}
                <Link href="/reset-password" className="text-purple-500 hover:text-purple-400 underline">
                  Request a new password reset
                </Link>
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