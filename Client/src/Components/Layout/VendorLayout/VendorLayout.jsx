import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar & Footer/Navbar";
import Footer from "../../Navbar & Footer/Footer";
import { NavLink } from "react-router-dom";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";

const VendorLayout = () => {
  useDocumentTitle("Vendor Dashboard || Market Monitor")
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <Navbar />
      {/* Drawer Layout */}
      <div className="drawer drawer-end lg:drawer-open">
        <input id="vendor-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content px-4 py-6">
          <label
            htmlFor="vendor-drawer"
            className="btn btn-primary drawer-button lg:hidden mb-4"
          ><svg
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

        <div className="drawer-side z-15">
          <label htmlFor="vendor-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-screen  shadow-md shadow-primary bg-base-200 text-base-content space-y-1 pt-15">
            {/* Vendor Sidebar Content */}
            <li className="mb-4 text-xl mt-3 -ml-12 font-bold flex items-center ">
              <NavLink to="/dashboard/vendor">
                <img src="/logo.png" className="w-15 " alt="Logo" />
                <span>
                  <span className="text-primary">Vendor</span>{" "}
                  <span className="text-secondary">Panel</span>
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/vendor/add-product">
                ➕ Add Product
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/vendor/my-products">
                📦 My Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/vendor/add-advertisement">
                📢 Add Advertisement
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/vendor/my-advertisements">
                🗂 My Advertisements
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VendorLayout;
