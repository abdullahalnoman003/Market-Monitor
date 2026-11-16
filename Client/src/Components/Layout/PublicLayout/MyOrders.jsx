import { useMemo, useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaEye, FaBoxOpen } from "react-icons/fa";
import { AuthContext } from "../../Authentication/Context/AuthContext";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import BrandedLoader from "../../Shared/BrandedLoader";

const PAGE_SIZE = 10;

const MyOrders = () => {
  useDocumentTitle("My Orders | Dashboard");
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["myOrders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?buyerEmail=${user.email}`);
      return res.data || [];
    },
  });

  const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return orders.slice(start, start + PAGE_SIZE);
  }, [orders, currentPage]);

  if (isLoading) {
    return <BrandedLoader label="Loading your orders..." />;
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center space-y-3">
        <FaBoxOpen className="text-5xl text-primary/50" />
        <h2 className="text-2xl font-bold text-base-content">No Orders Found</h2>
        <p className="text-base-content/70 max-w-md">
          You haven&apos;t placed any orders yet. Explore products and make your first purchase.
        </p>
        <Link to="/all-products" className="btn btn-primary btn-sm mt-2">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10">
      <h2 className="text-2xl sm:text-3xl text-center font-bold mb-2 text-primary">
        My Orders
      </h2>
      <p className="text-center text-base-content/70 mb-6">Showing 10 orders per page.</p>

      <div className="overflow-x-auto rounded-xl border border-base-300 bg-base-100 mx-auto max-w-7xl shadow-sm">
        <table className="table w-full text-sm">
          <thead className="bg-base-200 text-xs uppercase tracking-wider">
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Market</th>
              <th>Unit Price</th>
              <th>Total Price</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order, index) => (
              <tr key={order._id} className="hover">
                <td>{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
                <td>{order.productName}</td>
                <td>{order.marketName || "Unknown"}</td>
                <td className="font-medium">${order.unitPrice}</td>
                <td>${order.price ?? order.totalAmount}</td>
                <td>{new Date(order.date).toLocaleDateString("en-GB")}</td>
                <td>
                  <Link to={`/product/${order.id}`}>
                    <button className="btn btn-xs btn-primary gap-1">
                      <FaEye /> View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
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

export default MyOrders;
