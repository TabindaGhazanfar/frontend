import React from "react";
import { Star } from "lucide-react";

const Reviews = () => {
  const reviews = [
    { id: 1, user: "Ali", rating: 5, comment: "Excellent service!" },
    { id: 2, user: "Sara", rating: 4, comment: "Very good experience." },
    { id: 3, user: "Hassan", rating: 3, comment: "Average, can improve." },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-md mt-6 md:mt-0">
      <h2 className="text-2xl font-bold text-[#C47C5E] mb-4">Reviews</h2>
      <div className="space-y-4">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="border rounded-md p-4 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">{r.user}</span>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < r.rating ? "text-yellow-500" : "text-gray-300"}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
