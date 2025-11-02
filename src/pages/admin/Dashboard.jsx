// src/pages/admin/Dashboard.jsx
import React from "react";
import { Users, Home, FileText, BarChart2, PlusCircle } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { name: "Users", value: 120, icon: Users, color: "bg-green-100 text-green-700" },
    { name: "Listings", value: 58, icon: Home, color: "bg-orange-100 text-orange-700" },
    { name: "Bookings", value: 34, icon: FileText, color: "bg-blue-100 text-blue-700" },
    { name: "Revenue", value: "$12,450", icon: BarChart2, color: "bg-purple-100 text-purple-700" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-[#C47C5E] mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="flex items-center p-5 bg-white rounded-xl shadow hover:shadow-lg transition gap-4">
            <stat.icon className={`${stat.color.split(" ")[0]} ${stat.color.split(" ")[1]} w-10 h-10 p-2 rounded-full`} />
            <div>
              <p className="text-gray-500 text-sm">{stat.name}</p>
              <h2 className="text-xl font-bold text-gray-800">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
