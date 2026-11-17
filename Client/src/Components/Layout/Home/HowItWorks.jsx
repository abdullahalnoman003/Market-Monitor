import { motion } from "framer-motion";
import { FaSearchDollar, FaStoreAlt, FaChartPie } from "react-icons/fa";

const steps = [
  {
    icon: FaSearchDollar,
    title: "Compare Market Prices",
    desc: "Track daily price updates across vendors and markets to make informed purchasing decisions.",
  },
  {
    icon: FaStoreAlt,
    title: "Connect Buyers & Vendors",
    desc: "Customers discover products efficiently while vendors present listings, offers, and advertisements.",
  },
  {
    icon: FaChartPie,
    title: "Manage with Insights",
    desc: "Role-based dashboards provide visibility into orders, products, analytics, and operational workflows.",
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

const HowItWorks = () => {
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
          <span className="text-base-content">How </span>
          <span className="text-primary">Market Monitor</span>
          <span className="text-secondary"> Works</span>
        </h2>
        <p className="section-subtitle">
          A streamlined workflow for price transparency, vendor visibility, and data-driven market decisions.
        </p>
      </motion.div>

      <motion.div
        className="mt-10 grid gap-6 md:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              variants={item}
              whileHover={{ y: -3 }}
              transition={{ type: "tween", duration: 0.2 }}
              className="surface-card p-6 text-center sm:p-8"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-base-content sm:text-xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-base-content/70 sm:text-base">{step.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default HowItWorks;
