import React from "react";
import { ShieldCheck, Users, MessageSquare, Star } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-[#299F93]" />,
      title: "Secure Payments via Escrow",
      desc: "Your payments are protected through our escrow system — funds are only released when both parties are satisfied.",
    },
    {
      icon: <Users className="w-10 h-10 text-[#299F93]" />,
      title: "Verified Users",
      desc: "All users go through verification for identity and trust, ensuring a safe rental experience.",
    },
    {
      icon: <MessageSquare className="w-10 h-10 text-[#299F93]" />,
      title: "Real-time Chat System",
      desc: "Chat directly with renters or owners to discuss details, clarify conditions, and build trust before renting.",
    },
    {
      icon: <Star className="w-10 h-10 text-[#299F93]" />,
      title: "Ratings & Reviews",
      desc: "See user feedback and ratings to make confident decisions before renting any item or service.",
    },
  ];

  return (
    <section className="bg-[#f9f9f9] py-16 px-6 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
        Why Choose <span className="text-[#299F93]">EasyRent?</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {features.map((feature, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="flex justify-center mb-5">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
