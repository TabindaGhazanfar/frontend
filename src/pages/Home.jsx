import React from "react";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import PopularListings from "../components/PopularListings";
import WhyChooseUs from "../components/WhyChooseUs";
import HowItWorks from "../components/HowItWorks";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <PopularListings />
      <WhyChooseUs />
      <HowItWorks />
    </>
  );
}
