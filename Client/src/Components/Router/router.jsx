import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import NotFound from "../Error/NotFound";
import AdminLayout from "../Layout/AdminLayout";
import VendorLayout from "../Layout/VendorLayout";
import Login from "../Authentication/AuthPages/Login";
import ForgotPassword from "../Authentication/AuthPages/ForgotPassword";
import Register from "../Authentication/AuthPages/Register";
const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        element: <></>,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/forgot-password",
        Component: ForgotPassword,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
  {
    path:"/admin-dashboard",
    Component: AdminLayout,
    children: [
        {
            
        },
    ]
  },
  {
    path:"/vendor-dashboard",
    Component: VendorLayout,
    children: [
        {
            
        },
    ]
  },
  {
    path: "/*",
    Component: NotFound,
  },
]);
export default router;
