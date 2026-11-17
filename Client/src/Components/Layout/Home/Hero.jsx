import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStore, FaBullhorn, FaShieldAlt, FaMobileAlt, FaBolt } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";
import Lottie from "lottie-react";
import heroAnimation from "../../Animation/VendorAnimation.json";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";

const Hero = () => {
  useDocumentTitle("Market Monitor | Home");

  return (
    <section className="section-shell py-6 sm:py-8 lg:py-10">
      <motion.div
        className="relative overflow-hidden rounded-3xl border border-base-300/60 shadow-xl"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/zC0Cm7Z/1798151-colourful-fresh-fruit-fresh-vegetables-fruit-market.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-base-100/70" />

        <div className="relative z-10 grid min-h-[34rem] items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-12 lg:py-14">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
            className="order-2 space-y-6 text-center lg:order-1 lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary sm:text-sm"
            >
              <HiOutlineSparkles className="text-base" />
              Smart marketplace insights for buyers and vendors
            </motion.span>

            <div className="space-y-3">
              <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                <span className="text-base-content">Monitor </span>
                <span className="text-primary">Markets</span>
                <span className="text-base-content">,</span>
                <br />
                <span className="text-secondary">Compare </span>
                <span className="text-accent">Prices</span>
                <span className="text-base-content">,</span>
                <br />
                <span className="text-info">Decide </span>
                <span className="text-base-content">with Confidence.</span>
              </h1>
              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-base-content/75 sm:text-base lg:mx-0 lg:text-lg">
                Market Monitor helps customers, vendors, and administrators stay aligned with live pricing,
                product availability, and market trends in one professional platform.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Link to="/all-products" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="btn btn-primary btn-md w-full gap-2 rounded-full px-6 sm:btn-lg sm:w-auto"
                >
                  <FaStore />
                  Explore Products
                </motion.button>
              </Link>
              <Link to="/dashboard/vendor/add-advertisement" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="btn btn-outline btn-secondary btn-md w-full gap-2 rounded-full border-2 px-6 sm:btn-lg sm:w-auto"
                >
                  <FaBullhorn />
                  Advertise Now
                </motion.button>
              </Link>
            </div>

            <div className="grid gap-3 pt-1 text-left sm:grid-cols-3">
              {[
                { icon: FaShieldAlt, text: "Secure payments", color: "text-primary" },
                { icon: FaMobileAlt, text: "Mobile friendly", color: "text-secondary" },
                { icon: FaBolt, text: "Real-time updates", color: "text-accent" },
              ].map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.text}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.2 + i * 0.06 }}
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-2 rounded-xl border border-base-300/70 bg-base-100/85 px-3 py-2 text-xs text-base-content/80 sm:text-sm"
                  >
                    <Icon className={f.color} />
                    {f.text}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 14 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
            className="order-1 flex justify-center lg:order-2"
          >
            <motion.div
              className=" w-full max-w-[25rem] bg-transparent p-3 sm:p-4"
            >
              <Lottie animationData={heroAnimation} loop className="h-auto w-full" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
