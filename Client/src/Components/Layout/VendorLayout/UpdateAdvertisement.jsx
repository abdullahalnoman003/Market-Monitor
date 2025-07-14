import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Authentication/Context/AuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UpdateAdvertisement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [adData, setAdData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adTitle, setAdTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    axiosSecure
      .get(`/my-advertisements/${id}`)
      .then((res) => {
        const ad = res.data;
        setAdData(ad);
        setAdTitle(ad.ad_title);
        setShortDescription(ad.short_description);
        setBannerImage(ad.banner_image);
        setImagePreview(ad.banner_image);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading ad:", err);
        Swal.fire("❌ Error", "Failed to fetch advertisement data!", "error");
        navigate("/");
      });
  }, [id, axiosSecure, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      return Swal.fire("Invalid File", "Please select a valid image.", "warning");
    }
    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);
    setBannerImage(file);
  };

  const uploadImageIfNeeded = async () => {
    if (typeof bannerImage === "string") return bannerImage; // Already uploaded
    const formData = new FormData();
    formData.append("image", bannerImage);
    const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.success) return data.data.url;
    else throw new Error(data.error.message || "Image upload failed");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!adTitle.trim() || !shortDescription.trim()) {
      return Swal.fire("⚠️ Incomplete", "All fields are required.", "warning");
    }

    try {
      const imageUrl = await uploadImageIfNeeded();

      const updatedAd = {
        vendor_email: user?.email,
        vendor_name: user?.displayName,
        ad_title: adTitle,
        short_description: shortDescription,
        banner_image: imageUrl,
        updatedAt: new Date().toISOString(),
      };

      const res = await axiosSecure.put(`/my-advertisements/${id}`, updatedAd);

      if (res.data.modifiedCount > 0) {
        Swal.fire("✅ Updated!", "Advertisement updated successfully!", "success");
        navigate("/dashboard/vendor/my-advertisements");
      } else {
        Swal.fire("ℹ️ Notice", "No changes made.", "info");
      }
    } catch (error) {
      Swal.fire("❌ Error", error.message || "Update failed", "error");
    }
  };

  if (loading) {
    return (
      <div className="h-80 w-full flex items-center justify-center bg-base-200 rounded-xl mt-8">
        <div className="text-center space-y-3">
          <span className="loading loading-bars loading-lg text-primary"></span>
          <p className="text-xl font-semibold text-yellow-800">
            Fetching advertisement info...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-base-200 to-base-300 rounded-2xl shadow-2xl my-12">
      <h2 className="text-3xl font-extrabold text-primary text-center mb-6">
        ✏️ Update Advertisement
      </h2>
      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="form-control">
          <label className="label font-semibold text-lg">📢 Ad Title</label>
          <input
            type="text"
            value={adTitle}
            onChange={(e) => setAdTitle(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label font-semibold text-lg">✍️ Short Description</label>
          <textarea
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="textarea textarea-bordered w-full h-24"
            maxLength={150}
            required
          ></textarea>
          <span className="text-xs text-right mt-1 text-base-content/70">
            {shortDescription.length}/150
          </span>
        </div>

        <div className="form-control">
          <label className="label font-semibold text-lg">🖼️ Banner Image</label>
          {imagePreview && (
            <div className="relative mb-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-48 w-full object-cover rounded-md border border-base-300"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="file-input file-input-bordered w-full"
            onChange={handleImageChange}
          />
        </div>

        <div className="text-center pt-4">
          <button type="submit" className="btn btn-primary w-full text-lg">
            🔄 Update Advertisement
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAdvertisement;
