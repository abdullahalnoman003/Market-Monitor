import React, { useEffect, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { FaKey } from "react-icons/fa";
import toast from "react-hot-toast";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import { auth } from "../../../Firebase/firebase.init";

const ForgotPassword = () => {
  useDocumentTitle("Reset Password | Market Monitor");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("resetEmail");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset link sent to your email.");
      const openGmail = window.confirm("Open Gmail now?");
      if (openGmail) window.location.href = "https://mail.google.com";
    } catch (error) {
      toast.error(error.message || "Failed to send reset link.");
    }
  };

  return (
    <section className="section-shell flex min-h-[calc(100vh-6rem)] items-center justify-center py-8 sm:py-12">
      <div className="surface-card w-full max-w-lg p-6 sm:p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FaKey className="text-xl" />
          </div>
          <h1 className="text-2xl font-bold text-base-content sm:text-3xl">Reset Your Password</h1>
          <p className="mt-2 text-sm text-base-content/70">
            Enter your email address and we will send you a secure password reset link.
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-4">
          <div className="form-control">
            <label className="label font-medium">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter your email"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">Send Reset Link</button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
