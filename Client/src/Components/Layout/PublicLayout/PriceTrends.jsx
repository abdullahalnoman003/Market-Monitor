import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import useAxios from "../../../Hooks/useAxios";
import { AuthContext } from "../../Authentication/Context/AuthContext";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
  import { motion } from "framer-motion";
import { FaBoxOpen } from "react-icons/fa";

const PriceTrends = () => {
  useDocumentTitle("Price Trends | Dashboard")
  const {user} = useContext(AuthContext);
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductData, setSelectedProductData] = useState(null);
  const userEmail = user.email

  //  Fetching user's watchlist
  const { data: watchlist = [], isLoading } = useQuery({
    queryKey: ["watchlist", userEmail],
    enabled: !!userEmail,
    queryFn: async () => {
      const res = await axiosSecure.get(`/watchlist?userEmail=${userEmail}`);
      return res.data;
    },
  });

  //  Fetching selected product details using productId
  useEffect(() => {
    const fetchProduct = async () => {
      if (selectedProductId) {
        try {
          const res = await axiosInstance.get(`/product/${selectedProductId}`);
          setSelectedProductData(res.data);
        } catch (err) {
          console.error("Failed to fetch product data:", err);
        }
      }
    };

    fetchProduct();
  }, [selectedProductId, axiosInstance]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-center space-y-3 ">
          <span className="loading loading-bars loading-lg text-primary"></span>
          <p className="text-xl font-semibold text-primary">Please Wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-gray-300 flex flex-col md:flex-row gap-6 p-6">
        
        
      {/* Left Panel: Product List */}
      <div className="md:w-1/3  p-4 rounded-xl shadow-md shadow-primary">
        <h2 className="text-xl font-bold mb-4 text-primary text-center">📝 Watchlisted Products</h2>
        <ul className="space-y-3">

          {watchlist.length === 0 &&(
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-primary space-y-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <FaBoxOpen className="text-6xl text-accent animate-pulse" />
      <h2 className="text-2xl text-center font-bold">No Orders Found</h2>
      <p className="text-base-content text-center opacity-70 max-w-md">
        You haven’t Watchlisted any Products yet. Explore products and make your Wachlist today!
      </p>
    </motion.div>
          )}

          {watchlist.map((item) => (
            <li key={item._id}>
              <button
                className={`w-full font-bold text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                  selectedProductId === item.productId
                    ? "bg-info text-white font-bold border shadow-primary shadow-xs"
                    : "bg-[#334155] hover:bg-[#475569] border border-primary shadow-primary shadow-xs"
                }`}
                onClick={() => setSelectedProductId(item.productId)}
              >
                {item.productName}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Panel: Chart */}
      <div className="md:w-2/3 bg-[#1e293b] shadow-primary p-6 rounded-xl shadow-md flex flex-col items-center justify-center">
        {!selectedProductData ? (
          <p className="text-center text-lg text-primary font-bold">📌 Select a product to view price trends</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-info">{selectedProductData.item_name} — Price Trends</h2>

            {selectedProductData.prices?.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={selectedProductData.prices}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" />
                  <Tooltip contentStyle={{ backgroundColor: "#1e293b", color: "#f8fafc" }} />
                  <Line type="monotone" dataKey="price" stroke="#38bdf8" strokeWidth={3} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-warning">⚠️ No price data available for this product.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PriceTrends;
