import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="py-8 px-6 md:px-10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-blue-300">&copy; {new Date().getFullYear()} Kanban. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-blue-300 hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="text-blue-300 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-blue-300 hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer
