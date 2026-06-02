import { NavLink, useNavigate } from "react-router-dom";
import {
  User,
  Briefcase,
  Heart,
  Send,
  BarChart,
  PanelLeft,
  X,
  FileText
} from "lucide-react";

import logo from "../assets/logo.jpeg";
import { useEffect, useState } from "react";

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
  collapsed,
  setCollapsed
}) {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // =========================
  // LOAD + SYNC USER
  // =========================
  useEffect(() => {

    const loadUser = () => {
      try {
        const saved = localStorage.getItem("user");
        setUser(saved ? JSON.parse(saved) : null);
      } catch {
        setUser(null);
      }
    };

    loadUser();

    // 🔥 IMPORTANT: sync with navbar instantly
    window.addEventListener("authChange", loadUser);
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("authChange", loadUser);
      window.removeEventListener("storage", loadUser);
    };

  }, []);

  const menu = [
    { name: "Jobs", path: "/", icon: <Briefcase size={18} /> },
    { name: "Saved", path: "/saved", icon: <Heart size={18} /> },
    { name: "Applied", path: "/applied", icon: <Send size={18} /> },
    { name: "Dashboard", path: "/dashboard", icon: <BarChart size={18} /> },
    { name: "Profile", path: "/profile", icon: <User size={18} /> },
    { name: "Resume", path: "/resume", icon: <FileText size={18} /> },
  ];

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("user");

    // 🔥 sync all components instantly
    window.dispatchEvent(new Event("authChange"));

    navigate("/login");
  };

  return (
    <>
      {/* MOBILE BACKDROP */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <div className={`
        fixed top-0 left-0 z-50
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        ${collapsed ? "w-20" : "w-64"}
        h-screen
        backdrop-blur-xl
        bg-white/80 dark:bg-[#020617]/90
        border-r border-gray-200 dark:border-gray-700
        transition-all duration-300 shadow-xl
      `}>

        {/* TOP */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">

          <div className="flex items-center gap-2">
            <img src={logo} className="w-9 h-9" alt="logo" />

            {!collapsed && (
              <h2 className="font-bold text-xl text-purple-600 dark:text-teal-400">
                Job_Hunt
              </h2>
            )}
          </div>

          <div className="flex items-center gap-2">
            <PanelLeft
              size={20}
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:block cursor-pointer text-gray-700 dark:text-white"
            />

            <X
              size={20}
              onClick={() => setMobileOpen(false)}
              className="md:hidden cursor-pointer text-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* MENU */}
        <div className="flex flex-col gap-2 p-4 mt-2">

          {menu.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                ${
                  isActive
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 dark:from-teal-500 dark:to-cyan-600 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-gray-800"
                }`
              }
            >
              {item.icon}

              {!collapsed && (
                <span className="font-medium text-sm">
                  {item.name}
                </span>
              )}
            </NavLink>
          ))}

        </div>

        {/* FOOTER */}
        {!collapsed && (
          <div className="absolute bottom-5 left-4 right-4">

            {/* USER CARD */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 dark:from-teal-500 dark:to-cyan-600 text-white shadow-xl flex items-center justify-between">

              {/* USER INFO */}
              <div>
                <h3 className="font-bold text-sm">
                  {user?.name || "Guest"}
                </h3>
                <p className="text-xs opacity-80">
                  {user ? "Logged In" : "Not Logged In"}
                </p>
              </div>

              {/* LOGOUT BUTTON */}
              {user && (
                <button
                  onClick={handleLogout}
                  className="
                    px-3 py-1 rounded-lg
                    bg-black/20
                    text-xs font-medium
                    hover:bg-black/30
                    transition
                  "
                >
                  Logout
                </button>
              )}

            </div>

          </div>
        )}

      </div>
    </>
  );
}
