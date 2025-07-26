import React, { useContext, useState } from "react";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });
      const updateUser ={
        name : name,
      }
      axiosSecure.patch(`/users/update?email=${user.email}`, updateUser);
      
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile was successfully updated!",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-30  px-4 ">
      <div className="max-w-4xl  mx-auto">
        {/* Profile Card */}
        <div className="card bg-base-200 shadow-lg shadow-primary p-6 mb-10">
          <h2 className="text-2xl font-bold mb-4 text-center text-primary">
            👤 My Profile
          </h2>

          <div className="flex flex-col items-center gap-3 mb-6">
            <img
              src={user?.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-primary object-cover"
            />
            <p className="font-bold">{user?.displayName || "N/A"}</p>
            <p className="text-center">
              <span className="font-bold">Email:</span> {user?.email}
            </p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              placeholder="Display Name"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Photo URL"
              className="input input-bordered w-full"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>  
      </div>
    </div>
  );
};

export default Profile;
