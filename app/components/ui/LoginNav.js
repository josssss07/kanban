import React from 'react'
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() { {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
    <nav className="px-6 py-4 md:px-10">
    <div className="flex justify-between items-center">
      <Link href="/" className="text-white text-2xl font-bold tracking-wider">
        Kanban
      </Link>
      
      {/* Mobile menu button */}
      <div className="md:hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Desktop menu */}
      <div className="hidden md:flex space-x-10">
        <Link href="/" className="text-white hover:text-purple-300 transition-colors">
          Home
        </Link>
        <Link href="/aboutUs" className="text-white hover:text-purple-300 transition-colors">
          About
        </Link>
        <Link href="/pomodoro" className="text-white hover:text-purple-300 transition-colors">
          Pomodoro
        </Link>
      </div>
    </div>
    
    {/* Mobile menu */}
    {isOpen && (
      <div className="md:hidden mt-4 flex flex-col space-y-4">
        <Link href="/" className="text-white hover:text-purple-300 transition-colors">
          Home
        </Link>
        <Link href="/aboutUs" className="text-white hover:text-purple-300 transition-colors">
          About
        </Link>
        <Link href="/pomodoro" className="text-white hover:text-purple-300 transition-colors">
          Pomodoro
        </Link>
        
      </div>
    )}
  </nav>

    </div>
  )
}
}
