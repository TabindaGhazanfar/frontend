import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative mt-16 bg-gradient-to-t from-[#37ddcd] via-[#a9f1e9] to-[#3ab9a8] text-gray-200 overflow-hidden">
      
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto backdrop-blur-md bg-white/5 border border-white/10 shadow-lg rounded-3xl px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10 z-10">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white">EasyRent</h2>
          <p className="mt-3 text-sm text-gray-200 leading-relaxed">
            Rent anything, anytime — safely and smartly.
            <br /> Empowering Pakistan’s sharing economy through trusted connections.
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

        {/* Contact Section */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact Us</h3>
          <p className="text-sm text-gray-200 leading-relaxed">
            📧 support@easyrent.pk <br />
            📞 +92 300 1234567 <br />
            📍 University of Gujrat, Punjab, Pakistan
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative mt-8 border-t border-white/10 py-4 text-center text-sm text-gray-300 z-10">
        © {new Date().getFullYear()}{" "}
        <span className="text-[#00A693] font-bold">EasyRent</span>. All Rights Reserved.
        <span className="block md:inline"> | Designed with 🤍 by Team EasyRent</span>
      </div>
    </footer>
  );
}
