import React from "react";
import { FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { TfiBarChart } from "react-icons/tfi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content py-10 px-6 z-20 rounded-t-2xl shadow-inner transition-colors duration-300">
      <div className="max-w-screen mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Branding */}
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start">
            <img src="/logo.png" alt="" className="h-10 w-fit" />
            <h2 className="text-2xl font-extrabold flex items-center justify-center sm:justify-start gap-2 text-primary">
              Market<span className="text-secondary">Monitor</span>
            </h2>
          </div>

          <p className="mt-2 text-sm">
            Stay updated with real-time market prices of essentials. Compare
            across locations. Buy smart, live smarter.
          </p>
          <p className="text-xs mt-4">
            &copy; {new Date().getFullYear()} MarketMonitor. All rights
            reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-primary transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/all-products"
                className="hover:text-primary transition-colors"
              >
                Browse Products
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="hover:text-primary transition-colors"
              >
                Terms And Conditions
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy and Policy
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="hover:text-primary transition-colors">
                Became a Vendor
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <p className="text-sm">📧 support@marketmonitor.com</p>
          <p className="text-sm">📞 +880 1700-123456</p>
          <p className="text-sm mt-1">🏢 Dhaka, Bangladesh</p>
        </div>

        {/* Social Media */}
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-semibold mb-3">Connect With Us</h3>
          <div className="flex justify-center sm:justify-start gap-5 mt-3 text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF className="hover:text-blue-600 transition-colors duration-200" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter/X"
            >
              <FaSquareXTwitter className="hover:text-black transition-colors duration-200" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="hover:text-pink-600 transition-colors duration-200" />
            </a>
            <a href="mailto:support@marketmonitor.com" aria-label="Email">
              <FaEnvelope className="hover:text-red-500 transition-colors duration-200" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
