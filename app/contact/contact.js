// import React from 'react';

// const ContactContent = () => {
//   return (
//     <div className="relative bg-gray-900 text-white">
//       {/* Purple gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-600/70 z-10"></div>
      
//       {/* Background pattern */}
//       <div className="absolute inset-0 opacity-10 z-0">
//         <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
//           <defs>
//             <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
//               <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#grid)" />
//         </svg>
//       </div>
      
//       {/* Content */}
//       <div className="container mx-auto px-6 py-24 md:py-32 relative z-20">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
//             Contact Us
//           </h1>
          
//           <div className="w-24 h-1 bg-purple-500 mx-auto mb-12"></div>
          
//           <p className="text-xl md:text-2xl text-gray-200 text-center mb-8">
//             Have questions or feedback? We would love to hear from you.
//           </p>
          
//           <div className="bg-black bg-opacity-20 backdrop-blur-sm rounded-lg p-6 md:p-8">
//             <form className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
//                   <input 
//                     type="text" 
//                     id="name" 
//                     className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white" 
//                     placeholder="Your name"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
//                   <input 
//                     type="email" 
//                     id="email" 
//                     className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white" 
//                     placeholder="your.email@example.com"
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
//                 <input 
//                   type="text" 
//                   id="subject" 
//                   className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white" 
//                   placeholder="How can we help?"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
//                 <textarea 
//                   id="message" 
//                   rows="6" 
//                   className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white" 
//                   placeholder="Tell us more about your inquiry..."
//                 ></textarea>
//               </div>
              
//               <div className="flex justify-center">
//                 <button 
//                   type="submit" 
//                   className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
//                 >
//                   Send Message
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactContent;

import React, { useState } from 'react';
import supabase from '../supabaseclient';

const ContactContent = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: '', // 'success' or 'error'
    message: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });
    
    try {
      // Basic validation
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Please fill out all required fields');
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }
      
      // Submit to Supabase
      const { data, error } = await supabase
        .from('contact') // Your table name in Supabase
        .insert([
          { 
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            created_at: new Date()
          }
        ]);
      
      if (error) throw error;
      
      // Success
      setSubmitStatus({
        type: 'success',
        message: 'Your message has been sent successfully! We will get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative bg-gray-900 text-white">
      {/* Purple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/70 z-10"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 py-24 md:py-32 relative z-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
            Contact Us
          </h1>
          
          <div className="w-24 h-1 bg-purple-500 mx-auto mb-12"></div>
          
          <p className="text-xl md:text-2xl text-gray-200 text-center mb-8">
            Have questions or feedback? We would love to hear from you.
          </p>
          
          <div className="bg-black bg-opacity-20 backdrop-blur-sm rounded-lg p-6 md:p-8">
            {/* Status Messages */}
            {submitStatus.message && (
              <div className={`mb-6 p-4 rounded-md ${
                submitStatus.type === 'success' 
                  ? 'bg-green-900/50 border border-green-500 text-green-200' 
                  : 'bg-red-900/50 border border-red-500 text-red-200'
              }`}>
                {submitStatus.message}
              </div>
            )}
          
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white" 
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white" 
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white" 
                  placeholder="How can we help?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea 
                  id="message" 
                  rows="6" 
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white" 
                  placeholder="Tell us more about your inquiry..."
                  required
                ></textarea>
              </div>
              
              <div className="flex justify-center">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactContent;