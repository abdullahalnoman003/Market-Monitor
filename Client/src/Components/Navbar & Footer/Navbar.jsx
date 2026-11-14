import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { HiBars3, HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { AuthContext } from "../Authentication/Context/AuthContext";
import useUserRole from "../../Hooks/useUserRole";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext) || {};
  const [userRole] = useUserRole(user?.email);
  const [role, setRole] = useState(() => localStorage.getItem("userRole"));
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole) {
      localStorage.setItem("userRole", userRole);
      setRole(userRole);
    }
  }, [userRole]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    });

    if (!result.isConfirmed) return;

    try {
      await logout();
      Swal.fire({
        title: "Logged out",
        text: "You have been logged out successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Logout failed: ${error.message}`,
        icon: "error",
      });
    }
  };

  const dashboardPath =
    role === "admin"
      ? "/dashboard/admin"
      : role === "vendor"
      ? "/dashboard/vendor"
      : "/dashboard/user";

  const navLinkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
      isActive ? "text-primary bg-primary/10" : "text-base-content/80 hover:text-primary hover:bg-base-200"
    }`;

  const navItems = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-products" className={navLinkClass}>
          All Products
        </NavLink>
      </li>
      <li>
        <NavLink to="/offers" className={navLinkClass}>
          Offers
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={navLinkClass}>
          About Us
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to={dashboardPath} className={navLinkClass}>
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-base-300/60 bg-base-100/85 backdrop-blur-xl">
      <div className="navbar mx-auto min-h-[4.25rem] w-full max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="navbar-start gap-1 sm:gap-2">
          <div className="dropdown lg:hidden">
            <button
              type="button"
              tabIndex={0}
              className="btn btn-ghost btn-sm sm:btn-md"
              aria-label="Open menu"
            >
              <HiBars3 className="text-xl" />
            </button>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[40] mt-3 w-56 rounded-2xl border border-base-300/60 bg-base-100 p-2 shadow-xl"
            >
              {navItems}
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-2 rounded-xl px-1 py-1 sm:px-2">
            <img className="h-8 w-8 sm:h-10 sm:w-10" src="/logo.png" alt="Market Monitor logo" />
            <span className="flex flex-col leading-none">
              <span className="text-sm font-extrabold text-primary sm:text-lg">Market</span>
              <span className="text-xs font-bold text-secondary sm:text-base">Monitor</span>
            </span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">{navItems}</ul>
        </div>

        <div className="navbar-end gap-2">
          {!user ? (
            <div className="flex items-center gap-1 sm:gap-2">
              <NavLink to="/login" className="btn btn-ghost btn-sm sm:btn-md">
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-primary btn-sm sm:btn-md">
                Register
              </NavLink>
            </div>
          ) : (
            <div className="dropdown dropdown-end">
              <button
                type="button"
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar border border-primary/30"
                aria-label="Open user menu"
              >
                <div className="w-9 rounded-full sm:w-10">
                  <img src={user.photoURL || "/default-user.png"} alt={user.displayName || "User avatar"} />
                </div>
              </button>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-[40] mt-3 w-56 rounded-2xl border border-base-300/60 bg-base-100 p-2 shadow-xl"
              >
                <li className="menu-title px-3 py-2 text-xs text-base-content/60">
                  {user.displayName || "Signed in user"}
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2 font-semibold text-error"
                  >
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
