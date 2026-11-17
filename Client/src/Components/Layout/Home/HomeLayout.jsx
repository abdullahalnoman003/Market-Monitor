import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar & Footer/Navbar";
import Footer from "../../Navbar & Footer/Footer";
import ScrollToTop from "../../Shared/ScrollToTop";

const HomeLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-transparent pt-[4.5rem]">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
