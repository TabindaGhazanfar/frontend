import React from "react";
import LoginIllustration from "../assets/illustrationLogin.svg"; // <-- ensure this file exists

export default function Login() {
  return (
    /* Blank canvas that centers a fixed window */
    <main className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Fixed-size window */}
      <div className="w-full h-screen flex items-center justify-center p-6">

        {/* Poster card (split layout) */}
        <section
  className="
    w-full max-w-[1000px] min-h-[600px]
    rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)]
    border border-gray-100 overflow-hidden
    grid grid-cols-1 md:grid-cols-2 bg-white
  "
>
<div className="absolute w-[400px] h-[400px] bg-[#00a693]/20 blur-[120px] rounded-full"></div>

          {/* Left – Login Form */}
          <div className="bg-white p-10 md:p-14">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome back <span aria-hidden>👋</span>
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Please enter your details to continue
            </p>

            <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()} noValidate>
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

          {/* Right – Illustration panel */}
          <div className="relative bg-gradient-to-br from-[#00A693] to-[#008b73] flex items-center justify-center p-10">
            <img
              src={LoginIllustration}
              alt="Login Illustration"
              className="w-[85%] max-w-md drop-shadow-xl"
            />
            <div className="pointer-events-none absolute -top-16 -right-20 h-72 w-72 rounded-full bg-white/30 blur-3xl" />
          </div>
        </section>
      </div>
    </main>
  );
}
