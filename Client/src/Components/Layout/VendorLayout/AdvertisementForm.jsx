import React, { useContext, useState, useRef } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Authentication/Context/AuthContext";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

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
  }
  throw new Error(data.error?.message || "Image upload failed");
};

const AdvertisementForm = () => {
  useDocumentTitle("Publish Advertisement | Vendor");
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
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
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file.");
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
      toast.error("Please fill out the title, description, and upload an image.");
      return;
    }

    setIsSubmitting(true);

    try {
      const imageUrl = await uploadImage(imageFile);

      const newAdvertisement = {
        vendor_email: user?.email,
        vendor_name: user?.displayName,
        ad_title: adTitle,
        short_description: shortDescription,
        banner_image: imageUrl,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      const res = await axiosSecure.post("/advertisements", newAdvertisement);

      if (res?.data?.insertedId) {
        toast.success("Advertisement submitted for review.");
        setAdTitle("");
        setShortDescription("");
        handleRemoveImage();
      } else {
        toast.error("Could not submit your advertisement. Please try again.");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-8 bg-base-100 border border-base-300 rounded-xl shadow-sm my-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">Create Advertisement</h2>
        <p className="text-base text-base-content/70">
          Publish a clear advertisement for your products.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base font-semibold">Ad Title</span>
          </label>
          <input
            type="text"
            value={adTitle}
            onChange={(e) => setAdTitle(e.target.value)}
            placeholder="e.g., Fresh organic vegetables"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-base font-semibold">Short Description</span>
            <span className="label-text-alt">{shortDescription.length}/{MAX_DESC_LENGTH}</span>
          </label>
          <textarea
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Briefly describe your advertisement."
            maxLength={MAX_DESC_LENGTH}
            required
          ></textarea>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-base font-semibold">Promotional Image</span>
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-base-300 rounded-lg bg-base-200/30">
            <div className="space-y-1 text-center w-full">
              {imagePreview ? (
                <div className="relative inline-block">
                  <img src={imagePreview} alt="Ad preview" className="mx-auto h-48 rounded-md object-cover" />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="btn btn-xs btn-circle btn-error absolute -top-2 -right-2"
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <>
                  <svg className="mx-auto h-12 w-12 text-base-content/40" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex justify-center text-sm text-base-content/70">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 px-1">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" ref={fileInputRef} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-base-content/50">PNG, JPG, GIF up to 10MB</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Post Advertisement"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdvertisementForm;
