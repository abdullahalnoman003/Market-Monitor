import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { TfiBarChart } from "react-icons/tfi";
import Swal from "sweetalert2";
import ThemeToggle from "./ThemeToggle";
import { AuthContext } from "../Authentication/Context/AuthContext";
import useUserRole from "../../Hooks/useUserRole";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext) || {};
  const [role] = useUserRole(user?.email); 

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

  //Show dashboard link based on role
  const renderDashboardLink = () => {
    if (!role) return null;
    if (role === "admin") return <NavLink to="/dashboard/admin">Admin Dashboard</NavLink>;
    if (role === "vendor") return <NavLink to="/dashboard/vendor">Vendor Dashboard</NavLink>;
    return <NavLink to="/dashboard/user">Dashboard</NavLink>;
  };

  return (
    <div className="navbar bg-base-100/90 backdrop-blur-md shadow-md fixed px-6 max-md:pl-1 top-0 z-50">
      <div className="navbar-start">
        {/* Mobile Dropdown */}
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
            <li className="font-bold"><NavLink to="/">Home</NavLink></li>
            <li className="font-bold"><NavLink to="/all-products">All Products</NavLink></li>
            <li className="font-bold"><NavLink to="/markets">Markets</NavLink></li>
            <li className="font-bold"><NavLink to="/compare">Compare</NavLink></li>
            {user && (
              <li className="font-bold">{renderDashboardLink()}</li>
            )}
            <li className="font-bold"><NavLink to="/about">About</NavLink></li>
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 text-2xl max-md:text-sm font-extrabold">
          <img className="max-md:w-8 w-10" src="/logo.png" alt="" />
          <span className="text-primary">Market</span>
          <span className="text-secondary">Monitor</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-3 px-1">
          <li><NavLink to="/" className="font-bold">Home</NavLink></li>
          <li><NavLink to="/all-products" className="font-bold">All Products</NavLink></li>
          <li><NavLink to="/markets" className="font-bold">Markets</NavLink></li>
          <li><NavLink to="/compare" className="font-bold">Compare</NavLink></li>
          {user && (
            <li className="font-bold">{renderDashboardLink()}</li>
          )}
          <li><NavLink to="/about" className="font-bold">About</NavLink></li>
        </ul>
      </div>

      {/* Theme & Auth */}
      <div className="navbar-end flex items-center gap-2">
        <ThemeToggle />
        {!user ? (
          <>
            <NavLink to="/login" className="font-bold">Login</NavLink>
            <NavLink to="/register" className="font-bold">Register</NavLink>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar tooltip tooltip-left"
              data-tip={user.displayName || "User"}
            >
              <div className="w-10 rounded-full border hover:shadow-sm border-primary shadow-primary">
                <img src={user.photoURL || "/default-user.png"} alt="User Avatar" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-40"
            >
              <li><NavLink to="/profile" className="text-sm">Profile</NavLink></li>
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

export default Navbar;
