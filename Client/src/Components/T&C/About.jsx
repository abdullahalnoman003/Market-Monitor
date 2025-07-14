import React from 'react';
import useDocumentTitle from '../../Hooks/useDocumentTitle';

const About = () => {
  useDocumentTitle("About || Market Monitor");

  return (
    <div className=" min-h-screen px-6 py-5 text-base-content">
      <div className="max-w-4xl mx-auto bg-base-200 rounded-xl shadow-md shadow-primary p-8">
        <h1 className="text-3xl font-bold mb-6 text-primary text-center">
          About Market Monitor
        </h1>

        <p className="mb-4">
          <strong>Market Monitor</strong> is your go-to platform for staying informed about local market prices of essential items. Whether you're a shopper looking to compare prices or a vendor wanting to keep customers updated, we provide a smart and easy way to connect both ends.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Our Mission</h2>
        <p className="mb-4">
          Our mission is to bring transparency and accessibility to everyday market pricing. By bridging the gap between vendors and consumers, we help people make better purchasing decisions.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">How It Works</h2>
        <p className="mb-4">
          Vendors regularly update prices of essential goods across different local markets. Users can browse, track, and compare these prices easily. With real-time data and visual insights, you're always one step ahead.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Key Features</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Real-time price updates by verified vendors</li>
          <li>Side-by-side market price comparisons</li>
          <li>Price tracking and trend analysis tools</li>
          <li>User-friendly watchlist for favorite products</li>
          <li>Secure product purchasing (where available)</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Monetization</h2>
        <p className="mb-4">
          We support the platform through selected product purchases and sponsored advertisement placements. These help us grow while keeping most of the core features free for users.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Looking Ahead</h2>
        <p className="mb-4">
          As we grow, we aim to include more markets, expand vendor tools, and introduce smarter analytics for both buyers and sellers.
        </p>

        <p className="text-sm text-gray-500 mt-6">Last updated: July 13, 2025</p>
      </div>
    </div>
  );
};

export default About;
