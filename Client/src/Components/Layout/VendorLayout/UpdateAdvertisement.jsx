import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../Authentication/Context/AuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import BrandedLoader from "../../Shared/BrandedLoader";

const UpdateAdvertisement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
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
        setAdTitle(ad.ad_title || "");
        setShortDescription(ad.short_description || "");
        setBannerImage(ad.banner_image || "");
        setImagePreview(ad.banner_image || null);
      })
      .catch((err) => {
        console.error("Error loading ad:", err);
        toast.error("Failed to fetch advertisement data.");
        navigate(-1);
      })
      .finally(() => setLoading(false));
  }, [id, axiosSecure, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }
    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);
    setBannerImage(file);
  };

  const uploadImageIfNeeded = async () => {
    if (typeof bannerImage === "string") return bannerImage;
    const formData = new FormData();
    formData.append("image", bannerImage);
    const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.success) return data.data.url;
    throw new Error(data.error?.message || "Image upload failed");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!adTitle.trim() || !shortDescription.trim()) {
      toast.error("All fields are required.");
      return;
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
        toast.success("Advertisement updated successfully.");
        navigate("/dashboard/vendor/my-advertisements");
      } else {
        toast("No changes made.");
      }
    } catch (error) {
      toast.error(error.message || "Update failed.");
    }
  };

  if (loading) {
    return <BrandedLoader label="Loading advertisement..." />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-8 bg-base-100 border border-base-300 rounded-xl shadow-sm my-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-6">
        Update Advertisement
      </h2>
      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="form-control">
          <label className="label font-semibold">Ad Title</label>
          <input
            type="text"
            value={adTitle}
            onChange={(e) => setAdTitle(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label font-semibold">Short Description</label>
          <textarea
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="textarea textarea-bordered w-full h-24"
            maxLength={150}
            required
          ></textarea>
          <span className="text-xs text-right mt-1 text-base-content/60">
            {shortDescription.length}/150
          </span>
        </div>

        <div className="form-control">
          <label className="label font-semibold">Banner Image</label>
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

        <div className="pt-2">
          <button type="submit" className="btn btn-primary w-full">
            Update Advertisement
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAdvertisement;
