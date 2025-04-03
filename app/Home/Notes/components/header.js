'use client';
import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(dayjs().format("hh:mm A"));
  
  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(dayjs().format("hh:mm A"));
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="px-6 py-3 flex items-center justify-between bg-gray-900 text-white shadow-md">
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        <span className="text-xl font-bold">KeepNotes</span>
      </div>
      <div className="text-lg font-semibold">
        {currentTime}
      </div>
    </header>
  );
};

export default Header;