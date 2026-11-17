import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import useAxios from "../../../Hooks/useAxios";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import BrandedLoader from "../../Shared/BrandedLoader";

const PAGE_SIZE = 10;

const AdminOrderList = () => {
  useDocumentTitle("All Orders | Admin");
  const axiosInstance = useAxios();

  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ["adminOrders", searchQuery],
    queryFn: async () => {
      const url = searchQuery
        ? `/admin/order?search=${encodeURIComponent(searchQuery)}`
        : "/admin/order";
      const res = await axiosInstance.get(url);
      return res.data || [];
    },
  });

  const handleSearchClick = () => {
    setSearchQuery(searchText.trim());
    setPage(1);
    refetch();
  };

  const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return orders.slice(start, start + PAGE_SIZE);
  }, [orders, currentPage]);

  if (isLoading) {
    return <BrandedLoader label="Loading orders..." />;
  }

  return (
    <div className="min-h-screen px-4 py-10">
      <h2 className="text-3xl text-center font-bold mb-2 text-primary">
        All Orders (Admin View)
      </h2>
      <p className="text-center text-base-content/70 mb-6">Showing 10 orders per page.</p>
      <div className="max-w-md mx-auto mb-6 flex gap-2 items-center">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by name or email..."
          className="input input-bordered flex-grow"
        />
        <button onClick={handleSearchClick} className="btn btn-primary font-semibold">
          Search
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-sm border border-base-300 bg-base-100 max-w-7xl mx-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-base-200 text-base-content uppercase text-xs tracking-wider border-b border-base-300">
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
          <tbody className="divide-y divide-base-300">
            {paginatedOrders.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-6 text-base-content/70">
                  No orders found.
                </td>
              </tr>
            ) : (
              paginatedOrders.map((order, index) => (
                <tr
                  key={order._id}
                  className="hover:bg-base-200/70 transition-colors duration-200"
                >
                  <td className="px-5 py-3">{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
                  <td className="px-5 py-3 font-semibold">{order.productName}</td>
                  <td className="px-5 py-3">{order.marketName || "Unknown"}</td>
                  <td className="px-5 py-3 text-xs">{order.buyerEmail}</td>
                  <td className="px-5 py-3 text-secondary">${order.unitPrice}</td>
                  <td className="px-5 py-3 text-secondary">${order.totalAmount}</td>
                  <td className="px-5 py-3 text-base-content/70">
                    {new Date(order.date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-5 py-3">
                    <Link to={`/product/${order.id}`}>
                      <button className="btn btn-xs btn-primary gap-1">
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

      {orders.length > PAGE_SIZE && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            className="btn btn-sm btn-outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="rounded-md border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminOrderList;
