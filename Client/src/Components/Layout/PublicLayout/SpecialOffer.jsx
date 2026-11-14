import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGift, FaStoreAlt } from "react-icons/fa";
import useAxios from "../../../Hooks/useAxios";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";

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
      <div className="section-shell flex min-h-[60vh] items-center justify-center">
        <div className="space-y-3 text-center">
          <span className="loading loading-bars loading-lg text-primary"></span>
          <p className="text-sm font-medium text-base-content/70 sm:text-base">Loading offers...</p>
        </div>
      </div>
    );
  }

  if (!offers.length) {
    return (
      <motion.section
        className="section-shell flex min-h-[70vh] flex-col items-center justify-center text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="surface-card max-w-2xl px-6 py-10 sm:px-10">
          <FaGift className="mx-auto text-5xl text-primary/80" />
          <h1 className="mt-4 text-2xl font-bold text-base-content sm:text-3xl">No Special Offers Available</h1>
          <p className="mt-3 text-sm text-base-content/70 sm:text-base">
            There are no active promotions right now. Please check back later for new offers from vendors and administrators.
          </p>
        </div>
      </motion.section>
    );
  }

  return (
    <section className="section-shell py-10 sm:py-12">
      <div className="text-center">
        <h1 className="section-title">Special Offers</h1>
        <p className="section-subtitle">Curated promotions and featured deals available across the marketplace.</p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {offers.map((offer) => (
          <motion.article
            key={offer._id}
            className="surface-card flex h-full flex-col overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -4 }}
          >
            <img
              src={offer.banner_image}
              alt={offer.offer_title || "Offer banner"}
              className="h-48 w-full object-cover"
              loading="lazy"
            />
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-bold text-base-content sm:text-xl">{offer.offer_title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-base-content/75">{offer.short_description}</p>
              <p className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-primary sm:text-sm">
                <FaStoreAlt />
                Offered by {offer.admin_name || "Admin"}
              </p>
            </div>
          </motion.article>
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
        <span className="rounded-lg border border-base-300/70 bg-base-200/60 px-4 py-2 text-sm font-medium">
          Page {page} of {Math.max(totalPages, 1)}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="btn btn-sm btn-outline btn-primary sm:btn-md"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default SpecialOffer;
