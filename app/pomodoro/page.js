'use client';
import React from 'react'
import Navbar from '../components/ui/Navbar'
import Footer from '../components/ui/Footer'
import PomodoroTimer from './timer'
const page = () => {
  return (
    <div>
        <Navbar/>
        <PomodoroTimer/>
        <Footer/>
    </div>
  )
}

export default page
