// FeaturedDrivers.tsx
import React from "react";
import { Card } from "primereact/card";
import { Rating } from "primereact/rating";

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
    photo: "https://i.ibb.co/jZb600Gj/Whats-App-Image-2025-09-24-at-9-42-01-AM.jpg",
    rating: 4.9,
    completedRides: 1200,
  },
  {
    id: 2,
    name: "দেবজিত রায়",
    photo: "https://i.ibb.co/Wv5NNTN7/Whats-App-Image-2025-09-19-at-5-30-16-PM.jpg",
    rating: 4.8,
    completedRides: 980,
  },
  {
    id: 3,
    name: "বিজয় দাস",
    photo: "https://i.ibb.co/hRMbsXXw/IMG-20250625-WA0000-1.jpg",
    rating: 4.7,
    completedRides: 870,
  },
  {
    id: 4,
    name: "শুভ দেবনাথ",
    photo: "https://i.ibb.co/zY19KjZ/Whats-App-Image-2025-09-19-at-5-29-24-PM.jpg",
    rating: 4.9,
    completedRides: 1020,
  },
];

const FeaturedDrivers: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#e6fcf9] to-gray-50">
      <div className="text-center mb-12 px-6 md:px-16">
        <h2 className="text-4xl font-bold text-[#27445D] flex items-center justify-center gap-3">
          শীর্ষ ড্রাইভার / রাইডার
        </h2>
        <p className="text-gray-600 mt-3 max-w-3xl mx-auto">
          শীর্ষ ড্রাইভারদের প্রোফাইল — রেটিং এবং সম্পন্ন রাইডের সংখ্যা সহ।
        </p>
      </div>

      {/* Marquee / Carousel */}
      <div className="overflow-hidden relative">
        <div className="flex gap-6 animate-marquee hover:pause">
          {featuredDrivers.concat(featuredDrivers).map((driver, idx) => (
            <Card
              key={idx}
              className="min-w-[250px] p-4 rounded-3xl shadow-lg hover:shadow-2xl transition cursor-pointer bg-white border border-gray-200"
            >
              <div className="flex flex-col items-center">
                <img
                  src={driver.photo}
                  alt={driver.name}
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-[#71BBB2]"
                />
                <h3 className="text-xl font-semibold text-[#27445D] mb-2">{driver.name}</h3>
                <Rating
                  value={driver.rating}
                  readOnly
                  stars={5}
                  cancel={false}
                  className="mb-2"
                  style={{ color: "#FBBF24" }}
                />
                <p className="text-gray-600">{driver.completedRides} সম্পন্ন রাইড</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Tailwind CSS Animation */}
      <style jsx>{`
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
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
