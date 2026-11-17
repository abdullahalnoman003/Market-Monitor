import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaStore, FaTag, FaArrowRight, FaBoxOpen } from "react-icons/fa";
import useAxios from "../../../Hooks/useAxios";
import { ProductGridSkeleton } from "../../Shared/Skeletons";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

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
      <section className="section-shell py-14 sm:py-16">
        <div className="text-center">
          <h2 className="section-title">Featured Markets & Products</h2>
          <p className="section-subtitle">Loading latest market listings...</p>
        </div>
        <div className="mt-10">
          <ProductGridSkeleton count={6} />
        </div>
      </section>
    );
  }

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
          <span className="text-accent">Featured </span>
          <span className="text-base-content">Markets & </span>
          <span className="text-primary">Products</span>
        </h2>
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
        <motion.div
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {products.map((product) => {
            const latest = product.price_per_unit ?? "N/A";
            const previous = product.prices?.[product.prices.length - 1]?.price ?? "N/A";

            return (
              <motion.article
                key={product._id}
                variants={item}
                whileHover={{ y: -4 }}
                transition={{ type: "tween", duration: 0.2 }}
                className="surface-card flex h-full flex-col overflow-hidden"
              >
                <div className="relative overflow-hidden border-b border-base-300">
                  <img
                    src={product.product_image}
                    alt={product.item_name || product.market_name || "Product"}
                    className="h-52 w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-base-content sm:text-xl">
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
                      Latest: <span className="font-medium text-success">৳{latest}/kg</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <FaTag className="text-warning" />
                      Previous: <span className="font-medium text-warning">৳{previous}/kg</span>
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
        </motion.div>
      )}
    </section>
  );
};

export default ProductSection;
