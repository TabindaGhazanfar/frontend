import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react"; // For star icon

const themeGreen = "#00A693"; // Persian green theme color

// Placeholder testimonials with ratings
const testimonials = [
  {
    name: "Ali Khan",
    role: "Student",
    message:
      "EasyRent made renting items super easy and hassle-free! Highly recommended.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    name: "Sara Ahmed",
    role: "Working Professional",
    message:
      "I found exactly what I needed in minutes. The platform feels safe and trustworthy.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
  },
  {
    name: "Ahmed Raza",
    role: "Freelancer",
    message:
      "I love how simple it is to book items. Communication with owners is smooth!",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    rating: 5,
  },
  {
    name: "Fatima Noor",
    role: "Designer",
    message:
      "The ratings and chat feature helped me pick the right items confidently.",
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    rating: 4,
  },
  {
    name: "Hassan Ali",
    role: "Entrepreneur",
    message:
      "Listing my items and earning extra income has never been easier. Amazing platform!",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    rating: 5,
  },
  {
    name: "Ayesha Khan",
    role: "Student",
    message:
      "I rented a dress for a wedding and it was perfect. The process was smooth and safe.",
    avatar: "https://randomuser.me/api/portraits/women/88.jpg",
    rating: 5,
  },
];

export default function TestimonialsWithStats() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 md:px-12 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: themeGreen }}>
          Hear from Our Community
        </h2>
        <p className="text-gray-700 mb-12 max-w-2xl mx-auto">
          Real stories from renters and owners using EasyRent.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-4xl font-bold text-gray-900">10,000+</h3>
            <p className="text-gray-700 mt-2">Successful Rentals</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-gray-900">3,000+</h3>
            <p className="text-gray-700 mt-2">Items Listed</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-gray-900">100+</h3>
            <p className="text-gray-700 mt-2">Cities in Pakistan</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
  {testimonials.map((t, i) => (
    <motion.div
      whileHover={{ scale: 1.03 }}
      key={i}
      className="relative p-4 rounded-xl shadow-md border-l-8 transition-all"
      style={{
        borderColor: themeGreen,
        background: "linear-gradient(to bottom, #ffffff, #f3fdfa)",
      }}
    >
      <img
        src={t.avatar}
        alt={t.name}
        className="w-16 h-16 rounded-full mx-auto mb-3 object-cover border-4"
        style={{ borderColor: `${themeGreen}55` }}
      />

      <p className="text-gray-700 text-xs leading-relaxed mb-3">
        "{t.message}"
      </p>

      {/* Star Ratings */}
      <div className="flex justify-center mb-2">
        {Array.from({ length: 5 }, (_, idx) => (
          <Star
            key={idx}
            className="w-4 h-4"
            style={{
              color: idx < t.rating ? "#FACC15" : "#D1D5DB",
            }}
          />
        ))}
      </div>

      <h3 className="text-sm font-semibold text-gray-900">{t.name}</h3>
      <span className="text-gray-500 text-[10px]">{t.role}</span>

      <div
        className="absolute bottom-0 left-0 right-0 h-2 rounded-b-xl"
        style={{ backgroundColor: themeGreen, opacity: 0.25 }}
      />
    </motion.div>
  ))}
</div>


        {/* Share Your Story Button */}
        <button
          className="bg-[#00A693] hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full transition-colors"
        >
          Share Your Story
        </button>
      </div>
    </section>
  );
}

