import React from 'react';
import VendorNav from '../../Navbar & Footer/VendorNav';
import { Outlet } from 'react-router-dom';
import Footer from '../../Navbar & Footer/Footer';

const VendorLayout = () => {
    return (
        <div>
            <VendorNav></VendorNav>
            <Outlet></Outlet>
            This is for vendor.
            <Footer></Footer>

        </div>
    );
};

export default VendorLayout;