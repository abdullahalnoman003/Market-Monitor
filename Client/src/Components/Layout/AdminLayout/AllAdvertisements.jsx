import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import useAxios from "../../../Hooks/useAxios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import BrandedLoader from "../../Shared/BrandedLoader";

const PAGE_SIZE = 10;

const AllAdvertisements = () => {
  useDocumentTitle("Manage Advertisements | Admin");
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedActions, setSelectedActions] = useState({});
  const [page, setPage] = useState(1);

  const { data: ads = [], isLoading } = useQuery({
    queryKey: ["advertisements"],
    queryFn: async () => {
      const res = await axiosInstance.get("/advertisement");
      return res.data || [];
    },
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status, reason = "", feedback = "" }) => {
      const res = await axiosSecure.patch(`/advertisement/status/${id}`, {
        status,
        rejectionReason: reason,
        rejectionFeedback: feedback,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["advertisements"]);
      toast.success("Status updated successfully.");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message || "Failed to update status.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/advertisement/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["advertisements"]);
      toast.success("Advertisement deleted.");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message || "Failed to delete advertisement.");
    },
  });

  const handleConfirmAction = (ad) => {
    const action = selectedActions[ad._id] || "";
    if (!action) {
      toast.error("Select an action first.");
      return;
    }

    if (action === "approve") {
      statusMutation.mutate({ id: ad._id, status: "approved" });
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
      statusMutation.mutate({
        id: ad._id,
        status: "rejected",
        reason: trimmedReason,
        feedback: trimmedFeedback,
      });
      return;
    }

    if (action === "delete") {
      if (!window.confirm("Delete this advertisement? This cannot be undone.")) return;
      deleteMutation.mutate(ad._id);
    }
  };

  const getStatusBadge = (status) => {
    const badgeMap = {
      approved: "badge-success",
      pending: "badge-warning",
      rejected: "badge-error",
    };
    return (
      <span className={`badge font-semibold ${badgeMap[status] || "badge-neutral"}`}>
        {String(status || "unknown").charAt(0).toUpperCase() + String(status || "unknown").slice(1)}
      </span>
    );
  };

  const totalPages = Math.max(1, Math.ceil(ads.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedAds = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return ads.slice(start, start + PAGE_SIZE);
  }, [ads, currentPage]);

  if (isLoading) {
    return <BrandedLoader label="Loading advertisements..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-primary">
        Manage All Advertisements
      </h2>
      <p className="text-center text-base sm:text-lg mb-8 text-base-content/70">
        Select an action and confirm. Showing 10 advertisements per page.
      </p>

      <div className="overflow-x-auto rounded-xl border border-base-300 shadow-sm bg-base-100">
        <table className="table w-full">
          <thead className="bg-base-200 text-sm sm:text-base text-base-content">
            <tr>
              <th>#</th>
              <th>Vendor</th>
              <th>Ad Title</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAds.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-base-content/70">
                  No advertisements found.
                </td>
              </tr>
            ) : (
              paginatedAds.map((ad, i) => (
                <tr key={ad._id} className="hover:bg-base-200/60 transition-colors">
                  <td>{(currentPage - 1) * PAGE_SIZE + i + 1}</td>
                  <td className="whitespace-nowrap">{ad.vendor_name}</td>
                  <td className="whitespace-nowrap">{ad.ad_title}</td>
                  <td>{getStatusBadge(ad.status)}</td>
                  <td className="align-middle">
                    <div className="flex flex-col items-stretch justify-center gap-2 sm:flex-row sm:items-center">
                      <select
                        className="select select-bordered select-sm h-9 w-full min-w-0 sm:w-44"
                        value={selectedActions[ad._id] || ""}
                        onChange={(e) =>
                          setSelectedActions((prev) => ({ ...prev, [ad._id]: e.target.value }))
                        }
                      >
                        <option value="">Select action</option>
                        {ad.status !== "approved" && <option value="approve">Approve</option>}
                        {ad.status !== "rejected" && <option value="reject">Reject</option>}
                        <option value="delete">Delete</option>
                      </select>
                      <button className="btn btn-sm btn-primary h-9 min-h-9 w-full shrink-0 px-3 sm:w-auto" onClick={() => handleConfirmAction(ad)}>
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

      {ads.length > PAGE_SIZE && (
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

export default AllAdvertisements;
