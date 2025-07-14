import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaRocket, FaShieldAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaStar className="text-3xl text-primary" />,
    title: "Top Rated Products",
    desc: "Only the best and highest-rated products make it to our front page."
  },
  {
    icon: <FaRocket className="text-3xl text-secondary" />,
    title: "Fast Delivery",
    desc: "We ensure quick, safe, and reliable product delivery to your doorstep."
  },
  {
    icon: <FaShieldAlt className="text-3xl text-accent" />,
    title: "Secure Payments",
    desc: "All transactions are encrypted and backed by Stripe’s security."
  }
];

const FeaturedSection = () => {
  return (
    <div className=""><div className="  py-16 px-4 max-w-6xl mx-auto">
      <motion.h2
        className="text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
       🤗 Why Choose Us?
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((item, index) => (
          <motion.div
            key={index}
            className="bg-base-200 p-6 rounded-xl shadow-primary text-center shadow-md hover:shadow-lg transition"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h1 className="justify-center flex">{item.icon}</h1>
            <h3 className="text-xl font-semibold mt-4 mb-2">{item.title}</h3>
            <p className="text-secondary text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div></div>
    
  );
};

export default FeaturedSection;
