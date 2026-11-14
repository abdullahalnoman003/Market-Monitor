import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBoxOpen } from "react-icons/fa";
import Lottie from "lottie-react";
import Animation from "./ProductNotFound.json";
import useDocumentTitle from "../../Hooks/useDocumentTitle";

const ProductNotFound = () => {
  useDocumentTitle("Product Not Found | Market Monitor");

  return (
    <section className="section-shell flex min-h-[60vh] items-center justify-center py-10">
      <div className="surface-card w-full max-w-3xl px-6 py-10 text-center sm:px-10">
        <Lottie className="mx-auto max-w-xs rounded-3xl sm:max-w-sm" animationData={Animation} loop />
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-warning/30 bg-warning/10 px-4 py-1 text-sm font-medium text-warning">
          <FaBoxOpen /> Product unavailable
        </div>
        <h1 className="mt-4 text-3xl font-extrabold text-base-content sm:text-4xl">Product Not Found</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-base-content/70 sm:text-base">
          The product you are looking for may be removed, unavailable, or does not exist. Try browsing all products or return home.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/all-products" className="btn btn-outline btn-primary rounded-full">Browse Products</Link>
          <Link to="/" className="btn btn-primary gap-2 rounded-full">
            <FaHome /> Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductNotFound;
