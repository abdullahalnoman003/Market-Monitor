// Hero.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStore, FaBullhorn } from "react-icons/fa";
import Lottie from "lottie-react";
import { Typewriter } from "react-simple-typewriter";
import heroAnimation from "../../Animation/VendorAnimation.json";

const Hero = () => {
  return (
    <div>
      <div
        className="hero min-h-[556px] max-h-screen rounded-2xl relative overflow-hidden"
        style={{
          backgroundImage:
            "url(https://cdn.vox-cdn.com/thumbor/vDMW5aYSrukPibPE_ZtZbp8UEL4=/0x248:2896x1696/fit-in/1200x600/cdn.vox-cdn.com/uploads/chorus_asset/file/19187068/Pike_Place_1_SteFou_.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay bg-black/70 absolute inset-0 rounded-2xl z-0" />

        <div className="hero-content flex-col md:flex-row-reverse text-white z-10 px-4 md:px-12 gap-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <Lottie animationData={heroAnimation} loop={true} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-6 text-center md:text-left"
          >
            <div className="h-40">
            <h1 className=" font-bold mb-5 text-4xl md:text-5xl   text-primary">
              Discover the Future of <br />
              <span className="text-secondary ">
                <Typewriter
                  words={[
                    "Online Marketplaces 😍",
                    "Smart Grocery Shopping 🏪",
                    "Real-Time Price Tracking 💹",
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
