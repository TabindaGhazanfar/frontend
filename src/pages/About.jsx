import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Users, MessageSquare, Star, Globe, Eye, Brain } from "lucide-react";
import rabailImg from "../assets/rabail.jpg";
import malaikaImg from "../assets/malaika.jpg";
import tabindaImg from "../assets/tabinda.jpg";

export default function AboutUs() {
  const themeGreen = "#00A693";

  const lookingAheadFeatures = [
    {
      icon: <MessageSquare className="w-12 h-12" style={{ color: themeGreen }} />,
      title: "Chat-based Communication",
      desc: "Enables secure messaging between renters and owners on the platform for booking details or item information, enhancing trust and coordination."
    },
    {
      icon: <Star className="w-12 h-12" style={{ color: themeGreen }} />,
      title: "Smart Ratings & Reviews System",
      desc: "Renters and owners can leave ratings and reviews, and the system uses AI to summarize feedback, showing overall satisfaction and common trends."
    },
    {
      icon: <Globe className="w-12 h-12" style={{ color: themeGreen }} />,
      title: "Map & Location Integration",
      desc: "Shows nearby available items on a map and allows location-based filtering for easier discovery of rental options."
    },
    {
      icon: <Eye className="w-12 h-12" style={{ color: themeGreen }} />,
      title: "3D Try-On Feature (Dress Category)",
      desc: "Allows virtual try-on of dresses before booking, helping users make confident choices."
    },
    {
      icon: <Brain className="w-12 h-12" style={{ color: themeGreen }} />,
      title: "AI-Based Recommendation System",
      desc: "Suggests items based on user preferences and past behavior to make the rental experience smarter and faster."
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 md:px-12">

        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            <span style={{ color: themeGreen }}>EasyRent</span>
          </motion.h1>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            A One-stop Smart Rental Platform
          </h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed"
          >
            At EasyRent, we believe that convenience and trust should be at the heart of every rental experience. 
            Whether you're a student, a working professional, or someone looking for items for a special occasion, 
            we make renting simple, safe, and hassle-free. With verified users, secure exchanges, and transparent 
            communication, EasyRent ensures that your renting journey is smooth and worry-free.
          </motion.p>
        </div>

{/* Vision & Mission */}
<div className="grid md:grid-cols-2 gap-12 mb-16">
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="p-8 rounded-2xl shadow-lg transition"
    style={{
      backgroundColor: "#E6F6F3", // light green background
      border: `2px solid ${themeGreen}`, // green border
    }}
  >
    <h2 className="text-2xl font-semibold mb-4" style={{ color: "#000" }}>
      Our Vision
    </h2>
    <p className="text-gray-700 leading-relaxed">
      To create a trusted, seamless, and accessible rental platform that benefits both owners and renters.
    </p>
  </motion.div>

  <motion.div
    whileHover={{ scale: 1.03 }}
    className="p-8 rounded-2xl shadow-lg transition"
    style={{
      backgroundColor: "#E6F6F3", // light green background
      border: `2px solid ${themeGreen}`, // green border
    }}
  >
    <h2 className="text-2xl font-semibold mb-4" style={{ color: "#000" }}>
      Our Mission
    </h2>
    <ul className="text-gray-700 list-disc list-inside space-y-2">
      <li>Enable owners to list items easily and earn from idle resources.</li>
      <li>Empower renters to find and book items confidently and conveniently.</li>
      <li>Ensure secure transactions using OTP, ID verification, and escrow payments.</li>
      <li>Build a trusted community with ratings, reviews, and direct communication.</li>
    </ul>
  </motion.div>
</div>


        {/* Our Story */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
            The idea of EasyRent came from noticing that while everything is moving online, the rental process in Pakistan is still informal and inconvenient. Many people either compromise on quality or buy items they only need for a short time. We believed there should be a smarter way — rent instead of purchase, securely and easily. EasyRent was built to provide a trusted platform where people can share, rent, and benefit together. Our goal is to create a community where convenience meets trust.
          </p>
        </div>

        {/* Team Members */}
<div className="mb-16 text-center">
  <h2 className="text-3xl font-bold mb-6 text-gray-900">Meet Our Team</h2>
  <p className="text-gray-700 max-w-2xl mx-auto mb-12">
    The minds behind EasyRent — dedicated, creative, and passionate about building a smarter rental experience.
  </p>
  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
    {[{img: rabailImg, name:"Rabail Ahmed"}, {img: malaikaImg, name:"Malaika Gul"}, {img: tabindaImg, name:"Tabinda Ghazanfar"}].map((member, i) => (
      <motion.div whileHover={{ scale: 1.05 }} key={i} className="bg-white p-6 rounded-2xl shadow-lg">
        <img src={member.img} alt={member.name} className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"/>
        <h3 className="text-xl font-semibold" style={{ color: "#000" }}>{member.name}</h3>
      </motion.div>
    ))}
  </div>
</div>


        {/* Looking Ahead */}
<div className="text-center">
  <h2 className="text-3xl font-bold mb-12 text-gray-900">Looking Ahead</h2>
  <div className="max-w-6xl mx-auto space-y-8">

    {/* First row: 3 boxes */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {lookingAheadFeatures.slice(0, 3).map((feature, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform"
        >
          <div className="mb-4">{feature.icon}</div>
          <h3 className="text-xl font-semibold mb-2" style={{ color: "#000" }}>{feature.title}</h3>
          <p className="text-gray-600">{feature.desc}</p>
        </div>
      ))}
    </div>

    {/* Second row: last 2 boxes centered */}
    <div className="flex justify-center gap-8">
      {lookingAheadFeatures.slice(3).map((feature, index) => (
        <div
          key={index + 3}
          className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform w-80"
        >
          <div className="mb-4">{feature.icon}</div>
          <h3 className="text-xl font-semibold mb-2" style={{ color: "#000" }}>{feature.title}</h3>
          <p className="text-gray-600">{feature.desc}</p>
        </div>
      ))}
    </div>

  </div>
</div>


          

      </div>
    </section>
  );
}

