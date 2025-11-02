import React, { useEffect, useRef } from "react";
import houseIcon from "../assets/icons/house.svg";
import carIcon from "../assets/icons/car.svg";
import apartmentIcon from "../assets/icons/apartment.svg";
import vehicleIcon from "../assets/icons/vehicle.svg";
import electronicsIcon from "../assets/icons/electronics.svg";
import eventIcon from "../assets/icons/event.svg";
import fashionIcon from "../assets/icons/fashion.svg";
import cameraIcon from "../assets/icons/camera.svg";
import constructionIcon from "../assets/icons/construction.svg";

const categories = [
  { id: 1, name: "House", icon: houseIcon },
  { id: 2, name: "Cars", icon: carIcon },
  { id: 3, name: "Apartments", icon: apartmentIcon },
  { id: 4, name: "Vehicle", icon: vehicleIcon },
  { id: 5, name: "Electronics", icon: electronicsIcon },
  { id: 6, name: "Event & Party", icon: eventIcon },
  { id: 7, name: "Fashion & Accessories", icon: fashionIcon },
  { id: 8, name: "Cameras & Photography Gear", icon: cameraIcon },
  { id: 9, name: "Construction Machinery", icon: constructionIcon },
];

export default function CategorySection() {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const speed = 0.5; // 👈 Adjust scroll speed here

  // ✅ Smooth infinite scroll using requestAnimationFrame
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const startScroll = () => {
      scrollContainer.scrollLeft += speed;
      // when end reached → reset to start instantly (no visible jump)
      if (
        scrollContainer.scrollLeft >=
        scrollContainer.scrollWidth / 2
      ) {
        scrollContainer.scrollLeft = 0;
      }
      animationRef.current = requestAnimationFrame(startScroll);
    };

    animationRef.current = requestAnimationFrame(startScroll);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  const handleMouseEnter = () => cancelAnimationFrame(animationRef.current);
  const handleMouseLeave = () => {
    animationRef.current = requestAnimationFrame(function loop() {
      const scrollContainer = scrollRef.current;
      if (!scrollContainer) return;
      scrollContainer.scrollLeft += speed;
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
      animationRef.current = requestAnimationFrame(loop);
    });
  };

  // ✅ Duplicate categories for looping
  const categoriesList = [...categories, ...categories];

  return (
    <section className="relative bg-white px-6 md:px-12 py-12 overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-10 text-center">
        Browse Categories
      </h2>

      <div
        ref={scrollRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex space-x-20 overflow-x-scroll scrollbar-hide items-center"
        style={{ scrollBehavior: "auto" }}
      >
        {categoriesList.map((cat, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex flex-col items-center text-gray-700 hover:text-[#299F93] transition-colors duration-300 cursor-pointer"
            onClick={() => alert(`${cat.name} page coming soon!`)}
          >
            <img
              src={cat.icon}
              alt={cat.name}
              className="w-14 h-14 mb-3 transition-transform duration-300 hover:scale-110"
            />
            <p className="text-sm font-medium text-center whitespace-nowrap">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

