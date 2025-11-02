import React from "react";
import { ShieldCheck, Users, MessageSquare, Star } from "lucide-react";

// ✅ Import all images
import step1 from "../assets/step1.png";
import step2 from "../assets/step2.png";
import step3 from "../assets/step3.png";
import step4 from "../assets/step4.png";

export default function WhyChooseUs() {
  const steps = [
    {
      img: step1,
      icon: <ShieldCheck className="w-12 h-12 text-[#00A693]" />,
      title: "Secure Payments via Escrow",
      desc: "Your money stays safe. Payments are only released when both renter and owner confirm satisfaction.",
    },
    {
      img: step2,
      icon: <Users className="w-12 h-12 text-[#00A693]" />,
      title: "Verified & Trusted Users",
      desc: "Every user goes through verification to ensure a safe and trusted renting environment.",
    },
    {
      img: step3,
      icon: <MessageSquare className="w-12 h-12 text-[#00A693]" />,
      title: "Chat Before You Rent",
      desc: "Ask questions, discuss details, and confirm everything inside the platform before renting.",
    },
    {
      img: step4,
      icon: <Star className="w-12 h-12 text-[#00A693]" />,
      title: "Ratings & Transparent Reviews",
      desc: "See feedback from real renters and owners so you can make confident rental decisions.",
    },
  ];

  return (
    <div className="py-16 px-6 md:px-16 bg-[#f8faf9]">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
        Why Choose <span className="text-[#00A693]">EasyRent?</span>
      </h1>

      <div className="space-y-20 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-10 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <img
              src={step.img}
              alt={step.title}
              className="w-full md:w-1/2 rounded-xl shadow-md"
            />

            <div className="md:w-1/2 text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-4">{step.icon}</div>

              <h2 className="text-2xl font-semibold text-gray-800">{step.title}</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
