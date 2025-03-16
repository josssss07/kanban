import Link from "next/link";
import React from 'react'

 const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-[80vh] container mx-auto px-6 py-20">
      <div className="w-full md:w-1/2 flex-1">
        {/* This is where you could add an illustration or image */}
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-end text-right">
        <h1 className="hero-title text-white text-4xl md:text-6xl font-bold leading-tight opacity-0">
          BOOST YOUR WORKFLOW
        </h1>
        <p className="hero-text text-white text-lg md:text-xl mt-6 max-w-lg opacity-0">
          Stay organized, streamline your workflow, and get more done with our powerful Kanban and productivity system. Visualize your tasks, collaborate with your team, and track progress effortlessly—all in one place.
        </p>
        <button     
          className="cta-button mt-10 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 opacity-0"
        >
          Sign Up Now
          <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
   )
}

export default Hero
