// src/pages/admin/Bookings.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Eye, XCircle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Bookings() {
  const navigate = useNavigate();

  // Dummy bookings data (replace with API data later)
  const [bookings, setBookings] = useState([
    {
      id: "B-1001",
      item: "Toyota Corolla 2020",
      owner: "Alice Smith",
      renter: "Ali Khan",
      category: "Car",
      date: "2025-11-01",
      amount: "PKR 14,000",
      status: "Completed",
    },
    {
      id: "B-1002",
      item: "Canon DSLR Camera",
      owner: "John Doe",
      renter: "Sara Ahmed",
      category: "Camera",
      date: "2025-11-03",
      amount: "PKR 8,400",
      status: "Pending",
    },
    {
      id: "B-1003",
      item: "Elegant Wedding Dress",
      owner: "Mary Johnson",
      renter: "Hamza Ali",
      category: "Dress",
      date: "2025-11-05",
      amount: "PKR 19,600",
      status: "Cancelled",
    },
    {
      id: "B-1004",
      item: "Party Tent Setup",
      owner: "Zain Malik",
      renter: "Nida Ali",
      category: "Events",
      date: "2025-11-08",
      amount: "PKR 10,000",
      status: "Pending",
    },
  ]);

  // UI state
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Derived category list
  const categories = useMemo(() => {
    const set = new Set(bookings.map((b) => b.category));
    return ["all", ...Array.from(set)];
  }, [bookings]);

  // Filtered list
  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      if (statusFilter !== "all" && b.status !== statusFilter) return false;
      if (categoryFilter !== "all" && b.category !== categoryFilter) return false;
      if (query.trim() === "") return true;
      const q = query.toLowerCase();
      return (
        b.id.toLowerCase().includes(q) ||
        b.item.toLowerCase().includes(q) ||
        b.renter.toLowerCase().includes(q) ||
        b.owner.toLowerCase().includes(q)
      );
    });
  }, [bookings, statusFilter, categoryFilter, query]);

  // Actions (demo only)
  const handleMarkComplete = (id) => {
    if (!window.confirm("Mark this booking as Completed?")) return;
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "Completed" } : b)));
  };

  const handleCancel = (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "Cancelled" } : b)));
  };

  const handleView = (id) => {
    // If you have a booking details page, navigate there.
    // For demo, we simply alert.
    const booking = bookings.find((b) => b.id === id);
    if (!booking) return;
    alert(`Booking ${id}\nItem: ${booking.item}\nRenter: ${booking.renter}\nStatus: ${booking.status}`);
    // Example navigation if you add a route:
    // navigate(`/admin/bookings/${id}`);
  };

  // Optional: compute total bookings to show on dashboard link if needed
  useEffect(() => {
    // Example: you could send this count to a global store, or the dashboard can request it from the server.
    // console.log("total bookings:", bookings.length);
  }, [bookings]);

  return (
    <section className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#299F93] mb-1">Bookings</h1>
        <p className="text-gray-600">View and manage all bookings across the platform.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by booking ID, item, renter or owner..."
            className="px-3 py-2 rounded-md border border-gray-200 w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-[#299F93]"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-200 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-200 focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All Categories" : c}
              </option>
            ))}
          </select>
        </div>

        <div className="ml-auto">
          <button
            onClick={() => {
              // Quick way to go back to admin dashboard
              navigate("/admin/dashboard");
            }}
            className="px-4 py-2 rounded-md bg-white border border-gray-200 hover:bg-gray-50"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4">Booking ID</th>
              <th className="py-3 px-4">Item</th>
              <th className="py-3 px-4">Owner</th>
              <th className="py-3 px-4">Renter</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{b.id}</td>
                <td className="py-3 px-4">{b.item}</td>
                <td className="py-3 px-4">{b.owner}</td>
                <td className="py-3 px-4">{b.renter}</td>
                <td className="py-3 px-4">{b.category}</td>
                <td className="py-3 px-4">{b.date}</td>
                <td className="py-3 px-4">{b.amount}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      b.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : b.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleView(b.id)}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-gray-200 text-sm hover:bg-gray-50"
                    >
                      <Eye size={14} /> View
                    </button>

                    {b.status !== "Completed" && b.status !== "Cancelled" && (
                      <>
                        <button
                          onClick={() => handleMarkComplete(b.id)}
                          className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-100 text-green-700 text-sm"
                        >
                          <CheckCircle size={14} /> Complete
                        </button>

                        <button
                          onClick={() => handleCancel(b.id)}
                          className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-100 text-red-700 text-sm"
                        >
                          <XCircle size={14} /> Cancel
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="py-8 text-center text-gray-500">
                  No bookings found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
