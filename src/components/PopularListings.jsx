import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function PopularListings() {
const [listings, setListings] = useState([]);
const navigate = useNavigate();

useEffect(() => {
const unsubscribe = onSnapshot(collection(db, "items"), (snapshot) => {
const fetched = snapshot.docs.map((doc) => ({
id: doc.id,
...doc.data(),
}));
setListings(fetched);
});
return () => unsubscribe();
}, []);

const timeAgo = (timestamp) => {
if (!timestamp) return "Unknown time";
const now = new Date();
const secondsPast = Math.floor(
(now - new Date(timestamp.seconds * 1000)) / 1000
);
if (secondsPast < 60) return `${secondsPast} sec ago`;
if (secondsPast < 3600) return `${Math.floor(secondsPast / 60)} min ago`;
if (secondsPast < 86400) return `${Math.floor(secondsPast / 3600)} hr ago`;
if (secondsPast < 2592000) return `${Math.floor(secondsPast / 86400)} days ago`;
if (secondsPast < 31104000)
return `${Math.floor(secondsPast / 2592000)} months ago`;
return `${Math.floor(secondsPast / 31104000)} yrs ago`;
};

return ( <section className="px-8 md:px-16 py-20 bg-[#f8fffd]"> <h2 className="text-left md:text-center text-3xl md:text-4xl font-bold mb-14 pl-2 md:pl-4"> <span className="text-[#00A693]">Popular</span>{" "} <span className="text-black">Listings</span> </h2>

```
  {listings.length === 0 && (
    <p className="text-center text-gray-500">Loading listings...</p>
  )}

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
    {listings.map((item) => (
      <div
        key={item.id}
        className="bg-white border border-transparent hover:border-[#00A693] shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 overflow-hidden group"
        onClick={() => navigate(`/listing/${item.id}`)}
      >
        <div className="overflow-hidden bg-gray-100">
          <img
            src={item.imageUrl || ""}
            alt={item.title || "Listing"}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between mb-2">
            <span
              className="text-white text-xs px-3 py-1 rounded-full"
              style={{ backgroundColor: "#00A693" }}
            >
              {item.name || "name"}
            </span>
            <span className="text-white bg-black/70 text-xs px-3 py-1 rounded-full">
              {item.condition || "Condition"}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2">Rs {item.price || "0"}</h3>
          <p className="text-gray-600 text-sm mb-2 ">
            {item.description || "No description provided."}
          </p>
          <p className="text-gray-700 font-medium mb-1">
            📍 {item.location || "Unknown Location"}
          </p>
          <p className="text-gray-400 text-xs mb-1">
            🕒 {timeAgo(item.createdAt)}
          </p>
          <p className="text-gray-500 text-sm">
            {item.rentType || "Rent Type"} • {item.availability || "Unknown"}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>
);
}


