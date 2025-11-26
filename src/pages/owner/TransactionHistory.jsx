import React, { useState } from "react";
import { Eye } from "lucide-react";

export default function TransactionHistory() {
  // Dummy data
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      item: "Toyota Corolla 2020",
      renter: "Ali Khan",
      date: "2025-11-01",
      amount: "₨3500",
      status: "Completed",
    },
    {
      id: 2,
      item: "Canon DSLR Camera",
      renter: "Sara Ahmed",
      date: "2025-11-03",
      amount: "₨15000",
      status: "Pending",
    },
    {
      id: 3,
      item: "Wedding Dress",
      renter: "Hamza Ali",
      date: "2025-11-05",
      amount: "₨20000",
      status: "Failed",
    },
  ]);

  return (
    <section className="min-h-screen bg-gray-50 p-6 md:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#C47C5E] mb-2">
          Transaction History 💳
        </h1>
        <p className="text-gray-600">
          View all payments and transactions related to your listings.
        </p>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Item
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Renter
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((txn) => (
              <tr key={txn.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-gray-800">{txn.item}</td>
                <td className="px-6 py-4 text-gray-800">{txn.renter}</td>
                <td className="px-6 py-4 text-gray-800">{txn.date}</td>
                <td className="px-6 py-4 text-gray-800">{txn.amount}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      txn.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : txn.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {txn.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-[#299F93] hover:text-[#227c70] flex items-center gap-1 text-sm font-medium">
                    <Eye size={16} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {transactions.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No transactions found.
        </p>
      )}
    </section>
  );
}
