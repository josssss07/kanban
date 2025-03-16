"use client";

import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub, FaEnvelope, FaLock } from "react-icons/fa";

const AuthForm = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Animation setup
  useEffect(() => {
    // Create canvas element for particle animation
    const canvas = document.getElementById('background-animation');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Array to store particles
    const particles = [];
    const particleCount = 50;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: `rgba(${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 150) + 100}, ${Math.random() * 0.5 + 0.1})`,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1
      });
    }
    
    // Function to draw and update particles
    function animateParticles() {
      // Clear canvas with semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(30, 30, 40, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around screen
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      // Removed the code that connected particles with lines
      
      requestAnimationFrame(animateParticles);
    }
    
    // Start animation
    animateParticles();
    
    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Email:", email, "Password:", password);
    // Add your authentication logic here
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background canvas */}
      <canvas id="background-animation" className="absolute top-0 left-0 w-full h-full -z-10"></canvas>
      
      {/* Content */}
      <div className="max-w-md w-full mx-auto bg-gray-800 bg-opacity-70 backdrop-blur-sm text-white shadow-xl rounded-xl p-8 relative z-10">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2 text-white">
            {type === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-200">
            {type === "login" 
              ? "Sign in to access your account" 
              : "Sign up to get started"}
          </p>
        </div>
        
        <div className="space-y-4 mb-6">
          <button
            className="w-full flex items-center justify-center bg-transparent border border-purple-500 text-white p-3 rounded-lg hover:bg-purple-900 transition duration-300 ease-in-out"
            onClick={() => signIn("google")}
            type="button"
          >
            <FaGoogle className="mr-3 text-white" />
            Continue with Google
          </button>
          
          <button
            className="w-full flex items-center justify-center bg-transparent border border-purple-500 text-white p-3 rounded-lg hover:bg-purple-900 transition duration-300 ease-in-out"
            onClick={() => signIn("github")}
            type="button"
          >
            <FaGithub className="mr-3 text-white" />
            Continue with GitHub
          </button>
        </div>
        
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-gray-800 bg-opacity-70 text-white">or continue with email</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 p-3 bg-gray-700 bg-opacity-70 border border-gray-600 focus:border-purple-500 rounded-lg text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 p-3 bg-gray-700 bg-opacity-70 border border-gray-600 focus:border-purple-500 rounded-lg text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>
          
          {type === "login" && (
            <div className="flex justify-end">
              <a href="/forgot-password" className="text-sm text-white hover:text-purple-300">
                Forgot password?
              </a>
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              type === "login" ? "Sign In" : "Create Account"
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center text-white text-sm">
          {type === "login" ? (
            <p>
              Don't have an account?{" "}
              <a href="/signup" className="text-white hover:text-purple-300 font-medium">
                Sign up
              </a>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <a href="/login" className="text-white hover:text-purple-300 font-medium">
                Sign in
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;