import React, { useEffect, useState } from "react";
import { FaGift, FaStoreAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import useAxios from "../../../Hooks/useAxios";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import { ProductGridSkeleton } from "../../Shared/Skeletons";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const SpecialOffer = () => {
  useDocumentTitle("Special Offers | Market Monitor");
  const axiosInstance = useAxios();

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/special", { params: { page, limit } });
        setOffers(res.data.offers || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch special offers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [page, axiosInstance]);

  if (loading) {
    return (
      <section className="section-shell py-10 sm:py-12">
        <div className="text-center">
          <h1 className="section-title">Special Offers</h1>
          <p className="section-subtitle">Loading curated promotions...</p>
        </div>
        <div className="mt-10">
          <ProductGridSkeleton count={6} />
        </div>
      </section>
    );
  }

  if (!offers.length) {
    return (
      <section className="section-shell flex min-h-[70vh] flex-col items-center justify-center text-center">
        <div className="surface-card max-w-2xl px-6 py-10 sm:px-10">
          <FaGift className="mx-auto text-5xl text-primary/80" />
          <h1 className="mt-4 text-2xl font-bold text-base-content sm:text-3xl">No Special Offers Available</h1>
          <p className="mt-3 text-sm text-base-content/70 sm:text-base">
            There are no active promotions right now. Please check back later for new offers from vendors and administrators.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-shell py-10 sm:py-12">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          <span className="text-accent">Special </span>
          <span className="text-primary">Offers</span>
        </h1>
        <p className="section-subtitle">Curated promotions and featured deals available across the marketplace.</p>
      </motion.div>

      <motion.div
        className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {offers.map((offer) => (
          <motion.article
            key={offer._id}
            variants={item}
            whileHover={{ y: -3 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="surface-card flex h-full flex-col overflow-hidden"
          >
            <img
              src={offer.banner_image}
              alt={offer.offer_title || "Offer banner"}
              className="h-48 w-full object-cover"
              loading="lazy"
            />
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-semibold text-base-content sm:text-xl line-clamp-1">{offer.offer_title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-base-content/75">{offer.short_description}</p>
              <p className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-primary sm:text-sm">
                <FaStoreAlt />
                Offered by {offer.admin_name || "Admin"}
              </p>
            </div>
          </motion.article>
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
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="btn btn-sm btn-outline sm:btn-md"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default SpecialOffer;
