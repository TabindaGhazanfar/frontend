import React, { useState } from "react";
import {
  Home,
  Heart,
  Settings,
  LogOut,
  ShoppingBag,
  User,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ✅ Custom 3-line Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-9 left-2 z-50 flex flex-col justify-between w-7 h-6 bg-transparent border-none cursor-pointer"
      >
        <span
          className={`block h-1 bg-[#299F93] rounded transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-2.5" : ""
          }`}
        ></span>
        <span
          className={`block h-1 bg-[#299F93] rounded transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block h-1 bg-[#299F93] rounded transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2.5" : ""
          }`}
        ></span>
      </button>

      {/* ✅ Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* ✅ Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 mt-16 space-y-6">
          <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-[#299F93]">
            <Home size={20} /> Home
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-[#299F93]">
            <ShoppingBag size={20} /> My Orders
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-[#299F93]">
            <Heart size={20} /> Favorites
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-[#299F93]">
            <User size={20} /> Profile
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-[#299F93]">
            <Settings size={20} /> Settings
          </a>
          <a href="#" className="flex items-center gap-3 text-red-500 hover:text-red-600">
            <LogOut size={20} /> Logout
          </a>
        </div>
      </div>
    </>
  );
}
