'use client';
import Head from "next/head";
import { useEffect, useRef } from "react";
import anime from 'animejs';
import Hero from "./components/ui/Hero";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";

export default function Home() {
  const bgAnimationRef = useRef(null);

  useEffect(() => {
    // Background animation
    anime({
      targets: '.animated-bg',
      translateX: [0, 30, -30, 0],
      translateY: [0, -25, 25, 0],
      opacity: [0.2, 0.5, 0.2], // More subtle opacity
      easing: 'easeInOutQuad',
      duration: 8000, // Slower animation
      loop: true,
    });

    // Animation for the heading
    anime({
      targets: '.hero-title',
      opacity: [0, 1],
      translateY: [50, 0],
      easing: 'easeOutExpo',
      duration: 1500,
      delay: 300
    });

    // Animation for the paragraph
    anime({
      targets: '.hero-text',
      opacity: [0, 1],
      translateY: [30, 0],
      easing: 'easeOutExpo',
      duration: 1500,
      delay: 600
    });

    // Animation for the button
    anime({
      targets: '.cta-button',
      opacity: [0, 1],
      translateY: [20, 0],
      easing: 'easeOutExpo',
      duration: 1200,
      delay: 900
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Head>
        <title>Kanban - Boost Your Workflow</title>
        <meta name="description" content="Kanban productivity system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Animated Background Elements */}
      <div ref={bgAnimationRef} className="absolute inset-0 z-0">
        {/* Subtle background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90"></div>
        
        {/* Animated elements */}
        <div className="animated-bg absolute top-20 left-1/4 w-96 h-96 rounded-full bg-indigo-900 blur-3xl opacity-15"></div>
        <div className="animated-bg absolute top-20 left-1/2 w-96 h-96 rounded-full bg-indigo-900 blur-3xl opacity-15"></div>
        <div className="animated-bg absolute bottom-40 right-1/4 w-80 h-80 rounded-full bg-purple-900 blur-3xl opacity-15 delay-300"></div>
        <div className="animated-bg absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-purple-900 blur-3xl opacity-10 delay-150"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Footer />
      </div>
    </div>
  );
}