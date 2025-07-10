import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import NotFound from "../Error/NotFound";
import AdminLayout from "../Layout/AdminLayout";
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
        path: "/register",
        element: (
          <PublicRoute>
            <Register></Register>
          </PublicRoute>
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
    children: [{}],
  },
  {
    path: "/dashboard/vendor",
    element: <VendorLayout></VendorLayout>,
    children: [
      {
        path: "add-product",
        element: (
          <PrivateRoute>
            <AddProduct></AddProduct>
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
    ],
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);
export default router;
