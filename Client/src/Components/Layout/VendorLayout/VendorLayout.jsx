import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import Navbar from "../../Navbar & Footer/Navbar";
import Footer from "../../Navbar & Footer/Footer";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import ScrollToTop from "../../Shared/ScrollToTop";

const vendorLinks = [
  { to: "/dashboard/vendor/profile", label: "Profile" },
  { to: "/dashboard/vendor/add-product", label: "Add Product" },
  { to: "/dashboard/vendor/my-products", label: "My Products" },
  { to: "/dashboard/vendor/add-advertisement", label: "Add Advertisement" },
  { to: "/dashboard/vendor/my-advertisements", label: "My Advertisements" },
];

const VendorLayout = () => {
  useDocumentTitle("Vendor Dashboard || Market Monitor");
  return (
    <div className="max-w-[1537px] mx-auto">
      <div className="min-h-screen flex flex-col bg-transparent pt-[4.5rem]">
        <ScrollToTop />
        <Navbar />
        <div className="drawer drawer-end lg:drawer-open flex-1">
          <input id="vendor-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content px-4 py-6">
            <label
              htmlFor="vendor-drawer"
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
            <label htmlFor="vendor-drawer" className="drawer-overlay"></label>
            <aside className="dashboard-sidebar">
              <div className="dashboard-sidebar-header">
                <NavLink to="/dashboard/vendor" className="flex items-center gap-3">
                  <img src="/logo.png" className="h-10 w-10 drop-shadow-sm" alt="Logo" />
                  <div>
                    <p className="text-lg font-bold leading-tight text-base-content">
                      <span className="text-primary">Vendor</span> Panel
                    </p>
                    <p className="text-xs text-base-content/60">Products & promotions</p>
                  </div>
                </NavLink>
              </div>
              <ul className="menu flex-1 gap-1.5 px-3 py-4">
                {vendorLinks.map((item) => (
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
              <div className="dashboard-sidebar-footer">Market Monitor Vendor</div>
            </aside>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default VendorLayout;
