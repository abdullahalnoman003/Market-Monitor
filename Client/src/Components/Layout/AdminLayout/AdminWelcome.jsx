import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaUserShield, FaBoxOpen, FaBullhorn, FaClipboardList, FaGift } from "react-icons/fa";
import Lottie from "lottie-react";
import adminLottie from "../../Animation/AdminAnimation.json"; // Replace with your actual path
import { useContext } from "react";
import { AuthContext } from "../../Authentication/Context/AuthContext";

const AdminWelcome = () => {
    const {user} = useContext(AuthContext);
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-base-200 rounded-xl shadow-xl p-6 w-full"
    >
      {/* Top Welcome Section */}
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
            You have full control over users, vendors, products, ads, and offers. Use your power wisely!
          </p>
        </div>

        <div className="w-full md:w-64">
          <Lottie animationData={adminLottie} loop={true} />
        </div>
      </div>

      {/* Admin Functional Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 "
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {/* Manage Users */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="bg-base-100 p-5 rounded-xl shadow-md border-l-4 border-primary  shadow-primary"
        >
          <FaUserShield className="text-3xl text-primary mb-2" />
          <h2 className="text-xl font-semibold">Manage Users</h2>
          <p className="text-sm text-gray-500 mb-2">View, control, or remove users.</p>
          <Link to="/dashboard/admin/all-users" className=" btn btn-primary text-sm">Go to Users</Link>
        </motion.div>

        {/* Approve Products */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="bg-base-100 p-5 rounded-xl shadow-md border-l-4 border-secondary shadow-secondary"
        >
          <FaBoxOpen className="text-3xl text-secondary mb-2" />
          <h2 className="text-xl font-semibold">Approve Products</h2>
          <p className="text-sm text-gray-500 mb-2">Accept or reject vendor products.</p>
          <Link to="/dashboard/admin/all-products" className=" btn-secondary btn text-sm">Go to Products</Link>
        </motion.div>

        {/* Review Advertisements */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="bg-base-100 p-5 rounded-xl shadow-md border-l-4 border-accent shadow-accent"
        >
          <FaBullhorn className="text-3xl text-accent mb-2" />
          <h2 className="text-xl font-semibold">Review Ads</h2>
          <p className="text-sm text-gray-500 mb-2">Moderate and publish vendor ads.</p>
          <Link to="/dashboard/admin/all-ads" className=" btn btn-accent text-sm">Go to Ads</Link>
        </motion.div>

        {/* View Orders */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="bg-base-100 p-5 rounded-xl shadow-md border-l-4 border-warning shadow-warning"
        >
          <FaClipboardList className="text-3xl text-warning mb-2" />
          <h2 className="text-xl font-semibold">View Orders</h2>
          <p className="text-sm text-gray-500 mb-2">Track all transactions and sales.</p>
          <Link to="/dashboard/admin/all-orders" className=" btn btn-warning text-sm">Go to Orders</Link>
        </motion.div>

        {/* Create Offers */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="bg-base-100 p-5 rounded-xl shadow-md border-l-4 border-info shadow-info"
        >
          <FaGift className="text-3xl text-info mb-2" />
          <h2 className="text-xl font-semibold">Create Offers</h2>
          <p className="text-sm text-gray-500 mb-2">Launch discounts and coupons.</p>
          <Link to="/dashboard/admin/create-offer" className=" btn btn-info text-sm">Go to Offers</Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AdminWelcome;
