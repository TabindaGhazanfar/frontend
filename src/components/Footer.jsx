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
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/list-item"
              className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-teal-700 shadow-sm transition hover:shadow-md"
            >
              List Your Item
            </Link>

            {/* ✅ Updated: navigate to home + scroll to #how-it-works */}
            <Link
              to={{ pathname: "/", hash: "#how-it-works" }}
              className="rounded-xl border border-white/70 px-5 py-2.5 text-sm font-semibold text-white/95 backdrop-blur-sm transition hover:bg-white/10"
            >
              How It Works
            </Link>
          </div>
        </section>

        <div className="my-6 h-px w-full bg-white/10" />

        <nav
          aria-label="Footer navigation"
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4"
        >
          <section aria-label="Quick Links">
            <h3 className="mb-2 text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-1.5 text-sm text-white/90">
              {[
                { to: "/", label: "Home" },
                { to: "/list-item", label: "List Your Item" },
                { to: "/how-it-works", label: "How It Works" },
                { to: "/why-choose-us", label: "Why Choose Us" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact Us" },
                { to: "/testimonials", label: "Testimonials" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="rounded-sm hover:opacity-90 hover:underline focus:outline-none focus:ring-2 focus:ring-white/60"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-label="Legal & Support">
            <h3 className="mb-2 text-sm font-semibold">Legal &amp; Support</h3>
            <ul className="space-y-1.5 text-sm text-white/90">
              {[
                { to: "/privacy-policy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms & Conditions" },
                { to: "/disclaimer", label: "Disclaimer" },
                { to: "/safety", label: "Trust & Safety" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="rounded-sm hover:opacity-90 hover:underline focus:outline-none focus:ring-2 focus:ring-white/60"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-label="Contact">
            <h3 className="mb-2 text-sm font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm text-white/90">
              <li>
                <span className="block text-[11px] leading-4 text-white/60">Email</span>
                <a href="mailto:support@easyrent.pk" className="hover:underline">
                  support@easyrent.pk
                </a>
              </li>
              <li>
                <span className="block text-[11px] leading-4 text-white/60">Phone</span>
                <a href="tel:+923001234567" className="hover:underline">
                  +92 300 1234567
                </a>
              </li>
              <li>
                <span className="block text-[11px] leading-4 text-white/60">Address</span>
                Gujrat, Punjab, Pakistan
              </li>
            </ul>
          </section>

          <section aria-label="Top Categories">
            <h3 className="mb-2 text-sm font-semibold">Top Categories</h3>
            <ul className="space-y-1.5 text-sm text-white/90">
              {[
                "Cameras & Lenses",
                "Vehicles & Bikes",
                "Furniture & Home",
                "Electronics & Appliances",
                "Tools & Hardware",
                "Party & Events",
                "Sports & Fitness",
                "Travel Gear",
              ].map((label) => (
                <li key={label}>
                  <Link
                    to={`/category/${encodeURIComponent(
                      label.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")
                    )}`}
                    className="rounded-sm hover:opacity-90 hover:underline focus:outline-none focus:ring-2 focus:ring-white/60"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </nav>
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
