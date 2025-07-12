import React from 'react';
import useDocumentTitle from '../../Hooks/useDocumentTitle';

const Privacy = () => {
  useDocumentTitle("Privacy & Policy || Market Monitor")
  return (
    <div className="bg-base-100 min-h-screen px-6 py-5 text-base-content">
      <div className="max-w-4xl mx-auto bg-base-200 rounded-xl shadow-md shadow-primary p-8">
        <h1 className="text-3xl font-bold mb-6 text-primary text-center">
          Privacy Policy
        </h1>

        <p className="mb-4">
          At <strong>Market Monitor</strong>, your privacy is important to us. This policy explains how we collect, use, and protect your personal and marketplace data while using our platform.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <ul className="list-disc list-inside mb-4">
          <li>User name, email, and profile information (via Firebase Authentication)</li>
          <li>Products you submit, watchlist items, reviews, and purchase history</li>
          <li>Payment-related metadata (handled securely via Stripe)</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Data</h2>
        <p className="mb-4">
          Your data is used to personalize your experience, display market trends, process purchases, and enhance platform performance and security.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Sharing</h2>
        <p className="mb-4">
          We do not sell your data. We only share necessary information with trusted services like Firebase and Stripe to ensure authentication and secure transactions.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Security Measures</h2>
        <p className="mb-4">
          We apply secure encryption, token-based auth, and modern web practices to protect your data. While we do our best, no method is 100% secure.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
        <p className="mb-4">
          You can view, update, or delete your account at any time from the dashboard. For data deletion or export, contact our support team.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Policy Updates</h2>
        <p className="mb-4">
          This policy may be revised occasionally. Updates will be posted here. Continued use of Market Monitor indicates your agreement with these terms.
        </p>

        <p className="text-sm text-gray-500 mt-6">Last updated: July 12, 2025</p>
      </div>
    </div>
  );
};

export default Privacy;
