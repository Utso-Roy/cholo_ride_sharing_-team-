import React from "react";
import { Star } from "lucide-react";

const RatingsReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Amit Saha",
      rating: 5,
      review: "Excellent ride! The driver was polite and the car was clean.",
      date: "October 21, 2025",
    },
    {
      id: 2,
      name: "Rina Akter",
      rating: 4,
      review: "Good experience overall, but pickup was slightly late.",
      date: "October 22, 2025",
    },
    {
      id: 3,
      name: "Tanvir Hasan",
      rating: 5,
      review: "Smooth and comfortable ride. Highly recommend!",
      date: "October 25, 2025",
    },
    {
      id: 4,
      name: "Nusrat Jahan",
      rating: 3,
      review: "Average service. Could be improved.",
      date: "October 27, 2025",
    },
  ];

  const renderStars = (count) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < count ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
           Rider Ratings & Customer Reviews
        </h2>

        {/* Overall Rating Summary */}
        <div className="bg-white shadow-md rounded-2xl p-5 mb-8 text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Overall Rating
          </h3>
          <div className="flex justify-center items-center gap-1 mb-2">
            {renderStars(4)}
          </div>
          <p className="text-gray-500 text-sm">4.0 out of 5 (based on 120 reviews)</p>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-semibold text-gray-800">{review.name}</h4>
                <div className="flex">{renderStars(review.rating)}</div>
              </div>
              <p className="text-gray-600 text-sm mb-3">{review.review}</p>
              <p className="text-xs text-gray-400 text-right">{review.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingsReviews;
