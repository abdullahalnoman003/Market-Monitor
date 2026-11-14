import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaStore, FaTag, FaArrowRight, FaBoxOpen } from "react-icons/fa";
import useAxios from "../../../Hooks/useAxios";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance
      .get("/home-products")
      .then((res) => setProducts(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [axiosInstance]);

  if (loading) {
    return (
      <section className="section-shell py-14">
        <div className="flex h-48 items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </section>
    );
  }

  return (
    <section className="section-shell py-14 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="section-title">Featured Markets & Products</h2>
        <p className="section-subtitle">
          Explore recently tracked market listings with current and previous price points for quick comparison.
        </p>
      </motion.div>

      {products.length === 0 ? (
        <div className="surface-card mt-10 flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
          <FaBoxOpen className="text-4xl text-primary/70" />
          <p className="text-lg font-semibold text-base-content">No market listings available right now.</p>
          <p className="text-sm text-base-content/70">New products and price updates will appear here as vendors publish data.</p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product, idx) => {
            const latest = product.price_per_unit ?? "N/A";
            const previous = product.prices?.[product.prices.length - 1]?.price ?? "N/A";

            return (
              <motion.article
                key={product._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: Math.min(idx * 0.05, 0.3) }}
                className="surface-card group flex h-full flex-col overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.product_image}
                    alt={product.item_name || product.market_name || "Product"}
                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base-300/50 to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-base-content sm:text-xl">
                        {product.market_name || "Market"}
                      </h3>
                      <p className="mt-1 flex items-center gap-2 text-sm text-base-content/70">
                        <FaStore className="text-primary" />
                        {product.item_name || "Product"}
                      </p>
                    </div>
                    <span className="badge badge-primary badge-outline">Featured</span>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-base-content/80">
                    <p className="flex items-center gap-2">
                      <FaCalendarAlt className="text-primary/80" />
                      {product.date ? new Date(product.date).toLocaleDateString() : "Date unavailable"}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaTag className="text-success" />
                      Latest: <span className="font-semibold text-success">৳{latest}/kg</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <FaTag className="text-warning" />
                      Previous: <span className="font-semibold text-warning">৳{previous}/kg</span>
                    </p>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="btn btn-primary btn-sm w-full gap-2 sm:btn-md"
                    >
                      View Details
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ProductSection;
