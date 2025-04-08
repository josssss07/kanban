'use client'
import React from 'react'
import Navbar from '../components/ui/Navbar'
import Footer from '../components/ui/Footer'
import PrivacyContent from './privacy'
const page = () => {
  return (
    <div> 
      <Navbar/>
      <PrivacyContent />
      <Footer/>
    </div>
  )
}

export default page
