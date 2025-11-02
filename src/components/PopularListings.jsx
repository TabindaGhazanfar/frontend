import React from "react";

// Import images from assets
import carImg from "../assets/car1.jpg";
import apartmentImg from "../assets/apartment1.jpg";
import cameraImg from "../assets/camera1.jpg";
import tentImg from "../assets/tent1.jpg";

// Mock data for front-end only
const popularListings = [
  { id: 1, title: "Luxury Car for Rent", image: carImg, price: "$150/day" },
  { id: 2, title: "Modern Apartment", image: apartmentImg, price: "$90/night" },
  { id: 3, title: "Professional Camera", image: cameraImg, price: "$50/day" },
  { id: 4, title: "Party Tent Setup", image: tentImg, price: "$120/event" },
];

export default function PopularListings() {
  return (
    <section className="px-8 md:px-16 py-20 bg-[#f8fffd]">
      <h2 className="text-left md:text-center text-3xl md:text-4xl font-bold mb-14  pl-2 md:pl-4">
  <span className="text-[#00A693]">Popular</span>{" "}
  <span className="text-black">Listings</span>
  
</h2>


      {/* ✅ Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {popularListings.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-transparent hover:border-[#00A693] shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 overflow-hidden group"
          >
            <div className="overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-[#00A693] font-semibold">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
