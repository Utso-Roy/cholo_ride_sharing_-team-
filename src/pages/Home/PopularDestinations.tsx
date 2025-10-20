import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { FaMapMarkerAlt } from "react-icons/fa";

interface Destination {
  id: number;
  name: string;
  distance: string; 
  image: string;
}

const destinations: Destination[] = [
  { id: 1, name: "ঢাকা → চট্টগ্রাম", distance: "250 km", image: "https://i.ibb.co/HpfG3CXM/dhaka-chottogram.jpg" },
  { id: 2, name: "ঢাকা → সিলেট", distance: "240 km", image: "https://i.ibb.co/wZbyGmd6/sylhet.jpg" },
  { id: 3, name: "ঢাকা → খুলনা", distance: "210 km", image: "https://i.ibb.co/ddc5q4h/khulna.jpg" },
  { id: 4, name: "ঢাকা → রাজশাহী", distance: "220 km", image: "https://i.ibb.co/BVckXvXX/rajshahi.jpg" },
  { id: 5, name: "ঢাকা → বরিশাল", distance: "200 km", image: "https://i.ibb.co/KxRR2zMH/images-1.jpg" },
  { id: 6, name: "ঢাকা → রংপুর", distance: "300 km", image: "https://i.ibb.co/MDXdyhL8/rongpur.jpg" },
];

const PopularDestinations: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#e6fcf9] to-gray-50">
      <div className="w-full px-6 text-center max-w-7xl mx-auto">
        <h2 className="text-4xl text-[#27445D] font-bold mb-2">
          জনপ্রিয় গন্তব্য
        </h2>
        <p className="text-gray-600 mb-10 max-w-3xl mx-auto">
          আমাদের গ্রাহকদের জন্য সবচেয়ে জনপ্রিয় ও পছন্দের গন্তব্যগুলো এখানে তুলে ধরা হয়েছে।
        </p>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {destinations.map((dest) => (
            <Card
              key={dest.id}
              className="shadow-lg hover:shadow-2xl transition cursor-pointer overflow-hidden rounded-2xl"
              header={
                <div className="relative h-48">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#0d9488] text-white px-3 py-1 rounded-full flex items-center gap-2 shadow-md">
                    <FaMapMarkerAlt /> <span>{dest.distance}</span>
                  </div>
                </div>
              }
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold text-[#134e4a]">{dest.name}</h3>
                <Button
                  label="Book Now"
                  className="mt-4 !bg-[#0d9488] !hover:bg-[#0b7f75] !text-white !rounded-full !px-6 !py-2"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
