import React, { useState } from "react";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

// ✅ Validation function
export const validateLogin = (email, password) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) errors.email = "Email is required";
  else if (!emailRegex.test(email)) errors.email = "Enter a valid email";

  if (!password) errors.password = "Password is required";
  else if (password.length < 6)
    errors.password = "Password must be at least 6 characters";

  return errors;
};

export default function Login({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    const validationErrors = validateLogin(email, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert(`Logging in with ${email}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full md:w-[2000px] h-[1000vh] max-h-[850px] overflow-hidden scale-105">

        
        {/* LEFT SIDE — LOGIN FORM */}
        <div className="flex-1 p-10 flex flex-col justify-center text-black">
          <h2 className="text-4xl font-bold text-[#299F93] mb-6 text-center flex items-center justify-center gap-2">
            <LogIn size={28} /> Login to{" "}
            <span className="text-[#C47C5E]">EasyRent</span>
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-[#299F93] transition">
                <Mail size={20} className="text-gray-500 mr-2" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full outline-none text-gray-800"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-[#299F93] transition">
                <Lock size={20} className="text-gray-500 mr-2" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full outline-none text-gray-800"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#299F93]"
                />
                Remember Me
              </label>
              <button
                type="button"
                className="text-[#299F93] hover:text-[#227c70] font-medium transition"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="bg-[#299F93] hover:bg-[#227c70] text-white py-2 rounded-md font-semibold flex items-center justify-center gap-2 transition"
            >
              <ArrowRight size={18} /> Login
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-3">
              <hr className="flex-1 border-gray-300" />
              <span className="text-gray-500 text-sm">or</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Sign in with Google */}
            <button
              type="button"
              className="border border-gray-300 hover:bg-gray-50 py-2 rounded-md font-medium flex items-center justify-center gap-2 transition"
            >
              <FcGoogle size={22} /> Sign in with Google
            </button>
          </form>

          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="mt-6 text-center text-gray-500 hover:text-gray-800 text-sm transition"
          >
            Cancel
          </button>
        </div>

        {/* RIGHT SIDE — IMAGE */}
        <div className="hidden md:flex flex-1 bg-[#E9F7F6] items-center justify-center">
          <div className="text-center">
            <img
              src="/your-image.jpg"
              alt="Login illustration"
              className="max-w-[90%] rounded-2xl shadow-md"
            />
            <p className="text-[#299F93] mt-4 font-semibold text-lg">
              Welcome Back ❤️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
