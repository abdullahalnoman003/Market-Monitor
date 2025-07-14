import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxios from "../../../Hooks/useAxios";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import ProductNotFound from "../../Error/ProductNotFound";

const LoadingSpinner = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-base">
    <div className="text-center space-y-3">
      <span className="loading loading-bars loading-lg text-primary"></span>
      <p className="text-xl font-semibold">Please Wait...</p>
    </div>
  </div>
);

const ProductCard = ({ product }) => (
  <div className="card bg-base-100 shadow-primary shadow-md hover:shadow-xl border border-primary-300 transition-all duration-300">
    <figure className="p-5">
      <img
        src={product.product_image}
        alt={product.item_name}
        className="rounded-xl h-48 w-full object-cover"
      />
    </figure>
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
      <div className="mt-4">
        <Link to={`/product/${product._id}`}>
          <button className="btn btn-sm btn-primary w-full">
            🔍 View Details
          </button>
        </Link>
      </div>
    </div>
  </div>
);

const AllProducts = () => {
  const axiosInstance = useAxios();
  useDocumentTitle("All Products || Market Monitor");

  const [sortOrder, setSortOrder] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 6;
  useEffect(() => {
    setPage(1);
  }, [startDate, endDate, sortOrder]);

  const {
    data: { products = [], totalPages = 0 } = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", sortOrder, startDate, endDate, page],
    queryFn: async () => {
      const params = { page, limit };
      if (sortOrder) params.sort = sortOrder;
      if (startDate) params.start = startDate.toISOString();
      if (endDate) {
        const adjustedEnd = new Date(endDate);
        adjustedEnd.setHours(23, 59, 59, 999);
        params.end = adjustedEnd.toISOString();
      }
      const res = await axiosInstance.get("/all-products/v1", { params });
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">
        ❌ Failed to load products
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-6 text-primary">
        🛍️ All Market Products
      </h2>

      {/* Filters */}
      <div className="bg-base-200 rounded-xl p-4 md:p-6 shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="font-semibold text-sm mb-1">📅 Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={setStartDate}
              className="input input-bordered w-full"
              placeholderText="Start date"
              dateFormat="yyyy-MM-dd"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-sm mb-1">📅 End Date</label>
            <DatePicker
              selected={endDate}
              onChange={setEndDate}
              className="input input-bordered w-full"
              placeholderText="End date"
              dateFormat="yyyy-MM-dd"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-sm mb-1">
              💵 Sort by Price
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Default</option>
              <option value="asc">🔼 Low to High</option>
              <option value="desc">🔽 High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Show products or fallback */}
      {products.length === 0 ? (
        <ProductNotFound />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex justify-center gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="btn btn-sm btn-outline btn-primary"
        >
          Prev
        </button>
        <span className="text-primary font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="btn btn-sm btn-outline btn-primary"
        >
          Next
        </button>
      </div>
        </>
      )}
    </div>
  );
};

export default AllProducts;
