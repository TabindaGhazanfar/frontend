import React from "react";
import LoginIllustration from "../assets/illustrationLogin.svg"; // ✅ use correct asset file

export default function LoginModal({ open = true, onClose = () => {} }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="w-full max-w-[1000px] rounded-3xl bg-white overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black hover:text-gray-700 text-2xl z-50"
        >
          ✕
        </button>

        <section className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left – Login Form */}
          <div className="bg-white p-10 md:p-14 relative">
            <div className="absolute w-[350px] h-[350px] bg-[#00a693]/20 blur-[120px] rounded-full -top-10 -left-10"></div>

            <h1 className="text-3xl font-bold text-gray-900">Welcome back 👋</h1>
            <p className="text-gray-500 text-sm mt-1">
              Please enter your details to continue
            </p>

            <form
              className="mt-8 space-y-6"
              onSubmit={(e) => e.preventDefault()}
              noValidate
            >
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-4 focus:ring-[#00A693]/20 focus:border-[#00A693]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-4 focus:ring-[#00A693]/20 focus:border-[#00A693]"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="h-4 w-4 text-[#00A693]" /> Remember me
                </label>
                <a href="#" className="text-sm text-[#00A693] hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#00A693] py-3 text-white font-semibold hover:brightness-110 active:scale-95 transition"
              >
                Log in
              </button>

              <p className="text-center text-sm text-gray-500">
                Don’t have an account?{" "}
                <a href="/register" className="text-[#007a6a] font-medium hover:underline">
                  Create one
                </a>
              </p>
            </form>
          </div>

          {/* Right – Illustration Panel */}
          <div className="relative bg-gradient-to-br from-[#00A693] to-[#008b73] flex items-center justify-center p-10">
            <img
              src={LoginIllustration}
              alt="Login Illustration"
              className="w-[85%] max-w-md drop-shadow-xl"
            />
            <div className="pointer-events-none absolute -top-16 -right-20 h-[300px] w-[300px] rounded-full bg-white/30 blur-3xl" />
          </div>
        </section>
      </div>
    </div>
  );
}
