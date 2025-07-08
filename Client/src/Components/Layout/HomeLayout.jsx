import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar & Footer/Navbar";
import Footer from "../Navbar & Footer/Footer";

const HomeLayout = () => {
  return (
    <>
      <nav>
        <Navbar></Navbar>
      </nav>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
};

export default HomeLayout;
