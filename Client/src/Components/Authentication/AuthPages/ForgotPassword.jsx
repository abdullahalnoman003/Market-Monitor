import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { sendPasswordResetEmail } from "firebase/auth";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import { auth } from "../../../Firebase/firebase.init";

const ForgotPassword = () => {
  useDocumentTitle("Reset Your Password | Market Monitor")
  const [email, setEmail] = useState("");

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("resetEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleReset = (e) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          title: "Reset Link Sent",
          text: "A password reset link has been sent to your email.",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Open Gmail",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "https://mail.google.com";
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Reset Failed",
          text: error.message,
        });
      });
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 py-12 bg-base-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      data-aos="fade-up"
    >
      <motion.div
        className="w-full max-w-lg shadow-lg rounded-3xl border border-primary p-10 bg-white bg-base-200"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <motion.h1
          className="text-3xl font-extrabold text-primary text-center mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🔐 Forgot Your Password?
        </motion.h1>
        <p className="text-center text-sm text-base-content mb-6">
          No worries! Enter your email and we’ll send you a reset link.
        </p>

        <form onSubmit={handleReset} className="space-y-5">
          {/* Email Input */}
          <div className="form-control">
            <label className="label font-semibold">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Reset Button */}
          <motion.button
            type="submit"
            className="btn btn-primary w-full text-base-100 font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Reset Link
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ForgotPassword;
