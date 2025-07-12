import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { TfiBarChart } from "react-icons/tfi";
import Swal from "sweetalert2";
import ThemeToggle from "./ThemeToggle";
import { AuthContext } from "../Authentication/Context/AuthContext";

const VendorNav = () => {
  const { user, logout } = useContext(AuthContext) || {};

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await logout();
          Swal.fire({
            title: "Logged out!",
            text: "You have successfully logged out.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: `Logout failed: ${error.message}`,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="navbar bg-base-100/90 backdrop-blur-md shadow-md fixed px-6 max-md:pl-1 top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
          >
            <li><NavLink to="/dashboard/vendor/add-product">Add Product</NavLink></li>
            <li><NavLink to="/dashboard/vendor/my-products">My Products</NavLink></li>
            <li><NavLink to="/dashboard/vendor/add-advertisement">Add Advertisement</NavLink></li>
            <li><NavLink to="/dashboard/vendor/my-advertisements">My Advertisements</NavLink></li>
            <li><NavLink to="/">Back to Home</NavLink></li>
          </ul>
        </div>

        {/* Logo */}
        <Link to="/dashboard/vendor" className="flex items-center gap-1 text-2xl max-md:text-sm font-extrabold">
          <img className="max-md:w-8 w-10" src="/logo.png" alt="" />
          <span className="text-primary">Vendor</span>
          <span className="text-secondary">Dashboard </span> 
        </Link>
      </div>

      {/* Center: Vendor Dashboard Links (Desktop only) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-4 px-1 font-semibold">
          <li><NavLink to="/dashboard/vendor/add-product">Add Product</NavLink></li>
          <li><NavLink to="/dashboard/vendor/my-products">My Products</NavLink></li>
          <li><NavLink to="/dashboard/vendor/add-advertisement">Add Advertisement</NavLink></li>
          <li><NavLink to="/">Back To Home</NavLink></li>
        </ul>
      </div>

      {/* Right: Theme + Profile/Logout */}
      <div className="navbar-end flex items-center gap-2">
        <ThemeToggle />
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar tooltip tooltip-left"
              data-tip={user.displayName || "User"}
            >
              <div className="w-10 rounded-full border hover:shadow-sm shadow-primary border-primary">
                <img src={user.photoURL || "/default-user.png"} alt="User Avatar" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-40"
            >
              <li><NavLink to="/dashboard/vendor/profile" className="text-sm">Profile</NavLink></li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 font-semibold text-sm"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorNav;
