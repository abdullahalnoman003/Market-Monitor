import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FaUserShield, 
  FaBoxOpen, 
  FaBullhorn, 
  FaClipboardList, 
  FaGift, 
  FaUsers, 
  FaShoppingCart, 
  FaDollarSign, 
  FaEye,
  FaCalendarAlt
} from "react-icons/fa";
import CountUp from "react-countup";
import Lottie from "lottie-react";
import adminLottie from "../../Animation/AdminAnimation.json";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Authentication/Context/AuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxios from "../../../Hooks/useAxios";

const AdminWelcome = () => {
  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  
  // State for dynamic stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeVendors: 0,
    pendingApprovals: 0,
    totalViews: 15420,
    monthlyGrowth: 12.5
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        // Fetch all data simultaneously
        const [ordersResponse, usersResponse, productsResponse] = await Promise.all([
          axiosSecure.get("/admin/order").catch(err => {
            console.error('Orders API Error:', err);
            return { data: [] };
          }),
          axiosSecure.get("/users").catch(err => {
            console.error('Users API Error:', err);
            return { data: [] };
          }),
          axiosInstance.get("/all-products/v1").catch(err => {
            console.error('Products API Error:', err);
            return { data: [] };
          })
        ]);
        // Process users data
        const usersData = Array.isArray(usersResponse.data) ? usersResponse.data : [];
        const totalUsers = usersData.length;
        const activeVendors = usersData.filter(user => user.role === 'vendor').length;
        
        // Process products data - handle different response structures
        let productsData = [];
        if (Array.isArray(productsResponse.data)) {
          productsData = productsResponse.data;
        } else if (productsResponse.data && Array.isArray(productsResponse.data.products)) {
          productsData = productsResponse.data.products;
        } else if (productsResponse.data && typeof productsResponse.data === 'object') {
          // If it's an object
          productsData = productsResponse.data.data || productsResponse.data.result || [];
        }
        
        const totalProducts = Array.isArray(productsData) ? productsData.length : 0;
        const pendingApprovals = Array.isArray(productsData) ? 
          productsData.filter(product => 
            product.status === 'pending' || !product.approved || product.approval === false
          ).length : 0;
        // Process orders data
        const ordersData = Array.isArray(ordersResponse.data) ? ordersResponse.data : [];
        const totalOrders = ordersData.length;  
        setStats({
          totalUsers,
          totalProducts,
          totalOrders,
          activeVendors,
          pendingApprovals,
          totalViews: 15420, // Keep static for now as we don't have this API
          monthlyGrowth: 12.5 // Keep static for now
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        // Keep default values on error
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [axiosSecure, axiosInstance]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-primary/20"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-center lg:text-left">
              <motion.h1
                className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                Welcome back, {user?.displayName || 'Admin'}!
              </motion.h1>
              <p className="text-lg text-base-content/70 max-w-md">
                Here's what's happening with your marketplace today. Monitor your platform's performance and growth.
              </p>
              <div className="flex items-center gap-2 mt-3 justify-center lg:justify-start">
                <FaCalendarAlt className="text-primary" />
                <span className="text-sm text-base-content/60">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>

            <div className="w-full lg:w-64 flex justify-center">
              <Lottie animationData={adminLottie} loop={true} className="max-w-xs" />
            </div>
          </div>
        </motion.div>

        {/* Stats Overview Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Total Users */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="bg-gradient-to-br from-blue-500/10 to-blue-600/20 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-blue-500/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Users</p>
                <p className="text-2xl lg:text-3xl font-bold text-blue-700">
                  {loading ? (
                    <span className="loading loading-dots loading-md"></span>
                  ) : (
                    <CountUp end={stats.totalUsers} duration={2} />
                  )}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-green-500 text-xs font-medium">
                    {loading ? '...' : '+12% this month'}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <FaUsers className="text-2xl text-blue-600" />
              </div>
            </div>
          </motion.div>

          {/* Total Products */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="bg-gradient-to-br from-green-500/10 to-green-600/20 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-green-500/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Total Products</p>
                <p className="text-2xl lg:text-3xl font-bold text-green-700">
                  {loading ? (
                    <span className="loading loading-dots loading-md"></span>
                  ) : (
                    <CountUp end={stats.totalProducts} duration={2} />
                  )}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-green-500 text-xs font-medium">
                    {loading ? '...' : '+8% this month'}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <FaBoxOpen className="text-2xl text-green-600" />
              </div>
            </div>
          </motion.div>

          {/* Total Orders */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="bg-gradient-to-br from-purple-500/10 to-purple-600/20 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-purple-500/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Total Orders</p>
                <p className="text-2xl lg:text-3xl font-bold text-purple-700">
                  {loading ? (
                    <span className="loading loading-dots loading-md"></span>
                  ) : (
                    <CountUp end={stats.totalOrders} duration={2} />
                  )}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-green-500 text-xs font-medium">
                    {loading ? '...' : '+15% this month'}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <FaShoppingCart className="text-2xl text-purple-600" />
              </div>
            </div>
          </motion.div>

          {/* Total Revenue */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="bg-gradient-to-br from-orange-500/10 to-orange-600/20 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-orange-500/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">Total Revenue</p>
                <p className="text-2xl lg:text-3xl font-bold text-orange-700">
                  {loading ? (
                    <span className="loading loading-dots loading-md"></span>
                  ) : (
                    <>$<CountUp end={stats.totalRevenue} duration={2} separator="," /></>
                  )}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-green-500 text-xs font-medium">
                    {loading ? '...' : `+${stats.monthlyGrowth}% this month`}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <FaDollarSign className="text-2xl text-orange-600" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        

        {/* Quick Actions Panel */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.7 } } }}
        >
          {/* Manage Users */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="bg-gradient-to-br from-blue-500/10 to-blue-600/20 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-blue-500/20 hover:shadow-xl transition-all duration-300"
          >
            <FaUserShield className="text-2xl text-blue-600 mb-3" />
            <h3 className="font-semibold text-blue-700 mb-2">Manage Users</h3>
            <p className="text-xs text-blue-600/80 mb-3">Control user accounts</p>
            <Link to="/dashboard/admin/all-users" className="btn btn-sm btn-outline btn-primary w-full">
              View Users
            </Link>
          </motion.div>

          {/* Approve Products */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="bg-gradient-to-br from-green-500/10 to-green-600/20 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-green-500/20 hover:shadow-xl transition-all duration-300"
          >
            <FaBoxOpen className="text-2xl text-green-600 mb-3" />
            <h3 className="font-semibold text-green-700 mb-2">Products</h3>
            <p className="text-xs text-green-600/80 mb-3">Manage product listings</p>
            <Link to="/dashboard/admin/all-products" className="btn btn-sm btn-outline btn-success w-full">
              View Products
            </Link>
          </motion.div>

          {/* Review Advertisements */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="bg-gradient-to-br from-purple-500/10 to-purple-600/20 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-purple-500/20 hover:shadow-xl transition-all duration-300"
          >
            <FaBullhorn className="text-2xl text-purple-600 mb-3" />
            <h3 className="font-semibold text-purple-700 mb-2">Advertisements</h3>
            <p className="text-xs text-purple-600/80 mb-3">Review ad campaigns</p>
            <Link to="/dashboard/admin/all-ads" className="btn btn-sm btn-outline btn-secondary w-full">
              View Ads
            </Link>
          </motion.div>

          {/* View Orders */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="bg-gradient-to-br from-orange-500/10 to-orange-600/20 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-orange-500/20 hover:shadow-xl transition-all duration-300"
          >
            <FaClipboardList className="text-2xl text-orange-600 mb-3" />
            <h3 className="font-semibold text-orange-700 mb-2">Orders</h3>
            <p className="text-xs text-orange-600/80 mb-3">Track all transactions</p>
            <Link to="/dashboard/admin/all-orders" className="btn btn-sm btn-outline btn-warning w-full">
              View Orders
            </Link>
          </motion.div>

          {/* Create Offers */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="bg-gradient-to-br from-pink-500/10 to-pink-600/20 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-pink-500/20 hover:shadow-xl transition-all duration-300"
          >
            <FaGift className="text-2xl text-pink-600 mb-3" />
            <h3 className="font-semibold text-pink-700 mb-2">Offers</h3>
            <p className="text-xs text-pink-600/80 mb-3">Create promotions</p>
            <Link to="/dashboard/admin/create-offer" className="btn btn-sm btn-outline btn-accent w-full">
              Create Offer
            </Link>
          </motion.div>
        </motion.div>

        {/* Additional Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/20 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-600 text-sm font-medium">Active Vendors</p>
                <p className="text-2xl font-bold text-cyan-700">
                  {loading ? (
                    <span className="loading loading-dots loading-sm"></span>
                  ) : (
                    <CountUp end={stats.activeVendors} duration={2} />
                  )}
                </p>
              </div>
              <FaUserShield className="text-cyan-600 text-xl" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500/10 to-red-600/20 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-red-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">Pending Approvals</p>
                <p className="text-2xl font-bold text-red-700">
                  {loading ? (
                    <span className="loading loading-dots loading-sm"></span>
                  ) : (
                    <CountUp end={stats.pendingApprovals} duration={2} />
                  )}
                </p>
              </div>
              <FaClipboardList className="text-red-600 text-xl" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/20 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-indigo-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-600 text-sm font-medium">Total Views</p>
                <p className="text-2xl font-bold text-indigo-700">
                  <CountUp end={stats.totalViews} duration={2} separator="," />
                </p>
              </div>
              <FaEye className="text-indigo-600 text-xl" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/20 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-teal-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-600 text-sm font-medium">Growth Rate</p>
                <p className="text-2xl font-bold text-teal-700">
                  +<CountUp end={stats.monthlyGrowth} duration={2} decimals={1} />%
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminWelcome;
