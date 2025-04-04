
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { Footerdemo } from '@/components/ui/footer-section';

const TermsPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-14 md:ml-48">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using FashionWeek ("Service"), you agree to be bound by these Terms of Service.
              If you disagree with any part of these terms, you may not access the Service.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">2. Privacy Policy</h2>
            <p className="text-gray-700 mb-4">
              Your use of the Service is also subject to our Privacy Policy, which describes how we collect,
              use, and share information about you when you use our website.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">3. User Accounts</h2>
            <p className="text-gray-700 mb-4">
              When you create an account with us, you must provide information that is accurate, complete, and current at all times.
              Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">4. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              The Service and its original content, features, and functionality are owned by FashionWeek and are protected
              by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">5. Termination</h2>
            <p className="text-gray-700 mb-4">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason,
              including without limitation if you breach the Terms.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              In no event shall FashionWeek be liable for any indirect, incidental, special, consequential or punitive damages,
              including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">7. Changes</h2>
            <p className="text-gray-700">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
              By continuing to access or use our Service after those revisions become effective,
              you agree to be bound by the revised terms.
            </p>
          </div>
        </div>
        <Footerdemo />
      </main>
    </div>
  );
};

export default TermsPage;
