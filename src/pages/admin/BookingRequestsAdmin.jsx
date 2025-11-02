// src/pages/admin/BookingRequestsAdmin.jsx
import React from "react";

export default function BookingRequestsAdmin() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Booking Requests</h1>
      <p className="text-gray-600 mb-6">Approve or reject incoming booking requests.</p>
      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-gray-500">Booking requests list will go here.</p>
      </div>
    </div>
  );
}
