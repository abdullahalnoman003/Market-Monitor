import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import useAxios from "../../../Hooks/useAxios";
import ProductNotFound from "../../Error/ProductNotFound";
import { Link } from "react-router-dom";

const LoadingSpinner = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-base">
    <div className="text-center space-y-3">
      <span className="loading loading-bars loading-lg text-primary"></span>
    </div>
  </div>
);
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();
  useDocumentTitle("All Products || Market Monitor");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (sortOrder) params.sort = sortOrder;
      if (startDate) params.start = startDate.toISOString().split("T")[0];
      if (endDate) params.end = endDate.toISOString().split("T")[0];

      const res = await axiosInstance.get("/all-products", { params });
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [sortOrder, startDate, endDate]);

  // Show spinner while loading
  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-6 text-primary">
        🛍️ All Market Products
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center items-center mb-8">
        <div>
          <label className="block font-medium mb-1">📅 Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
            className="input input-bordered"
            placeholderText="Start date"
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">📅 End Date</label>
          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            className="input input-bordered"
            placeholderText="End date"
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">💵 Sort by Price</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="select select-bordered"
          >
            <option value="">Default</option>
            <option value="asc">🔼 Low to High</option>
            <option value="desc">🔽 High to Low</option>
          </select>
        </div>
      </div>

      {/* Show when no products found */}
      {products.length === 0 ? (
        <ProductNotFound />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="card bg-base-100 shadow-primary shadow-md hover:shadow-xl border border-primary-300 transition-all duration-300"
            >
              {/* Product Image */}
              <figure className="p-5">
                <img
                  src={product.product_image}
                  alt={product.item_name}
                  className="rounded-xl h-48 w-full object-cover"
                />
              </figure>

              {/* Product Info */}
              <div className="card-body space-y-2 px-5">
                <h3 className="card-title text-primary font-semibold text-lg">
                  🥦 {product.item_name}
                </h3>

                <p>
                  <b>💰 Price:</b> ৳{product.price_per_unit}
                </p>
                <p>
                  <b>📅 Date:</b> {product.date}
                </p>
                <p>
                  <b>🏪 Market:</b> {product.market_name}
                </p>
                <p>
                  <b>👨‍🌾 Vendor:</b> {product.vendor_name}
                </p>

                {/* 🔘 Details Button */}
                <div className="mt-4">
                  <Link to={`/product/${product._id}`}>
                    <button className="btn btn-sm btn-primary w-full">
                      🔍 View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
