import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaBell,
  FaChartLine,
  FaLeaf,
  FaFish,
  FaAppleAlt,
  FaInfoCircle,
  FaPepperHot,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const trendingProducts = [
  {
    id: 1,
    name: "Rice (Premium)",
    icon: <FaLeaf className="text-success" />,
    currentPrice: 68,
    previousPrice: 72,
    change: -5.6,
    trend: "down",
    volume: "High",
    markets: ["Karwan Bazar", "Farmgate", "New Market"],
    insight: "Price dropped due to new harvest season",
  },
  {
    id: 2,
    name: "Hilsha Fish",
    icon: <FaFish className="text-info" />,
    currentPrice: 1200,
    previousPrice: 1050,
    change: 14.3,
    trend: "up",
    volume: "Medium",
    markets: ["Fish Market", "Karwan Bazar"],
    insight: "High demand during monsoon season",
  },
  {
    id: 3,
    name: "Onion (Local)",
    icon: <FaAppleAlt className="text-secondary" />,
    currentPrice: 45,
    previousPrice: 45,
    change: 0,
    trend: "stable",
    volume: "High",
    markets: ["Karwan Bazar", "Shyambazar", "Farmgate"],
    insight: "Price remains stable with good supply",
  },
  {
    id: 4,
    name: "Potato",
    icon: <FaAppleAlt className="text-warning" />,
    currentPrice: 35,
    previousPrice: 42,
    change: -16.7,
    trend: "down",
    volume: "Very High",
    markets: ["All Major Markets"],
    insight: "Seasonal price drop, favorable time to buy",
  },
];

const marketInsights = [
  {
    title: "Winter Vegetable Season",
    description: "Fresh winter vegetables are entering markets with competitive pricing.",
    icon: <FaLeaf className="text-success" />,
  },
  {
    title: "Fish Market Update",
    description: "River fish prices are stabilizing after recent seasonal fluctuations.",
    icon: <FaFish className="text-info" />,
  },
  {
    title: "Spice Market Alert",
    description: "Imported spice prices may increase next week based on supply signals.",
    icon: <FaPepperHot className="text-warning" />,
  },
];

const MarketTrends = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [priceAlerts, setPriceAlerts] = useState(new Set());

  const getTrendIcon = (trend) => {
    if (trend === "up") return <FaArrowUp className="text-error" />;
    if (trend === "down") return <FaArrowDown className="text-success" />;
    return <FaMinus className="text-base-content/50" />;
  };

  const getTrendColor = (trend) => {
    if (trend === "up") return "text-error";
    if (trend === "down") return "text-success";
    return "text-base-content/60";
  };

  const handlePriceAlert = (productId) => {
    const next = new Set(priceAlerts);
    if (next.has(productId)) next.delete(productId);
    else next.add(productId);
    setPriceAlerts(next);
  };

  return (
    <section className="section-shell py-14 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="section-title">Market Trends & Price Insights</h2>
        <p className="section-subtitle">
          Monitor price movement, volume signals, and actionable insights to support smarter purchasing decisions.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          <div className="surface-card p-4 sm:p-6">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <FaChartLine className="text-xl text-primary" />
              <h3 className="text-xl font-bold text-base-content sm:text-2xl">Trending Products</h3>
              <span className="badge badge-success badge-outline">Live</span>
            </div>

            <div className="space-y-3">
              {trendingProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-xl border border-base-300/60 bg-base-100/60 p-4 transition-colors hover:bg-base-100"
                >
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() => setSelectedProduct(selectedProduct === product.id ? null : product.id)}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-base-200 text-xl">
                          {product.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-base-content">{product.name}</h4>
                          <p className="text-xs text-base-content/60 sm:text-sm">Volume: {product.volume}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:justify-end">
                        <div className="text-left sm:text-right">
                          <div className="flex items-center gap-2 sm:justify-end">
                            <span className="text-xl font-bold">৳{product.currentPrice}</span>
                            {getTrendIcon(product.trend)}
                          </div>
                          <div className={`text-sm font-medium ${getTrendColor(product.trend)}`}>
                            {product.change > 0 ? "+" : ""}
                            {product.change.toFixed(1)}%
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePriceAlert(product.id);
                          }}
                          className={`btn btn-circle btn-sm ${
                            priceAlerts.has(product.id) ? "btn-primary" : "btn-outline btn-primary"
                          }`}
                          aria-label={`Toggle alert for ${product.name}`}
                        >
                          <FaBell className="text-xs" />
                        </button>
                      </div>
                    </div>
                  </button>

                  {selectedProduct === product.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.25 }}
                      className="mt-4 border-t border-base-300/60 pt-4"
                    >
                      <div className="grid gap-4 text-sm sm:grid-cols-2">
                        <div>
                          <p className="mb-2 font-medium text-base-content/80">Available Markets</p>
                          <div className="flex flex-wrap gap-2">
                            {product.markets.map((market) => (
                              <span key={market} className="badge badge-outline badge-primary">
                                {market}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="mb-2 font-medium text-base-content/80">Market Insight</p>
                          <p className="text-base-content/70">{product.insight}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="surface-card p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <FaInfoCircle className="text-xl text-secondary" />
              <h3 className="text-xl font-bold text-base-content">Market Insights</h3>
            </div>
            <div className="space-y-3">
              {marketInsights.map((insight) => (
                <div key={insight.title} className="rounded-xl border border-base-300/60 bg-base-100/60 p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-lg">{insight.icon}</div>
                    <div>
                      <h4 className="font-semibold text-base-content">{insight.title}</h4>
                      <p className="mt-1 text-sm text-base-content/70">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card p-5 sm:p-6">
            <h3 className="text-lg font-bold text-base-content">Detailed Analysis</h3>
            <p className="mt-2 text-sm text-base-content/70">
              View comprehensive trends and historical pricing data in your dashboard.
            </p>
            <Link to="/dashboard/user/price-trends" className="btn btn-primary mt-4 w-full gap-2">
              <FaChartLine />
              View Price Trends
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketTrends;
