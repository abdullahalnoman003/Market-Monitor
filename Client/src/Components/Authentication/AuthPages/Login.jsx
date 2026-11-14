import React, { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEyeSlash, FaEye, FaChartLine } from "react-icons/fa";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { auth } from "../../../Firebase/firebase.init";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import useAxios from "../../../Hooks/useAxios";

const Login = () => {
  useDocumentTitle("Login | Market Monitor");
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const axiosInstance = useAxios();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="section-shell flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <span className="loading loading-bars loading-lg text-primary"></span>
          <p className="mt-4 text-sm font-semibold text-base-content/80 sm:text-base">Signing you in...</p>
        </div>
      </div>
    );
  }

  const handleGoogleSignin = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const token = await user.getIdToken();
        localStorage.setItem("access-token", token);

        const userInfo = {
          name: user.displayName,
          email: user.email.toLowerCase(),
          role: "user",
          photoURL: user.photoURL || null,
          phone: null,
          address: null,
          dateOfBirth: null,
          bio: null,
          joinDate: new Date().toISOString(),
          isVerified: true,
          lastLogin: new Date().toISOString(),
        };

        try {
          await axiosInstance.post("/users", userInfo);
        } catch (err) {
          console.log("User might already exist in DB:", err.message);
        }

        try {
          await axiosInstance.patch(`/users/update?email=${user.email}`, {
            lastLogin: new Date().toISOString(),
          });
        } catch (err) {
          console.log("Failed to update last login:", err.message);
        }

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome back, ${user.displayName || "User"}.`,
          timer: 1800,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Google login error:", error);
        let errorMessage = "Google login failed. Please try again.";
        if (error.code === "auth/popup-closed-by-user") errorMessage = "Sign-in was cancelled. Please try again.";
        else if (error.code === "auth/network-request-failed") errorMessage = "Network error. Please check your connection.";
        else if (error.code === "auth/account-exists-with-different-credential") errorMessage = "An account with this email already exists. Please sign in with email and password.";
        Swal.fire({ icon: "error", title: "Google Login Failed", text: errorMessage });
      })
      .finally(() => setLoading(false));
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoading(true);
    sessionStorage.setItem("resetEmail", email);

    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const user = res.user;
        const token = await user.getIdToken();
        localStorage.setItem("access-token", token);
        try {
          await axiosInstance.patch(`/users/update?email=${user.email}`, {
            lastLogin: new Date().toISOString(),
          });
        } catch (err) {
          console.log("Failed to update last login:", err.message);
        }
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome back, ${user.displayName || "User"}.`,
          timer: 1800,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Email login error:", error);
        let errorMessage = "Login failed. Please check your credentials.";
        if (error.code === "auth/user-not-found") errorMessage = "No account found with this email. Please register first.";
        else if (error.code === "auth/wrong-password") errorMessage = "Incorrect password. Please try again.";
        else if (error.code === "auth/invalid-email") errorMessage = "Invalid email address.";
        else if (error.code === "auth/user-disabled") errorMessage = "This account has been disabled. Please contact support.";
        else if (error.code === "auth/too-many-requests") errorMessage = "Too many failed attempts. Please try again later.";
        Swal.fire({ icon: "error", title: "Login Failed", text: errorMessage, timer: 3000 });
        setLoading(false);
      });
  };

  return (
    <motion.section
      className="section-shell flex min-h-[calc(100vh-6rem)] items-center justify-center py-8 sm:py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-base-300/60 bg-base-200/40 shadow-xl md:grid-cols-2"
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className="hidden bg-cover bg-center md:block"
          style={{
            backgroundImage:
              "url(https://static.vecteezy.com/system/resources/previews/005/879/539/non_2x/cloud-computing-modern-flat-concept-for-web-banner-design-man-enters-password-and-login-to-access-cloud-storage-for-uploading-and-processing-files-illustration-with-isolated-people-scene-free-vector.jpg)",
            minHeight: "100%",
          }}
        />

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="mb-6 text-center md:text-left">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:text-sm">
              <FaChartLine /> Market Monitor Access
            </div>
            <h1 className="text-3xl font-extrabold text-base-content sm:text-4xl">Welcome Back</h1>
            <p className="mt-2 text-sm text-base-content/70 sm:text-base">
              Sign in to access market data, dashboards, and role-based tools.
            </p>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4 sm:space-y-5">
            <div className="form-control">
              <label className="label font-semibold">Email</label>
              <input type="email" name="email" className="input input-bordered w-full" placeholder="Enter your email" required />
            </div>

            <div className="form-control">
              <label className="label font-semibold">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input input-bordered w-full pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/70 hover:text-base-content"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="mt-1 text-right">
                <Link to="/forgot-password" className="link link-primary text-sm">Forgot password?</Link>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full">Login</button>

            <div className="divider text-xs sm:text-sm">OR</div>

            <button type="button" onClick={handleGoogleSignin} className="btn btn-outline w-full gap-3">
              <FcGoogle size={20} /> Continue with Google
            </button>

            <p className="pt-1 text-center text-sm text-base-content/70">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="link link-primary font-semibold">Register</Link>
            </p>
          </form>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Login;
