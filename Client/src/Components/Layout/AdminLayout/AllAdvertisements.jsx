import React from "react";
import Swal from "sweetalert2";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import useAxios from "../../../Hooks/useAxios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const AllAdvertisements = () => {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  useDocumentTitle("All Advertisements | Dashboard");

  const {
    data: ads = [],
    isLoading,
  } = useQuery({
    queryKey: ["advertisements"],
    queryFn: async () => {
      const res = await axiosInstance.get("/advertisement");
      return res.data;
    },
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status, reason = "", feedback = "" }) => {
      const res = await axiosInstance.patch(`/advertisement/status/${id}`, {
        status,
        rejectionReason: reason,
        rejectionFeedback: feedback,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["advertisements"]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/advertisement/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["advertisements"]);
    },
  });

  const changeAdStatus = async (id, currentStatus, newStatus) => {
    if (currentStatus === newStatus) return;

    if (newStatus === "rejected") {
      const { isConfirmed, value: formValues } = await Swal.fire({
        title: "Provide rejection reason and feedback",
        html: `
          <input id="reason" class="swal2-input" placeholder="Reason for rejection" required>
          <textarea id="feedback" class="swal2-textarea" placeholder="Provide feedback" required></textarea>
        `,
        focusConfirm: false,
        confirmButtonText: "Submit",
        preConfirm: () => {
          const reason = document.getElementById("reason").value;
          const feedback = document.getElementById("feedback").value;
          if (!reason || !feedback) {
            Swal.showValidationMessage("Both fields are required");
            return false;
          }
          return { reason, feedback };
        },
      });

      if (isConfirmed && formValues) {
        statusMutation.mutate({
          id,
          status: "rejected",
          reason: formValues.reason,
          feedback: formValues.feedback,
        });
      }
    } else if (newStatus === "approved") {
      statusMutation.mutate({ id, status: "approved" });
    }
  };

  const deleteAd = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You can't undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (isConfirmed) {
      deleteMutation.mutate(id);
    }
  };

  const getStatusBadge = (status) => {
    const badgeMap = {
      approved: "badge-success",
      pending: "badge-warning",
      rejected: "badge-error",
    };
    return (
      <span className={`badge font-bold ${badgeMap[status] || "badge-neutral"}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-primary">
        📢 Manage All Advertisements
      </h2>
      <p className="text-center text-base sm:text-lg mb-8">
        Admin can view, approve, reject (with feedback), or delete advertisements created by vendors.
      </p>

      <div className="overflow-x-auto rounded-lg shadow-md shadow-primary">
        <table className="table w-full">
          <thead className="bg-accent text-sm sm:text-base text-white">
            <tr>
              <th>#</th>
              <th>Vendor</th>
              <th>Ad Title</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : ads.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-lg">
                  No advertisements found.
                </td>
              </tr>
            ) : (
              ads.map((ad, i) => (
                <tr key={ad._id} className="hover:bg-base-200 transition-all">
                  <td>{i + 1}</td>
                  <td className="whitespace-nowrap">{ad.vendor_name}</td>
                  <td className="whitespace-nowrap">{ad.ad_title}</td>
                  <td>{getStatusBadge(ad.status)}</td>
                  <td>
                    <div className="flex gap-2 justify-center flex-wrap">
                      {ad.status !== "approved" && (
                        <button
                          onClick={() => changeAdStatus(ad._id, ad.status, "approved")}
                          className="btn btn-xs btn-success"
                        >
                          Approve
                        </button>
                      )}
                      {ad.status !== "rejected" && (
                        <button
                          onClick={() => changeAdStatus(ad._id, ad.status, "rejected")}
                          className="btn btn-xs btn-error"
                        >
                          Reject
                        </button>
                      )}
                      {ad.status === "rejected" && (
                        <button
                          onClick={() => deleteAd(ad._id)}
                          className="btn btn-xs btn-warning"
                        >
                          Delete
                        </button>
                      )}
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

export default AllAdvertisements;
