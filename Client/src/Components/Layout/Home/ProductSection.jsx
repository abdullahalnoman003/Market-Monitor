import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import useAxios from "../../../Hooks/useAxios";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance
      .get("/home-products")
      .then((res) => setProducts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-60">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  return (
  <div className="bg-gradient-to-b from-base-200 to-base-100"><div className="max-w-6xl bg-gradient-to-b from-base-200 to-base-100 mx-auto py-14 px-4">
      {/* Section Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="text-4xl font-extrabold text-center text-primary mb-10 tracking-tight"
      >
        🌟 Featured Market Products
      </motion.h2>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, idx) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              delay: idx * 0.1,
            }}
            whileHover={{ y: -4 }}
            className="bg-base-200 rounded-2xl overflow-hidden shadow-md shadow-primary hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Product Image */}
            <img
              src={product.product_image}
              alt={product.market_name}
              className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
            />

            {/* Product Info + Button */}
            <div className="p-5 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-xl font-bold text-secondary mb-1">
                  {product.market_name}
                </h3>
                <p className="text-sm text-gray-500">
                  📅 {new Date(product.date).toLocaleDateString()}
                </p>
                <p className="mt-2 text-base-content">
                  🧺 {product.item_name} —{" "}
                  <span className="font-semibold text-green-600">
                    ৳
                    {product.prices?.[product.prices.length - 1]?.price ?? "N/A"}
                    /kg
                  </span>
                </p>
              </div>

              {/* View Details Button */}
              <div className="mt-6">
                <button
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="btn btn-primary w-full"
                >
                  🔍 View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div></div>
    
  );
};

export default ProductSection;
