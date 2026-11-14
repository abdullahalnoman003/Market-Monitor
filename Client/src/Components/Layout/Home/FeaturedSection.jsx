import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaRocket, FaShieldAlt } from "react-icons/fa";

const features = [
  {
    icon: FaStar,
    title: "Quality-Focused Listings",
    desc: "Verified products and market data help users compare options with confidence.",
  },
  {
    icon: FaRocket,
    title: "Efficient Marketplace Flow",
    desc: "Fast browsing, streamlined actions, and responsive design across devices.",
  },
  {
    icon: FaShieldAlt,
    title: "Secure & Reliable",
    desc: "Protected transactions and structured role-based access support trusted operations.",
  },
];

const FeaturedSection = () => {
  return (
    <section className="section-shell py-14 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="section-title">Why Choose Market Monitor</h2>
        <p className="section-subtitle">A professional platform designed for clarity, performance, and dependable market visibility.</p>
      </motion.div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="surface-card p-6 text-center sm:p-8"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <Icon className="text-xl" />
              </div>
              <h3 className="text-lg font-bold text-base-content sm:text-xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-base-content/70 sm:text-base">{item.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedSection;
