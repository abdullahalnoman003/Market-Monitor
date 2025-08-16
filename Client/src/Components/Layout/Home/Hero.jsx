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
    <div className="max-w-[1537px] mx-auto px-4 py-6">
      <div
        className="hero min-h-[600px] rounded-3xl relative overflow-hidden shadow-2xl"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/zC0Cm7Z/1798151-colourful-fresh-fruit-fresh-vegetables-fruit-market.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Enhanced gradient overlay for better readability */}
        <div className="hero-overlay bg-gradient-to-r from-black/70 via-black/50 to-black/30 absolute inset-0 rounded-3xl z-0" />
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"></div>

        <div className="hero-content flex-col lg:flex-row-reverse text-white z-10 px-6 md:px-12 gap-12 w-full items-center min-h-[600px]">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex justify-center items-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl scale-110"></div>
              <Lottie 
                animationData={heroAnimation} 
                loop={true} 
                className="max-w-[400px] w-full h-auto relative z-10 drop-shadow-2xl" 
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 space-y-8 text-center lg:text-left max-w-2xl"
          >
            {/* Main heading with enhanced typography */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="inline-block"
              >
                <span className="bg-primary/20 text-primary-content px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border border-primary/30">
                  🚀 Welcome to the Future of Commerce
                </span>
              </motion.div>
              
              <h1 className="font-bold text-5xl lg:text-6xl xl:text-7xl leading-tight">
                Discover the Future of
                <br />
                <span className="text-secondary text-4xl lg:text-5xl xl:text-6xl block mt-2 min-lg:h-25">
                  <Typewriter
                    words={[
                    "Online Marketplaces 😍",
                    "Smart Shopping 🏪",
                    "Price Tracking 💹",
                    "Vendor Empowerment👷‍♂️",
                    ]}
                    loop
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={2000}
                  />
                </span>
              </h1>
            </div>

            {/* Enhanced description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xl text-gray-200 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Experience the next generation of e-commerce with our all-in-one platform. 
              Buy, sell, and advertise products seamlessly while tracking prices in real-time.
            </motion.p>

            {/* Enhanced CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4"
            >
              <Link to="/all-products" className="group">
                <button className="btn btn-primary btn-lg gap-3 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 bg-gradient-to-r from-primary to-primary-focus">
                  <FaStore className="text-xl group-hover:animate-bounce" /> 
                  Explore Products
                  <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </Link>
              <Link to="/dashboard/vendor/add-advertisement" className="group">
                <button className="btn btn-outline btn-secondary btn-lg gap-3 px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm bg-white/10 border-2 border-secondary hover:bg-secondary hover:border-secondary transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <FaBullhorn className="text-xl group-hover:animate-pulse" /> 
                  Advertise Now
                </button>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 pt-8 text-sm text-gray-300"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>✅ Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>📱 Mobile Friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>⚡ Real-time Updates</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
