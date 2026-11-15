import React, { useContext, useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave, FaTimes, FaCamera, FaCalendarAlt, FaShieldAlt } from "react-icons/fa";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";

const Profile = () => {
  useDocumentTitle("Market Monitor | Profile");
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "",
    email: user?.email || "",
    phone: "",
    address: "",
    dateOfBirth: "",
    bio: "",
    joinDate: user?.metadata?.creationTime || "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosSecure.get(`/users/profile?email=${user?.email}`);
        if (response.data) {
          setUserProfile((prev) => ({
            ...prev,
            ...response.data,
            displayName: user?.displayName || response.data.displayName || "",
            photoURL: user?.photoURL || response.data.photoURL || "",
            email: user?.email || response.data.email || "",
          }));
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    if (user?.email) fetchUserData();
  }, [user, axiosSecure]);

  const handleInputChange = (field, value) => {
    setUserProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      await updateProfile(user, {
        displayName: userProfile.displayName,
        photoURL: userProfile.photoURL,
      });

      const updateData = {
        name: userProfile.displayName,
        photoURL: userProfile.photoURL,
        phone: userProfile.phone,
        address: userProfile.address,
        dateOfBirth: userProfile.dateOfBirth,
        bio: userProfile.bio,
      };

      await axiosSecure.patch(`/users/update?email=${user.email}`, updateData);
      setIsEditing(false);
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(error.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <div className="section-shell py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="page-title">My Profile</h1>
        <p className="mt-2 text-sm text-base-content/70 sm:text-base">
          Manage your personal information and account settings.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-1">
          <div className="surface-card p-5 sm:p-6">
            <div className="mb-5 text-center">
              <div className="relative mx-auto inline-block">
                <img
                  src={
                    userProfile.photoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile.displayName || "User")}&background=random&color=fff&size=120`
                  }
                  alt="Profile"
                  className="h-24 w-24 rounded-full border border-base-300 object-cover sm:h-28 sm:w-28"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile.displayName || "User")}&background=random&color=fff&size=120`;
                  }}
                />
              </div>
              <h2 className="mt-3 text-xl font-semibold text-base-content">{userProfile.displayName || "User"}</h2>
              <p className="break-all text-sm text-base-content/60">{userProfile.email}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-lg border border-base-300 bg-base-200/30 p-3">
                <FaCalendarAlt className="text-primary" />
                <div>
                  <p className="text-xs text-base-content/60">Member since</p>
                  <p className="text-sm font-medium">{formatDate(userProfile.joinDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-base-300 bg-base-200/30 p-3">
                <FaShieldAlt className="text-success" />
                <div>
                  <p className="text-xs text-base-content/60">Account status</p>
                  <p className="text-sm font-medium text-success">Verified</p>
                </div>
              </div>
            </div>

            <div className="mt-5">
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="btn btn-primary w-full gap-2">
                  <FaEdit /> Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={handleSaveProfile} disabled={loading} className="btn btn-primary flex-1 gap-2">
                    <FaSave /> {loading ? "Saving..." : "Save"}
                  </button>
                  <button onClick={() => setIsEditing(false)} className="btn btn-ghost gap-2">
                    <FaTimes /> Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="xl:col-span-2">
          <div className="surface-card p-5 sm:p-6">
            <h3 className="mb-5 flex items-center gap-2 text-xl font-semibold text-base-content">
              <FaUser className="text-primary" /> Personal Information
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="form-control">
                <label className="label py-1 font-medium">Full Name</label>
                {isEditing ? (
                  <input type="text" className="input input-bordered w-full" value={userProfile.displayName} onChange={(e) => handleInputChange("displayName", e.target.value)} />
                ) : (
                  <div className="input input-bordered flex w-full items-center bg-base-200/30">{userProfile.displayName || "Not provided"}</div>
                )}
              </div>

              <div className="form-control">
                <label className="label py-1 font-medium">Email Address</label>
                <div className="input input-bordered flex w-full items-center bg-base-200/30 opacity-80">{userProfile.email}</div>
              </div>

              <div className="form-control">
                <label className="label py-1 font-medium flex items-center gap-2"><FaPhone className="text-primary text-sm" /> Phone</label>
                {isEditing ? (
                  <input type="tel" className="input input-bordered w-full" value={userProfile.phone} onChange={(e) => handleInputChange("phone", e.target.value)} />
                ) : (
                  <div className="input input-bordered flex w-full items-center bg-base-200/30">{userProfile.phone || "Not provided"}</div>
                )}
              </div>

              <div className="form-control">
                <label className="label py-1 font-medium flex items-center gap-2"><FaCalendarAlt className="text-primary text-sm" /> Date of Birth</label>
                {isEditing ? (
                  <input type="date" className="input input-bordered w-full" value={userProfile.dateOfBirth} onChange={(e) => handleInputChange("dateOfBirth", e.target.value)} />
                ) : (
                  <div className="input input-bordered flex w-full items-center bg-base-200/30">{userProfile.dateOfBirth ? formatDate(userProfile.dateOfBirth) : "Not provided"}</div>
                )}
              </div>

              <div className="form-control sm:col-span-2">
                <label className="label py-1 font-medium flex items-center gap-2"><FaMapMarkerAlt className="text-primary text-sm" /> Address</label>
                {isEditing ? (
                  <textarea className="textarea textarea-bordered h-24 w-full" value={userProfile.address} onChange={(e) => handleInputChange("address", e.target.value)} />
                ) : (
                  <div className="textarea textarea-bordered min-h-24 w-full bg-base-200/30">{userProfile.address || "Not provided"}</div>
                )}
              </div>

              {isEditing && (
                <div className="form-control sm:col-span-2">
                  <label className="label py-1 font-medium flex items-center gap-2"><FaCamera className="text-primary text-sm" /> Profile Photo URL</label>
                  <input type="url" className="input input-bordered w-full" value={userProfile.photoURL} onChange={(e) => handleInputChange("photoURL", e.target.value)} />
                </div>
              )}

              <div className="form-control sm:col-span-2">
                <label className="label py-1 font-medium flex items-center gap-2"><FaUser className="text-primary text-sm" /> Bio</label>
                {isEditing ? (
                  <textarea className="textarea textarea-bordered h-28 w-full" value={userProfile.bio} onChange={(e) => handleInputChange("bio", e.target.value)} maxLength={500} />
                ) : (
                  <div className="textarea textarea-bordered min-h-28 w-full bg-base-200/30">{userProfile.bio || "No bio available"}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
