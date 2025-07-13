import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaChartLine } from "react-icons/fa";
import Lottie from "lottie-react";
import userLottie from "../../Animation/UserAnimation.json"; // Add your user animation JSON here
import { useContext } from "react";
import { AuthContext } from "../../Authentication/Context/AuthContext";

const UserWelcome = () => {
    const {user} = useContext(AuthContext);


  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-base-200 rounded-xl shadow-xl p-6 w-full"
    >
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <motion.h1
            className="text-4xl font-bold mb-2 text-primary"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            Welcome, {user.displayName}!
          </motion.h1>
          <p className="text-lg text-secondary max-w-md">
            Track your watchlist, manage your orders, and view market trends all in one place.
          </p>
        </div>

        <div className="w-full md:w-64">
          <Lottie animationData={userLottie} loop={true} />
        </div>
      </div>

      {/* User Functional Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-10"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {/* Manage Watchlist */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="bg-base-100 p-5 rounded-xl shadow-md border-l-4 border-primary shadow-primary"
        >
          <FaHeart className="text-3xl text-primary mb-2" />
          <h2 className="text-xl font-semibold">Manage Watchlist</h2>
          <p className="text-sm text-gray-500 mb-2">View and organize your favorite items.</p>
          <Link to="/dashboard/user/manage-watchlist" className="btn btn-primary text-sm">
            Go to Watchlist
          </Link>
        </motion.div>

        {/* My Orders */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="bg-base-100 p-5 rounded-xl shadow-md border-l-4 border-secondary shadow-secondary"
        >
          <FaShoppingCart className="text-3xl text-secondary mb-2" />
          <h2 className="text-xl font-semibold">My Orders</h2>
          <p className="text-sm text-gray-500 mb-2">Check order status and history.</p>
          <Link to="/dashboard/user/orders" className="btn btn-secondary text-sm">
            Go to Orders
          </Link>
        </motion.div>

        {/* View Price Trends */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="bg-base-100 p-5 rounded-xl shadow-md border-l-4 border-accent shadow-accent"
        >
          <FaChartLine className="text-3xl text-accent mb-2" />
          <h2 className="text-xl font-semibold">Price Trends</h2>
          <p className="text-sm text-gray-500 mb-2">Analyze market prices of your products.</p>
          <Link to="/dashboard/user/price-trends" className="btn btn-accent text-sm">
            View Trends
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default UserWelcome;
