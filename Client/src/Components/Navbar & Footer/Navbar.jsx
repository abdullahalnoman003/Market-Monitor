import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { HiBars3, HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { AuthContext } from "../Authentication/Context/AuthContext";
import useUserRole from "../../Hooks/useUserRole";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext) || {};
  const [userRole] = useUserRole(user?.email);
  const [role, setRole] = useState(() => localStorage.getItem("userRole"));
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "forest" || saved === "dark" ? "forest" : "light";
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (userRole) {
      localStorage.setItem("userRole", userRole);
      setRole(userRole);
    }
  }, [userRole]);

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) return;

    try {
      await logout();
      toast.success("You have been logged out.");
      const canGoBack =
        typeof window !== "undefined" &&
        window.history.state?.idx > 0 &&
        !location.pathname.startsWith("/dashboard");
      if (canGoBack) navigate(-1);
      else navigate("/", { replace: true });
    } catch (error) {
      toast.error(`Logout failed: ${error.message}`);
    }
  };

  const dashboardPath =
    role === "admin"
      ? "/dashboard/admin"
      : role === "vendor"
      ? "/dashboard/vendor"
      : "/dashboard/user";

  const navLinkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-primary/10 text-primary"
        : "text-base-content/80 hover:bg-base-200 hover:text-base-content"
    }`;

  const navItems = (
    <>
      <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
      <li><NavLink to="/all-products" className={navLinkClass}>All Products</NavLink></li>
      <li><NavLink to="/offers" className={navLinkClass}>Offers</NavLink></li>
      <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>
      {user && <li><NavLink to={dashboardPath} className={navLinkClass}>Dashboard</NavLink></li>}
    </>
  );

  const ThemeIcon = theme === "forest" ? HiOutlineMoon : HiOutlineSun;

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <div className="navbar mx-auto min-h-[4rem] w-full max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="navbar-start gap-1 sm:gap-2">
          <div className="dropdown lg:hidden">
            <button type="button" tabIndex={0} className="btn btn-ghost btn-sm" aria-label="Open menu">
              <HiBars3 className="text-xl" />
            </button>
            <ul tabIndex={0} className="menu dropdown-content z-[40] mt-3 w-56 rounded-lg border border-base-300 bg-base-100 p-2 shadow-sm">
              {navItems}
              <li className="mt-1 border-t border-base-300 pt-2">
                <details>
                  <summary className="flex items-center gap-2"><ThemeIcon className="text-base" /> Theme</summary>
                  <ul>
                    <li><button type="button" onClick={() => setTheme("light")} className={theme === "light" ? "active" : ""}>Light</button></li>
                    <li><button type="button" onClick={() => setTheme("forest")} className={theme === "forest" ? "active" : ""}>Dark</button></li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-2 rounded-md px-1 py-1 sm:px-2">
            <img className="h-8 w-8 sm:h-9 sm:w-9" src="/logo.png" alt="Market Monitor logo" />
            <span className="text-sm font-bold text-base-content sm:text-base">
              Market<span className="text-primary">Monitor</span>
            </span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">{navItems}</ul>
        </div>

        <div className="navbar-end gap-1 sm:gap-2">
          <div className="dropdown dropdown-end hidden sm:block">
            <button type="button" tabIndex={0} className="btn btn-ghost btn-sm gap-1" aria-label="Change theme">
              <ThemeIcon className="text-lg" />
              <span className="hidden md:inline text-xs">Theme</span>
            </button>
            <ul tabIndex={0} className="menu dropdown-content z-[40] mt-2 w-40 rounded-lg border border-base-300 bg-base-100 p-2 shadow-sm">
              <li><button type="button" onClick={() => setTheme("light")} className={theme === "light" ? "active font-semibold" : ""}>Light</button></li>
              <li><button type="button" onClick={() => setTheme("forest")} className={theme === "forest" ? "active font-semibold" : ""}>Dark</button></li>
            </ul>
          </div>

          {!user ? (
            <div className="flex items-center gap-1 sm:gap-2">
              <NavLink to="/login" state={{ from: location }} className="btn btn-ghost btn-sm sm:btn-md">Login</NavLink>
              <NavLink to="/register" state={{ from: location.state?.from || location }} className="btn btn-primary btn-sm sm:btn-md">Register</NavLink>
            </div>
          ) : (
            <div className="dropdown dropdown-end">
              <button type="button" tabIndex={0} className="btn btn-ghost btn-circle avatar border border-base-300" aria-label="Open user menu">
                <div className="w-9 rounded-full sm:w-10">
                  <img src={user.photoURL || "/default-user.png"} alt={user.displayName || "User avatar"} />
                </div>
              </button>
              <ul tabIndex={0} className="menu dropdown-content z-[40] mt-3 w-56 rounded-lg border border-base-300 bg-base-100 p-2 shadow-sm">
                <li className="menu-title px-3 py-2 text-xs text-base-content/60">{user.displayName || "Signed in user"}</li>
                <li>
                  <button type="button" onClick={handleLogout} className="flex items-center gap-2 font-medium text-error">
                    <HiOutlineArrowRightOnRectangle className="text-lg" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
