'use client'
import React from 'react'
import Navbar from '../components/ui/Navbar'
import Footer from '../components/ui/Footer'
import ContactContent from './contact'
const page = () => {
  return (
    <div> 
      <Navbar/>
      <ContactContent/>
      <Footer/>
    </div>
  )
}

export default page
