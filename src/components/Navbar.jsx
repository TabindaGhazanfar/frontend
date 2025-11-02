// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, LogIn } from "lucide-react";
import Sidebar from "./Sidebar"; // ✅ Import Sidebar

export default function Navbar() {
  const [openCategory, setOpenCategory] = useState(null);
  const [openSubCategory, setOpenSubCategory] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const addRentalRef = useRef(null);

  const categories = {
    Vehicle: ["Cars", "Bikes", "Vans", "Trucks", "Bicycles", "Luxury Cars", "Electric Scooters"],
    "Real Estate": ["Apartments", "Houses", "Offices", "Shops", "Warehouses", "Event Halls", "Vacation Homes"],
    Electronics: ["Laptops", "Cameras", "Mobiles", "Drones", "TVs", "Projectors", "Gaming Consoles"],
    "Event & Party": ["Tents", "Chairs & Tables", "Lighting & Decor", "Sound Systems", "Catering Equipment", "Stage Setup", "Costumes"],
    Other: {
      "Equipment & Tools": ["Power Tools", "Construction Machinery", "Ladders & Scaffolding", "Safety Gear", "Generators & Compressors", "Painting Equipment", "Electrical Tools"],
      Fashion: ["Designer Outfits", "Suits & Blazers", "Sarees & Lehengas", "Party Wear", "Handbags & Clutches", "Shoes & Heels", "Jewelry & Accessories", "Casual Wear"],
    },
  };

  const handleCategoryClick = (category) => {
    setOpenCategory(openCategory === category ? null : category);
    setOpenSubCategory(null);
  };

  const handleSubCategoryClick = (subCat) => {
    setOpenSubCategory(openSubCategory === subCat ? null : subCat);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addRentalRef.current && !addRentalRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="relative flex items-center justify-between px-10 py-5 bg-[#fcfcfc] shadow-md">
      {/* ✅ Left Section: Sidebar + Logo */}
      <div className="flex items-center gap-4">
        <Link to="/" className="text-2xl font-extrabold text-[#00A693] tracking-wide">
          EASY RENT
        </Link>
      </div>

      {/* ✅ Center Section: Categories */}
      <ul className="hidden md:flex items-center gap-8 font-medium relative">
        {Object.keys(categories).map((category) => (
          <li
            key={category}
            className="relative cursor-pointer text-black hover:bg-[#00A693] hover:text-white transition px-2 py-1 rounded-md"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
            {openCategory === category && (
              <ul className="absolute left-0 mt-3 bg-white shadow-xl rounded-md py-2 w-56 z-50 border border-gray-100">
                {typeof categories[category] === "object" && !Array.isArray(categories[category])
                  ? Object.keys(categories[category]).map((subCat, i) => (
                      <li
                        key={i}
                        className="relative px-4 py-2 text-gray-700 hover:bg-[#00A693] hover:text-white transition rounded-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSubCategoryClick(subCat);
                        }}
                      >
                        {subCat}
                        {openSubCategory === subCat && (
                          <ul className="absolute left-full top-0 bg-white shadow-lg rounded-md py-2 w-56 z-50 border border-gray-100">
                            {categories[category][subCat].map((item, i) => (
                              <li
                                key={i}
                                className="block px-4 py-2 text-gray-700 hover:bg-[#00A693] hover:text-white transition rounded-md"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))
                  : categories[category].map((item, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 text-gray-700 hover:bg-[#00A693] hover:text-white transition rounded-md"
                      >
                        {item}
                      </li>
                    ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* ✅ Right Section: Buttons */}
      <div className="flex items-center gap-4" ref={addRentalRef}>
        <Link
          to="/login"
          className="flex items-center gap-1 font-medium text-black hover:text-gray-700 transition"
        >
          <LogIn size={20} /> Login
        </Link>

        <button className="flex items-center gap-1 font-medium text-red-500 hover:text-red-600 transition">
          <Heart size={20} fill="currentColor" />
        </button>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 bg-[#00A693] hover:bg-[#008c7d] text-white px-6 py-2.5 rounded-md font-semibold shadow-sm transition-all duration-200"
          >
            <span className="text-lg">＋</span> Add Rental
          </button>

          {dropdownOpen && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-3 bg-white shadow-lg rounded-xl p-4 flex flex-col items-center gap-3 z-50 w-44 border border-gray-100">
              <Link
                to="/login"
                className="flex items-center gap-2 text-black hover:text-[#00A693] font-semibold transition"
              >
                <LogIn size={22} />
                <span>Login</span>
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-2 text-black hover:text-[#00A693] font-semibold transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
