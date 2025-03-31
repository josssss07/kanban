'use client'
import React from 'react'
import Navbar from '../components/ui/Navbar'
import Footer from '../components/ui/Footer'
import AboutHero from './hero'
const page = () => {
  return (
    <div> 
      <Navbar/>
      <AboutHero />
      <Footer/>
    </div>
  )
}

export default page
