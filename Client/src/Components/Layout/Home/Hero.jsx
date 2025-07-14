// Hero.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStore, FaBullhorn } from "react-icons/fa";
import Lottie from "lottie-react";
import { Typewriter } from "react-simple-typewriter";
import heroAnimation from "../../Animation/VendorAnimation.json";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";

const Hero = () => {
  useDocumentTitle("Market Monitor || Home")
  return (
    <div>
      <div
        className="hero min-h-[556px] max-h-screen rounded-2xl relative overflow-hidden"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/zC0Cm7Z/1798151-colourful-fresh-fruit-fresh-vegetables-fruit-market.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay bg-black/50 absolute inset-0 rounded-2xl z-0" />

        <div className="hero-content flex-col md:flex-row-reverse text-white z-10 px-4 md:px-12 gap-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <Lottie animationData={heroAnimation} loop={true} className="max-md:max-w-80" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-6 text-center md:text-left"
          >
            <div className="h-">
            <h1 className=" font-bold mb-5 text-4xl md:text-5xl max-md:text-[28px]">
              Discover the Future of <br />
              <span className="text-secondary text-md max-md:text-[26px] max-lg:text-[24px]">
                <Typewriter
                  words={[
                    "Online Marketplaces 😍",
                    "Smart Shopping 🏪",
                    "Price Tracking 💹",
                    "Vendor Empowerment 👷‍♂️",
                  ]}
                  loop
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </h1>
            </div>
            <p className="text-lg text-gray-300 max-w-md mx-auto md:mx-0">
              Buy, sell, and advertise products — all in one powerful and
              seamless platform for vendors and buyers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link to="/all-products">
                <button className="btn btn-primary gap-2">
                  <FaStore /> Explore Products
                </button>
              </Link>
              <Link to="/dashboard/vendor/add-advertisement">
                <button className="btn btn-outline btn-info gap-2">
                  <FaBullhorn /> Advertise Now
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
