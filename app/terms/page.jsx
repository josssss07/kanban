'use client'
import React from 'react'
import Navbar from '../components/ui/Navbar'
import Footer from '../components/ui/Footer'
import TermsContent from './terms'
const page = () => {
  return (
    <div> 
      <Navbar/>
      <TermsContent/>
      <Footer/>
    </div>
  )
}

export default page
