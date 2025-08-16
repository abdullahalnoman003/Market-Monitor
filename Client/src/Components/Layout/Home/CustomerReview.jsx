import { useEffect, useState, useMemo, useCallback } from "react";
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  {
    id: 1,
    name: "Afia Rahman",
    role: "Regular Customer",
    comment:
      "This app is a game-changer! I used to visit three different markets for the best prices. Now, I just check Market Monitor and save so much time and money.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 2,
    name: "Karim Mia",
    role: "Vendor at Karwan Bazar",
    comment:
      "As a small vegetable vendor at Karwan Bazar, this platform has helped me reach new customers. Updating my daily prices is so easy.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 3,
    name: "Ishrat Jahan",
    role: "Home Cook",
    comment:
      "I was skeptical about ordering fresh produce online, but the quality has been amazing. I can compare prices and see which vendor has the freshest stock.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    rating: 4,
  },
  {
    id: 4,
    name: "Tanvir Hossain",
    role: "Tech Professional",
    comment:
      "The user interface is incredibly simple. I love that I can compare prices for my entire weekly shopping list and then buy directly from the app.",
    avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 5,
    name: "Sadia Islam",
    role: "Busy Parent",
    comment:
      "The price alert feature is my favorite! I set an alert for hilsha fish, and as soon as the price dropped at a nearby market, I got a notification.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
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
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning]);

  const prevReview = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning]);

  const goToReview = useCallback((index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentIndex, isTransitioning]);

  useEffect(() => {
    if (!isAutoPlay || isTransitioning) return;
    
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextReview();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlay, nextReview, isTransitioning]);

  const currentReview = useMemo(() => reviews[currentIndex] || reviews[0], [currentIndex]);

  const handleMouseEnter = useCallback(() => setIsAutoPlay(false), []);
  const handleMouseLeave = useCallback(() => setIsAutoPlay(true), []);

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
              ⭐ Customer Testimonials
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 sm:mb-6">
            What Our Customers Say
          </h2>
          <p className="text-base sm:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed px-4">
            Real feedback from real people who trust Market Monitor for their daily shopping needs
          </p>
        </motion.div>

        {/* Main Review Container */}
        <div 
          className="relative bg-gradient-to-br from-base-200/30 via-base-100/20 to-base-300/30 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-primary/10"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-primary/5 rounded-full -translate-y-8 sm:-translate-y-16 translate-x-8 sm:translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-secondary/5 rounded-full translate-y-8 sm:translate-y-12 -translate-x-8 sm:-translate-x-12"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 sm:w-60 sm:h-60 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.4, 
                ease: "easeInOut"
              }}
              className="relative z-10 p-6 sm:p-8 lg:p-12"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-primary/20">
                <FaQuoteLeft className="text-2xl sm:text-3xl" />
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 pt-8 sm:pt-4">
                {/* Avatar Section */}
                <div className="flex-shrink-0 relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 p-1 shadow-xl">
                    <img
                      src={currentReview.avatar}
                      alt={`${currentReview.name} - Customer Review`}
                      className="w-full h-full rounded-full object-cover border-2 border-base-100 shadow-lg"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentReview.name)}&background=random&color=fff&size=120`;
                      }}
                    />
                  </div>
                  {/* Rating Badge */}
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full px-2 py-1 text-xs font-bold shadow-lg">
                    {currentReview.rating}.0
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 text-center lg:text-left w-full">
                  {/* Stars */}
                  <div className="flex justify-center lg:justify-start gap-1 mb-4 sm:mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-lg sm:text-xl transition-colors duration-200 ${
                          i < currentReview.rating ? "text-yellow-400 drop-shadow-sm" : "text-base-content/30"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <blockquote className="text-base sm:text-lg lg:text-xl text-base-content/90 leading-relaxed mb-4 sm:mb-6 italic font-medium px-4 sm:px-0">
                    "{currentReview.comment}"
                  </blockquote>

                  {/* Name and Role */}
                  <div className="space-y-1">
                    <cite className="text-lg sm:text-xl font-bold text-primary not-italic block">
                      {currentReview.name}
                    </cite>
                    <span className="text-sm sm:text-base text-base-content/60 font-medium">
                      {currentReview.role}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced Navigation */}
        <div className="flex justify-between items-center mt-6 sm:mt-8 px-2">
          <button
            onClick={prevReview}
            disabled={isTransitioning}
            className="btn btn-circle btn-sm sm:btn-md btn-primary shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous review"
          >
            <FaChevronLeft className="text-sm sm:text-lg" />
          </button>

          {/* Enhanced Dots Indicator */}
          <div className="flex gap-2 sm:gap-3">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToReview(index)}
                disabled={isTransitioning}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-6 sm:w-8 h-2 sm:h-3 bg-gradient-to-r from-primary to-secondary shadow-lg"
                    : "w-2 sm:w-3 h-2 sm:h-3 bg-primary/30 hover:bg-primary/50 hover:scale-125"
                } disabled:cursor-not-allowed`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextReview}
            disabled={isTransitioning}
            className="btn btn-circle btn-sm sm:btn-md btn-primary shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next review"
          >
            <FaChevronRight className="text-sm sm:text-lg" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomerReview;
