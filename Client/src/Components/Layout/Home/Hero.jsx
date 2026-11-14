// Hero.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStore, FaBullhorn, FaShieldAlt, FaMobileAlt, FaBolt } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";
import Lottie from "lottie-react";
import { Typewriter } from "react-simple-typewriter";
import heroAnimation from "../../Animation/VendorAnimation.json";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";

const Hero = () => {
  useDocumentTitle("Market Monitor | Home");

  return (
    <section className="section-shell py-6 sm:py-8 lg:py-10">
      <div
        className="relative overflow-hidden rounded-3xl border border-base-300/40 shadow-2xl"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/zC0Cm7Z/1798151-colourful-fresh-fruit-fresh-vegetables-fruit-market.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-base-300/95 via-base-300/80 to-base-300/40" />
        <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-8 bottom-8 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />

        <div className="relative z-10 grid min-h-[34rem] items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-12 lg:py-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-2 space-y-6 text-center lg:order-1 lg:text-left"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary-content backdrop-blur-sm sm:text-sm">
              <HiOutlineSparkles className="text-base text-primary" />
              Smart marketplace insights for modern buyers and vendors
            </span>

            <div className="space-y-3">
              <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                Monitor Markets.
                <br />
                <span className="mt-2 block min-h-[3.5rem] text-2xl text-secondary sm:text-3xl lg:min-h-[4.5rem] lg:text-4xl">
                  <Typewriter
                    words={[
                      "Track prices in real time",
                      "Compare trusted vendors",
                      "Discover better deals",
                      "Make informed decisions",
                    ]}
                    loop
                    cursor
                    cursorStyle="|"
                    typeSpeed={65}
                    deleteSpeed={40}
                    delaySpeed={1800}
                  />
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-base-content/80 sm:text-base lg:mx-0 lg:text-lg">
                Market Monitor helps customers, vendors, and administrators stay aligned with live pricing,
                product availability, and market trends in one professional platform.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Link to="/all-products" className="w-full sm:w-auto">
                <button className="btn btn-primary btn-md w-full gap-2 rounded-full px-6 sm:btn-lg sm:w-auto">
                  <FaStore />
                  Explore Products
                </button>
              </Link>
              <Link to="/dashboard/vendor/add-advertisement" className="w-full sm:w-auto">
                <button className="btn btn-outline btn-secondary btn-md w-full gap-2 rounded-full border-2 px-6 backdrop-blur-sm sm:btn-lg sm:w-auto">
                  <FaBullhorn />
                  Advertise Now
                </button>
              </Link>
            </div>

            <div className="grid gap-3 pt-2 text-left sm:grid-cols-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-base-content/80 sm:text-sm">
                <FaShieldAlt className="text-primary" />
                Secure payments
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-base-content/80 sm:text-sm">
                <FaMobileAlt className="text-primary" />
                Mobile friendly
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-base-content/80 sm:text-sm">
                <FaBolt className="text-primary" />
                Real-time updates
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-1 flex justify-center lg:order-2"
          >
            <div className="relative w-full max-w-[26rem]">
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl" />
              <div className="surface-card relative p-3 sm:p-4">
                <Lottie animationData={heroAnimation} loop className="h-auto w-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
