import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Lottie from "lottie-react";
import Animation from "./Animation.json";
import useDocumentTitle from "../../Hooks/useDocumentTitle";

const NotFound = () => {
  useDocumentTitle("404 Not Found | Market Monitor");

  return (
    <section className="section-shell flex min-h-[80vh] flex-col items-center justify-center py-12 text-center">
      <div className="surface-card w-full max-w-3xl px-6 py-10 sm:px-10">
        <Lottie className="mx-auto max-w-sm rounded-3xl" animationData={Animation} loop />
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">Error 404</p>
        <h1 className="mt-2 text-4xl font-extrabold text-base-content sm:text-5xl">Page Not Found</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-base-content/70 sm:text-base">
          The page you are looking for may have been moved, removed, or does not exist. Please check the URL or return to the homepage.
        </p>
        <Link to="/" className="btn btn-primary mt-8 gap-2 rounded-full px-6">
          <FaHome /> Go to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
