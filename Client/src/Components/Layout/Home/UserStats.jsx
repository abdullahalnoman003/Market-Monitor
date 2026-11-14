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

const UserStats = () => {
  return (
    <section className="section-shell py-12 sm:py-14">
      <div className="surface-card px-4 py-10 sm:px-8 lg:px-10">
        <div className="text-center">
          <h2 className="section-title">Platform at a Glance</h2>
          <p className="section-subtitle">
            Key metrics that reflect adoption, marketplace activity, and coverage across the platform.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-2xl border border-base-300/60 bg-base-100/70 p-4 text-center shadow-sm sm:p-6"
              >
                <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-base-200 ${stat.tone}`}>
                  <Icon className="text-xl sm:text-2xl" />
                </div>
                <h3 className="text-2xl font-extrabold text-base-content sm:text-3xl">
                  <CountUp end={stat.value} duration={2.2} separator="," />+
                </h3>
                <p className="mt-1 text-xs font-medium text-base-content/70 sm:text-sm">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UserStats;
