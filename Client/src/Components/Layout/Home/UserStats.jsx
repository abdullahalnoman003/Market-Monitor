import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { FaUsers, FaShoppingCart, FaStore, FaMapMarkedAlt } from "react-icons/fa";

const stats = [
  {
    icon: <FaUsers className="text-4xl text-primary" />,
    label: "Active Users",
    value: 25000,
  },
  {
    icon: <FaShoppingCart className="text-4xl text-secondary" />,
    label: "Orders Placed",
    value: 10000,
  },
  {
    icon: <FaStore className="text-4xl text-accent" />,
    label: "Verified Vendors",
    value: 500,
  },
  {
    icon: <FaMapMarkedAlt className="text-4xl text-info" />,
    label: "Markets Covered",
    value: 30,
  },
];

const UserStats = () => {
  return (
    <div className="bg-gradient-to-b from-base-200 via-base-100 to-base-200 -mb-2">
    <div className="py-12  rounded-2xl mx-4 md:mx-12  ">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-10">
        📊 Our Platform in Numbers
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-12 ">
  {stats.map((stat, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.08 }}
      className="bg-base-100 rounded-xl p-6 text-center transition-all duration-500 ease-in-out shadow-md shadow-primary hover:shadow-xl"
    >
      <div className="mb-4 flex justify-center">{stat.icon}</div>
      <h3 className="text-3xl font-bold ">
        <CountUp end={stat.value} duration={2.5} separator="," />+
      </h3>
      <p className="text-gray-400 mt-1">{stat.label}</p>
    </motion.div>
  ))}
</div>

    </div></div>
    
  );
};

export default UserStats;
