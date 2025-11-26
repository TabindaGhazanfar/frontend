import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, Eye, PlusCircle } from "lucide-react";
import { db } from "../../firebase";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";

export default function MyListings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // 🔥 Show ALL listings (no ownerId, no login needed)
    const q = collection(db, "items");

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListings(fetched);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      await deleteDoc(doc(db, "items", id));
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
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition p-4"
            >
              <div className="flex flex-col justify-between h-full">

                {/* Item Info */}
                <div className="mb-3">
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    {item.name || "No Title"}
                  </h2>

                  <p className="text-sm text-gray-500 mb-1">
                    Category: {item.category || "N/A"}
                  </p>

                  <p className="text-[#C47C5E] font-semibold mb-1">
                    Price: {item.price || "N/A"}
                  </p>

                  <p className="text-sm mb-1">
                    Location: {item.location || "N/A"}
                  </p>

                  <p className="text-sm mb-1">
                    Rent Type: {item.rentType || "N/A"}
                  </p>

                  <p className="text-sm mb-1">
                    Condition: {item.condition || "N/A"}
                  </p>

                  {/* Status */}
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                    Active
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-2">
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


