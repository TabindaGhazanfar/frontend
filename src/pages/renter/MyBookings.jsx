import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, XCircle, CheckCircle, Clock } from "lucide-react";

export default function MyBookings() {
  // Tabs for filtering
  const [filter, setFilter] = useState("All");

  const bookings = [
    {
      id: 1,
      item: "Honda Civic 2022",
      category: "Car",
      location: "Karachi",
      date: "Oct 28 - Nov 2",
      price: "PKR 10,000",
      status: "Active",
    },
    {
      id: 2,
      item: "DSLR Nikon D5600",
      category: "Electronics",
      location: "Lahore",
      date: "Oct 10 - Oct 12",
      price: "PKR 3,000",
      status: "Completed",
    },
    {
      id: 3,
      item: "Wedding Dress (Red)",
      category: "Fashion",
      location: "Islamabad",
      date: "Sep 30 - Oct 1",
      price: "PKR 2,000",
      status: "Canceled",
    },
  ];

  const filtered = bookings.filter(
    (b) => filter === "All" || b.status === filter
  );

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#f9fafb] via-[#eefaf7] to-[#f9f5f3] p-6 md:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#299F93]">
          My Bookings
        </h1>
        <p className="text-gray-600 mt-2">
          View, track, or cancel your current and past bookings.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-3 mb-10">
        {["All", "Active", "Completed", "Canceled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-5 py-2 rounded-full border transition font-medium ${
              filter === tab
                ? "bg-[#299F93] text-white border-[#299F93]"
                : "border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((b) => (
          <motion.div
            key={b.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-sm p-6 flex flex-col justify-between border border-gray-100"
          >
            {/* Item Header */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {b.item}
              </h2>
              <p className="text-sm text-gray-500">{b.category}</p>
            </div>

            {/* Booking Info */}
            <div className="mt-4 text-gray-700 space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <Calendar size={16} className="text-[#299F93]" /> {b.date}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-[#299F93]" /> {b.location}
              </p>
              <p>
                <span className="font-semibold">Price:</span> {b.price}
              </p>
            </div>

            {/* Status & Actions */}
            <div className="mt-5 flex items-center justify-between">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  b.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : b.status === "Completed"
                    ? "bg-gray-100 text-gray-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {b.status}
              </span>

              {b.status === "Active" && (
                <button className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium text-sm">
                  <XCircle size={16} /> Cancel
                </button>
              )}

              {b.status === "Completed" && (
                <button className="flex items-center gap-2 text-[#C47C5E] hover:underline font-medium text-sm">
                  <CheckCircle size={16} /> Review
                </button>
              )}

              {b.status === "Canceled" && (
                <span className="flex items-center gap-2 text-gray-400 text-sm">
                  <Clock size={16} /> Canceled
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
