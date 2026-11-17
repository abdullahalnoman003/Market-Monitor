import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import BrandedLoader from "../../Shared/BrandedLoader";

const PAGE_SIZE = 10;

const AllProductsAdmin = () => {
  useDocumentTitle("All Products | Admin");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedActions, setSelectedActions] = useState({});
  const [page, setPage] = useState(1);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-products");
      return res.data || [];
    },
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, payload }) => {
      return await axiosSecure.patch(`/product/status/${id}`, payload);
    },
    onSuccess: () => queryClient.invalidateQueries(["all-products"]),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/product/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries(["all-products"]),
  });

  const handleConfirmAction = (product) => {
    const action = selectedActions[product._id] || "";
    if (!action) {
      toast.error("Select an action first.");
      return;
    }

    if (action === "approve") {
      statusMutation.mutate(
        { id: product._id, payload: { status: "approved" } },
        {
          onSuccess: () => toast.success("Product approved."),
          onError: () => toast.error("Failed to approve product."),
        }
      );
      return;
    }

    if (action === "reject") {
      const reason = window.prompt("Reason for rejection (required):", "");
      if (reason === null) return;
      const trimmedReason = reason.trim();
      if (!trimmedReason) {
        toast.error("Rejection reason is required.");
        return;
      }
      const feedback = window.prompt("Feedback for vendor (required):", "");
      if (feedback === null) return;
      const trimmedFeedback = feedback.trim();
      if (!trimmedFeedback) {
        toast.error("Rejection feedback is required.");
        return;
      }
      statusMutation.mutate(
        {
          id: product._id,
          payload: {
            status: "rejected",
            rejectionReason: trimmedReason,
            rejectionFeedback: trimmedFeedback,
          },
        },
        {
          onSuccess: () => toast.success("Product rejected and feedback saved."),
          onError: () => toast.error("Failed to reject product."),
        }
      );
      return;
    }

    if (action === "update") {
      navigate(`/dashboard/admin/update-product/${product._id}`);
      return;
    }

    if (action === "delete") {
      if (!window.confirm("Delete this product permanently?")) return;
      deleteMutation.mutate(product._id, {
        onSuccess: () => toast.success("Product deleted."),
        onError: () => toast.error("Failed to delete product."),
      });
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <span className="badge badge-success">Approved</span>;
      case "pending":
        return <span className="badge badge-warning">Pending</span>;
      case "rejected":
        return <span className="badge badge-error">Rejected</span>;
      default:
        return <span className="badge badge-neutral">Unknown</span>;
    }
  };

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return products.slice(start, start + PAGE_SIZE);
  }, [products, currentPage]);

  if (isLoading) {
    return <BrandedLoader label="Loading products..." />;
  }

  return (
    <div className="max-w-7xl min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-primary">
        All Products Management
      </h2>
      <p className="text-center mb-6 text-sm sm:text-base text-base-content/70">
        Select an action and confirm. Showing 10 products per page.
      </p>

      <div className="overflow-x-auto rounded-xl border border-base-300 shadow-sm bg-base-100">
        <table className="table w-full">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>#</th>
              <th>Item Name</th>
              <th>Vendor</th>
              <th>Status</th>
              <th>Price</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-base-content/70">
                  No Products Found
                </td>
              </tr>
            ) : (
              paginatedProducts.map((product, i) => (
                <tr key={product._id} className="hover:bg-base-200/60">
                  <td>{(currentPage - 1) * PAGE_SIZE + i + 1}</td>
                  <td>{product.item_name}</td>
                  <td>{product.vendor_name}</td>
                  <td>{getStatusBadge(product.status)}</td>
                  <td>৳{product.price_per_unit}</td>
                  <td className="align-middle">
                    <div className="flex flex-col items-stretch justify-center gap-2 sm:flex-row sm:items-center">
                      <select
                        className="select select-bordered select-sm h-9 w-full min-w-0 sm:w-44"
                        value={selectedActions[product._id] || ""}
                        onChange={(e) =>
                          setSelectedActions((prev) => ({ ...prev, [product._id]: e.target.value }))
                        }
                      >
                        <option value="">Select action</option>
                        {product.status !== "approved" && <option value="approve">Approve</option>}
                        {product.status !== "rejected" && <option value="reject">Reject</option>}
                        <option value="update">Update</option>
                        <option value="delete">Delete</option>
                      </select>
                      <button className="btn btn-sm btn-primary h-9 min-h-9 w-full shrink-0 px-3 sm:w-auto" onClick={() => handleConfirmAction(product)}>
                        Confirm
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {products.length > PAGE_SIZE && (
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

export default AllProductsAdmin;
