import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaShoppingCart, FaChartLine } from "react-icons/fa";
import Lottie from "lottie-react";
import userLottie from "../../Animation/UserAnimation.json";
import { useContext } from "react";
import { AuthContext } from "../../Authentication/Context/AuthContext";

const actions = [
  { icon: FaHeart, title: "Manage Watchlist", desc: "View and organize your saved items.", to: "/dashboard/user/manage-watchlist", label: "Go to Watchlist", tint: "border-accent/20 bg-accent/5", iconTint: "bg-accent/20 text-accent" },
  { icon: FaShoppingCart, title: "My Orders", desc: "Check order status and history.", to: "/dashboard/user/orders", label: "Go to Orders", tint: "border-info/20 bg-info/5", iconTint: "bg-info/15 text-info" },
  { icon: FaChartLine, title: "Price Trends", desc: "Analyze market prices for your products.", to: "/dashboard/user/price-trends", label: "View Trends", tint: "border-secondary/20 bg-secondary/5", iconTint: "bg-secondary/15 text-secondary" },
];

const UserWelcome = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-full space-y-6">
      <div className="surface-card overflow-hidden p-6 border-info/20 bg-gradient-to-br from-info/5 via-base-100 to-base-100">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="min-w-0 flex-1 text-center md:text-left">
            <h1 className="break-words text-3xl font-bold text-primary sm:text-4xl">
              Welcome, {user?.displayName || "User"}!
            </h1>
            <p className="mt-2 max-w-md break-words text-base leading-relaxed text-base-content/70">
              Track your watchlist, manage your orders, and view market trends from your dashboard.
            </p>
          </div>
          <div className="w-full max-w-[14rem] shrink-0">
            <Lottie animationData={userLottie} loop />
          </div>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        {actions.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}
              whileHover={{ y: -3 }}
              className={`surface-card flex h-full flex-col overflow-hidden p-5 ${item.tint}`}
            >
              <div className={`mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.iconTint}`}>
                <Icon className="text-lg" />
              </div>
              <h2 className="break-words text-lg font-semibold leading-snug text-base-content">{item.title}</h2>
              <p className="mb-4 mt-1 min-w-0 flex-1 break-words text-sm leading-relaxed text-base-content/70">{item.desc}</p>
              <Link to={item.to} className="btn btn-primary btn-sm mt-auto w-full sm:w-fit">
                <span className="truncate">{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default UserWelcome;
