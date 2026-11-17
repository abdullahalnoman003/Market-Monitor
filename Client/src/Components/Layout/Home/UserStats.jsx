import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { FaUsers, FaShoppingCart, FaStore, FaMapMarkedAlt } from "react-icons/fa";

const stats = [
  { icon: FaUsers, label: "Active Users", value: 25000, tone: "text-primary" },
  { icon: FaShoppingCart, label: "Orders Placed", value: 10000, tone: "text-secondary" },
  { icon: FaStore, label: "Verified Vendors", value: 500, tone: "text-accent" },
  { icon: FaMapMarkedAlt, label: "Markets Covered", value: 30, tone: "text-info" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const UserStats = () => {
  return (
    <section className="section-shell py-12 sm:py-14">
      <div className="surface-card px-4 py-10 sm:px-8 lg:px-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            <span className="text-base-content">Platform </span>
            <span className="text-info">at a </span>
            <span className="text-primary">Glance</span>
          </h2>
          <p className="section-subtitle">
            Key metrics that reflect adoption, marketplace activity, and coverage across the platform.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={item}
                whileHover={{ y: -2 }}
                transition={{ type: "tween", duration: 0.2 }}
                className="rounded-xl border border-base-300 bg-base-100 p-4 text-center sm:p-6"
              >
                <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-base-200 ${stat.tone}`}>
                  <Icon className="text-xl sm:text-2xl" />
                </div>
                <h3 className="text-2xl font-extrabold text-base-content sm:text-3xl">
                  <CountUp end={stat.value} duration={2.2} separator="," enableScrollSpy scrollSpyOnce />+
                </h3>
                <p className="mt-1 text-xs font-medium text-base-content/70 sm:text-sm">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default UserStats;
