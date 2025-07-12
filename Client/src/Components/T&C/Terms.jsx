import React from 'react';
import useDocumentTitle from '../../Hooks/useDocumentTitle';

const Terms = () => {
  useDocumentTitle("Terms & Condition || Market Monitor");
  return (
    <div className="bg-base-100  min-h-screen px-6 py-5 text-base-content">
      <div className="max-w-4xl mx-auto bg-base-200 rounded-xl shadow-md shadow-primary p-8">
        <h1 className="text-3xl font-bold mb-6 text-primary text-center">
          Terms and Conditions
        </h1>

        <p className="mb-4">
          Welcome to <strong>Market Monitor</strong>. By accessing or using our platform, you agree to follow these terms and conditions. Please read them carefully.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Platform Usage</h2>
        <p className="mb-4">
          You agree to use Market Monitor responsibly. Activities like fraudulent listings, spamming, or system abuse may lead to account suspension.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. User Accounts</h2>
        <p className="mb-4">
          You’re responsible for keeping your login credentials safe. Actions performed through your account are your responsibility.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Product Listings & Purchases</h2>
        <p className="mb-4">
          Vendors can list products and manage pricing. Buyers must ensure payments via Stripe are completed securely. We’re not responsible for external Stripe issues.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Watchlist & Trends</h2>
        <p className="mb-4">
          Users may track products and monitor price trends using graphs. This is for informational purposes only and not investment advice.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Intellectual Property</h2>
        <p className="mb-4">
          All UI designs, APIs, and marketplace features are the property of Market Monitor. Do not copy, resell, or misuse our resources without permission.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Termination</h2>
        <p className="mb-4">
          We may suspend or terminate accounts that violate our policies, with or without prior notice.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Updates to Terms</h2>
        <p className="mb-4">
          These terms may change over time. Updates will be posted here, and continued use of the site means you accept those changes.
        </p>

        <p className="text-sm text-gray-500 mt-6">Last updated: July 12, 2025</p>
      </div>
    </div>
  );
};

export default Terms;
