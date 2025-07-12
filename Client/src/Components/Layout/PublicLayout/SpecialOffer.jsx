import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxios from "../../../Hooks/useAxios";

const SpecialOffer = () => {
    const axiosInstance = useAxios();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axiosInstance.get("/special");
        setOffers(res.data || []);
      } catch (error) {
        console.error("Failed to fetch special offers:", error);
      }
    };

    fetchOffers();
  }, []);

  if (!offers.length) {
    return (
      <div className="min-h-[300px] flex justify-center items-center text-primary text-lg">
        No special offers available right now...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        🎁 Special Offers Just For You
      </h2>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer, index) => (
          <motion.div
            key={offer._id}
            className="bg-base-200 shadow-primary  rounded-2xl shadow-md overflow-hidden flex flex-col flex-grow"
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
            style={{ willChange: "transform" }} // helps browser optimize
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
                <h3 className="text-xl font-semibold text-primary">
                  {offer.offer_title}
                </h3>
                <p className="text-sm text-base-content opacity-80">
                  {offer.short_description}
                </p>
              </div>
              <p className="text-xs text-gray-400 mt-auto">
                Offered by:{" "}
                <span className="font-medium">{offer.admin_name}</span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffer;
