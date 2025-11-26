// src/components/HeroSection.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../assets/new.png";
import img2 from "../assets/hero2.png";
import img3 from "../assets/game.png";
import img4 from "../assets/hero4.png";
import img5 from "../assets/hero5.png";

export default function HeroSection() {
  const images = [img1, img2, img3, img4, img5];
  const [current, setCurrent] = useState(0);

  const positions = ["top", "top", "top", "center", "center"];

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");

  // Auto slide background images (faster)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000); // changed from 8000ms to 6000ms
    return () => clearInterval(interval);
  }, []);

  // handle search
  const handleSearch = () => {
    console.log({
      keyword,
      location,
      category,
      priceRange,
    });
    alert(
      `Searching for: ${keyword || "Any"} | Location: ${location || "Anywhere"} | Category: ${
        category || "All"
      } | Price: ${priceRange || "Any"}`
    );
  };

  return (
    // removed rounded-3xl here so hero images are square
    <section className="relative w-full h-[500px] md:h-[550px] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`Background ${current + 1}`}
          // force no border-radius and ensure full cover
          className={`absolute inset-0 w-full h-full object-cover z-0 object-${positions[current]} rounded-none`}
          style={{ borderRadius: 0 }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Search Card */}
      <div className="relative z-10 w-full max-w-4xl px-6 md:px-16">
        <div className="bg-white/30 backdrop-blur-md p-5 md:p-6 rounded-3xl shadow-2xl border border-[#299F93]/20 flex flex-col gap-4 md:gap-5">
          <h2 className="text-2xl md:text-3xl font-extrabold leading-tight text-slate-800 text-center">
            Find Your Rental
          </h2>
          <p className="text-slate-600 text-base font-medium mt-1 text-center">
            Search for the best products, vehicles, or apartments near you.
          </p>

          {/* Search Inputs */}
          <div className="flex flex-col md:flex-row gap-3 mt-2">
            {/* Product */}
            <div className="flex-1">
              <label className="block text-slate-700 font-semibold mb-1 text-sm md:text-base">
                Product
              </label>
              <input
                type="text"
                placeholder="Keyword search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#299F93]"
              />
            </div>

            {/* Location */}
            <div className="flex-1">
              <label className="block text-slate-700 font-semibold mb-1 text-sm md:text-base">
                Location
              </label>
              <input
                type="text"
                placeholder="City or Area"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#299F93]"
              />
            </div>

            {/* Category */}
            <div className="flex-1">
              <label className="block text-slate-700 font-semibold mb-1 text-sm md:text-base">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#299F93] ${
                  category === "" ? "text-slate-400" : "text-slate-600"
                }`}
              >
                <option value="">All Categories</option>
                <option value="Cars">Cars</option>
                <option value="Apartments">Apartments</option>
                <option value="Electronics">Electronics</option>
                <option value="Events">Event & Party</option>
                <option value="Fashion">Fashion & Accessories</option>
                <option value="Cameras">Cameras & Photography</option>
                <option value="Construction">Construction Machinery</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="flex-1">
              <label className="block text-slate-700 font-semibold mb-1 text-sm md:text-base">
                Price Range
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className={`w-full border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#299F93] ${
                  priceRange === "" ? "text-slate-400" : "text-slate-600"
                }`}
              >
                <option value="">Any Price</option>
                <option value="0-5000">Below 5,000</option>
                <option value="5000-10000">5,000 - 10,000</option>
                <option value="10000-20000">10,000 - 20,000</option>
                <option value="20000+">Above 20,000</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="bg-[#299F93] hover:bg-[#227c70] text-white font-semibold px-6 py-2 rounded-md transition w-full"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );}