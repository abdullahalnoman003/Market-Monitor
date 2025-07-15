import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxios from "../../../Hooks/useAxios";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import { FaGift } from "react-icons/fa";
const SpecialOffer = () => {
  useDocumentTitle("Special Offers || Market Monitor");
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
        const res = await axiosInstance.get("/special", {
          params: { page, limit },
        });
        setOffers(res.data.offers || []);
        setTotalPages(res.data.totalPages || 1);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch special offers:", error);
        setLoading(false);
      }
    };

    fetchOffers();
  }, [page]);

  if (loading) {
    return (
      <div className="h-80 w-full min-h-screen flex items-center justify-center rounded-xl mt-8">
        <div className="text-center space-y-3">
          <span className="loading loading-bars loading-lg text-primary"></span>
          <p className="text-xl font-semibold text-primary">Loading Offers...</p>
        </div>
      </div>
    );
  }

  if (!offers.length) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center text-primary space-y-4 px-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <FaGift className="text-6xl animate-bounce drop-shadow-md" />
      <h2 className="text-2xl font-bold">No Special Offers Available</h2>
      <p className="text-center text-base-content opacity-70 max-w-md">
        🎉 Looks like we’re fresh out of offers at the moment. Please check back
        later — something amazing is on the way!
      </p>
    </motion.div>
  );
}
  return (
    <div className="max-w-7xl min-h-screen mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        🎁 Special Offers Just For You
      </h2>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer) => (
          <motion.div
            key={offer._id}
            className="bg-base-200 shadow-primary rounded-2xl shadow-md overflow-hidden flex flex-col flex-grow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover="hover"
            variants={{
              hover: {
                scale: 1.03,
                boxShadow: "0px 8px 20px rgba(0, 200, 0, 0.5)",
                transition: { duration: 0.3, ease: "easeInOut" },
              },
            }}
            style={{ willChange: "transform" }}
          >
            <div className="h-48 w-full overflow-hidden">
              <img
                src={offer.banner_image}
                alt={offer.offer_title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-5 space-y-3 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-xl font-semibold text-primary">{offer.offer_title}</h3>
                <p className="text-sm text-base-content opacity-80">{offer.short_description}</p>
              </div>
              <p className="text-xs text-gray-400 mt-auto">
                Offered by: <span className="font-medium">{offer.admin_name}</span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Controls */}
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
    </div>
  );
};

export default SpecialOffer;
