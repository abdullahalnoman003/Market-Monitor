import { motion } from "framer-motion";
import Lottie from "lottie-react";
import warningAnimation from "../Animation/AdminAnimation.json"; // Make sure you have a Lottie JSON file

import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col justify-center items-center  text-center px-4"
    >
      <div className="w-60 h-60 mb-6 ">
        <Lottie animationData={warningAnimation} loop={true} />
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold text-red-500 mb-4 drop-shadow-md">
        ⚠️ Unauthorized Access
      </h1>

      <p className="text-lg md:text-xl mb-8 max-w-md">
        Sorry, you don't have permission to view this page. Please contact your admin if you believe this is a mistake.
      </p>

      <button
        onClick={() => navigate(-1)}
        className="btn btn-warning text-lg shadow-lg hover:scale-105 transition-transform"
      >
        🔙 Go Back
      </button>
    </motion.div>
  );
};

export default Unauthorized;
