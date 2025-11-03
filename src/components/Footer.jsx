// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-12 overflow-hidden text-white">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#2aaea0] via-[#1a8e83] to-[#107d72]" />
      <div className="border-t border-white/15" />

      <div className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
        <section aria-label="About EasyRent" className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight">EasyRent</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/90">
            Rent anything, anytime — safely and smartly. Empowering Pakistan’s sharing
            economy through trusted connections.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-[#00A693] transition">Home</Link></li>
            <li><Link to="/list-item" className="hover:text-[#00A693] transition">List Your Item</Link></li>
            <li><Link to="/how-it-works" className="hover:text-[#00A693] transition">How It Works</Link></li>
            <li><Link to="/why-choose-us" className="hover:text-[#00A693] transition">Why Choose Us</Link></li>
            <li><Link to="/about" className="hover:text-[#00A693] transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-[#00A693] transition">Contact Us</Link></li>
            <li><Link to="/testimonials" className="hover:text-[#00A693] transition">Testimonials</Link></li>
          </ul>
        </div>

        {/* Legal & Support */}
        <div>
          <h3 className="text-white font-semibold mb-3">Legal & Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy-policy" className="hover:text-[#00A693] transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-[#00A693] transition">Terms & Conditions</Link></li>
            <li><Link to="/disclaimer" className="hover:text-[#00A693] transition">Disclaimer</Link></li>
          </ul>
        </div>

      <div className="border-t border-white/20 px-6 py-4 text-center text-xs text-white/90 sm:flex sm:items-center sm:justify-between">
        <p>
          © {year} <span className="font-medium">EasyRent</span>. All Rights Reserved.
        </p>
        <div className="mt-2 flex items-center justify-center gap-6 sm:mt-0 sm:justify-end">
          <span className="hidden sm:block">Made with ❤️ in Pakistan</span>
          <a href="#" className="hover:underline">Facebook</a>
          <a href="#" className="hover:underline">LinkedIn</a>
          <a href="#" className="hover:underline">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
