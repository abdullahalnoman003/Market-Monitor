import React from "react";
import { Outlet, NavLink } from "react-router-dom";

import Footer from "../../Navbar & Footer/Footer";
import Navbar from "../../Navbar & Footer/Navbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <Navbar></Navbar>

      {/* Drawer Layout */}
      <div className="drawer drawer-end lg:drawer-open">
        <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content px-4 py-6">
          {/* Toggle Button for Small Devices */}
          <label
            htmlFor="admin-drawer"
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

          {/* Main Page Content */}
          <Outlet />
        </div>

        {/* Sidebar */}
        <div className="drawer-side z-15">
          <label htmlFor="admin-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-screen shadow-md shadow-primary bg-base-200 text-base-content space-y-1 pt-15">
            {/* Admin Sidebar Header */}
            <li className="mb-4 text-xl mt-3 -ml-12 font-bold flex items-center">
              <NavLink to="/dashboard/admin">
                <img src="/logo.png" className="w-15" alt="Admin Logo" />
                <span>
                  <span className="text-primary">Admin</span>{" "}
                  <span className="text-secondary">Panel</span>
                </span>
              </NavLink>
            </li>

            {/* Admin Sidebar Links */}
            <li>
              <NavLink to="/dashboard/admin/all-users">👥 All Users</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/admin/all-products">📦 All Products</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/admin/all-ads">📢 All Advertisements</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/admin/all-orders">🧾 All Orders</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/admin/create-offer">🎁 Create Offer</NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminLayout;
