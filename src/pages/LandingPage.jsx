// src/pages/LandingPage.jsx
import React from "react";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import HowItWorks from "../components/HowItWorks";
import PopularListings from "../components/PopularListings";
import WhyChooseUs from "../components/WhyChooseUs";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <PopularListings />
      <WhyChooseUs />

      {/* Anchor target for footer link */}
      <div id="how-it-works" className="scroll-mt-24">
        <HowItWorks />
      </div>
    </>
  );
}
