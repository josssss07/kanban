import React from 'react'
import Link from 'next/link';
const Footer = () => {
  return (
    <div>
        <footer className="py-8 px-6 md:px-10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-white-300">&copy; {new Date().getFullYear()} Kanban. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
          <div className="flex space-x-6">
            <Link href="/terms" className="text-white hover:text-purple-300 transition-colors">Terms</Link>
            <Link href="/privacy" className="text-white hover:text-purple-300 transition-colors">Privacy</Link>
            <Link href="/contact" className="text-white hover:text-purple-300 transition-colors">Contact</Link>
          </div>
          </div>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer
