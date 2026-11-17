import { Link } from "react-router-dom";
import {
  FaUserShield,
  FaBoxOpen,
  FaBullhorn,
  FaClipboardList,
  FaGift,
  FaUsers,
  FaShoppingCart,
  FaDollarSign,
  FaEye,
  FaCalendarAlt
} from "react-icons/fa";
import CountUp from "react-countup";
import Lottie from "lottie-react";
import adminLottie from "../../Animation/AdminAnimation.json";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Authentication/Context/AuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxios from "../../../Hooks/useAxios";

const AdminWelcome = () => {
  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeVendors: 0,
    pendingApprovals: 0,
    totalViews: 15420,
    monthlyGrowth: 12.5
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const [ordersResponse, usersResponse, productsResponse] = await Promise.all([
          axiosSecure.get("/admin/order").catch((err) => {
            console.error("Orders API Error:", err);
            return { data: [] };
          }),
          axiosSecure.get("/users").catch((err) => {
            console.error("Users API Error:", err);
            return { data: [] };
          }),
          axiosInstance.get("/all-products/v1").catch((err) => {
            console.error("Products API Error:", err);
            return { data: [] };
          })
        ]);

        const usersData = Array.isArray(usersResponse.data) ? usersResponse.data : [];
        const totalUsers = usersData.length;
        const activeVendors = usersData.filter((u) => u.role === "vendor").length;

        let productsData = [];
        if (Array.isArray(productsResponse.data)) {
          productsData = productsResponse.data;
        } else if (productsResponse.data && Array.isArray(productsResponse.data.products)) {
          productsData = productsResponse.data.products;
        } else if (productsResponse.data && typeof productsResponse.data === "object") {
          productsData = productsResponse.data.data || productsResponse.data.result || [];
        }

        const totalProducts = Array.isArray(productsData) ? productsData.length : 0;
        const pendingApprovals = Array.isArray(productsData)
          ? productsData.filter(
              (product) => product.status === "pending" || !product.approved || product.approval === false
            ).length
          : 0;

        const ordersData = Array.isArray(ordersResponse.data) ? ordersResponse.data : [];
        const totalOrders = ordersData.length;
        const totalRevenue = ordersData.reduce((sum, order) => {
          const amount = Number(order.totalAmount ?? order.price ?? 0);
          return sum + (Number.isFinite(amount) ? amount : 0);
        }, 0);

        setStats((prev) => ({
          ...prev,
          totalUsers,
          totalProducts,
          totalOrders,
          totalRevenue,
          activeVendors,
          pendingApprovals
        }));
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [axiosSecure, axiosInstance]);

  const quickActions = [
    { icon: FaUserShield, title: "Manage Users", desc: "Control user accounts", to: "/dashboard/admin/all-users", label: "View Users" },
    { icon: FaBoxOpen, title: "Products", desc: "Manage product listings", to: "/dashboard/admin/all-products", label: "View Products" },
    { icon: FaBullhorn, title: "Advertisements", desc: "Review ad campaigns", to: "/dashboard/admin/all-ads", label: "View Ads" },
    { icon: FaClipboardList, title: "Orders", desc: "Track all transactions", to: "/dashboard/admin/all-orders", label: "View Orders" },
    { icon: FaGift, title: "Offers", desc: "Create promotions", to: "/dashboard/admin/create-offer", label: "Create Offer" }
  ];

  const statTints = [
    { card: "border-primary/20 bg-primary/5", icon: "bg-primary/15 text-primary" },
    { card: "border-secondary/20 bg-secondary/5", icon: "bg-secondary/15 text-secondary" },
    { card: "border-accent/20 bg-accent/5", icon: "bg-accent/20 text-accent" },
    { card: "border-success/20 bg-success/5", icon: "bg-success/15 text-success" },
    { card: "border-info/20 bg-info/5", icon: "bg-info/15 text-info" },
    { card: "border-warning/20 bg-warning/5", icon: "bg-warning/15 text-warning" },
    { card: "border-primary/20 bg-primary/5", icon: "bg-primary/15 text-primary" },
    { card: "border-error/20 bg-error/5", icon: "bg-error/15 text-error" },
  ];

  const statCards = [
    { label: "Total Users", value: stats.totalUsers, icon: FaUsers },
    { label: "Total Products", value: stats.totalProducts, icon: FaBoxOpen },
    { label: "Total Orders", value: stats.totalOrders, icon: FaShoppingCart },
    { label: "Total Revenue", value: stats.totalRevenue, icon: FaDollarSign, prefix: "$", separator: true },
    { label: "Active Vendors", value: stats.activeVendors, icon: FaUserShield },
    { label: "Pending Approvals", value: stats.pendingApprovals, icon: FaClipboardList },
    { label: "Total Views", value: stats.totalViews, icon: FaEye, separator: true },
    { label: "Growth Rate", value: stats.monthlyGrowth, icon: FaCalendarAlt, prefix: "+", suffix: "%", decimals: 1 }
  ];

  return (
    <div className="min-h-screen p-4 lg:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="surface-card overflow-hidden p-6 border-primary/20 bg-gradient-to-br from-primary/5 via-base-100 to-base-100">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div className="min-w-0 flex-1 text-center lg:text-left">
              <h1 className="break-words text-2xl font-bold text-base-content sm:text-3xl lg:text-4xl">
                Welcome back, {user?.displayName || "Admin"}
              </h1>
              <p className="mt-2 max-w-xl break-words text-sm leading-relaxed text-base-content/70 sm:text-base">
                Monitor marketplace activity, manage users and products, and keep operations running smoothly.
              </p>
              <div className="mt-3 flex items-center justify-center gap-2 break-words text-sm text-base-content/60 lg:justify-start">
                <FaCalendarAlt className="shrink-0 text-primary" />
                <span className="min-w-0">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </span>
              </div>
            </div>
            <div className="w-full max-w-[14rem] shrink-0 lg:max-w-[16rem]">
              <Lottie animationData={adminLottie} loop className="w-full" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            const tint = statTints[idx % statTints.length];
            return (
              <div key={card.label} className={`surface-card overflow-hidden p-5 transition-shadow hover:shadow-md ${tint.card}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="break-words text-sm font-medium leading-snug text-base-content/70">{card.label}</p>
                    <p className="mt-1 break-words text-xl font-bold leading-tight text-base-content sm:text-2xl">
                      {loading ? (
                        <span className="loading loading-dots loading-sm"></span>
                      ) : (
                        <>
                          {card.prefix || ""}
                          <CountUp
                            end={Number(card.value) || 0}
                            duration={1.8}
                            separator={card.separator ? "," : ""}
                            decimals={card.decimals || 0}
                            enableScrollSpy
                            scrollSpyOnce
                          />
                          {card.suffix || ""}
                        </>
                      )}
                    </p>
                  </div>
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tint.icon}`}>
                    <Icon className="text-lg" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            const tint = statTints[idx % statTints.length];
            return (
              <div key={action.title} className={`surface-card flex h-full flex-col overflow-hidden p-4 transition-shadow hover:shadow-md ${tint.card}`}>
                <div className={`mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tint.icon}`}>
                  <Icon className="text-lg" />
                </div>
                <h3 className="break-words text-sm font-semibold leading-snug text-base-content sm:text-base">{action.title}</h3>
                <p className="mb-3 mt-1 min-w-0 flex-1 break-words text-xs leading-relaxed text-base-content/70">{action.desc}</p>
                <Link to={action.to} className="btn btn-sm btn-outline btn-primary mt-auto w-full">
                  <span className="truncate">{action.label}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminWelcome;
