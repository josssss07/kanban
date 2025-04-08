import React from 'react';

const PrivacyContent = () => {
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
      <div className="container mx-auto px-6 py-24 md:py-32 relative z-20 ">
        <div className="max-w-4xl mx-auto ">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
            Privacy Policy
          </h1>
          
          <div className="w-24 h-1 bg-purple-500 mx-auto mb-12"></div>
          
          <p className="text-gray-300 text-center mb-6">Last updated: April 8, 2025</p>
          
          <div className="bg-transparent bg-opacity-20 backdrop-blur-sm rounded-lg p-6 md:p-8">
            <p className="mb-4">Kanban (us, we, or our) operates the Kanban platform. This page informs you of our policies regarding the collection, use, and disclosure of Personal Information we receive from users of the Service.</p>
            
            <p className="mb-8">We use your Personal Information only for providing and improving the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.</p>
            
            <h2 className="text-2xl font-semibold text-purple-300 mt-8 mb-4">1. Information Collection And Use</h2>
            <p className="mb-8">While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to your name, email address, and organization name (Personal Information).</p>
            
            <h2 className="text-2xl font-semibold text-purple-300 mt-8 mb-4">2. Log Data</h2>
            <p className="mb-8">Like many service operators, we collect information that your browser sends whenever you visit our Service (Log Data). This Log Data may include information such as your computers Internet Protocol (IP) address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages and other statistics.</p>
            
            <h2 className="text-2xl font-semibold text-purple-300 mt-8 mb-4">3. Cookies</h2>
            <p className="mb-4">Cookies are files with a small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computers hard drive.</p>
            
            <p className="mb-8">We use cookies to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>
            
            <h2 className="text-2xl font-semibold text-purple-300 mt-8 mb-4">4. Security</h2>
            <p className="mb-8">The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.</p>
            
            <h2 className="text-2xl font-semibold text-purple-300 mt-8 mb-4">5. Changes To This Privacy Policy</h2>
            <p className="mb-4">This Privacy Policy is effective as of April 8, 2025 and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.</p>
            
            <p className="mb-8">We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically. Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.</p>
            
            <h2 className="text-2xl font-semibold text-purple-300 mt-8 mb-4">6. Contact Us</h2>
            <p className="mb-4">If you have any questions about this Privacy Policy, please contact us.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyContent;