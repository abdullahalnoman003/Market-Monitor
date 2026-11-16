import React, { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useAxios from "../../../Hooks/useAxios";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import ProductNotFound from "../../Error/ProductNotFound";
import {
  MdErrorOutline,
  MdCalendarMonth,
  MdSort,
  MdStorefront,
  MdPerson,
  MdAttachMoney,
  MdClear,
} from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { ProductGridSkeleton } from "../../Shared/Skeletons";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const toISODate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const tzOffset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOffset).toISOString().slice(0, 10);
};

const ProductCard = ({ product }) => (
  <motion.article
    variants={item}
    whileHover={{ y: -3 }}
    transition={{ type: "tween", duration: 0.2 }}
    className="surface-card flex h-full flex-col overflow-hidden"
  >
    <figure className="border-b border-base-300 bg-base-200/40 overflow-hidden">
      <img
        src={product.product_image}
        alt={product.item_name || "Product"}
        className="h-48 w-full object-cover"
        loading="lazy"
      />
    </figure>
    <div className="flex flex-1 flex-col p-5">
      <h3 className="text-lg font-semibold text-base-content line-clamp-1">{product.item_name}</h3>
      <div className="mt-3 space-y-2 text-sm text-base-content/75">
        <p className="flex items-center gap-2">
          <MdAttachMoney className="text-success" /> Price: <span className="font-medium text-base-content">৳{product.price_per_unit}</span>
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
      <div className="mt-5 pt-1">
        <Link to={`/product/${product._id}`}>
          <button className="btn btn-primary btn-sm w-full gap-2 sm:btn-md">
            View Details
            <FaArrowRight />
          </button>
        </Link>
      </div>
    </div>
  </motion.article>
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

  const dateError = useMemo(() => {
    if (startDate && endDate && startDate > endDate) {
      return "Start date cannot be after end date.";
    }
    return "";
  }, [startDate, endDate]);

  const effectiveStart = dateError ? null : startDate;
  const effectiveEnd = dateError ? null : endDate;

  const {
    data: { products = [], totalPages = 0 } = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", sortOrder, toISODate(effectiveStart), toISODate(effectiveEnd), page],
    queryFn: async () => {
      const params = { page, limit };
      if (sortOrder) params.sort = sortOrder;
      if (effectiveStart) params.start = toISODate(effectiveStart);
      if (effectiveEnd) params.end = toISODate(effectiveEnd);
      const res = await axiosInstance.get("/all-products/v1", { params });
      return res.data;
    },
  });

  if (isError) {
    return (
      <div className="section-shell flex min-h-[70vh] flex-col items-center justify-center space-y-4 text-center">
        <MdErrorOutline className="text-5xl text-error" />
        <h2 className="text-2xl font-semibold text-base-content">Unable to load products</h2>
        <p className="max-w-md text-sm text-base-content/70 sm:text-base">
          Please check your connection and try again. If the issue persists, verify the backend service is available.
        </p>
        <button onClick={() => window.location.reload()} className="btn btn-primary">
          Reload Page
        </button>
      </div>
    );
  }

  return (
    <section className="section-shell py-8 sm:py-10 lg:py-12">
      <div className="mb-8">
        <h1 className="page-title">All Market Products</h1>
        <p className="mt-2 max-w-3xl text-sm text-base-content/70 sm:text-base">
          Browse approved market listings by date range and price.
        </p>
      </div>

      <div className="surface-card relative z-20 overflow-visible p-4 sm:p-5">
        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-3">
          <div className="flex min-w-0 flex-col gap-1.5">
            <label className="flex h-5 shrink-0 items-center gap-2 text-sm font-medium leading-5 text-base-content/80">
              <MdCalendarMonth className="shrink-0 text-primary" /> <span className="truncate">Start Date</span>
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              maxDate={endDate || undefined}
              isClearable
              showPopperArrow={false}
              className="input input-bordered h-11 w-full min-w-0"
              wrapperClassName="block w-full min-w-0"
              calendarClassName="shadow-lg"
              popperClassName="z-[60]"
              popperPlacement="bottom-start"
              popperProps={{ strategy: "fixed" }}
              placeholderText="Select start date"
              dateFormat="yyyy-MM-dd"
            />
          </div>

          <div className="flex min-w-0 flex-col gap-1.5">
            <label className="flex h-5 shrink-0 items-center gap-2 text-sm font-medium leading-5 text-base-content/80">
              <MdCalendarMonth className="shrink-0 text-primary" /> <span className="truncate">End Date</span>
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || undefined}
              isClearable
              showPopperArrow={false}
              className="input input-bordered h-11 w-full min-w-0"
              wrapperClassName="block w-full min-w-0"
              calendarClassName="shadow-lg"
              popperClassName="z-[60]"
              popperPlacement="bottom-start"
              popperProps={{ strategy: "fixed" }}
              placeholderText="Select end date"
              dateFormat="yyyy-MM-dd"
            />
          </div>

          <div className="flex min-w-0 flex-col gap-1.5">
            <label className="flex h-5 shrink-0 items-center gap-2 text-sm font-medium leading-5 text-base-content/80">
              <MdSort className="shrink-0 text-primary" /> <span className="truncate">Sort by Price</span>
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="select select-bordered h-11 w-full min-w-0"
            >
              <option value="">Default (Newest)</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-base-content/60 sm:text-sm">
            {dateError ? (
              <span className="font-medium text-error">{dateError}</span>
            ) : (
              <span>Filters apply automatically. Choose a valid date range to refine results.</span>
            )}
          </div>
          {(startDate || endDate || sortOrder) && (
            <button
              type="button"
              onClick={() => {
                setStartDate(null);
                setEndDate(null);
                setSortOrder("");
              }}
              className="btn btn-ghost btn-sm gap-2"
            >
              <MdClear /> Clear filters
            </button>
          )}
        </div>
      </div>

      <div className="relative z-0 mt-8">
        {isLoading ? (
          <ProductGridSkeleton count={6} />
        ) : products.length === 0 ? (
          <ProductNotFound />
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </motion.div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="btn btn-sm btn-outline sm:btn-md"
              >
                Previous
              </button>
              <span className="rounded-md border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium">
                Page {page} of {Math.max(totalPages, 1)}
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages || 1))}
                disabled={page === totalPages || totalPages === 0}
                className="btn btn-sm btn-outline sm:btn-md"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AllProducts;
