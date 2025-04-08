import React from 'react';

const TermsContent = () => {
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
            Terms of Service
          </h1>
          
          <div className="w-24 h-1 bg-purple-500 mx-auto mb-12"></div>
          
          <p className="text-gray-300 text-center mb-6">Last updated: April 8, 2025</p>
          
          <div className="bg-transparent bg-opacity-20 backdrop-blur-sm rounded-lg p-6 md:p-8">
            <p className="mb-4">Please read these Terms of Service (Terms, Terms of Service) carefully before using the Kanban platform operated by Kanban (us, we, or our).</p>
            
            <p className="mb-4">Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.</p>
            
            <p className="mb-8">By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>
            
            <h2 className="text-2xl font-semibold text-purple-300 mt-8 mb-4">1. Accounts</h2>
            <p className="mb-4">When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
            
            <p className="mb-8">You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.</p>
            
            <h2 className="text-2xl font-semibold text-purple-300 mt-8 mb-4">2. Content</h2>
            <p className="mb-8">Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post on or through the Service, including its legality, reliability, and appropriateness.</p>
            
            <h2 className="text-2xl font-semibold text-purple-300 mt-8 mb-4">3. Termination</h2>
            <p className="mb-4">We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
            
            <p className="mb-8">Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.</p>
            
            <h2 className="text-2xl font-semibold text-purple-300 mt-8 mb-4">4. Limitation of Liability</h2>
            <p className="mb-8">In no event shall Kanban, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
            
            <h2 className="text-2xl font-semibold text-purple-300 mt-8 mb-4">5. Changes</h2>
            <p className="mb-8">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
            
            <h2 className="text-2xl font-semibold text-purple-300 mt-8 mb-4">6. Contact Us</h2>
            <p className="mb-4">If you have any questions about these Terms, please contact us.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsContent;