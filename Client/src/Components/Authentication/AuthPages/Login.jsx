import React, { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { auth } from "../../../Firebase/firebase.init";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import useAxios from "../../../Hooks/useAxios";

const Login = () => {
  useDocumentTitle("Login | Market Monitor")
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const axiosInstance = useAxios();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Loading Spinner
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-bars loading-lg text-primary"></span>
          <p className="text-xl font-semibold text-primary mt-4">
            Logging in... Please wait.
          </p>
        </div>
      </div>
    );
  }

  // Google Login function
 const handleGoogleSignin = () => {
  setLoading(true);
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const userInfo = {
        name: user.displayName,
        email: user.email.toLowerCase(),
        role: "user",
      };
      axiosInstance.post("/users", userInfo)
        .then(() => {
          Swal.fire(`Login Successful`, `Welcome! ${user.displayName}`, "success");
          navigate(from, { replace: true });
        })
        .catch((err) => {
          console.error("Failed to sync Google user to DB:", err);
          Swal.fire("Login Successful", `Welcome! ${user.displayName}`, "success");
          navigate(from, { replace: true });
        });
    })
    .catch((error) => {
      Swal.fire("Google Login Failed", error.message, "error");
    })
    .finally(() => setLoading(false));
};


  // Email/Password Login function
  const handleEmailLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoading(true);
    sessionStorage.setItem("resetEmail", email);

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: `Welcome! ${res.user.displayName}`,
          background: "primary",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: error.message,
          timer: 2000,
        });
        setLoading(false)
      });
  };

  return (
    <motion.div
      className="min-h-screen flex justify-center items-center px-4 py-12 bg-base-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      data-aos="fade-up"
    >
      <motion.div
        className="grid md:grid-cols-2 shadow-lg shadow-primary rounded-3xl overflow-hidden border border-primary max-w-4xl w-full bg-white dark:bg-base-200"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        {/* Left Side Image */}
        <motion.div
          className="hidden md:block bg-cover bg-center"
          style={{
            backgroundImage: "url(https://static.vecteezy.com/system/resources/previews/005/879/539/non_2x/cloud-computing-modern-flat-concept-for-web-banner-design-man-enters-password-and-login-to-access-cloud-storage-for-uploading-and-processing-files-illustration-with-isolated-people-scene-free-vector.jpg)",
            minHeight: "100%",
          }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        ></motion.div>

        {/* Right Side Form */}
        <motion.div
          className="p-10 w-full"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-extrabold text-center text-primary mb-2">
            📊 Welcome to Market Monitor
          </h1>
          <p className="text-center text-base-content mb-8 text-sm">
            Log in to access real-time market data, vendor tools, and more.
          </p>

          <form onSubmit={handleEmailLogin} className="space-y-5">
            {/* Email */}
            <div className="form-control">
              <label className="label font-semibold">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
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
                  className="absolute right-3 top-3 z-5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="text-right mt-1">
                <Link to="/forgot-password" className="text-blue-600 text-sm">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              className="btn btn-primary w-full text-base-100 font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>

            {/* OR Divider */}
            <div className="divider text-sm">OR</div>

            {/* Google Login */}
            <motion.button
              type="button"
              onClick={handleGoogleSignin}
              className="btn w-full border flex items-center justify-center gap-3 hover:bg-base-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FcGoogle size={22} />
              Continue with Google
            </motion.button>

            {/* Register Prompt */}
            <p className="text-center text-sm mt-3">
              Don’t have an account?
              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                Register
              </Link>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
