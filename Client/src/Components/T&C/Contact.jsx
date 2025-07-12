import React from 'react';
import useDocumentTitle from '../../Hooks/useDocumentTitle';

const Contact = () => {
    useDocumentTitle("Contact || Market Monitor")
  return (
    <div className="bg-base-100 text-base-content min-h-screen  px-6 py-10">
      <div className="max-w-4xl mx-auto bg-base-200 rounded-2xl shadow-primary shadow-md p-10">
        <h1 className="text-4xl font-bold text-primary text-center mb-8">
          Contact Us
        </h1>

        <p className="text-lg mb-6 text-center">
          Need help? Have suggestions? Or simply want to get in touch? We're here for you.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Contact Details */}
          <div>
            <h2 className="text-xl font-semibold text-accent mb-2">📬 Reach Out</h2>
            <p>Email: <span className="text-primary">support@marketmonitor.com</span></p>
            <p className="mt-2">Phone: <span className="text-primary">+880-123-456-789</span></p>
            <p className="mt-2">Location: Dhaka, Bangladesh</p>
          </div>

          {/* Vendor Invitation */}
          <div>
            <h2 className="text-xl font-semibold text-accent mb-2">🛍️ Become a Vendor</h2>
            <p>
              Are you passionate about selling unique or local products? Join us as a vendor and reach more customers through our marketplace.
            </p>
            <p className="mt-2">
              For vendor registration or inquiries, contact our admin team: <span className="text-primary">admin@marketmonitor.com</span>
            </p>
          </div>
        </div>

        {/* Static Section Instead of Form */}
        <div className="bg-base-100 border border-base-300 rounded-xl p-6 text-center">
          <h2 className="text-2xl font-semibold text-accent mb-4">🌟 Why Contact Us?</h2>
          <p className="text-base mb-3">
            Whether you're a customer with a question or a vendor looking to grow your business, our team is here to support you.
          </p>
          <p className="text-base mb-3">
            We value community, transparency, and service. Don’t hesitate to connect with us — your input helps shape a better marketplace for everyone.
          </p>
          <p className="text-base mt-4 font-semibold text-primary">
            Let’s grow together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
