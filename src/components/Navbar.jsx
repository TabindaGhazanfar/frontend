// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Heart, LogIn } from "lucide-react";
import LoginModal from "./LoginModal";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Navbar() {
  const [openCategory, setOpenCategory] = useState(null);
  const [openSubCategory, setOpenSubCategory] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userCategories, setUserCategories] = useState([]);
  const addRentalRef = useRef(null);
  const navigate = useNavigate();

  // Predefined categories
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

  // Fetch user-added categories from Firestore
  useEffect(() => {
    const fetchUserCategories = async () => {
      try {
        const snapshot = await getDocs(collection(db, "categories"));
        const categoriesFromDB = snapshot.docs.map((doc) => doc.data().name);
        setUserCategories(categoriesFromDB);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchUserCategories();
  }, []);

  // Merge user-added categories only if they exist in predefined
  const mergedCategories = { ...categories };

  userCategories.forEach((userCat) => {
    Object.keys(categories).forEach((mainCat) => {
      const sub = categories[mainCat];
      if (Array.isArray(sub) && sub.includes(userCat) && !mergedCategories[mainCat].includes(userCat)) {
        mergedCategories[mainCat].push(userCat);
      } else if (typeof sub === "object") {
        Object.keys(sub).forEach((subCat) => {
          if (sub[subCat].includes(userCat) && !mergedCategories[mainCat][subCat].includes(userCat)) {
            mergedCategories[mainCat][subCat].push(userCat);
          }
        });
      }
    });
  });

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

  const formatURL = (name) => name.toLowerCase().replace(/ /g, "-");

  return (
    <>
      <nav className="relative flex items-center justify-between px-10 py-5 bg-[#fcfcfc] shadow-md">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-[#00A693] tracking-wide">
          EASY RENT
        </Link>

        {/* Categories */}
        <ul className="hidden md:flex items-center gap-8 font-medium relative">
          {Object.keys(mergedCategories).map((category) => (
            <li
              key={category}
              className="relative cursor-pointer text-black hover:bg-[#00A693] hover:text-white transition px-2 py-1 rounded-md"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
              {openCategory === category && (
                <ul className="absolute left-0 mt-3 bg-white shadow-xl rounded-md py-2 w-56 z-50 border border-gray-100">
                  {typeof mergedCategories[category] === "object" && !Array.isArray(mergedCategories[category])
                    ? Object.keys(mergedCategories[category]).map((subCat, i) => (
                        <li
                          key={i}
                          className="relative px-4 py-2 text-gray-700 hover:bg-[#00A693] hover:text-white transition rounded-md cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSubCategoryClick(subCat);
                          }}
                        >
                          {subCat}
                          {openSubCategory === subCat && (
                            <ul className="absolute left-full top-0 bg-white shadow-lg rounded-md py-2 w-56 z-50 border border-gray-100">
                              {mergedCategories[category][subCat].map((item, i) => (
                                <li key={i}>
                                  <Link
                                    to={`/category/${formatURL(item)}`}
                                    className="block px-4 py-2 text-gray-700 hover:bg-[#00A693] hover:text-white transition rounded-md"
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))
                    : Array.isArray(mergedCategories[category])
                    ? mergedCategories[category].map((item, i) => (
                        <li key={i}>
                          <Link
                            to={`/category/${formatURL(item)}`}
                            className="block px-4 py-2 text-gray-700 hover:bg-[#00A693] hover:text-white transition rounded-md"
                          >
                            {item}
                          </Link>
                        </li>
                      ))
                    : null}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Right buttons */}
        <div className="flex items-center gap-4" ref={addRentalRef}>
          <button
            onClick={() => setOpenLogin(true)}
            className="flex items-center gap-1 font-medium text-black hover:text-gray-700 transition"
          >
            <LogIn size={20} /> Login
          </button>

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
              <div className="absolute right-0 mt-3 bg-white shadow-lg rounded-xl p-4 flex flex-col items-start gap-3 z-50 w-44 border border-gray-100">
                <button
                  onClick={() => {
                    navigate("/add-item");
                    setDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 text-black hover:text-[#00A693] font-semibold transition"
                >
                  New Listing
                </button>

                <button
                  onClick={() => {
                    setOpenLogin(true);
                    setDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 text-black hover:text-[#00A693] font-semibold transition"
                >
                  <LogIn size={22} />
                  Login
                </button>

                <Link
                  to="/register"
                  className="flex items-center gap-2 text-black hover:text-[#00A693] font-semibold transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {openLogin && <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />}
    </>
  );
}

