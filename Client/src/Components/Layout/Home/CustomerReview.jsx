import { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Afia Rahman",
    role: "Regular Customer",
    comment:
      "Market Monitor helps me compare prices across vendors quickly. I can plan purchases with confidence and save both time and money.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 2,
    name: "Karim Mia",
    role: "Vendor at Karwan Bazar",
    comment:
      "Updating daily prices is straightforward, and the platform makes it easier to reach customers who are actively comparing market rates.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 3,
    name: "Ishrat Jahan",
    role: "Home Cook",
    comment:
      "I rely on the product comparisons and vendor details to choose fresh items. The experience is clear, practical, and reliable.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face",
    rating: 4,
  },
  {
    id: 4,
    name: "Tanvir Hossain",
    role: "Tech Professional",
    comment:
      "The interface is clean and responsive. I can review prices on mobile, shortlist products, and make faster decisions during busy days.",
    avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=120&h=120&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 5,
    name: "Sadia Islam",
    role: "Busy Parent",
    comment:
      "Price visibility and market updates are very helpful for weekly shopping. It brings transparency that was missing before.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
    rating: 5,
  },
];

const CustomerReview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextReview = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setTimeout(() => setIsTransitioning(false), 250);
  }, [isTransitioning]);

  const prevReview = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setTimeout(() => setIsTransitioning(false), 250);
  }, [isTransitioning]);

  const goToReview = useCallback(
    (index) => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 250);
    },
    [currentIndex, isTransitioning]
  );

  useEffect(() => {
    if (!isAutoPlay || isTransitioning) return;
    const interval = setInterval(() => {
      if (!isTransitioning) nextReview();
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay, nextReview, isTransitioning]);

  const currentReview = useMemo(() => reviews[currentIndex] || reviews[0], [currentIndex]);

  return (
    <section className="section-shell py-14 sm:py-16">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          <span className="text-base-content">Customer </span>
          <span className="text-secondary">Testimonials</span>
        </h2>
        <p className="section-subtitle">
          Feedback from customers and vendors using Market Monitor to track prices and improve decisions.
        </p>
      </motion.div>

      <motion.div
        className="surface-card relative mt-10 overflow-hidden"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        <div className="absolute right-4 top-4 text-primary/20 sm:right-6 sm:top-6">
          <FaQuoteLeft className="text-3xl sm:text-4xl" />
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-start lg:text-left">
            <div className="relative flex-shrink-0">
              <img
                src={currentReview.avatar}
                alt={currentReview.name}
                className="h-20 w-20 rounded-full border-2 border-primary/30 object-cover shadow-sm sm:h-24 sm:w-24"
                loading="lazy"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    currentReview.name
                  )}&background=random&color=fff&size=120`;
                }}
              />
            </div>

            <div className="flex-1">
              <div className="mb-4 flex justify-center gap-1 lg:justify-start">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < currentReview.rating ? "text-warning" : "text-base-content/25"}
                  />
                ))}
              </div>

              <blockquote className="text-base leading-relaxed text-base-content/85 sm:text-lg">
                "{currentReview.comment}"
              </blockquote>

              <div className="mt-5">
                <p className="text-lg font-bold text-primary">{currentReview.name}</p>
                <p className="text-sm text-base-content/60">{currentReview.role}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-base-300 px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={prevReview}
            disabled={isTransitioning}
            className="btn btn-circle btn-sm btn-outline sm:btn-md"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft />
          </button>

          <div className="flex flex-wrap justify-center gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToReview(index)}
                disabled={isTransitioning}
                className={`h-2.5 rounded-full transition-all ${
                  index === currentIndex ? "w-7 bg-primary" : "w-2.5 bg-base-content/25 hover:bg-base-content/40"
                }`}
                aria-label={`Show testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextReview}
            disabled={isTransitioning}
            className="btn btn-circle btn-sm btn-outline sm:btn-md"
            aria-label="Next testimonial"
          >
            <FaChevronRight />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default CustomerReview;
