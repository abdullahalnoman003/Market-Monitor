import React, { useContext, useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave, FaTimes, FaCamera, FaCalendarAlt, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";

const Profile = () => {
  useDocumentTitle("Market Monitor || Profile");
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  
  // State for user profile data
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

  // Load additional user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosSecure.get(`/users/profile?email=${user?.email}`);
        if (response.data) {
          setUserProfile(prev => ({
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

    if (user?.email) {
      fetchUserData();
    }
  }, [user, axiosSecure]);

  const handleInputChange = (field, value) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      // Update Firebase profile
      await updateProfile(user, {
        displayName: userProfile.displayName,
        photoURL: userProfile.photoURL,
      });

      // Update backend
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
      Swal.fire({
        icon: "success",
        title: "Profile Updated Successfully!",
        text: "Your profile information has been saved.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-4 lg:py-8 px-3 lg:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 lg:mb-8"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3 lg:mb-4">
            My Profile
          </h1>
          <p className="text-base-content/70 text-base lg:text-lg px-4">
            Manage your personal information and account settings
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="xl:col-span-1 order-2 xl:order-1"
          >
            <div className="bg-gradient-to-br from-base-200/50 to-base-300/30 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl p-4 lg:p-6 border border-primary/10">
              {/* Profile Header */}
              <div className="text-center mb-4 lg:mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 p-1">
                    <img
                      src={userProfile.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile.displayName || 'User')}&background=random&color=fff&size=120`}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover border-2 border-base-100 shadow-lg"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile.displayName || 'User')}&background=random&color=fff&size=120`;
                      }}
                    />
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 btn btn-circle btn-sm btn-primary shadow-lg">
                      <FaCamera className="text-xs lg:text-sm" />
                    </button>
                  )}
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-primary mt-3 lg:mt-4 break-words">
                  {userProfile.displayName || "Welcome User"}
                </h2>
                <p className="text-base-content/60 text-sm lg:text-base break-all">{userProfile.email}</p>
              </div>

              {/* Quick Stats */}
              <div className="space-y-2 lg:space-y-3">
                <div className="flex items-center gap-2 lg:gap-3 p-2 lg:p-3 bg-base-100/50 rounded-xl">
                  <div className="btn btn-circle btn-sm btn-ghost text-primary">
                    <FaCalendarAlt className="text-xs lg:text-sm" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs lg:text-sm text-base-content/60">Member since</p>
                    <p className="font-semibold text-sm lg:text-base truncate">{formatDate(userProfile.joinDate)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 lg:gap-3 p-2 lg:p-3 bg-base-100/50 rounded-xl">
                  <div className="btn btn-circle btn-sm btn-ghost text-secondary">
                    <FaShieldAlt className="text-xs lg:text-sm" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs lg:text-sm text-base-content/60">Account Status</p>
                    <p className="font-semibold text-success text-sm lg:text-base">Verified</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 lg:mt-6">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-primary w-full gap-2 text-sm lg:text-base"
                  >
                    <FaEdit className="text-xs lg:text-sm" /> Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      disabled={loading}
                      className="btn btn-success flex-1 gap-2 text-sm lg:text-base"
                    >
                      <FaSave className="text-xs lg:text-sm" /> {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="btn btn-ghost gap-2 text-sm lg:text-base"
                    >
                      <FaTimes className="text-xs lg:text-sm" /> Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Profile Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="xl:col-span-2 order-1 xl:order-2"
          >
            <div className="bg-gradient-to-br from-base-200/50 to-base-300/30 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl p-4 lg:p-6 border border-primary/10">
              <h3 className="text-xl lg:text-2xl font-bold text-primary mb-4 lg:mb-6 flex items-center gap-2">
                <FaUser className="text-lg lg:text-xl" /> Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                {/* Display Name */}
                <div className="form-control w-full">
                  <label className="label pb-2">
                    <span className="label-text font-semibold flex items-center gap-2 text-sm lg:text-base">
                      <FaUser className="text-primary text-xs lg:text-sm" /> Full Name
                    </span>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="input input-bordered focus:input-primary w-full text-sm lg:text-base"
                      value={userProfile.displayName}
                      onChange={(e) => handleInputChange('displayName', e.target.value)}
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className="input input-bordered bg-base-100/50 cursor-default w-full text-sm lg:text-base">
                      {userProfile.displayName || "Not provided"}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="form-control w-full">
                  <label className="label pb-2">
                    <span className="label-text font-semibold flex items-center gap-2 text-sm lg:text-base">
                      <FaEnvelope className="text-primary text-xs lg:text-sm" /> Email Address
                    </span>
                  </label>
                  <div className="input input-bordered bg-base-100/30 cursor-not-allowed opacity-75 w-full text-sm lg:text-base">
                    {userProfile.email}
                  </div>
                  <label className="label pt-1">
                    <span className="label-text-alt text-xs">Email cannot be changed</span>
                  </label>
                </div>

                {/* Phone */}
                <div className="form-control w-full">
                  <label className="label pb-2">
                    <span className="label-text font-semibold flex items-center gap-2 text-sm lg:text-base">
                      <FaPhone className="text-primary text-xs lg:text-sm" /> Phone Number
                    </span>
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      className="input input-bordered focus:input-primary w-full text-sm lg:text-base"
                      value={userProfile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <div className="input input-bordered bg-base-100/50 cursor-default w-full text-sm lg:text-base">
                      {userProfile.phone || "Not provided"}
                    </div>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="form-control w-full">
                  <label className="label pb-2">
                    <span className="label-text font-semibold flex items-center gap-2 text-sm lg:text-base">
                      <FaCalendarAlt className="text-primary text-xs lg:text-sm" /> Date of Birth
                    </span>
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      className="input input-bordered focus:input-primary w-full text-sm lg:text-base"
                      value={userProfile.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    />
                  ) : (
                    <div className="input input-bordered bg-base-100/50 cursor-default w-full text-sm lg:text-base">
                      {userProfile.dateOfBirth ? formatDate(userProfile.dateOfBirth) : "Not provided"}
                    </div>
                  )}
                </div>

                {/* Address */}
                <div className="form-control w-full sm:col-span-2">
                  <label className="label pb-2">
                    <span className="label-text font-semibold flex items-center gap-2 text-sm lg:text-base">
                      <FaMapMarkerAlt className="text-primary text-xs lg:text-sm" /> Address
                    </span>
                  </label>
                  {isEditing ? (
                    <textarea
                      className="textarea textarea-bordered focus:textarea-primary h-20 lg:h-24 w-full text-sm lg:text-base resize-none"
                      value={userProfile.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter your address"
                    />
                  ) : (
                    <div className="textarea textarea-bordered bg-base-100/50 cursor-default h-20 lg:h-24 flex items-start pt-3 w-full text-sm lg:text-base overflow-y-auto">
                      {userProfile.address || "Not provided"}
                    </div>
                  )}
                </div>

                {/* Photo URL (only in edit mode) */}
                {isEditing && (
                  <div className="form-control w-full sm:col-span-2">
                    <label className="label pb-2">
                      <span className="label-text font-semibold flex items-center gap-2 text-sm lg:text-base">
                        <FaCamera className="text-primary text-xs lg:text-sm" /> Profile Photo URL
                      </span>
                    </label>
                    <input
                      type="url"
                      className="input input-bordered focus:input-primary w-full text-sm lg:text-base"
                      value={userProfile.photoURL}
                      onChange={(e) => handleInputChange('photoURL', e.target.value)}
                      placeholder="Enter photo URL"
                    />
                    <label className="label pt-1">
                      <span className="label-text-alt text-xs">Paste a valid image URL</span>
                    </label>
                  </div>
                )}

                {/* Bio */}
                <div className="form-control w-full sm:col-span-2">
                  <label className="label pb-2">
                    <span className="label-text font-semibold flex items-center gap-2 text-sm lg:text-base">
                      <FaUser className="text-primary text-xs lg:text-sm" /> Bio
                    </span>
                  </label>
                  {isEditing ? (
                    <textarea
                      className="textarea textarea-bordered focus:textarea-primary h-28 lg:h-32 w-full text-sm lg:text-base resize-none"
                      value={userProfile.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell us about yourself..."
                      maxLength={500}
                    />
                  ) : (
                    <div className="textarea textarea-bordered bg-base-100/50 cursor-default h-28 lg:h-32 flex items-start pt-3 w-full text-sm lg:text-base overflow-y-auto">
                      {userProfile.bio || "No bio available"}
                    </div>
                  )}
                  {isEditing && (
                    <label className="label pt-1">
                      <span className="label-text-alt text-xs">{userProfile.bio?.length || 0}/500 characters</span>
                    </label>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
