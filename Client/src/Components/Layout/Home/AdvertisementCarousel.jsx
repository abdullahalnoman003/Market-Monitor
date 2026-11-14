import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from "framer-motion";
import { FaBullhorn } from "react-icons/fa";
import useAxios from "../../../Hooks/useAxios";

const AdvertisementCarousel = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance
      .get("/advertisement")
      .then((res) => {
        const approvedAds = (res.data || []).filter((ad) => ad.status === "approved");
        setAds(approvedAds);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [axiosInstance]);

  if (loading) {
    return (
      <section className="section-shell py-14">
        <div className="flex h-40 items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </section>
    );
  }

  return (
    <section className="section-shell py-14 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="section-title">Advertisement Highlights</h2>
        <p className="section-subtitle">Featured promotions from verified vendors across the marketplace.</p>
      </motion.div>

      {ads.length === 0 ? (
        <div className="surface-card mt-10 flex flex-col items-center gap-3 px-6 py-12 text-center">
          <FaBullhorn className="text-4xl text-primary/70" />
          <p className="text-lg font-semibold">No active advertisements at the moment.</p>
          <p className="text-sm text-base-content/70">Please check back soon for new vendor campaigns and offers.</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="surface-card mt-10 overflow-hidden p-2 sm:p-3"
        >
          <Carousel
            showThumbs={false}
            showStatus={false}
            autoPlay
            infiniteLoop
            interval={3500}
            transitionTime={700}
            emulateTouch
            swipeable
            showArrows
            stopOnHover
          >
            {ads.map((ad) => (
              <div key={ad._id} className="overflow-hidden rounded-xl bg-base-100">
                <img
                  src={ad.banner_image}
                  alt={ad.ad_title || "Advertisement banner"}
                  className="h-56 w-full object-cover sm:h-72 lg:h-96"
                  loading="lazy"
                />
                <div className="space-y-2 px-4 py-5 text-center sm:px-8 sm:py-6">
                  <h3 className="text-xl font-bold text-base-content sm:text-2xl">{ad.ad_title}</h3>
                  <p className="mx-auto max-w-3xl text-sm text-base-content/75 sm:text-base">
                    {ad.short_description}
                  </p>
                  <p className="text-sm font-medium text-primary">By {ad.vendor_name || "Vendor"}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </motion.div>
      )}
    </section>
  );
};

export default AdvertisementCarousel;
