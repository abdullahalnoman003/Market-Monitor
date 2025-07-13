import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  {
    id: 1,
    name: "Afia Rahman",
    comment:
      "This app is a game-changer! I used to visit three different markets for the best prices. Now, I just check Bazar Buddy and save so much time and money.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
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
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    rating: 4,
  },
  {
    id: 4,
    name: "Tanvir Hossain",
    comment:
      "The user interface is incredibly simple. I love that I can compare prices for my entire weekly shopping list and then buy directly from the app.",
    avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a",
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

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
    position: "absolute",
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "absolute",
  },
  exit: (direction) => ({
    x: direction < 0 ? 200 : -200,
    opacity: 0,
    position: "absolute",
  }),
};

const CustomerReview = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    setPage(([prevPage]) => [
      (prevPage + newDirection + reviews.length) % reviews.length,
      newDirection,
    ]);
  };

  useEffect(() => {
    const interval = setInterval(() => paginate(1), 5000);
    return () => clearInterval(interval);
  }, []);

  const review = reviews[page];

  return (
    <section className="py-20 bg-gradient-to-b from-base-100 to-base-200 -mb-5 px-4">
      <div className="container mx-auto text-center ">
        <h2 className="text-4xl font-extrabold text-primary mb-12">
          What Our Valued Customers Say 😊
        </h2>

        <div className="relative w-full max-w-xl h-[350px] mx-auto  overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={review.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full mb-4 h-full bg-base-100 rounded-2xl p-6   border-2 border-primary/50  shadow-primary flex flex-col items-center justify-center gap-4"
            >
              <img
                src={review.avatar}
                alt={review.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary"
              />
              <h3 className="text-lg font-bold text-accent">{review.name}</h3>
              <div className="flex gap-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < review.rating ? "text-yellow-400" : "text-gray-400"}
                  />
                ))}
              </div>
              <p className="text-base-content/80 italic max-w-md">
                “{review.comment}”
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CustomerReview;
