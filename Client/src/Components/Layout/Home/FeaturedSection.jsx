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

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const FeaturedSection = () => {
  return (
    <section className="section-shell py-14 sm:py-16">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          <span className="text-secondary">Why Choose </span>
          <span className="text-primary">Market Monitor</span>
        </h2>
        <p className="section-subtitle">A professional platform designed for clarity, performance, and dependable market visibility.</p>
      </motion.div>

      <motion.div
        className="mt-10 grid gap-6 md:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              variants={item}
              whileHover={{ y: -3 }}
              transition={{ type: "tween", duration: 0.2 }}
              className="surface-card p-6 text-center sm:p-8"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="text-xl" />
              </div>
              <h3 className="text-lg font-bold text-base-content sm:text-xl">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-base-content/70 sm:text-base">{feature.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default FeaturedSection;
