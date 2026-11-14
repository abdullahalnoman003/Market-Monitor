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

const HowItWorks = () => {
  return (
    <section className="section-shell py-14 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="section-title">How Market Monitor Works</h2>
        <p className="section-subtitle">
          A streamlined workflow for price transparency, vendor visibility, and data-driven market decisions.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              viewport={{ once: true }}
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
      </div>
    </section>
  );
};

export default HowItWorks;
