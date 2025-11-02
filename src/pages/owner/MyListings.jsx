import React, { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, Eye, PlusCircle } from "lucide-react";

export default function MyListings() {
  // Dummy data (replace with backend API data later)
  const [listings, setListings] = useState([
    {
      id: 1,
      title: "Toyota Corolla 2020",
      category: "Car",
      price: "3500/day",
      status: "Active",
      image: "https://images.unsplash.com/photo-1605559424843-9d8b11b3bbd0?auto=format&fit=crop&w=600&q=60",
    },
    {
      id: 2,
      title: "Canon DSLR Camera",
      category: "Camera",
      price: "1500/day",
      status: "Rented",
      image: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=600&q=60",
    },
    {
      id: 3,
      title: "Elegant Wedding Dress",
      category: "Dress",
      price: "2000/day",
      status: "Pending",
      image: "https://images.unsplash.com/photo-1520975918318-3c0c0e9863a3?auto=format&fit=crop&w=600&q=60",
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      setListings(listings.filter((item) => item.id !== id));
      alert("Listing deleted successfully!");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#f9fafb] via-[#f0fdf4] to-[#fffaf0] p-6 md:p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-[#C47C5E] mb-1">
            My Listings 🏘️
          </h1>
          <p className="text-gray-600">
            Manage your rental items — view, edit, or remove listings.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-[#299F93] text-white px-5 py-2 rounded-md font-semibold hover:bg-[#227c70] transition">
          <PlusCircle size={18} /> Add New Item
        </button>
      </div>

      {/* Listings Grid */}
      {listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 flex flex-col justify-between h-48">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">
                    {item.category}
                  </p>
                  <p className="text-[#C47C5E] font-semibold mb-1">
                    {item.price}
                  </p>

                  {/* Status */}
                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Rented"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-3">
                  <button className="flex items-center gap-1 text-[#299F93] hover:text-[#227c70] text-sm font-medium">
                    <Edit size={16} /> Edit
                  </button>
                  <button className="flex items-center gap-1 text-[#C47C5E] hover:text-[#a96850] text-sm font-medium">
                    <Eye size={16} /> View
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-4">
            You have no active listings yet.
          </p>
          <button className="bg-[#299F93] hover:bg-[#227c70] text-white px-6 py-3 rounded-md font-semibold transition">
            <PlusCircle className="inline-block mr-2" size={18} />
            Add Your First Listing
          </button>
        </div>
      )}
    </section>
  );
}
