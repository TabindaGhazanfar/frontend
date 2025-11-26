import React, { useState } from "react";

export default function Notifications() {
  const [notes, setNotes] = useState([
    { id: 1, text: "Your booking for Toyota Corolla is confirmed.", read: false, date: "2025-11-01" },
    { id: 2, text: "Payment received for DSLR Nikon.", read: true, date: "2025-10-21" },
  ]);

  const markAllRead = () => setNotes(notes.map(n=>({...n,read:true})));
  const toggleRead = (id) => setNotes(notes.map(n=> n.id===id?{...n,read:!n.read}:n));

  return (
    <section className="p-6 min-h-screen bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <div className="flex gap-2">
          <button onClick={markAllRead} className="px-3 py-1 border rounded">Mark all read</button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow divide-y">
        {notes.map(n => (
          <div key={n.id} className={`p-4 flex justify-between items-start ${n.read ? "bg-white" : "bg-[#f0fdf9]"}`}>
            <div>
              <p className="text-sm">{n.text}</p>
              <p className="text-xs text-gray-400 mt-1">{n.date}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button onClick={()=>toggleRead(n.id)} className="text-sm text-[#299F93]">{n.read ? "Unread" : "Read"}</button>
            </div>
          </div>
        ))}
        {notes.length === 0 && <p className="p-4 text-center text-gray-500">No notifications</p>}
      </div>
    </section>
  );
}
