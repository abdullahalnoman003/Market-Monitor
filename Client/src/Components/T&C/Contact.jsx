import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaStore, FaHandshake } from "react-icons/fa";
import useDocumentTitle from "../../Hooks/useDocumentTitle";

const Contact = () => {
  useDocumentTitle("Contact | Market Monitor");

  return (
    <section className="section-shell py-10 sm:py-12">
      <div className="surface-card mx-auto max-w-5xl p-6 sm:p-8 lg:p-10">
        <div className="text-center">
          <h1 className="section-title">Contact Us</h1>
          <p className="section-subtitle">
            Reach out for support, partnership opportunities, or vendor onboarding inquiries.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-base-300/60 bg-base-100/60 p-5 sm:p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-base-content">
              <FaEnvelope className="text-primary" /> Support & Contact
            </h2>
            <ul className="space-y-3 text-sm text-base-content/75 sm:text-base">
              <li className="flex items-center gap-3"><FaEnvelope className="text-primary" /> support@marketmonitor.com</li>
              <li className="flex items-center gap-3"><FaPhoneAlt className="text-primary" /> +880-123-456-789</li>
              <li className="flex items-center gap-3"><FaMapMarkerAlt className="text-primary" /> Dhaka, Bangladesh</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-base-300/60 bg-base-100/60 p-5 sm:p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-base-content">
              <FaStore className="text-secondary" /> Vendor Partnerships
            </h2>
            <p className="text-sm leading-relaxed text-base-content/75 sm:text-base">
              Interested in listing products and reaching more customers? Contact our team to learn about vendor onboarding and marketplace opportunities.
            </p>
            <p className="mt-3 text-sm sm:text-base">
              <span className="font-medium text-base-content">Vendor inquiries:</span>{" "}
              <a href="mailto:admin@marketmonitor.com" className="link link-primary">admin@marketmonitor.com</a>
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-base-300/60 bg-base-100/60 p-5 text-center sm:p-6">
          <h2 className="flex items-center justify-center gap-2 text-lg font-semibold text-base-content sm:text-xl">
            <FaHandshake className="text-accent" /> How We Can Help
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-base-content/75 sm:text-base">
            Whether you are a customer with a question or a vendor exploring growth opportunities, our team is here to support you with timely and practical assistance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
