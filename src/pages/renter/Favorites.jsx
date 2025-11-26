
import React, { useState } from "react";

export default function Favorites() {
  const [items, setItems] = useState([
    { id: 1, title: "Professional Camera", price: "PKR 3,000/day" },
    { id: 2, title: "Luxury Car for Rent", price: "PKR 12,000/day" },
  ]);

  const remove = (id) => setItems(items.filter(i=>i.id!==id));
  return (
    <section className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(it=>(
          <div key={it.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{it.title}</h3>
              <p className="text-sm text-gray-600">{it.price}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button className="px-3 py-1 bg-[#299F93] text-white rounded">View</button>
              <button onClick={()=>remove(it.id)} className="px-3 py-1 border rounded text-red-500">Remove</button>
            </div>
          </div>
        ))}
        {items.length===0 && <p className="text-gray-500">No favorites yet.</p>}
      </div>
    </section>
  );
}
