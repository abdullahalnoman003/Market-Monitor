import React from "react";
import { Outlet, NavLink } from "react-router-dom";

import Footer from "../../Navbar & Footer/Footer";
import Navbar from "../../Navbar & Footer/Navbar";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import ScrollToTop from "../../Shared/ScrollToTop";

const adminLinks = [
  { to: "/dashboard/admin/profile", label: "Profile" },
  { to: "/dashboard/admin/all-users", label: "All Users" },
  { to: "/dashboard/admin/all-products", label: "All Products" },
  { to: "/dashboard/admin/all-ads", label: "All Advertisements" },
  { to: "/dashboard/admin/all-orders", label: "All Orders" },
  { to: "/dashboard/admin/create-offer", label: "Create Offer" },
];

const AdminLayout = () => {
  useDocumentTitle("Admin Dashboard | Market Monitor");
  return (
    <div className="max-w-[1537px] mx-auto">
      <div className="min-h-screen flex flex-col bg-transparent pt-[4.5rem]">
        <ScrollToTop />
        <Navbar />

        <div className="drawer drawer-end lg:drawer-open flex-1">
          <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content px-4 py-6">
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
            <Outlet />
          </div>
          <div className="drawer-side z-20">
            <label htmlFor="admin-drawer" className="drawer-overlay"></label>
            <aside className="dashboard-sidebar">
              <div className="dashboard-sidebar-header">
                <NavLink to="/dashboard/admin" className="flex items-center gap-3">
                  <img src="/logo.png" className="h-10 w-10 drop-shadow-sm" alt="Admin Logo" />
                  <div>
                    <p className="text-lg font-bold leading-tight text-base-content">
                      <span className="text-primary">Admin</span> Panel
                    </p>
                    <p className="text-xs text-base-content/60">Marketplace management</p>
                  </div>
                </NavLink>
              </div>
              <ul className="menu flex-1 gap-1.5 px-3 py-4">
                {adminLinks.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `sidebar-link ${isActive ? "sidebar-link-active" : "sidebar-link-idle"}`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="dashboard-sidebar-footer">Market Monitor Admin</div>
            </aside>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
