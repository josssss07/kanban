import React from 'react';

const AboutHero = () => {
  return (
    <div className="relative bg-gray-900 text-white">
      {/* Purple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 to-gray-900/90 z-10"></div>
      
      {/* Background pattern (optional) */}
      <div className="absolute inset-0 opacity-10 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 py-24 md:py-32 relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            About Kanban
          </h1>
          
          <div className="w-24 h-1 bg-purple-500 mx-auto mb-6"></div>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            Helping teams work smarter and accomplish more together
          </p>
          
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            We've built a productivity platform that combines intuitive kanban boards
            with powerful time management tools to transform how teams collaborate.
          </p>
          
          
        </div>
      </div>
    </div>
  );
};

export default AboutHero;