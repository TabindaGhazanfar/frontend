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
      desc:"Your money stays completely safe with our escrow system. Payments are only released when both the renter and the owner confirm satisfaction. This ensures trust, prevents fraud, and guarantees that everyone gets exactly what was agreed upon.",
    },
    
  {
    img: step2,
    icon: <Users className="w-12 h-12 text-[#00A693]" />,
    title: "Verified & Trusted Users",
    desc: "Every user goes through a thorough verification process, including ID checks and profile validation, to ensure a safe and trusted renting environment. This helps build confidence for both renters and owners, reducing risks and fostering a responsible community."
  },
  {
    img: step3,
    icon: <MessageSquare className="w-12 h-12 text-[#00A693]" />,
    title: "Chat Before You Rent",
    desc: "Communicate directly with the owner before booking any item. Ask questions, discuss details, confirm availability, and clarify rental terms all within the platform, ensuring smooth coordination and eliminating misunderstandings."
  },
  {
    img: step4,
    icon: <Star className="w-12 h-12 text-[#00A693]" />,
    title: "Ratings & Transparent Reviews",
    desc: "Access authentic feedback from real renters and owners. Ratings and reviews are transparent, helping you make informed rental decisions. The system highlights recurring themes and satisfaction trends to give a clear overview of user experiences."
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
<div className="inline-block rounded-2xl shadow-lg overflow-hidden">
  <img
    src={step.img}
    alt={step.title}
    className="block w-[600px] md:w-[450px] object-contain transition-transform duration-500 hover:scale-[1.03]"
  />
</div>



            {/* ✅ Text Section */}
            <div className="md:w-1/2 text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-4">
                {step.icon}
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">{step.title}</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


