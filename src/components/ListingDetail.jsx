import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ListingDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      const docRef = doc(db, "items", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setItem({ id: docSnap.id, ...docSnap.data() });
    };
    fetchItem();
  }, [id]);

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

  if (!item) return <p className="text-center mt-20">Loading item...</p>;

  const handleContact = () => {
    const subject = encodeURIComponent(`Inquiry about ${item.title || item.name}`);
    const body = encodeURIComponent(
      `Hi, I am interested in your listing "${item.title || item.name}". Please provide more details.`
    );
    window.location.href = `mailto:owner@example.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-12 bg-[#f8fffd] rounded-lg shadow-lg">
      {/* Back Link */}
      <Link to="/listings" className="text-[#00A693] font-semibold mb-4 inline-block">
        ← Back to Listings
      </Link>

      {/* Main Image */}
      <div className="w-full mb-8">
        <img
          src={item.imageUrl || ""}
          alt={item.title || item.name}
          className="w-full h-96 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Title & Price */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{item.title || item.name}</h1>
        <div className="text-2xl font-semibold text-[#00A693] mt-4 sm:mt-0">
          Rs {item.price || "0"}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <p><span className="font-medium">Category:</span> {item.category || "N/A"}</p>
          <p><span className="font-medium">Condition:</span> {item.condition || "N/A"}</p>
          <p><span className="font-medium">Location:</span> {item.location || "Unknown"}</p>
          <p><span className="font-medium">Availability:</span> {item.availability || "Unknown"}</p>
        </div>
        <div>
          <p><span className="font-medium">Rent Type:</span> {item.rentType || "N/A"}</p>
          <p><span className="font-medium">Terms:</span> {item.terms || "No terms specified."}</p>
          <p className="text-gray-500 text-sm mt-4">Listed {timeAgo(item.createdAt)}</p>
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{item.description || "No description provided."}</p>
      </div>

      {/* Contact Button */}
      <button
        onClick={handleContact}
        className="w-full sm:w-auto bg-[#00A693] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#008a7a] transition-colors"
      >
        Contact / Rent
      </button>
    </section>
  );
}


