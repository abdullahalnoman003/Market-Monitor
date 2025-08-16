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
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Mock data for market trends - in real app, this would come from your API
const trendingProducts = [
  {
    id: 1,
    name: "Rice (Premium)",
    icon: <FaLeaf className="text-green-500" />,
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
    icon: <FaFish className="text-blue-500" />,
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
    icon: <FaAppleAlt className="text-purple-500" />,
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
    icon: <FaAppleAlt className="text-orange-500" />,
    currentPrice: 35,
    previousPrice: 42,
    change: -16.7,
    trend: "down",
    volume: "Very High",
    markets: ["All Major Markets"],
    insight: "Seasonal price drop, great time to buy",
  },
];

const marketInsights = [
  {
    title: "Winter Vegetable Season",
    description:
      "Fresh winter vegetables are now available at competitive prices",
    icon: <FaLeaf className="text-green-600" />,
    trend: "positive",
  },
  {
    title: "Fish Market Update",
    description: "River fish prices stabilizing after monsoon fluctuations",
    icon: <FaFish className="text-blue-600" />,
    trend: "stable",
  },
  {
    title: "Spice Market Alert",
    description: "Imported spice prices expected to rise next week",
    icon: <FaFish className="text-red-600" />,
    trend: "warning",
  },
];

const MarketTrends = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [priceAlerts, setPriceAlerts] = useState(new Set());

  const getTrendIcon = (trend) => {
    if (trend === "up") return <FaArrowUp className="text-red-500" />;
    if (trend === "down") return <FaArrowDown className="text-green-500" />;
    return <FaMinus className="text-gray-500" />;
  };

  const getTrendColor = (trend) => {
    if (trend === "up") return "text-red-500";
    if (trend === "down") return "text-green-500";
    return "text-gray-500";
  };

  const handlePriceAlert = (productId) => {
    const newAlerts = new Set(priceAlerts);
    if (newAlerts.has(productId)) {
      newAlerts.delete(productId);
    } else {
      newAlerts.add(productId);
    }
    setPriceAlerts(newAlerts);
  };

  return (
    <section className="py-16 px-4 ">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
              📈 Live Market Data
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Market Trends & Price Insights
          </h2>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            Stay informed with real-time price movements, market trends, and
            smart insights to make better purchasing decisions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Trending Products */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-base-100 rounded-2xl shadow-lg shadow-primary/10 p-6 border border-primary/10">
              <div className="flex items-center gap-3 mb-6">
                <FaChartLine className="text-2xl text-primary" />
                <h3 className="text-2xl font-bold text-primary">
                  Trending Products
                </h3>
                <span className="bg-secondary/20 text-secondary px-2 py-1 rounded-full text-xs font-semibold">
                  LIVE
                </span>
              </div>

              <div className="space-y-4">
                {trendingProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-base-200/50 rounded-xl p-4 hover:bg-base-200 transition-all duration-300 cursor-pointer"
                    onClick={() =>
                      setSelectedProduct(
                        selectedProduct === product.id ? null : product.id
                      )
                    }
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{product.icon}</div>
                        <div>
                          <h4 className="font-semibold text-lg">
                            {product.name}
                          </h4>
                          <p className="text-sm text-base-content/60">
                            Volume:{" "}
                            <span className="font-medium">
                              {product.volume}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">
                            ৳{product.currentPrice}
                          </span>
                          {getTrendIcon(product.trend)}
                        </div>
                        <div
                          className={`text-sm font-medium ${getTrendColor(
                            product.trend
                          )}`}
                        >
                          {product.change > 0 ? "+" : ""}
                          {product.change.toFixed(1)}%
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePriceAlert(product.id);
                        }}
                        className={`btn btn-circle btn-sm ml-4 ${
                          priceAlerts.has(product.id)
                            ? "btn-primary"
                            : "btn-outline btn-primary"
                        }`}
                      >
                        <FaBell className="text-sm" />
                      </button>
                    </div>

                    {/* Expanded Details */}
                    {selectedProduct === product.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-base-content/10"
                      >
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-base-content/80 mb-2">
                              Available Markets:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {product.markets.map((market, idx) => (
                                <span
                                  key={idx}
                                  className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs"
                                >
                                  {market}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-base-content/80 mb-2">
                              Market Insight:
                            </p>
                            <p className="text-base-content/70 italic">
                              {product.insight}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Market Insights & Alerts */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Market Insights */}
            <div className="bg-base-100 rounded-2xl shadow-lg shadow-primary/10 p-6 border border-primary/10">
              <div className="flex items-center gap-3 mb-6">
                <FaInfoCircle className="text-2xl text-secondary" />
                <h3 className="text-xl font-bold text-secondary">
                  Market Insights
                </h3>
              </div>

              <div className="space-y-4">
                {marketInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-base-200/50 rounded-lg p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-xl mt-1">{insight.icon}</div>
                      <div>
                        <h4 className="font-semibold text-base mb-1">
                          {insight.title}
                        </h4>
                        <p className="text-sm text-base-content/70">
                          {insight.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Want More Detailed Market Analysis?
            </h3>
            <p className="text-base-content/70 mb-6 max-w-2xl mx-auto">
              Access comprehensive price trends, historical data, and predictive
              insights with our advanced market monitoring tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard/user/price-trends"
                className="btn btn-primary btn-lg rounded-full px-8"
              >
                <FaChartLine className="mr-2" />
                View Price Trends
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketTrends;
