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
import AllProducts from "../Layout/PublicLayout/AllProducts";
import ProductDetails from "../Layout/PublicLayout/ProductDetails";
import HomeLayout from "../Layout/Home/HomeLayout";
import AllUsers from "../Layout/AdminLayout/AllUsers";
import AllAdvertisements from "../Layout/AdminLayout/AllAdvertisements";
import AllProductsAdmin from "../Layout/AdminLayout/AllProductsAdmin";
import UserLayout from "../Layout/PublicLayout/UserLayout";
import ManageWatchlist from "../Layout/PublicLayout/ManageWatchlist";
import Payment from "../Layout/PublicLayout/Payment/Payment";
import MyOrders from "../Layout/PublicLayout/MyOrders";
import AdminOrderList from "../Layout/AdminLayout/AdminOrderList";
import PriceTrends from "../Layout/PublicLayout/PriceTrends";
import Privacy from "../T&C/Privacy";
import Terms from "../T&C/Terms";
import Contact from "../T&C/Contact";
import About from "../T&C/About";
import SpecialOffer from "../Layout/PublicLayout/SpecialOffer";
import CreateOffer from "../Layout/AdminLayout/CreateOffer";
import Unauthorized from "../Error/Unauthorized";
import AdminRoute from "../Authentication/Routes/AdminRoute";
import VendorRoute from "../Authentication/Routes/VendorRoute";
import AdminWelcome from "../Layout/AdminLayout/AdminWelcome";
import VendorWelcome from "../Layout/VendorLayout/VendorWelcome";
import UserWelcome from "../Layout/PublicLayout/UserWelcome";
import FeaturedSection from "../Layout/Home/FeaturedSection";
import Hero from "../Layout/Home/Hero";
import ProductSection from "../Layout/Home/ProductSection";
import AdvertisementCarousel from "../Layout/Home/AdvertisementCarousel";
import CustomerReviews from "../Layout/Home/CustomerReview";
import HowItWorks from "../Layout/Home/HowItWorks";
import UserStats from "../Layout/Home/UserStats";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        element: <>
        <Hero></Hero>
        <HowItWorks/>
        <AdvertisementCarousel></AdvertisementCarousel>
        <ProductSection></ProductSection>
        <FeaturedSection></FeaturedSection>
        <CustomerReviews></CustomerReviews>
        <UserStats/>
        </>,
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
        path: "privacy",
        element: <Privacy></Privacy>,
      },
      {
        path: "terms",
        element: <Terms />,
      },
      {
        path: "contact-us",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "offers",
        element: <SpecialOffer />,
      },
      {
        path: "unauthorized",
        element: <Unauthorized />,
      },

      {
        path: "/*",
        element: <NotFound></NotFound>,
      },
    ],
  },
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ADMIN <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  {
    path: "/dashboard/admin",
    element: (
      <PrivateRoute><AdminRoute>
        <AdminLayout />
      </AdminRoute></PrivateRoute>
      
    ),
    children: [
      {
        path: "",
        element: <AdminWelcome></AdminWelcome> ,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "all-users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "all-products",
        element: <AllProductsAdmin></AllProductsAdmin>,
      },
      {
        path: "all-orders",
        element: <AdminOrderList></AdminOrderList>,
      },
      {
        path: "all-ads",
        element: <AllAdvertisements></AllAdvertisements>,
      },
      {
        path: "create-offer",
        element: <CreateOffer />,
      },
      {
        path: "update-product/:id",
        element: <UpdateProduct></UpdateProduct>,
      },
      {
        path: "product/:id",
        element: <ProductDetails></ProductDetails>,
      },
    ],
  },
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> USER <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  {
    path: "/dashboard/user",
    element: (
      <PrivateRoute>
        {" "}
        <UserLayout></UserLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <UserWelcome></UserWelcome>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "manage-watchlist",
        element: <ManageWatchlist></ManageWatchlist>,
      },
      {
        path: "orders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "price-trends",
        element: (
          <PrivateRoute>
            <PriceTrends></PriceTrends>
          </PrivateRoute>
        ),
      },
    ],
  },
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Vendor <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  {
    path: "/dashboard/vendor",

    element: (
      <PrivateRoute><VendorRoute>
        <VendorLayout></VendorLayout>
      </VendorRoute></PrivateRoute>
      
    ),
    children: [
      {
        path: "",
        element: <VendorWelcome></VendorWelcome>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "add-product",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "my-products",
        element: <MyProducts></MyProducts>,
      },
      {
        path: "update-product/:id",
        element: <UpdateProduct></UpdateProduct>,
      },
      {
        path: "add-advertisement",
        element: <AdvertisementForm></AdvertisementForm>,
      },
      {
        path: "my-advertisements",
        element: <MyAdvertisements></MyAdvertisements>,
      },
      {
        path: "update-advertisement/:id",
        element: <UpdateAdvertisement></UpdateAdvertisement>,
      },
    ],
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);
export default router;
