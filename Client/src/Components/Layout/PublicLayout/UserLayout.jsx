import React from 'react';
import Navbar from '../../Navbar & Footer/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../../Navbar & Footer/Footer';

const UserLayout = () => {
    return (
        <>
        <nav><Navbar></Navbar></nav>
        <main><Outlet></Outlet></main>
        <Footer></Footer>
        </>
    );
};

export default UserLayout;