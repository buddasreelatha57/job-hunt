import { useState } from "react";
import axios from "axios";

import {
  useNavigate,
  NavLink
} from "react-router-dom";

import {
  Eye,
  EyeOff
} from "lucide-react";

export default function Register() {

  const navigate = useNavigate();

  // ================= FORM =================
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    telegramPhone: ""
  });

  // ================= STATES =================
  const [loading, setLoading] =
    useState(false);

  const [showPassword,
    setShowPassword] =
    useState(false);

  // ================= REGISTER =================
  const handleRegister = async () => {

    try {

      setLoading(true);

      const res = await axios.post(
        "https://job-hunt-kpht.onrender.com/api/auth/register",
        form
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user || form
        )
      );

      alert(
        "Registered Successfully 🚀"
      );

      navigate("/profile");

    } catch (err) {

      console.log(err);

      alert(
        err?.response?.data?.message ||
        "Register Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div
      className="
        relative
        min-h-screen
        overflow-hidden

        flex
        justify-center
        items-center

        px-4
        py-10

        bg-gradient-to-br
        from-pink-100
        via-white
        to-purple-100

        dark:from-[#020617]
        dark:via-[#0f172a]
        dark:to-[#111827]
      "
    >

      {/* BACKGROUND GLOW */}
      <div
        className="
          absolute
          top-0 left-0

          w-96 h-96
          rounded-full

          bg-pink-500/30
          dark:bg-teal-500/20

          blur-3xl
          animate-pulse
        "
      />

      <div
        className="
          absolute
          bottom-0 right-0

          w-96 h-96
          rounded-full

          bg-purple-500/30
          dark:bg-cyan-500/20

          blur-3xl
          animate-pulse
        "
      />

      {/* CARD */}
      <div
        className="
          relative
          z-10

          w-full
          max-w-md

          p-6 md:p-8

          rounded-[32px]

          backdrop-blur-2xl

          bg-white/30
          dark:bg-white/10

          border
          border-white/20

          shadow-2xl
        "
      >

        {/* LOGO */}
        <div className="flex justify-center mb-5">

          <div
            className="
              px-6
              py-4

              rounded-3xl

              bg-gradient-to-r
              from-pink-500
              to-purple-600

              dark:from-teal-500
              dark:to-cyan-500
            "
          >

            <h1 className="text-white text-2xl font-black">
              Job_Hunt
            </h1>

          </div>

        </div>

        {/* TITLE */}
        <h2
          className="
            text-3xl md:text-4xl
            font-black
            text-center

            bg-gradient-to-r
            from-pink-500
            to-purple-600

            dark:from-teal-400
            dark:to-cyan-400

            bg-clip-text
            text-transparent
          "
        >
          Create Account
        </h2>

        <p
          className="
            text-center
            text-sm

            text-gray-600
            dark:text-gray-300

            mt-3
            mb-8
          "
        >
          Join AI Powered Job_Hunt 🚀
        </p>

        {/* NAME */}
        <input
          value={form.name}
          placeholder="Full Name"
          className="
            w-full
            p-4
            mb-4

            rounded-2xl

            bg-white/40
            dark:bg-white/10

            border
            border-white/20

            outline-none

            text-black
            dark:text-white
          "
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
            })
          }
        />

        {/* EMAIL */}
        <input
          type="email"
          value={form.email}
          placeholder="Email Address"
          className="
            w-full
            p-4
            mb-4

            rounded-2xl

            bg-white/40
            dark:bg-white/10

            border
            border-white/20

            outline-none

            text-black
            dark:text-white
          "
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        {/* PASSWORD */}
        <div className="relative">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            value={form.password}
            placeholder="Password"
            className="
              w-full
              p-4
              mb-4

              rounded-2xl

              bg-white/40
              dark:bg-white/10

              border
              border-white/20

              outline-none

              text-black
              dark:text-white
            "
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value
              })
            }
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="
              absolute
              right-4
              top-4

              text-gray-500
              dark:text-gray-300
            "
          >

            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}

          </button>

        </div>

        {/* TELEGRAM NUMBER OPTIONAL */}
        <div
          className="
            mb-6

            rounded-2xl

            bg-white/40
            dark:bg-white/10

            border
            border-white/20

            p-4
          "
        >

          <h3
            className="
              font-semibold
              text-gray-700
              dark:text-white
              mb-3
            "
          >
            Telegram Number (Optional)
          </h3>

          <input
            type="text"
            value={form.telegramPhone}
            placeholder="+91 9876543210"
            className="
              w-full
              p-4

              rounded-2xl

              bg-white/50
              dark:bg-white/10

              border
              border-white/20

              outline-none

              text-black
              dark:text-white
            "
            onChange={(e) =>
              setForm({
                ...form,
                telegramPhone:
                  e.target.value
              })
            }
          />

        </div>

        {/* REGISTER */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="
            w-full
            py-4

            rounded-2xl

            text-white
            font-semibold

            shadow-xl

            bg-gradient-to-r
            from-pink-500
            to-purple-600

            dark:from-teal-500
            dark:to-cyan-500
          "
        >

          {loading
            ? "Creating Account..."
            : "Register"}

        </button>

        {/* LOGIN */}
        <p
          className="
            text-center
            text-sm

            text-gray-600
            dark:text-gray-300

            mt-6
          "
        >

          Already have an account?

          <NavLink
            to="/login"
            className="
              ml-2
              font-semibold

              text-purple-600
              dark:text-teal-400
            "
          >
            Login
          </NavLink>

        </p>

      </div>

    </div>
  );
}
