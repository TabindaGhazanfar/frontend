import React from "react";
import { motion } from "framer-motion";
import { Search, Star, Wallet, ClipboardList, CheckCircle } from "lucide-react";

export default function RenterDashboard() {
  // Dummy user + data
  const user = { name: "Tabinda" };
  const stats = [
    { title: "Active Rentals", value: 3, icon: ClipboardList, color: "bg-[#E8F5F3]" },
    { title: "Completed Rentals", value: 12, icon: CheckCircle, color: "bg-[#DFF9F4]" },
    { title: "Total Spent", value: "PKR 45,000", icon: Wallet, color: "bg-[#FFF3E0]" },
    { title: "Reviews", value: 8, icon: Star, color: "bg-[#F3E5F5]" },
  ];

  const recentBookings = [
    { id: 1, item: "Toyota Corolla 2020", date: "Oct 20 - Oct 25", price: "PKR 8,000", status: "Active" },
    { id: 2, item: "DSLR Camera Canon", date: "Oct 10 - Oct 12", price: "PKR 3,500", status: "Completed" },
    { id: 3, item: "Formal Dress", date: "Sep 30 - Oct 01", price: "PKR 2,000", status: "Completed" },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#f9fafb] via-[#eefaf7] to-[#f9f5f3] p-6 md:p-10">
      {/* 👋 Welcome Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#299F93]">
          Welcome back, {user.name}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Here’s a quick overview of your recent activity and stats.
        </p>
      </div>

      {/* 📊 Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`p-6 rounded-xl shadow-sm ${stat.color} flex items-center gap-4`}
          >
            <stat.icon size={34} className="text-[#299F93]" />
            <div>
              <p className="text-gray-600 text-sm">{stat.title}</p>
              <h3 className="text-2xl font-semibold text-gray-800">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔍 Search Section */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-3 border border-gray-100 mb-10"
      >
        <Search className="text-gray-500" size={22} />
        <input
          type="text"
          placeholder="Find new items to rent..."
          className="flex-1 outline-none text-gray-700"
        />
        <button className="bg-[#299F93] text-white px-5 py-2 rounded-md font-medium hover:bg-[#227c70] transition">
          Search
        </button>
      </motion.div>

      {/* 🕒 Recent Bookings */}
      <div>
        <h2 className="text-2xl font-bold text-[#C47C5E] mb-5">
          Recent Bookings
        </h2>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-700">
              <thead>
                <tr className="border-b">
                  <th className="py-3">Item</th>
                  <th className="py-3">Dates</th>
                  <th className="py-3">Price</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 font-medium">{booking.item}</td>
                    <td className="py-3">{booking.date}</td>
                    <td className="py-3">{booking.price}</td>
                    <td className="py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          booking.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* View All Button */}
          <div className="mt-6 text-right">
            <button className="text-[#299F93] font-semibold hover:underline">
              View All Bookings →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

