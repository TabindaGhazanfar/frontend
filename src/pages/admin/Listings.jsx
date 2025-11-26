// src/pages/admin/Listings.jsx
import React, { useState } from "react";

export default function Listings() {
  // Dummy data with owner info
  const [listings, setListings] = useState([
    {
      id: 1,
      title: "Toyota Corolla 2020",
      owner: "Alice Smith",
      category: "Car",
      price: "$50/day",
      status: "Pending",
    },
    {
      id: 2,
      title: "Canon DSLR Camera",
      owner: "John Doe",
      category: "Camera",
      price: "$30/day",
      status: "Active",
    },
    {
      id: 3,
      title: "Elegant Wedding Dress",
      owner: "Mary Johnson",
      category: "Dress",
      price: "$70/day",
      status: "Pending",
    },
  ]);

  const handleApprove = (id) => {
    setListings(
      listings.map((item) =>
        item.id === id ? { ...item, status: "Active" } : item
      )
    );
  };

  const handleReject = (id) => {
    setListings(
      listings.map((item) =>
        item.id === id ? { ...item, status: "Rejected" } : item
      )
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-[#299F93] mb-2">All Listings</h1>
      <p className="text-gray-600 mb-6">Manage listings from all owners.</p>

      <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Owner</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 font-medium">{item.title}</td>
                <td className="py-2 px-4">{item.owner}</td>
                <td className="py-2 px-4">{item.category}</td>
                <td className="py-2 px-4">{item.price}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-2 px-4 flex gap-2">
                  {item.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-green-200"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(item.id)}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-red-200"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 