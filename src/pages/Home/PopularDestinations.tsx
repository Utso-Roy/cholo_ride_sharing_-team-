import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

interface Destination {
  id: number;
  name: string;
  distance: string; 
  image: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "ঢাকা → চট্টগ্রাম",
    distance: "250 km",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    name: "ঢাকা→ সিলেট",
    distance: "240 km",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "ঢাকা → খুলনা",
    distance: "210 km",
    image: "https://images.unsplash.com/photo-1520342868574-5fa3804e551c?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "ঢাকা → রাজশাহী",
    distance: "220 km",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "ঢাকা → বরিশাল",
    distance: "200 km",
    image: "https://images.unsplash.com/photo-1520342868574-5fa3804e551c?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 6,
    name: "ঢাকা → রংপুর",
    distance: "300 km",
    image: "https://images.unsplash.com/photo-1520342868574-5fa3804e551c?auto=format&fit=crop&w=800&q=60",
  },
];

const PopularDestinations: React.FC = () => {
  return (
    <section className="py-16 bg-[#e6fcf9]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl text-[#27445D] font-bold mb-10">
         জনপ্রিয় 
 গন্তব্য
        </h2>

        <div className="grid gap-4 md:grid-cols-4">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer"
            >
              <div className="relative h-48">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#71BBB2] text-white px-3 py-1 rounded-full flex items-center gap-2 shadow-md">
                  <FaMapMarkerAlt />
                  <span>{dest.distance}</span>
                </div>
              </div>

              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">{dest.name}</h3>
                <button className="mt-4 bg-[#71BBB2] text-white font-semibold px-6 py-2 rounded-full hover:bg-[#27445D] transition duration-300">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
