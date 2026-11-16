import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxios from "../../../Hooks/useAxios";
import { AuthContext } from "../../Authentication/Context/AuthContext";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import BrandedLoader from "../../Shared/BrandedLoader";

const PAGE_SIZE = 10;

const MyAdvertisements = () => {
  useDocumentTitle("My Advertisement | Vendor");
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedActions, setSelectedActions] = useState({});
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    axiosInstance
      .get(`/my-advertisements?email=${user.email}`)
      .then((res) => {
        setAds(res.data || []);
        setPage(1);
      })
      .catch((err) => {
        console.error("Error loading advertisements:", err);
        toast.error("Failed to load advertisements.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, axiosInstance]);

  const handleConfirm = async (ad) => {
    const action = selectedActions[ad._id] || "";
    if (!action) {
      toast.error("Select an action first.");
      return;
    }
    if (action === "edit") {
      navigate(`/dashboard/vendor/update-advertisement/${ad._id}`);
      return;
    }
    if (action === "delete") {
      if (!window.confirm("Delete this advertisement permanently?")) return;
      try {
        const res = await axiosSecure.delete(`/advertisements/${ad._id}`);
        if (res.data.deletedCount) {
          setAds((prev) => prev.filter((a) => a._id !== ad._id));
          toast.success("Advertisement deleted.");
        } else {
          toast.error("Could not delete advertisement.");
        }
      } catch {
        toast.error("Something went wrong while deleting.");
      }
    }
  };

  const totalPages = Math.max(1, Math.ceil(ads.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedAds = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return ads.slice(start, start + PAGE_SIZE);
  }, [ads, currentPage]);

  if (loading) {
    return <BrandedLoader label="Loading advertisements..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-primary">
        My Advertisements
      </h2>
      <p className="text-center text-base-content/70 mb-8">Select an action and confirm. Showing 10 ads per page.</p>

      {ads.length === 0 ? (
        <div className="surface-card flex min-h-[50vh] flex-col items-center justify-center text-center px-6 py-12 space-y-4">
          <p className="text-xl font-semibold text-base-content">No advertisements yet</p>
          <p className="text-sm sm:text-base text-base-content/70 max-w-md">
            Promote your products to reach more customers by creating your first advertisement.
          </p>
          <button
            onClick={() => navigate("/dashboard/vendor/add-advertisement")}
            className="btn btn-primary"
          >
            Post Advertisement
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedAds.map((ad) => (
              <div
                key={ad._id}
                className="card bg-base-100 border border-base-300/80 shadow-sm hover:shadow-md transition-shadow"
              >
                <figure className="p-4">
                  <img
                    src={ad.banner_image}
                    alt={ad.ad_title}
                    className="rounded-lg h-48 object-cover w-full border border-base-300"
                  />
                </figure>
                <div className="card-body px-5 pt-0">
                  <h3 className="card-title text-lg font-semibold text-base-content line-clamp-1">
                    {ad.ad_title}
                  </h3>
                  <p className="text-sm text-base-content/80 line-clamp-3 break-words" title={ad.short_description}>
                    <b>Description:</b> <span>{ad.short_description}</span>
                  </p>
                  <p className="truncate text-sm text-base-content/70" title={ad.vendor_name}>
                    <b>Vendor:</b> {ad.vendor_name}
                  </p>
                  <div className="space-y-1">
                    <span
                      className={`badge font-medium px-3 py-1 ${
                        ad.status === "approved"
                          ? "badge-success"
                          : ad.status === "pending"
                          ? "badge-warning"
                          : "badge-error"
                      }`}
                    >
                      {String(ad.status || "").toUpperCase()}
                    </span>
                    {ad.status === "rejected" && ad.rejectionFeedback && (
                      <p className="text-sm text-error">Feedback: {ad.rejectionFeedback}</p>
                    )}
                  </div>
                  <div className="mt-4 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                    <select
                      className="select select-bordered select-sm h-9 w-full min-w-0 sm:flex-1"
                      value={selectedActions[ad._id] || ""}
                      onChange={(e) =>
                        setSelectedActions((prev) => ({ ...prev, [ad._id]: e.target.value }))
                      }
                    >
                      <option value="">Select action</option>
                      <option value="edit">Edit</option>
                      <option value="delete">Delete</option>
                    </select>
                    <button className="btn btn-sm btn-primary h-9 min-h-9 w-full shrink-0 px-3 sm:w-auto" onClick={() => handleConfirm(ad)}>
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {ads.length > PAGE_SIZE && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
        </>
      )}
    </div>
  );
};

export default MyAdvertisements;
