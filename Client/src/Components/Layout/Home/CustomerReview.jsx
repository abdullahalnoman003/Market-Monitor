import { useEffect, useState, useMemo, useCallback } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  {
    id: 1,
    name: "Afia Rahman",
    comment:
      "This app is a game-changer! I used to visit three different markets for the best prices. Now, I just check Market Monitor and save so much time and money.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 2,
    name: "Karim Mia (Vendor)",
    comment:
      "As a small vegetable vendor at Karwan Bazar, this platform has helped me reach new customers. Updating my daily prices is so easy.",
    avatar: "https://i.ibb.co/chHBs58J/image.png",
    rating: 5,
  },
  {
    id: 3,
    name: "Ishrat Jahan",
    comment:
      "I was skeptical about ordering fresh produce online, but the quality has been amazing. I can compare prices and see which vendor has the freshest stock.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    rating: 4,
  },
  {
    id: 4,
    name: "Tanvir Hossain",
    comment:
      "The user interface is incredibly simple. I love that I can compare prices for my entire weekly shopping list and then buy directly from the app.",
    avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 5,
    name: "Sadia Islam",
    comment:
      "The price alert feature is my favorite! I set an alert for hilsha fish, and as soon as the price dropped at a nearby market, I got a notification.",
    avatar: "https://i.ibb.co/r25T257z/image.png",
    rating: 5,
  },
];

const CustomerReview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const nextReview = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }, []);

  const prevReview = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, []);

  const goToReview = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(nextReview, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlay, nextReview]);

  const currentReview = useMemo(() => reviews[currentIndex], [currentIndex]);

  const handleMouseEnter = () => setIsAutoPlay(false);
  const handleMouseLeave = () => setIsAutoPlay(true);

  return (
    <section className="py-20 px-4 bg-gradient-to-br">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Real feedback from real people who trust Market Monitor for their daily shopping needs
          </p>
        </div>
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ 
                duration: 0.3, 
                ease: "easeInOut",
                type: "tween"
              }}
              className=" shadow-xl rounded-3xl p-8 md:p-12 border border-primary/50"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <img
                    src={currentReview.avatar}
                    alt={currentReview.name}
                    className="w-20 shadow-primary h-20 rounded-full object-cover border-4 border-primary/20 shadow-sm"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-lg transition-colors duration-200 ${
                          i < currentReview.rating 
                            ? "text-yellow-400" 
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <blockquote className="text-lg md:text-xl text-base-content/80 leading-relaxed mb-4 italic">
                    "{currentReview.comment}"
                  </blockquote>

                  {/* Name */}
                  <cite className="text-xl font-semibold text-primary not-italic">
                    {currentReview.name}
                  </cite>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevReview}
              className="btn btn-circle btn-outline hover:btn-primary transition-all duration-200 hover:scale-105"
              aria-label="Previous review"
            >
              <FaChevronLeft />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToReview(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? "bg-primary scale-125"
                      : "bg-primary/30 hover:bg-primary/50 hover:scale-110"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              className="btn btn-circle btn-outline hover:btn-primary transition-all duration-200 hover:scale-105"
              aria-label="Next review"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReview;
