import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

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

const CustomerReview = () => {
  const [page, setPage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const review = reviews[page];

  return (
    <section className="pt-20 bg-gradient-to-b from-base-100 to-base-200 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-primary mb-10">
          What Our Valued Customers Say 😊
        </h2>

        <motion.div
          key={review.id}
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-base-100 border-2 border-primary/50 shadow-lg rounded-2xl p-6 flex flex-col items-center gap-4"
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
      </div>
    </section>
  );
};

export default CustomerReview;
