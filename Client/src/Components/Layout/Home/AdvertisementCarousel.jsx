import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useAxios from "../../../Hooks/useAxios";
import { motion } from "framer-motion";

const AdvertisementCarousel = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance
      .get("/advertisement")
      .then((res) => {
        const approvedAds = res.data.filter((ad) => ad.status === "approved");
        setAds(approvedAds);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (ads.length === 0) {
    return (
      <div className="text-center text-base-content opacity-60 py-10">
        No approved advertisements to display.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-6xl mx-auto px-4 py-12"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-6">
        📢 Advertisement Highlights
      </h2>

      <Carousel
        showThumbs={false}
        showStatus={false}
        autoPlay
        infiniteLoop
        interval={4000}
        transitionTime={600}
        emulateTouch
        swipeable
        showArrows={true}
        className="shadow-lg shadow-primary rounded-2xl p-2"
      >
        {ads.map((ad) => (
          <div
            key={ad._id}
            className="rounded-2xl overflow-hidden bg-base-200 shadow-sm m-2 shadow-secondary "
          >
            <img
              src={ad.banner_image}
              alt={ad.ad_title}
              className="w-full h-64 sm:h-80 object-cover"
            />
            <div className="p-4 sm:p-6 text-center">
              <h3 className="text-2xl font-semibold text-secondary">
                {ad.ad_title}
              </h3>
              <p className="text-base text-base-content mt-2">
                {ad.short_description}
              </p>
              <p className="mt-3 text-sm text-gray-500 italic">
                — {ad.vendor_name}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </motion.div>
  );
};

export default AdvertisementCarousel;
