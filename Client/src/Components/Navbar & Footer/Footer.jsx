import React from "react";
import { FaFacebookF, FaInstagram, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-base-300/60 bg-base-200/40">
      <div className="section-shell py-12 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center gap-3 sm:justify-start">
              <img src="/logo.png" alt="Market Monitor logo" className="h-10 w-10" />
              <h2 className="text-2xl font-extrabold text-primary">
                Market<span className="text-secondary">Monitor</span>
              </h2>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-base-content/70">
              Track real-time market prices, compare vendors, and make confident buying decisions with a modern monitoring experience.
            </p>
            <p className="mt-5 text-xs text-base-content/50">
              &copy; {new Date().getFullYear()} Market Monitor. All rights reserved.
            </p>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="mb-4 text-lg font-semibold text-base-content">Quick Links</h3>
            <ul className="space-y-2 text-sm text-base-content/75">
              <li><Link to="/" className="transition-colors hover:text-primary">Home</Link></li>
              <li><Link to="/all-products" className="transition-colors hover:text-primary">Browse Products</Link></li>
              <li><Link to="/offers" className="transition-colors hover:text-primary">Special Offers</Link></li>
              <li><Link to="/about" className="transition-colors hover:text-primary">About Us</Link></li>
              <li><Link to="/contact-us" className="transition-colors hover:text-primary">Become a Vendor</Link></li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="mb-4 text-lg font-semibold text-base-content">Contact</h3>
            <ul className="space-y-3 text-sm text-base-content/75">
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <FaEnvelope className="text-primary" />
                <a href="mailto:support@marketmonitor.com" className="transition-colors hover:text-primary">
                  support@marketmonitor.com
                </a>
              </li>
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <FaPhoneAlt className="text-primary" />
                <span>+880 1700-123456</span>
              </li>
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <FaMapMarkerAlt className="text-primary" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm sm:justify-start">
              <Link to="/terms" className="link-hover link text-base-content/70">Terms</Link>
              <Link to="/privacy" className="link-hover link text-base-content/70">Privacy</Link>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="mb-4 text-lg font-semibold text-base-content">Connect</h3>
            <p className="mb-4 text-sm text-base-content/70">Follow updates, offers, and market insights.</p>
            <div className="flex justify-center gap-3 sm:justify-start">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="btn btn-sm btn-circle btn-ghost border border-base-300/70 hover:border-primary hover:text-primary">
                <FaFacebookF />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="btn btn-sm btn-circle btn-ghost border border-base-300/70 hover:border-primary hover:text-primary">
                <FaSquareXTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="btn btn-sm btn-circle btn-ghost border border-base-300/70 hover:border-primary hover:text-primary">
                <FaInstagram />
              </a>
              <a href="mailto:support@marketmonitor.com" aria-label="Email" className="btn btn-sm btn-circle btn-ghost border border-base-300/70 hover:border-primary hover:text-primary">
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
