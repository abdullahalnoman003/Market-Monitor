import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxios from "../../../Hooks/useAxios";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import ProductNotFound from "../../Error/ProductNotFound";
import { motion } from "framer-motion";
import {
  MdErrorOutline,
  MdCalendarMonth,
  MdSort,
  MdSearch,
  MdStorefront,
  MdPerson,
  MdAttachMoney,
} from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";

const LoadingSpinner = () => (
  <div className="section-shell flex min-h-[60vh] items-center justify-center">
    <div className="space-y-3 text-center">
      <span className="loading loading-bars loading-lg text-primary"></span>
      <p className="text-sm font-medium text-base-content/70 sm:text-base">Loading products...</p>
    </div>
  </div>
);

const ProductCard = ({ product }) => (
  <article className="surface-card flex h-full flex-col overflow-hidden">
    <figure className="relative">
      <img
        src={product.product_image}
        alt={product.item_name || "Product"}
        className="h-48 w-full object-cover"
        loading="lazy"
      />
    </figure>
    <div className="flex flex-1 flex-col p-5">
      <h3 className="text-lg font-bold text-base-content">{product.item_name}</h3>
      <div className="mt-3 space-y-2 text-sm text-base-content/75">
        <p className="flex items-center gap-2">
          <MdAttachMoney className="text-success" /> Price: <span className="font-semibold text-base-content">৳{product.price_per_unit}</span>
        </p>
        <p className="flex items-center gap-2">
          <MdCalendarMonth className="text-primary" /> Date: {product.date}
        </p>
        <p className="flex items-center gap-2">
          <MdStorefront className="text-secondary" /> Market: {product.market_name}
        </p>
        <p className="flex items-center gap-2">
          <MdPerson className="text-accent" /> Vendor: {product.vendor_name}
        </p>
      </div>
      <div className="mt-5">
        <Link to={`/product/${product._id}`}>
          <button className="btn btn-primary btn-sm w-full gap-2 sm:btn-md">
            View Details
            <FaArrowRight />
          </button>
        </Link>
      </div>
    </div>
  </article>
);

const AllProducts = () => {
  const axiosInstance = useAxios();
  useDocumentTitle("All Products | Market Monitor");

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

  if (isError) {
    return (
      <motion.div
        className="section-shell flex min-h-[70vh] flex-col items-center justify-center space-y-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <MdErrorOutline className="text-6xl text-error" />
        <h2 className="text-2xl font-semibold text-base-content">Unable to load products</h2>
        <p className="max-w-md text-sm text-base-content/70 sm:text-base">
          Please check your connection and try again. If the issue persists, verify the backend service is available.
        </p>
        <button onClick={() => window.location.reload()} className="btn btn-primary">
          Reload Page
        </button>
      </motion.div>
    );
  }

  return (
    <section className="section-shell py-8 sm:py-10 lg:py-12">
      <div className="text-center">
        <h1 className="section-title">All Market Products</h1>
        <p className="section-subtitle">Browse products by date range and price to compare market listings efficiently.</p>
      </div>

      <div className="surface-card mt-8 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-2 text-sm font-semibold text-base-content/80">
              <MdCalendarMonth className="text-primary" /> Start Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={setStartDate}
              className="input input-bordered w-full"
              placeholderText="Select start date"
              dateFormat="yyyy-MM-dd"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-2 text-sm font-semibold text-base-content/80">
              <MdCalendarMonth className="text-primary" /> End Date
            </label>
            <DatePicker
              selected={endDate}
              onChange={setEndDate}
              className="input input-bordered w-full"
              placeholderText="Select end date"
              dateFormat="yyyy-MM-dd"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-2 text-sm font-semibold text-base-content/80">
              <MdSort className="text-primary" /> Sort by Price
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Default</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-base-content/60 sm:text-sm">
          <MdSearch />
          Filters are applied automatically when changed.
        </div>
      </div>

      {products.length === 0 ? (
        <div className="mt-8">
          <ProductNotFound />
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="btn btn-sm btn-outline btn-primary sm:btn-md"
            >
              Previous
            </button>
            <span className="rounded-lg border border-base-300/70 bg-base-200/60 px-4 py-2 text-sm font-medium text-base-content">
              Page {page} of {Math.max(totalPages, 1)}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages || 1))}
              disabled={page === totalPages || totalPages === 0}
              className="btn btn-sm btn-outline btn-primary sm:btn-md"
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default AllProducts;
