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
    name: "জাহিদুল ইসলাম",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.9,
    completedRides: 1200,
  },
  {
    id: 2,
    name: "সাবিনা খাতুন",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.8,
    completedRides: 980,
  },
  {
    id: 3,
    name: "রফিকুল হাসান",
    photo: "https://randomuser.me/api/portraits/men/56.jpg",
    rating: 4.7,
    completedRides: 870,
  },
  {
    id: 4,
    name: "মমতাজা বেগম",
    photo: "https://randomuser.me/api/portraits/women/66.jpg",
    rating: 4.9,
    completedRides: 1020,
  },
];

const FeaturedDrivers: React.FC = () => {
  return (
    <section className="py-16 bg-[#e6fcf9]">
      <div className="max-w-7xl mx-auto px-6 text-center">
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
