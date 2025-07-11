import React, { useContext, useState, useRef } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Authentication/Context/AuthContext";
import useAxios from "../../../Hooks/useAxios";

// Helper to upload image to ImgBB
const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const apiKey = import.meta.env.VITE_IMGBB_API_KEY; 
  const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (data.success) {
    return data.data.url;
  } else {
    throw new Error(data.error.message || "Image upload failed");
  }
};

const AdvertisementForm = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const fileInputRef = useRef(null);

  const [adTitle, setAdTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MAX_DESC_LENGTH = 150;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        Swal.fire("Invalid File", "Please upload an image file.", "warning");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!adTitle.trim() || !shortDescription.trim() || !imageFile) {
      return Swal.fire(
        "Missing Fields",
        "Please fill out the title, description, and upload an image.",
        "warning"
      );
    }

    setIsSubmitting(true);

    try {
      //  Uploading image first
      const imageUrl = await uploadImage(imageFile);

      //  the advertisement data
      const newAdvertisement = {
        vendor_email: user?.email,
        vendor_name: user?.displayName,
        ad_title: adTitle,
        short_description: shortDescription,
        banner_image: imageUrl,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      // Post data  backend
      const res = await axiosInstance.post("/advertisements", newAdvertisement);

      if (res?.data?.insertedId) {
        Swal.fire({
          icon: "success",
          title: "🚀 Advertisement Submitted!",
          text: "Your ad is now pending review. Thank you!",
          timer: 3000,
          showConfirmButton: false,
        });
        // Reset form state
        setAdTitle("");
        setShortDescription("");
        handleRemoveImage();
      } else {
        Swal.fire("❌ Submission Failed", "Could not submit your advertisement. Please try again.", "error");
      }
    } catch (err) {
      Swal.fire("An Error Occurred", err.message || "Something went wrong during submission.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-base-200 to-base-300 rounded-2xl shadow-primary shadow-lg my-12 transition-all duration-300">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-primary mb-2">Create Your Advertisement</h2>
        <p className="text-lg text-base-content/80">
          Capture everyone's attention with a stunning ad.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Ad Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg font-semibold">📢 Ad Title</span>
          </label>
          <input
            type="text"
            value={adTitle}
            onChange={(e) => setAdTitle(e.target.value)}
            placeholder="e.g., Fresh Organic Vegetables!"
            className="input input-bordered w-full text-lg focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Short Description with Character Counter */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg font-semibold">✍️ Short Description</span>
            <span className="label-text-alt">{shortDescription.length}/{MAX_DESC_LENGTH}</span>
          </label>
          <textarea
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="textarea w-full textarea-bordered h-24 text-base focus:ring-2 focus:ring-primary"
            placeholder="Briefly describe what makes your product special."
            maxLength={MAX_DESC_LENGTH}
            required
          ></textarea>
        </div>

        {/* Image Upload */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg font-semibold">🖼️ Promotional Image</span>
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-base-content/30 rounded-md">
            <div className="space-y-1 text-center">
              {imagePreview ? (
                <div className="relative group">
                  <img src={imagePreview} alt="Ad preview" className="mx-auto h-48 rounded-md object-cover"/>
                  <div
                    onClick={handleRemoveImage}
                    className="absolute top-0 right-0 -mt-2 -mr-2 flex items-center justify-center h-8 w-8  rounded-full text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ❌
                  </div>
                </div>
              ) : (
                <>
                  <svg className="mx-auto h-12 w-12 text-base-content/50" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-base-content/60">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-base-100 rounded-md font-medium text-primary hover:text-primary-focus px-1">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" ref={fileInputRef}/>
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-base-content/50">PNG, JPG, GIF up to 10MB</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Submission Button */}
        <div className="pt-4">
          <button
            type="submit"
            className={`btn btn-primary w-full text-lg ${isSubmitting ? "loading" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "✅ Post Advertisement"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdvertisementForm;