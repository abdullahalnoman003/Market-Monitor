import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import NotFound from "../Error/NotFound";
import AdminLayout from "../Layout/AdminLayout";
import VendorLayout from "../Layout/VendorLayout";
import Login from "../Authentication/AuthPages/Login";
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
