import React from "react";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const AllProductsAdmin = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch all products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const res = await axiosInstance.get("/all-products");
      return res.data;
    },
  });

  // Approve/Reject mutation
  const statusMutation = useMutation({
    mutationFn: async ({ id, payload }) => {
      return await axiosInstance.patch(`/product/status/${id}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-products"]);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosInstance.delete(`/product/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-products"]);
    },
  });

  const changeProductStatus = async (id, newStatus) => {
    if (newStatus === "rejected") {
      const { value: formValues } = await Swal.fire({
        title: "Provide rejection reason and feedback",
        html: `
          <input id="reason" class="swal2-input" placeholder="Reason" required>
          <textarea id="feedback" class="swal2-textarea" placeholder="Feedback" required></textarea>
        `,
        focusConfirm: false,
        preConfirm: () => {
          const reason = document.getElementById("reason").value.trim();
          const feedback = document.getElementById("feedback").value.trim();

          if (!reason || !feedback) {
            Swal.showValidationMessage(
              "Please provide both reason and feedback"
            );
            return false;
          }

          return { reason, feedback };
        },
      });

      if (formValues) {
        const { reason, feedback } = formValues;
        statusMutation.mutate({
          id,
          payload: {
            status: "rejected",
            rejectionReason: reason,
            rejectionFeedback: feedback,
          },
        });
        Swal.fire(
          "❌ Rejected",
          "Rejection feedback has been saved.",
          "success"
        );
      }
    } else if (newStatus === "approved") {
      statusMutation.mutate({
        id,
        payload: { status: "approved" },
      });
      Swal.fire("✅ Approved", "Product has been approved.", "success");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the product.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      deleteMutation.mutate(id);
      Swal.fire("🗑️ Deleted!", "Product has been deleted.", "success");
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


  return (
    <div className="max-w-7xl min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl  sm:text-4xl font-bold text-center mb-4 text-primary">
        🛒 All Products Management
      </h2>
      <p className="text-center mb-6 text-sm sm:text-base">
        Admin can approve, reject (with feedback), update, or remove vendor
        products.
      </p>

      <div className="overflow-x-auto shadow-md rounded-xl shadow-primary">
        <table className="table w-full">
          <thead className="bg-accent text-white">
            <tr>
              <th>#</th>
              <th>Item Name</th>
              <th>Vendor</th>
              <th>Status</th>
              <th>Price</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  <div className="text-center space-y-3 ">
                    <span className="loading loading-bars loading-lg text-primary "></span>
                    <p className="text-xl font-semibold">Loading products</p>
                  </div>
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-error">
                  No Products Found
                </td>
              </tr>
            ) : (
              products.map((product, i) => (
                <tr key={product._id} className="hover:bg-base-200">
                  <td>{i + 1}</td>
                  <td>{product.item_name}</td>
                  <td>{product.vendor_name}</td>
                  <td>{getStatusBadge(product.status)}</td>
                  <td>৳{product.price_per_unit}</td>
                  <td>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {product.status !== "approved" && (
                        <button
                          className="btn btn-xs btn-success"
                          onClick={() =>
                            changeProductStatus(product._id, "approved")
                          }
                        >
                          Approve
                        </button>
                      )}
                      {product.status !== "rejected" && (
                        <button
                          className="btn btn-xs btn-error"
                          onClick={() =>
                            changeProductStatus(product._id, "rejected")
                          }
                        >
                          Reject
                        </button>
                      )}
                      <button
                        className="btn btn-xs btn-info"
                        onClick={() =>
                          navigate(
                            `/dashboard/admin/update-product/${product._id}`
                          )
                        }
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-xs btn-warning"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </div>
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

export default AllProductsAdmin;
