import { useState, useEffect } from "react";
import {
  Bell,
  MessageCircle
} from "lucide-react";

import { getUser } from "../auth";

export default function Navbar({ collapsed }) {

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  // =========================
  // LIVE USER SYNC
  // =========================
  useEffect(() => {

    const loadUser = () => {
      setUser(getUser());
    };

    // initial load
    loadUser();

    // update when login/logout happens
    window.addEventListener("authChange", loadUser);

    return () => {
      window.removeEventListener("authChange", loadUser);
    };

  }, []);

  // =========================
  // THEME TOGGLE
  // =========================
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      {/* NAVBAR */}
      <div
        className={`
          h-16
          fixed top-0 right-0 z-50
          flex justify-end items-center
          px-6
          backdrop-blur-xl
          bg-white/70 dark:bg-[#020617]/70
          border-b border-gray-200 dark:border-gray-700
          transition-all duration-300

          ${collapsed ? "left-20" : "left-64"}
        `}
      >

        <div className="flex items-center gap-4">

          {/* NOTIFICATION */}
          <Bell
            size={22}
            className="cursor-pointer text-gray-700 dark:text-white"
          />

          {/* MESSAGE */}
          <MessageCircle
            size={22}
            className="cursor-pointer text-gray-700 dark:text-white"
          />

          {/* THEME TOGGLE */}
          <div
            onClick={toggleTheme}
            className="
              w-14 h-7
              rounded-full
              p-1
              flex items-center
              cursor-pointer

              bg-gradient-to-r
              from-pink-500 to-purple-600
              dark:from-teal-500 dark:to-cyan-500
            "
          >
            <div
              className="
                w-5 h-5 rounded-full
                bg-white
                transition-all duration-300
                dark:translate-x-7
              "
            />
          </div>

          {/* PROFILE */}
          <div className="relative">

            {/* AVATAR */}
            <div
              onClick={() => setOpen(!open)}
              className="
                w-10 h-10 rounded-full
                bg-gradient-to-r
                from-pink-500 to-purple-600
                dark:from-teal-500 dark:to-cyan-500

                flex items-center justify-center
                text-white font-bold
                cursor-pointer
                overflow-hidden
              "
            >

              {user?.photo ? (
                <img
                  src={user.photo}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>
                  {user?.name
                    ? user.name.charAt(0).toUpperCase()
                    : "G"}
                </span>
              )}

            </div>

            {/* DROPDOWN */}
            {open && (
              <div
                className="
                  absolute right-0 mt-3
                  w-72 rounded-3xl p-5

                  backdrop-blur-2xl
                  bg-white/80
                  dark:bg-[#0f172a]/90

                  border border-white/20
                  dark:border-gray-700

                  shadow-2xl
                "
              >

                {/* USER INFO */}
                <div className="text-center">

                  <div
                    className="
                      w-20 h-20 rounded-full mx-auto

                      bg-gradient-to-r
                      from-pink-500 to-purple-600
                      dark:from-teal-500 dark:to-cyan-500

                      flex items-center justify-center
                      text-white text-3xl font-bold
                      overflow-hidden
                    "
                  >

                    {user?.photo ? (
                      <img
                        src={user.photo}
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>
                        {user?.name
                          ? user.name.charAt(0).toUpperCase()
                          : "G"}
                      </span>
                    )}

                  </div>

                  <h2 className="mt-3 text-lg font-bold dark:text-white">
                    {user?.name || "Guest User"}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {user?.email || "Not Logged In"}
                  </p>

                </div>

                {/* STATUS BUTTON */}
                {/* STATUS BUTTON */}
<div className="mt-5">

  {!user?.email ? (

    <button
      onClick={() => window.location.href = "/login"}
      className="
        w-full py-3 rounded-xl font-semibold text-white

        bg-gradient-to-r
        from-pink-500 to-purple-600
        dark:from-teal-500 dark:to-cyan-500

        shadow-lg
        hover:scale-[1.02]
        transition-all duration-200
      "
    >
      Login
    </button>

  ) : (

    <button
      onClick={() => {
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("authChange"));
        window.location.href = "/login";
      }}
      className="
        w-full py-3 rounded-xl font-semibold text-white

        bg-gradient-to-r
        from-pink-500 to-purple-600
        dark:from-teal-500 dark:to-cyan-500

        shadow-lg
        hover:scale-[1.02]
        transition-all duration-200
      "
    >
      Logout
    </button>

  )}

</div>
              </div>
            )}

          </div>

        </div>

      </div>
    </>
  );
}
