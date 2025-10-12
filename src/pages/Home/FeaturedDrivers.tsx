import React from "react";
import { FaStar } from "react-icons/fa";

interface Driver {
  id: number;
  name: string;
  photo: string;
  rating: number;
  completedRides: number;
}

const featuredDrivers: Driver[] = [
  {
    id: 1,
    name: "উৎস রায়",
    photo: "https://i.ibb.co.com/jZb600Gj/Whats-App-Image-2025-09-24-at-9-42-01-AM.jpg",
    rating: 4.9,
    completedRides: 1200,
  },
  {
    id: 2,
    name: "দেবজিত রায়",
    photo: "https://i.ibb.co.com/Wv5NNTN7/Whats-App-Image-2025-09-19-at-5-30-16-PM.jpg",
    rating: 4.8,
    completedRides: 980,
  },
  {
    id: 3,
    name: "বিজয় দাস",
    photo: "https://i.ibb.co.com/hRMbsXXw/IMG-20250625-WA0000-1.jpg",
    rating: 4.7,
    completedRides: 870,
  },
  {
    id: 4,
    name: "শুভ দেবনাথ",
    photo: "https://i.ibb.co.com/zY19KjZ/Whats-App-Image-2025-09-19-at-5-29-24-PM.jpg",
    rating: 4.9,
    completedRides: 1020,
  },
];

const FeaturedDrivers: React.FC = () => {
  return (
    <section className="py-16  bg-gradient-to-r from-[#e6fcf9] to-gray-50">
      <div className="w-full px-6 text-center">
        <h2 className="text-4xl font-bold text-[#27445D]  flex items-center justify-center gap-3">
          শীর্ষ ড্রাইভার / রাইডার
        </h2>
        <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
          শীর্ষ ড্রাইভারদের প্রোফাইল — রেটিং এবং সম্পন্ন রাইডের সংখ্যা সহ।
        </p>

        {/* Marquee Container */}
        <div className="overflow-hidden relative">
          <div className="flex gap-8 animate-marquee hover:pause">
            {featuredDrivers.concat(featuredDrivers).map((driver, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-2xl transition cursor-pointer min-w-[250px]"
              >
                <img
                  src={driver.photo}
                  alt={driver.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-[#71BBB2]"
                />
                <h3 className="text-xl font-semibold mb-2">{driver.name}</h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FaStar className="text-yellow-400" />
                  <span className="font-medium">{driver.rating}</span>
                </div>
                <p className="text-gray-600">
                  {driver.completedRides} সম্পন্ন রাইড
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tailwind CSS Animation */}
      <style jsx>{`
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 20s linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedDrivers;




