import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Upload, CheckCircle, Coins } from "lucide-react";

const ownerTestimonials = [
  {
    name: "Gopal Krishna",
    city: "Bangalore",
    duration: "With us since 2 years",
    message:
      "A great team doing even greater things, from the maintenance of the property and issue resolution to professionalism in every activity performed. Happy to work with them!",
  },
  {
    name: "NS Bhati",
    city: "Noida",
    duration: "With us since 1 year",
    message:
      "I am relieved of all the stress related to maintenance. I get my rent every month on time. I have recommended it to all my friends.",
  },
  {
    name: "Jugraj Singh",
    city: "Noida",
    duration: "With us since 1 year",
    message:
      "Transparency in communication is what impressed me. Whenever friends ask for rental suggestions, this is my first recommendation.",
  },
  {
    name: "Sreenivas Babu",
    city: "Bangalore",
    duration: "With us since 2 years",
    message:
      "Maintenance is top-notch and issues are resolved on time. Payments are always on schedule. Very satisfied!",
  },
];

const stats = [
  { number: "400+", label: "Happy Owners" },
  { number: "450+", label: "Active Listings" },
  { number: "50k+", label: "Satisfied Renters" },
  { number: "10+", label: "Cities Growing" },
];

export default function OwnerAndWorkflowSection() {
  const themeColor = "#00A693";

  const steps = [
    {
      icon: <ShieldCheck className="w-8 h-8" style={{ color: themeColor }} />,
      title: "Verify Your Account",
      desc: "Upload CNIC & live photo. Complete secure OTP verification.",
    },
    {
      icon: <Upload className="w-8 h-8" style={{ color: themeColor }} />,
      title: "Create Your Listing",
      desc: "Add item details, price, pictures, and terms.",
    },
    {
      icon: <CheckCircle className="w-8 h-8" style={{ color: themeColor }} />,
      title: "Admin Approval",
      desc: "Our team reviews to ensure authenticity and safety.",
    },
    {
      icon: <Coins className="w-8 h-8" style={{ color: themeColor }} />,
      title: "Go Live & Earn",
      desc: "Your listing becomes visible and renters can book instantly.",
    },
  ];

  return (
    <main className="bg-gray-50">

      {/* ✅ Listing Steps */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Easy & Secure Listing Process
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div
                  className="p-5 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${themeColor}1A` }}
                >
                  {step.icon}
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Stats + Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            We are Pakistan’s Most Trusted Rental Marketplace
          </h2>

          <p className="text-gray-700 leading-relaxed mb-12 max-w-3xl mx-auto">
            Connecting Owners and Renters with Transparency & Security
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900">{stat.number}</h3>
                <p className="text-gray-700 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <h3 className="text-2xl md:text-3xl font-bold mb-10" style={{ color: themeColor }}>
            What Owners Have to Say
          </h3>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ownerTestimonials.map((t, idx) => (
              <motion.div
                whileHover={{ scale: 1.03 }}
                key={idx}
                className="relative p-6 rounded-2xl shadow-md border-l-8"
                style={{
                  borderColor: themeColor,
                  background: "linear-gradient(to bottom, #ffffff, #f3fdfa)",
                }}
              >
                <p className="text-gray-700 leading-relaxed text-sm mb-5">"{t.message}"</p>

                <div className="mt-4">
                  <h4 className="text-base font-semibold text-gray-900">{t.name}</h4>
                  <span className="text-gray-600 text-xs">
                    {t.city} | {t.duration}
                  </span>
                </div>

                <div
                  className="absolute bottom-0 left-0 right-0 h-2 rounded-b-2xl"
                  style={{ backgroundColor: themeColor, opacity: 0.25 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
