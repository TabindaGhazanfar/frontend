// src/pages/admin/Users.jsx
import React from "react";
import { Edit, Trash2 } from "lucide-react";

export default function Users() {
  // Dummy user data
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Renter" },
    { id: 2, name: "Alice Smith", email: "alice@example.com", role: "Owner" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Admin" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#299F93] mb-2">Users</h1>
        <p className="text-gray-600">
          Manage all registered users on the platform.
        </p>
      </div>

      {/* Users Table */}
      <div className="bg-white p-4 rounded-xl shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-2 px-4">{user.id}</td>
                <td className="py-2 px-4 font-medium">{user.name}</td>
                <td className="py-2 px-4 text-gray-600">{user.email}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      user.role === "Admin"
                        ? "bg-red-100 text-red-700"
                        : user.role === "Owner"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-2 px-4 flex gap-2">
                  <button className="flex items-center gap-1 text-blue-500 hover:text-blue-700">
                    <Edit size={16} /> Edit
                  </button>
                  <button className="flex items-center gap-1 text-red-500 hover:text-red-700">
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
