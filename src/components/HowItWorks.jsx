import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Register & Verify",
      description:
        "Sign up as an Owner or Renter. Upload your CNIC and photo for ID verification and complete OTP verification for secure access.",
    },
    {
      number: "2",
      title: "List or Explore Items",
      description:
        "Owners can list items for rent with photos, descriptions, and prices. Renters can browse and filter items by category, location, and price.",
    },
    {
      number: "3",
      title: "Book & Confirm",
      description:
        "Renters can book items instantly. The system manages availability and booking status like pending, confirmed, or completed.",
    },
    {
      number: "4",
      title: "Secure Payments",
      description:
        "Pay safely using JazzCash or Easypaisa. Transactions are escrow-protected until renter confirmation for transparency and trust.",
    },
    {
      number: "5",
      title: "Stay Connected",
      description:
        "Use chat for communication, get instant notifications for updates, and rate experiences to help improve the platform.",
    },
    {
     number: "6",
     title: "Meet & Exchange Item",
     description:
    "After booking confirmation, both users coordinate via chat to decide pickup or drop-off location. EasyRent ensures secure handover without delivery dependency.",
    },

  ];

  return (
    <section className="bg-[#f9f9f9] py-20 px-6 md:px-16">
      {/* Left-Aligned Heading */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-3">
          How <span className="text-[#299F93]">EasyRent</span> Works
        </h2>
        <p className="text-gray-500">
          Renting anything, anytime — simple, secure, and seamless.
        </p>
      </div>

      {/* Steps */}
      <div className="flex flex-col space-y-8">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex items-start gap-5 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border-l-4 border-[#299F93]"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full font-semibold text-lg bg-[#E0F7F4] text-[#299F93]">
              {step.number}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
