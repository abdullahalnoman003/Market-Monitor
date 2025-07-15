import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../Authentication/Context/AuthContext";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { FaBoxOpen } from "react-icons/fa";


const MyOrders = () => {
  useDocumentTitle("My Orders | Dashboard")
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["myOrders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?buyerEmail=${user.email}`);
      return res.data;
    },
  });

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


if (orders.length === 0) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-primary space-y-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <FaBoxOpen className="text-6xl text-accent animate-pulse" />
      <h2 className="text-2xl font-bold">No Orders Found</h2>
      <p className="text-base-content text-center opacity-70 max-w-md">
        You haven’t placed any orders yet. Explore products and make your first purchase today!
      </p>
    </motion.div>
  );
}


  return (
    <div className="min-h-screen px-4 py-10 ">
      <h2 className="text-3xl text-center font-bold mb-6 text-primary pb-1">
        🧾 My Order List
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-md border mx-auto max-w-7xl shadow-primary ">
        <table className=" w-full text-left text-sm ">
          <thead className=" text-primary uppercase text-xs tracking-wider border-b-2">
            <tr>
              <th className="px-5 py-3">#</th>
              <th className="px-5 py-3">Product Name</th>
              <th className="px-5 py-3">Market</th>
              <th className="px-5 py-3">Unit Price</th>
              <th className="px-5 py-3">Total Price</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody className=" divide-y ">
            {orders.map((order, index) => (
              <tr
                key={order._id}
                className="hover:bg-primary-content transition-all duration-200"
              >

                <td className="px-5 py-3">{index + 1}</td>
                <td className="px-5 py-3">{order.productName}</td>
                <td className="px-5 py-3">{order.marketName || "Unknown"}</td>
                <td className="px-5 py-3  font-medium">
                  ${order.unitPrice}
                </td>
                <td className="px-5 py-3 text-secondary">${order.price}</td>
                <td className="px-5 py-3">
                  {new Date(order.date).toLocaleDateString("en-GB")}
                </td>
                <td className="px-5 py-3">
                  <Link to={`/product/${order.id}`}>
                    <button className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded-md transition-colors duration-200">
                      <FaEye className="text-sm" />
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
