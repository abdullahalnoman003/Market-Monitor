import { createBrowserRouter } from "react-router-dom";
import NotFound from "../Error/NotFound";
import AdminLayout from "../Layout/AdminLayout/AdminLayout";
import VendorLayout from "../Layout/VendorLayout/VendorLayout";
import Login from "../Authentication/AuthPages/Login";
import ForgotPassword from "../Authentication/AuthPages/ForgotPassword";
import Register from "../Authentication/AuthPages/Register";
import PrivateRoute from "../Authentication/Routes/PrivateRoute";
import PublicRoute from "../Authentication/Routes/PublicRoute";
import AddProduct from "../Layout/VendorLayout/AddProduct";
import MyProducts from "../Layout/VendorLayout/MyProducts";
import UpdateProduct from "../Layout/VendorLayout/UpdateProduct";
import ProductNotFound from "../Error/ProductNotFound";
import Profile from "../Authentication/AuthPages/Profile";
import AdvertisementForm from "../Layout/VendorLayout/AdvertisementForm";
import MyAdvertisements from "../Layout/VendorLayout/MyAdvertisements";
import UpdateAdvertisement from "../Layout/VendorLayout/UpdateAdvertisement";
import WelcomeVendor from "../Layout/VendorLayout/WelcomeVendor";
import AllProducts from "../Layout/PublicLayout/AllProducts";
import ProductDetails from "../Layout/PublicLayout/ProductDetails";
import HomeLayout from "../Layout/Home/HomeLayout";
import WelcomeAdmin from "../Layout/AdminLayout/WelcomeAdmin";
import AllUsers from "../Layout/AdminLayout/AllUsers";
import AllAdvertisements from "../Layout/AdminLayout/AllAdvertisements";
import AllProductsAdmin from "../Layout/AdminLayout/AllProductsAdmin";
import UserLayout from "../Layout/PublicLayout/UserLayout";
import ManageWatchlist from "../Layout/PublicLayout/ManageWatchlist";
import Payment from "../Layout/PublicLayout/Payment/Payment";
import MyOrders from "../Layout/PublicLayout/MyOrders";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        element: <></>,
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login></Login>
          </PublicRoute>
        ),
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
      {
        path: "/all-products",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/register",
        element: (
          <PublicRoute>
            <Register></Register>
          </PublicRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "payment/:id",
        element: (
          <PrivateRoute>
           <Payment></Payment>
          </PrivateRoute>
        ),
      },
      
      {
        path: "/*",
        element: <NotFound></NotFound>,
      },
    ],
  },
  {
    path: "/dashboard/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <WelcomeAdmin></WelcomeAdmin>,
      },
      {
        path: "all-users",
        element: (
          <PrivateRoute>
            <AllUsers></AllUsers>
          </PrivateRoute>
        ),
      },
      {
        path: "all-products",
        element: (
          <PrivateRoute>
            <AllProductsAdmin></AllProductsAdmin>
          </PrivateRoute>
        ),
      },
      {
        path: "all-ads",
        element: (
          <PrivateRoute>
            <AllAdvertisements></AllAdvertisements>
          </PrivateRoute>
        ),
      },
      {
        path: "update-product/:id",
        element: (
          <PrivateRoute>
            <UpdateProduct></UpdateProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "product/:id",
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path:"/dashboard/user",
    element: <UserLayout></UserLayout>,
    children:[
      {
        path:"manage-watchlist",
        element: <ManageWatchlist></ManageWatchlist>
      },
      {
        path: "orders",
        element: (
          <PrivateRoute>
           <MyOrders></MyOrders>
          </PrivateRoute>
        ),
      },
    ]
  },
  {
    path: "/dashboard/vendor",
    element: <VendorLayout></VendorLayout>,
    children: [
      {
        path: "",
        element: (
          <PrivateRoute>
            <WelcomeVendor></WelcomeVendor>
          </PrivateRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <PrivateRoute>
            <AddProduct></AddProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "my-products",
        element: (
          <PrivateRoute>
            <MyProducts></MyProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "update-product/:id",
        element: (
          <PrivateRoute>
            <UpdateProduct></UpdateProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "add-advertisement",
        element: (
          <PrivateRoute>
            <AdvertisementForm></AdvertisementForm>
          </PrivateRoute>
        ),
      },
      {
        path: "my-advertisements",
        element: (
          <PrivateRoute>
            <MyAdvertisements></MyAdvertisements>
          </PrivateRoute>
        ),
      },
      {
        path: "update-advertisement/:id",
        element: (
          <PrivateRoute>
            <UpdateAdvertisement></UpdateAdvertisement>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);
export default router;
