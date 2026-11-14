import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { FaUserPlus } from "react-icons/fa";
import { auth } from "../../../Firebase/firebase.init";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import useAxios from "../../../Hooks/useAxios";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";

const Register = () => {
  useDocumentTitle("Register | Market Monitor");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const axiosInstance = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleImageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    setUploadingImage(true);
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setUploadingImage(false);
      return data.data.url;
    } catch (err) {
      console.error("Image upload error:", err);
      Swal.fire("Image Upload Failed", "Please try again later.", "error");
      setUploadingImage(false);
      return null;
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const { name, email, password, image } = data;

    let photoURL = null;
    if (image && image[0]) {
      photoURL = await handleImageUpload(image[0]);
      if (!photoURL) {
        setLoading(false);
        return;
      }
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const token = await user.getIdToken();
        localStorage.setItem("access-token", token);

        const profileData = { displayName: name };
        if (photoURL) profileData.photoURL = photoURL;

        updateProfile(user, profileData).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email.toLowerCase(),
            role: "user",
            photoURL: photoURL || null,
            phone: null,
            address: null,
            dateOfBirth: null,
            bio: null,
            joinDate: new Date().toISOString(),
            isVerified: false,
            lastLogin: new Date().toISOString(),
          };

          axiosInstance
            .post("/users", userInfo)
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Registration Successful",
                text: `Welcome to Market Monitor, ${user.displayName || name}.`,
                timer: 2200,
                showConfirmButton: false,
              });
              reset();
              setLoading(false);
              navigate("/");
            })
            .catch((err) => {
              console.error("Error saving user to DB:", err);
              Swal.fire({ icon: "error", title: "Registration Failed", text: "Failed to save user information. Please try again." });
              setLoading(false);
            });
        });
      })
      .catch((error) => {
        console.error("Registration error:", error);
        let errorMessage = "Registration failed. Please try again.";
        if (error.code === "auth/email-already-in-use") errorMessage = "This email is already registered. Please use a different email or log in.";
        else if (error.code === "auth/weak-password") errorMessage = "Password is too weak. Please choose a stronger password.";
        else if (error.code === "auth/invalid-email") errorMessage = "Invalid email address. Please enter a valid email.";
        Swal.fire({ icon: "error", title: "Registration Failed", text: errorMessage });
        setLoading(false);
      });
  };

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

        axiosInstance
          .post("/users", userInfo)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Registration Successful",
              text: `Welcome to Market Monitor, ${user.displayName || "User"}.`,
              timer: 2200,
              showConfirmButton: false,
            });
            navigate("/");
          })
          .catch((err) => {
            console.error("Google user DB save failed:", err);
            Swal.fire({
              icon: "success",
              title: "Welcome",
              text: `Successfully signed in with Google, ${user.displayName || "User"}.`,
              timer: 2200,
              showConfirmButton: false,
            });
            navigate("/");
          });
      })
      .catch((error) => {
        console.error("Google sign-in error:", error);
        let errorMessage = "Google sign-in failed. Please try again.";
        if (error.code === "auth/popup-closed-by-user") errorMessage = "Sign-in was cancelled. Please try again.";
        else if (error.code === "auth/network-request-failed") errorMessage = "Network error. Please check your connection and try again.";
        Swal.fire({ icon: "error", title: "Google Sign-in Failed", text: errorMessage });
        setLoading(false);
      });
  };

  if (loading || uploadingImage) {
    return (
      <div className="section-shell flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <span className="loading loading-bars loading-lg text-primary"></span>
          <p className="mt-4 text-sm font-semibold text-base-content/80 sm:text-base">
            {uploadingImage ? "Uploading image..." : "Creating your account..."}
          </p>
        </div>
      </div>
    );
  }

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
            backgroundImage: "url('https://www.leadquizzes.com/wp-content/uploads/2019/06/New-blog-graphic-16.jpg')",
            minHeight: "100%",
          }}
        />

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="mb-6 text-center md:text-left">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:text-sm">
              <FaUserPlus /> Create Account
            </div>
            <h1 className="text-3xl font-extrabold text-base-content sm:text-4xl">Join Market Monitor</h1>
            <p className="mt-2 text-sm text-base-content/70 sm:text-base">
              Register to track prices, compare markets, and access personalized dashboards.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label font-semibold">Full Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="input input-bordered w-full"
                placeholder="Your name"
              />
              {errors.name && <p className="mt-1 text-sm text-error">{errors.name.message}</p>}
            </div>

            <div>
              <label className="label font-semibold">Email</label>
              <input
                type="email"
                placeholder="name@example.com"
                className="input input-bordered w-full"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+\.\S+$/, message: "Please enter a valid email address" },
                })}
              />
              {errors.email && <p className="mt-1 text-sm text-error">{errors.email.message}</p>}
            </div>

            <div>
              <label className="label font-semibold">Password</label>
              <input
                type="password"
                placeholder="Minimum 8 characters"
                className="input input-bordered w-full"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" },
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message: "Include at least 1 number, 1 uppercase, and 1 lowercase letter",
                  },
                })}
              />
              {errors.password && <p className="mt-1 text-sm text-error">{errors.password.message}</p>}
            </div>

            <div>
              <label className="label font-semibold">Profile Image (Optional)</label>
              <input type="file" accept="image/*" {...register("image")} className="file-input file-input-bordered w-full" />
              <p className="mt-1 text-xs text-base-content/60">You can add a profile image now or update it later.</p>
            </div>

            <button type="submit" className="btn btn-primary w-full">Register</button>

            <div className="divider text-xs sm:text-sm">OR</div>

            <button type="button" onClick={handleGoogleSignin} className="btn btn-outline w-full gap-3">
              <FcGoogle size={20} /> Sign Up with Google
            </button>

            <p className="pt-1 text-center text-sm text-base-content/70">
              Already have an account? <Link to="/login" className="link link-primary font-semibold">Login</Link>
            </p>
          </form>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Register;
