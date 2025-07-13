import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaPlus, FaBox, FaBullhorn, FaFolderOpen } from "react-icons/fa";
import Lottie from "lottie-react";
import vendorLottie from "../../Animation/VendorAnimation.json"; 
import { useContext } from "react";
import { AuthContext } from "../../Authentication/Context/AuthContext";

const VendorWelcome = () => {
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
            Manage your products, promote your listings, and grow your sales directly from your vendor panel.
          </p>
        </div>

        <div className="w-full md:w-64">
          <Lottie animationData={vendorLottie} loop={true} />
        </div>
      </div>

      {/* Vendor Functional Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-10"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {/* Add Product */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="bg-base-100 p-5 rounded-xl shadow-md border-l-4 border-primary shadow-primary"
        >
          <FaPlus className="text-3xl text-primary mb-2" />
          <h2 className="text-xl font-semibold">Add Product</h2>
          <p className="text-sm text-gray-500 mb-2">Submit new items for review and listing.</p>
          <Link to="/dashboard/vendor/add-product" className="btn btn-primary text-sm">Go to Add Product</Link>
        </motion.div>

        {/* My Products */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="bg-base-100 p-5 rounded-xl shadow-md border-l-4 border-secondary shadow-secondary"
        >
          <FaBox className="text-3xl text-secondary mb-2" />
          <h2 className="text-xl font-semibold">My Products</h2>
          <p className="text-sm text-gray-500 mb-2">Track and manage your product listings.</p>
          <Link to="/dashboard/vendor/my-products" className="btn btn-secondary text-sm">Go to My Products</Link>
        </motion.div>

        {/* Add Advertisement */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="bg-base-100 p-5 rounded-xl shadow-md border-l-4 border-accent shadow-accent"
        >
          <FaBullhorn className="text-3xl text-accent mb-2" />
          <h2 className="text-xl font-semibold">Add Advertisement</h2>
          <p className="text-sm text-gray-500 mb-2">Promote your products to more users.</p>
          <Link to="/dashboard/vendor/add-advertisement" className="btn btn-accent text-sm">Go to Advertisement</Link>
        </motion.div>

        {/* My Advertisements */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="bg-base-100 p-5 rounded-xl shadow-md border-l-4 border-info shadow-info"
        >
          <FaFolderOpen className="text-3xl text-info mb-2" />
          <h2 className="text-xl font-semibold">My Advertisements</h2>
          <p className="text-sm text-gray-500 mb-2">View the status of your submitted ads.</p>
          <Link to="/dashboard/vendor/my-advertisements" className="btn btn-info text-sm">Go to My Ads</Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default VendorWelcome;
