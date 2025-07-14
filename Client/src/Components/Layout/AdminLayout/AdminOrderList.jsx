import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import useAxios from "../../../Hooks/useAxios";
import { useState } from "react";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";

const AdminOrderList = () => {
  useDocumentTitle("All Orders | Admin")
  const axiosInstance = useAxios();

  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

 const { data: orders = [], isLoading, refetch } = useQuery({
  queryKey: ["adminOrders", searchQuery],
  queryFn: async () => {
    const url = searchQuery
      ? `/admin/order?search=${encodeURIComponent(searchQuery)}`
      : "/admin/order";
    const res = await axiosInstance.get(url);
    return res.data;
  }, 
});


  const handleSearchClick = () => {
    setSearchQuery(searchText.trim());
    refetch();
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-center space-y-3 ">
          <span className="loading loading-bars loading-lg text-primary "></span>
          <p className="text-xl font-semibold">Loading Orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10">
      <h2 className="text-3xl text-center font-bold mb-6 border-b border-primary pb-2">
        📦 All Orders (Admin View)
      </h2>
      <div className="max-w-md mx-auto mb-6 flex gap-2 items-center">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by name or email..."
          className="flex-grow px-4 py-2 rounded-md bg- border-2 shadow-primary shadow-xs border-primary focus:outline-none"
        />
        <button
          onClick={handleSearchClick}
          className="px-4 py-2 btn-primary btn font-bold hover:shadow-md  hover:shadow-secondary  rounded-md transition"
        >
          Search
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-md shadow-primary border max-w-7xl mx-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-accent uppercase text-xs tracking-wider border-b border-primary">
            <tr>
              <th className="px-5 py-3">#</th>
              <th className="px-5 py-3">Product Name</th>
              <th className="px-5 py-3">Market</th>
              <th className="px-5 py-3">Buyer Email</th>
              <th className="px-5 py-3">Unit Price</th>
              <th className="px-5 py-3">Total Price</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-900">
            {orders.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-6 text-lg text-error font-bold ">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="hover:bg-secondary-content transition-colors duration-200"
                >
                  <td className="px-5 py-3">{index + 1}</td>
                  <td className="px-5 py-3 font-semibold">{order.productName}</td>
                  <td className="px-5 py-3">{order.marketName || "Unknown"}</td>
                  <td className="px-5 py-3 text-xs">{order.buyerEmail}</td>
                  <td className="px-5 py-3 text-secondary">${order.unitPrice}</td>
                  <td className="px-5 py-3 text-secondary">${order.totalAmount}</td>
                  <td className="px-5 py-3 text-accent-content">
                    {new Date(order.date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-5 py-3">
                    <Link to={`/product/${order.id}`}>
                      <button className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded-md transition duration-200">
                        <FaEye className="text-sm" />
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrderList;
