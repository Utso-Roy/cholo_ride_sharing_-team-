// PartnersSlider.tsx
import React from "react";

const partners = [
  { id: 1, name: "Bkash", logo: "https://i.ibb.co.com/0Wjv7Cx/bkash.png" },
  { id: 2, name: "Nagad", logo: "https://i.ibb.co.com/v4FXZZqX/images.png" },
  { id: 3, name: "Rocket", logo: "https://i.ibb.co.com/x8tcdhKp/Rocket.png" },
  { id: 4, name: "Visa", logo: "https://i.ibb.co.com/zTTkZkWN/visa2.png" },
  { id: 5, name: "MasterCard", logo: "https://i.ibb.co.com/PztLDn3F/mastercardlogo.png" },
  { id: 6, name: "DBBL", logo: "https://i.ibb.co.com/pjXcYt2W/DBBL.jpg" },
];

const PartnersSlider: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-[#e6fcf9] to-[#f7fafc]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        {/* Left Side: Image */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full rounded-3xl overflow-hidden">
            <img
              src="https://i.ibb.co.com/BVD2NsmC/partnar.jpg"
              alt="Partners Background"
              className="w-full h-auto object-cover"
            />
            {/* Optional overlay for text or effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

        {/* Right Side: Partner Cards */}
        <div className="md:w-1/2 flex flex-col gap-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#71BBB2] to-[#0D5EA6]">
            আমাদের পার্টনার
          </h2>
          <p className="text-gray-700 text-lg md:text-xl">
            আমরা বিশ্বাসযোগ্য এবং পরিচিত কোম্পানি ও পেমেন্ট গেটওয়ের সাথে কাজ করি
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="flex items-center justify-center p-5 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105 cursor-pointer border border-transparent hover:border-blue-400"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-16 md:max-h-20 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSlider;
