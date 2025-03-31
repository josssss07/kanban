'use client'
import React from 'react'
import SignupForm from '@/app/(auth)/signup/signupform' // Adjust this import path as needed
import Footer from '@/app/components/ui/Footer'

const SignupPage = () => {
  return (
    <div>
      <SignupForm />
      <Footer />
    </div>
  )
}

export default SignupPage