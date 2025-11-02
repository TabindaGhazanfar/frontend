import React from "react";

const PaymentHistory = () => {
  // Dummy data
  const payments = [
    { id: 1, date: "2025-10-01", amount: 15000, status: "Paid" },
    { id: 2, date: "2025-09-15", amount: 12000, status: "Pending" },
    { id: 3, date: "2025-09-01", amount: 10000, status: "Paid" },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-[#299F93] mb-4">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-2">{p.date}</td>
                <td className="px-4 py-2">PKR {p.amount}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    p.status === "Paid" ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {p.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
