import React from 'react';
import AdminNav from '../Navbar & Footer/AdminNav';
import Footer from '../Navbar & Footer/Footer';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div>
            <AdminNav></AdminNav>
            <Outlet></Outlet>
            This is the layout for adminn,
            <Footer></Footer>
        </div>
    );
};

export default AdminLayout;