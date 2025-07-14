import { motion } from "framer-motion";
import { FaSearchDollar, FaStoreAlt, FaTools } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearchDollar className="text-5xl text-green-400" />,
      title: "Compare Market Prices",
      desc: "Explore real-time price updates from different vendors. Make informed buying decisions instantly.",
    },
    {
      icon: <FaStoreAlt className="text-5xl text-blue-400" />,
      title: "Buy & Sell Smartly",
      desc: "Customers buy products easily, while vendors showcase their market offerings in real-time.",
    },
    {
      icon: <FaTools className="text-5xl text-orange-400" />,
      title: "Smart Dashboards",
      desc: "Admins and Vendors manage their orders, products, and insights from one powerful dashboard.",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-primary mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
         ⚒️ How Market Monitor Works ⚙️
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-base-100 rounded-2xl shadow-primary shadow-md border border-primary/10 p-8 hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mb-6 flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-bold text-accent mb-3">{step.title}</h3>
              <p className="text-base text-base-content/80">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
