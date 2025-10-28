import React from "react";
import { FaStar } from "react-icons/fa";

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

  // ⭐ Render stars using react-icons
  const renderStars = (count) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`w-5 h-5 ${
          index < count ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-[#27445D] mb-8 text-center">
          Rider Ratings & Customer Reviews
        </h2>

        {/* Overall Rating Summary */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-10 text-center hover:shadow-xl transition-all duration-300">
          <h3 className="text-lg font-semibold text-[#27445D] mb-2">
            Overall Rating
          </h3>
          <div className="flex justify-center gap-1 mb-3">
            {renderStars(4)}
          </div>
          <p className="text-[#27445D] text-sm sm:text-base">
            4.0 out of 5 (based on 120 reviews)
          </p>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white shadow-md rounded-2xl p-5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-2">
                <h4 className="text-lg font-semibold text-[#27445D] text-center sm:text-left">
                  {review.name}
                </h4>
                <div className="flex justify-center sm:justify-end">
                  {renderStars(review.rating)}
                </div>
              </div>

              <p className="text-[#27445D] text-sm mb-3 leading-relaxed text-center sm:text-left">
                {review.review}
              </p>
              <p className="text-xs text-gray-400 text-center sm:text-right italic">
                {review.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingsReviews;
