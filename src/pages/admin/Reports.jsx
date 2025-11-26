// src/pages/admin/Reports.jsx
import React, { useState } from "react";
import { Trash2, CheckCircle, AlertTriangle, User, FileText } from "lucide-react";

export default function Reports() {
  const [filter, setFilter] = useState("all");

  // Dummy reports data
  const [reports, setReports] = useState([
    {
      id: 1,
      type: "listing",
      targetName: "Toyota Corolla 2020",
      targetId: "L-1001",
      reporter: "Ali Khan",
      description: "Listing shows an incorrect model year and fake images.",
      date: "2025-11-01",
      status: "Pending",
    },
    {
      id: 2,
      type: "user",
      targetName: "john_doe",
      targetId: "U-3002",
      reporter: "Sara Ahmed",
      description: "Renter was abusive in chat and tried to solicit off-platform payment.",
      date: "2025-11-03",
      status: "Pending",
    },
    {
      id: 3,
      type: "listing",
      targetName: "Elegant Wedding Dress",
      targetId: "L-1020",
      reporter: "Hamza Ali",
      description: "Price seems misleading and owner is not responding to messages.",
      date: "2025-11-05",
      status: "Reviewed",
    },
  ]);

  // Helpers
  const updateReportStatus = (id, newStatus) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
  };

  const handleResolve = (id) => {
    if (!window.confirm("Mark this issue as resolved?")) return;
    updateReportStatus(id, "Resolved");
  };

  const handleIgnore = (id) => {
    if (!window.confirm("Ignore this report? It will be marked as Reviewed.")) return;
    updateReportStatus(id, "Reviewed");
  };

  const handleDeleteListing = (id) => {
    if (!window.confirm("Delete the reported listing? This action is destructive.")) return;
    // For demo: mark as Resolved and append note to description
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Resolved", description: r.description + " (Listing deleted)" } : r)));
  };

  const handleSuspendUser = (id) => {
    if (!window.confirm("Suspend this user account?")) return;
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Actioned: User Suspended" } : r)));
  };

  const handleWarnUser = (id) => {
    if (!window.confirm("Send a warning to this user?")) return;
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Actioned: User Warned" } : r)));
  };

  const filtered = reports.filter((r) => filter === "all" || r.type === filter);

  return (
    <section className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#299F93] mb-2">Reported Issues</h1>
        <p className="text-gray-600">View and resolve reports submitted by users about listings or other users.</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-md font-medium ${filter === "all" ? "bg-[#299F93] text-white" : "bg-white text-gray-800 shadow"}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("listing")}
          className={`px-4 py-2 rounded-md font-medium ${filter === "listing" ? "bg-[#299F93] text-white" : "bg-white text-gray-800 shadow"}`}
        >
          Listing Reports
        </button>
        <button
          onClick={() => setFilter("user")}
          className={`px-4 py-2 rounded-md font-medium ${filter === "user" ? "bg-[#299F93] text-white" : "bg-white text-gray-800 shadow"}`}
        >
          User Reports
        </button>
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded-xl shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Target</th>
                <th className="py-3 px-4">Reporter</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 align-top">
                  <td className="py-3 px-4 font-medium">{r.id}</td>
                  <td className="py-3 px-4 capitalize flex items-center gap-2">
                    {r.type === "user" ? <User size={16} /> : <FileText size={16} />}
                    {r.type}
                  </td>
                  <td className="py-3 px-4">{r.targetName} <span className="text-xs text-gray-400">({r.targetId})</span></td>
                  <td className="py-3 px-4">{r.reporter}</td>
                  <td className="py-3 px-4 max-w-xl">{r.description}</td>
                  <td className="py-3 px-4">{r.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      r.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : r.status === "Resolved" || r.status?.startsWith("Actioned")
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                      {r.type === "listing" ? (
                        <>
                          <button
                            onClick={() => handleResolve(r.id)}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-100 text-green-700 text-sm"
                          >
                            <CheckCircle size={14} /> Resolve
                          </button>

                          <button
                            onClick={() => handleDeleteListing(r.id)}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-100 text-red-700 text-sm"
                          >
                            <Trash2 size={14} /> Delete Listing
                          </button>

                          <button
                            onClick={() => handleIgnore(r.id)}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-sm"
                          >
                            <AlertTriangle size={14} /> Ignore
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleSuspendUser(r.id)}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-100 text-red-700 text-sm"
                          >
                            <Trash2 size={14} /> Suspend
                          </button>

                          <button
                            onClick={() => handleWarnUser(r.id)}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-100 text-yellow-700 text-sm"
                          >
                            <AlertTriangle size={14} /> Warn
                          </button>

                          <button
                            onClick={() => handleResolve(r.id)}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-100 text-green-700 text-sm"
                          >
                            <CheckCircle size={14} /> Mark Resolved
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-gray-500">
                    No reports found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
