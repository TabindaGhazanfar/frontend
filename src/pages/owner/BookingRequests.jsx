import React, { useState } from "react";
import { Check, X, Eye } from "lucide-react";

export default function BookingRequests() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      renter: "Ali Khan",
      item: "Toyota Corolla 2020",
      date: "2025-11-01",
      status: "Pending",
      image: "https://images.unsplash.com/photo-1605559424843-9d8b11b3bbd0?auto=format&fit=crop&w=60&q=60",
    },
    {
      id: 2,
      renter: "Sara Ahmed",
      item: "Canon DSLR Camera",
      date: "2025-11-03",
      status: "Approved",
      image: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=60&q=60",
    },
    {
      id: 3,
      renter: "Hamza Ali",
      item: "Elegant Wedding Dress",
      date: "2025-11-05",
      status: "Rejected",
      image: "https://images.unsplash.com/photo-1520975918318-3c0c0e9863a3?auto=format&fit=crop&w=60&q=60",
    },
  ]);

  const handleApprove = (id) => {
    setRequests(
      requests.map((r) =>
        r.id === id ? { ...r, status: "Approved" } : r
      )
    );
  };

  const handleReject = (id) => {
    setRequests(
      requests.map((r) =>
        r.id === id ? { ...r, status: "Rejected" } : r
      )
    );
  };

  return (
    <section className="min-h-screen bg-gray-50 p-6 md:p-10">
      <h1 className="text-3xl font-bold text-[#C47C5E] mb-6">
        Booking Requests 📩
      </h1>

      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-xl shadow flex items-center justify-between p-3 hover:shadow-lg transition"
          >
            {/* Thumbnail + Message Info */}
            <div className="flex items-center gap-3">
              <img
                src={req.image}
                alt={req.item}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-gray-800 font-semibold">
                  {req.renter} requested <span className="text-[#C47C5E]">{req.item}</span>
                </p>
                <p className="text-sm text-gray-500">Date: {req.date}</p>
              </div>
            </div>

            {/* Status + Actions */}
            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  req.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : req.status === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {req.status}
              </span>

              <div className="flex gap-2">
                {req.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(req.id)}
                      className="text-green-600 hover:text-green-800 text-sm flex items-center gap-1 font-medium"
                    >
                      <Check size={16} /> Approve
                    </button>
                    <button
                      onClick={() => handleReject(req.id)}
                      className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 font-medium"
                    >
                      <X size={16} /> Reject
                    </button>
                  </>
                )}
                <button className="text-[#299F93] hover:text-[#227c70] text-sm flex items-center gap-1 font-medium">
                  <Eye size={16} /> View
                </button>
              </div>
            </div>
          </div>
        ))}

        {requests.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No booking requests at the moment.
          </p>
        )}
      </div>
    </section>
  );
}



