'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="error-container">
      <h1>Oops! Something went wrong</h1>
      <p>{error?.message || 'An unexpected error occurred. Please try again.'}</p>
      
      <div className="buttons">
        <button onClick={() => reset()} className="retry-btn">Try Again</button>
        <button onClick={() => router.push('/')} className="home-btn">Go to Home</button>
      </div>

      <style jsx>{`
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
          background-color: #000; /* Dark background */
          color: #fff; /* White text */
          padding: 20px;
        }
        h1 {
          color: #9b51e0; /* Purple accent */
        }
        p {
          color: #aaa; /* Light gray text */
        }
        .buttons {
          margin-top: 20px;
        }
        .retry-btn, .home-btn {
          margin: 10px;
          padding: 10px 20px;
          font-size: 16px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: 0.3s;
          color: white;
        }
        .retry-btn {
          background-color: #9b51e0; /* Purple button */
        }
        .home-btn {
          background-color: #333; /* Dark gray button */
        }
        .retry-btn:hover {
          background-color: #7a3bb8; /* Darker purple on hover */
        }
        .home-btn:hover {
          background-color: #555; /* Lighter gray on hover */
        }
      `}</style>
    </div>
  );
}
