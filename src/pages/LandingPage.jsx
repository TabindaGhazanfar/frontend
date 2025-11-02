import React from "react";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import HowItWorks from "../components/HowItWorks";
import PopularListings from "../components/PopularListings";
import WhyChooseUs from "../components/WhyChooseUs"; // ✅ Add this

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <PopularListings />
    <WhyChooseUs/>
         <HowItWorks />
      {/* ✅ New section added */}
    </>
  );
}


