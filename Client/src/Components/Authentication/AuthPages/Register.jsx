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
import { auth } from "../../../Firebase/firebase.init";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import useAxios from "../../../Hooks/useAxios";

const Register = () => {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const axiosInstance = useAxios(); // imoporting axios instance from the axios hook

  // here is the initialization for the   React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleImageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    // image upload into imgbb
    setUploadingImage(true);
    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setUploadingImage(false);
      return data.data.url;
    } catch (err) {
      console.error("Image upload error:", err);
      Swal.fire("Image Upload Failed", "Please try again later", "error");
      setUploadingImage(false);
      return null;
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const { name, email, password, image } = data;

    const photoURL = await handleImageUpload(image[0]);
    if (!photoURL) {
      setLoading(false);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const token = await user.getIdToken();
        localStorage.setItem("access-token", token);
        updateProfile(user, {
          displayName: name,
          photoURL,
        }).then(() => {
          // creating object to store user info, here data means the form data in data the name and thefield name
          const userInfo = {
            name: data.name,
            email: data.email.toLowerCase(),
            role: "user",
          };
          // post send to backend to store the user info
          axiosInstance
            .post("/users", userInfo)
            .then(() => {
              Swal.fire(
                "Registration Successful!",
                `Welcome to Market Monitor ${user.displayName}.`,
                "success"
              );
              reset();
              setLoading(false);
              navigate("/");
            }) // in catch if any error happend then it will send error..
            .catch((err) => {
              console.error("Error saving user to DB:", err);
              Swal.fire(
                "Registration Failed",
                "Failed to save user to DB",
                "error"
              );
              setLoading(false);
            });
        });
      })
      .catch((error) => {
        Swal.fire("Registration Failed", error.message, "error");
        setLoading(false);
      });
  };

  //  Google Sign-In with DB submission, here sending tyhe data to database to store the default is user
  const handleGoogleSignin = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const token = await user.getIdToken();
        localStorage.setItem("access-token", token);
        const userInfo = {
          name: user.displayName,
          email: user.email.toLowerCase(),
          role: "user",
        };
        // sending data to backendd
        axiosInstance
          .post("/users", userInfo)
          .then(() => {
            Swal.fire(
              "Google Registration Successful!",
              `Welcome! to Market Monitor ${user.displayName}`,
              "success"
            );
            navigate("/");
          })
          .catch((err) => {
            console.error("Google user DB save failed:", err);
            Swal.fire(
              "Google Registration Failed",
              "Could not save user info",
              "error"
            );
          });
      })
      .catch((error) => {
        Swal.fire("Google Sign-in Failed", error.message, "error");
      });
  };

  if (loading || uploadingImage) {
    return (
      <div className="h-screen flex justify-center items-center bg-base-200">
        <div className="text-center">
          <span className="loading loading-bars loading-lg text-primary"></span>
          <p className="text-xl font-semibold text-primary mt-4">
            Registering... Please wait.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-base-100">
      <motion.div
        className="grid md:grid-cols-2 shadow-lg shadow-primary rounded-3xl overflow-hidden border border-primary max-w-5xl w-full bg-white dark:bg-base-200 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Side Image */}
        <motion.div
          className="hidden md:block bg-cover bg-center"
          style={{
            backgroundImage: `url('https://www.leadquizzes.com/wp-content/uploads/2019/06/New-blog-graphic-16.jpg')`,
            minHeight: "100%",
          }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        ></motion.div>

        {/* Form Side */}
        <div className="p-10 w-full">
          <h1 className="text-4xl font-extrabold text-center text-primary mb-2">
            📝 Create Your Account
          </h1>
          <p className="text-center text-base-content mb-6 text-sm">
            Register to track prices, connect with vendors, and compare markets.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="label font-semibold">Full Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="input input-bordered w-full input-primary"
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="text-red-600 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                placeholder="someone@example.com"
                className="input input-bordered w-full input-primary"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                placeholder="Minimum 8 characters"
                className="input input-bordered w-full input-primary"
                minLength={8}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least 1 number, 1 uppercase and 1 lowercase letter, and at least 8 characters"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message:
                      "Must contain at least 1 number, 1 uppercase and 1 lowercase letter",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="label font-semibold">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="file-input file-input-bordered w-full file-input-primary"
              />
              {errors.image && (
                <p className="text-red-600 text-sm">{errors.image.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="btn btn-primary w-full text-base-100 font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register
            </motion.button>

            <div className="divider text-sm">OR</div>

            {/* Google Sign-up */}
            <motion.button
              type="button"
              onClick={handleGoogleSignin}
              className="btn w-full border flex items-center justify-center gap-3 hover:bg-base-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FcGoogle size={22} />
              Sign Up with Google
            </motion.button>

            <p className="text-center text-sm mt-3">
              Already have an account?
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
