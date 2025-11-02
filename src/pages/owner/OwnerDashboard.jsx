import React from "react";
import { Home, BarChart2, PlusCircle, User } from "lucide-react";

export default function OwnerDashboard() {
  return (
    <section className="min-h-screen bg-gray-50 p-6 md:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#C47C5E] mb-2">Owner Dashboard</h1>
        <p className="text-gray-600">
          Welcome to your dashboard! Manage your listings and view analytics here.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-lg transition">
          <Home className="text-[#299F93] w-8 h-8" />
          <div>
            <p className="text-gray-500 text-sm">Total Listings</p>
            <h2 className="text-xl font-bold text-gray-800">12</h2>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-lg transition">
          <PlusCircle className="text-[#C47C5E] w-8 h-8" />
          <div>
            <p className="text-gray-500 text-sm">New Requests</p>
            <h2 className="text-xl font-bold text-gray-800">5</h2>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-lg transition">
          <BarChart2 className="text-[#F7A72B] w-8 h-8" />
          <div>
            <p className="text-gray-500 text-sm">Earnings</p>
            <h2 className="text-xl font-bold text-gray-800">$3,450</h2>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-lg transition">
          <User className="text-[#8B5CF6] w-8 h-8" />
          <div>
            <p className="text-gray-500 text-sm">Active Renters</p>
            <h2 className="text-xl font-bold text-gray-800">8</h2>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <button className="bg-[#299F93] hover:bg-[#227c70] text-white font-semibold rounded-xl p-5 flex items-center justify-between transition">
          <div>
            <h3 className="text-lg font-bold">Add New Listing</h3>
            <p className="text-gray-200 text-sm">Quickly add a new item to rent out</p>
          </div>
          <PlusCircle size={28} />
        </button>

        <button className="bg-[#C47C5E] hover:bg-[#a96850] text-white font-semibold rounded-xl p-5 flex items-center justify-between transition">
          <div>
            <h3 className="text-lg font-bold">View Analytics</h3>
            <p className="text-gray-200 text-sm">Check your performance & earnings</p>
          </div>
          <BarChart2 size={28} />
        </button>
      </div>
    </section>
  );
}
