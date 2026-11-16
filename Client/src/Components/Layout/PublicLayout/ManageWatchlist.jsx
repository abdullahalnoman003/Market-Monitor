import React, { useContext, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import { AuthContext } from "../../Authentication/Context/AuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { ProductGridSkeleton } from "../../Shared/Skeletons";

const PAGE_SIZE = 10;

const ManageWatchlist = () => {
  useDocumentTitle("Manage Watchlist | Dashboard");
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedActions, setSelectedActions] = useState({});
  const [page, setPage] = useState(1);

  const { data: watchlist = [], isLoading } = useQuery({
    queryKey: ["watchlist", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/watchlist", {
        params: { userEmail: user?.email },
      });
      return res.data || [];
    },
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/delete-watchlist/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["watchlist", user?.email]);
      toast.success("Item removed from your watchlist.");
    },
    onError: () => {
      toast.error("Failed to remove from watchlist.");
    },
  });

  const handleConfirm = (item) => {
    const action = selectedActions[item._id] || "";
    if (!action) {
      toast.error("Select an action first.");
      return;
    }
    if (action === "view") {
      navigate(`/product/${item.productId}`);
      return;
    }
    if (action === "remove") {
      if (!window.confirm("Remove this item from your watchlist?")) return;
      deleteMutation.mutate(item._id);
    }
  };

  const totalPages = Math.max(1, Math.ceil(watchlist.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return watchlist.slice(start, start + PAGE_SIZE);
  }, [watchlist, currentPage]);

  if (isLoading) {
    return (
      <div className="section-shell py-10">
        <h2 className="page-title mb-6">Manage Watchlist</h2>
        <ProductGridSkeleton count={6} />
      </div>
    );
  }

  return (
    <div className="section-shell py-8 sm:py-10 min-h-[60vh]">
      <h2 className="page-title text-center">Manage Watchlist</h2>
      <p className="mt-2 text-center text-sm text-base-content/70 sm:text-base">
        Select an action and confirm. Showing 10 items per page.
      </p>

      <div className="surface-card mt-8 overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-200 text-sm">
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Market Name</th>
              <th>Date</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item, index) => (
              <tr key={item._id} className="hover">
                <td>{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
                <td className="whitespace-nowrap">{item.productName}</td>
                <td className="whitespace-nowrap">{item.market}</td>
                <td>{item.date}</td>
                <td className="align-middle">
                  <div className="flex flex-col items-stretch justify-center gap-2 sm:flex-row sm:items-center">
                    <select
                      className="select select-bordered select-sm h-9 w-full min-w-0 sm:w-44"
                      value={selectedActions[item._id] || ""}
                      onChange={(e) =>
                        setSelectedActions((prev) => ({ ...prev, [item._id]: e.target.value }))
                      }
                    >
                      <option value="">Select action</option>
                      <option value="view">View Item</option>
                      <option value="remove">Remove</option>
                    </select>
                    <button className="btn btn-sm btn-primary h-9 min-h-9 w-full shrink-0 px-3 sm:w-auto" onClick={() => handleConfirm(item)}>
                      Confirm
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {paginatedItems.length === 0 && (
              <tr>
                <td colSpan="5" className="py-8 text-center text-base-content/70">
                  No items in your watchlist.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {watchlist.length > PAGE_SIZE && (
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

      <div className="my-8 text-center">
        <button onClick={() => navigate("/all-products")} className="btn btn-primary">
          Browse Products
        </button>
      </div>
    </div>
  );
};

export default ManageWatchlist;
