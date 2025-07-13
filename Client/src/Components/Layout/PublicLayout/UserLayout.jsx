import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import Navbar from "../../Navbar & Footer/Navbar";
import Footer from "../../Navbar & Footer/Footer";


const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      {/* Drawer Layout */}
      <div className="drawer drawer-end lg:drawer-open">
        <input id="user-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content px-4 py-6">
          {/* Toggle Button for Small Devices */}
          <label
            htmlFor="user-drawer"
            className="btn btn-primary drawer-button lg:hidden mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            Open Menu
          </label>

          {/* Page Content */}
          <Outlet />
        </div>

        {/* Sidebar */}
        <div className="drawer-side z-15">
          <label htmlFor="user-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-screen shadow-md shadow-primary bg-base-200 text-base-content space-y-1 pt-15">
            {/* Sidebar Header */}
            <li className="mb-4 text-xl mt-3 -ml-12 font-bold flex items-center">
              <NavLink to="/dashboard/user">
                <img src="/logo.png" className="w-15" alt="User Logo" />
                <span>
                  <span className="text-primary">User</span>{" "}
                  <span className="text-secondary">Panel</span>
                </span>
              </NavLink>
            </li>

            {/* Sidebar Links */}
            <li>
              <NavLink to="/dashboard/user/manage-watchlist">⭐ Manage Watchlist</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/user/orders">🛒 My Orders</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/user/price-trends">📈 Price Trends</NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserLayout;
