import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar & Footer/Navbar";
import Footer from "../../Navbar & Footer/Footer";

const HomeLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-base-100">
      <Navbar />
      <main className="flex-1 pt-[4.5rem] sm:pt-[4.75rem]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
