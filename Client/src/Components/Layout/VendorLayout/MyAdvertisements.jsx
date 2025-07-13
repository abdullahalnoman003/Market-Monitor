import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";
import useAxios from "../../../Hooks/useAxios";
import { AuthContext } from "../../Authentication/Context/AuthContext";

const MyAdvertisements = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true); 
    axiosInstance
      .get(`/my-advertisements?email=${user.email}`)
      .then((res) => {
        setAds(res.data || []);
      })
      .catch((err) => {
        console.error("Error loading advertisements:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, axiosInstance]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This advertisement will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4ade80",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/advertisements/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              setAds(ads.filter((ad) => ad._id !== id));
              Swal.fire(
                "Deleted!",
                "Your advertisement has been deleted.",
                "success"
              );
            }
          })
          .catch(() => {
            Swal.fire("Oops...", "Something went wrong!", "error");
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="h-80 w-full min-h-screen flex items-center justify-center rounded-xl mt-8">
        <div className="text-center space-y-3">
          <span className="loading loading-bars loading-lg text-primary"></span>
          <p className="text-xl font-semibold text-primary">
            Loading Your Advertisements...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center mb-8 text-primary">
        📢 My Advertisements
      </h2>

      {ads.length === 0 ? (
        <div className="text-center mt-16 space-y-5">
          <p className="text-xl font-medium">
            You haven’t posted any advertisements yet.
          </p>
          <button
            onClick={() => navigate("/dashboard/vendor/add-advertisement")}
            className="btn btn-primary btn-lg"
          >
            ➕ Post Advertisement
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ads.map((ad) => (
            <div
              key={ad._id}
              className="card bg-base-100 shadow-primary shadow-lg hover:shadow-xl border border-primary transition duration-300 hover:scale-[1.015]"
            >
              <figure className="p-5">
                <img
                  src={ad.banner_image}
                  alt={ad.ad_title}
                  className="rounded-xl h-48 object-cover w-full border border-primary"
                />
              </figure>
              <div className="card-body px-6 space-y-3">
                <h3 className="card-title text-xl font-semibold text-primary line-clamp-1">
                  📣 {ad.ad_title}
                </h3>

                <p
                  className="text-sm text-base-content line-clamp-3 break-words"
                  title={ad.short_description}
                >
                  <b>📝 Description:</b> <span>{ad.short_description}</span>
                </p>

                <p className="truncate text-sm" title={ad.vendor_name}>
                  <b>👤 Vendor:</b> {ad.vendor_name}
                </p>

                <div>
                  <span
                    className={`badge font-bold px-3 py-1 ${
                      ad.status === "approved"
                        ? "badge-success"
                        : ad.status === "pending"
                        ? "badge-warning"
                        : "badge-error"
                    }`}
                  >
                    {ad.status.toUpperCase()}
                  </span>
                  {ad.status === "rejected" && <p>{ad.rejectionFeedback}</p>}
                </div>

                <div className="card-actions justify-end mt-4">
                  <button
                    data-tooltip-id="edit-tooltip"
                    data-tooltip-content="Edit Advertisement"
                    onClick={() =>
                      navigate(
                        `/dashboard/vendor/update-advertisement/${ad._id}`
                      )
                    }
                    className="btn btn-sm btn-outline btn-warning"
                  >
                    <FaEdit className="mr-1" /> Edit
                    <Tooltip id="edit-tooltip" place="bottom" />
                  </button>
                  <button
                    data-tooltip-id="delete-tooltip"
                    data-tooltip-content="Delete Advertisement"
                    onClick={() => handleDelete(ad._id)}
                    className="btn btn-sm btn-outline btn-error"
                  >
                    <FaTrash className="mr-1" /> Delete
                    <Tooltip id="delete-tooltip" place="bottom" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAdvertisements;
