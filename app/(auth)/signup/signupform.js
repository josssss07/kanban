import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { signup } from './action'; // Adjust this import path as needed

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Create form data to pass to the server action
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    
    // Call the signup server action
    await signup(formData);
  };

  return (
    <div className="relative flex min-h-screen bg-black">
      <Head>
        <title>Kanban - Sign up</title>
        <meta name="description" content="Create your Kanban account" />
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

          {/* Signup Form */}
          <div className="flex-grow">
            <h1 className="text-white text-3xl font-bold mb-2 text-center">Create your account</h1>
            <p className="text-gray-400 mb-8 text-center">Sign up to get started with Kanban</p>

            <div className="space-y-4 mb-4">
              {/* <button className="flex items-center justify-center w-full py-2 px-4 bg-black border border-gray-700 rounded text-white hover:bg-gray-900 transition duration-200">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0.296997C5.37 0.296997 0 5.67 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.67 18.627 0.296997 12 0.296997Z" fill="white" />
                </svg>
                Sign up with GitHub
              </button> */}

              <button className="flex items-center justify-center w-full py-2 px-4 bg-black border border-gray-700 rounded text-white hover:bg-gray-900 transition duration-200">
                
                Sign up with Google
              </button>
            </div>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-700"></div>
              <span className="px-4 text-sm text-gray-400">or</span>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded text-red-200 text-sm">
                {error}
              </div>
            )}

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
              <div className="mb-4">
                <label className="block text-gray-400 text-sm mb-2" htmlFor="password">
                  Password
                </label>
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
              <div className="mb-6">
                <label className="block text-gray-400 text-sm mb-2" htmlFor="confirm-password">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded text-white font-medium transition duration-200"
              >
                Create Account
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="mt-8">
            <div className="text-center text-gray-400 text-sm mb-4">
              Already have an account?{' '}
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