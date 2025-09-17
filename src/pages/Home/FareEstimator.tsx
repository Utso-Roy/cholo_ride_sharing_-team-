import React, { useState } from "react";

interface ServiceFare {
  name: string;
  ratePerKm: number;
}

const services: ServiceFare[] = [
  { name: "বাইক রাইড", ratePerKm: 15 },
  { name: "CNG / অটো রাইড", ratePerKm: 20 },
  { name: "কার রাইড", ratePerKm: 25 },
  { name: "ট্র্যাক সার্ভিস", ratePerKm: 30 },
  { name: "শাটল সার্ভিস", ratePerKm: 18 },
  { name: "জার্নি প্যাকেজ সিস্টেম", ratePerKm: 22 },
  { name: "মেডিকেল সার্ভিস / অ্যাম্বুলেন্স", ratePerKm: 35 },
  { name: "প্যাকেজ / পণ্য প্রেরণ", ratePerKm: 12 },
];

const FareEstimator: React.FC = () => {
  const [distance, setDistance] = useState<number>(0);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-10">
          Fare Estimator / <span className="text-[#71BBB2]">ভাড়া পরিকল্পনা</span>
        </h2>
        <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
          দূরত্ব দিয়ে আনুমানিক ভাড়া দেখুন। সার্ভিস অনুযায়ী সহজে তুলনা করুন।
        </p>

        {/* Distance Input */}
        <div className="mb-12 flex justify-center gap-4 flex-wrap">
          <input
            type="number"
            min={0}
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            placeholder="দূরত্ব (কিমি)"
            className="border border-gray-300 rounded-lg px-4 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-[#71BBB2]"
          />
        </div>

        {/* Fare Cards */}
        <div className="grid gap-6 md:grid-cols-4 sm:grid-cols-2">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-2">
                রেট প্রতি কিমি: {service.ratePerKm} টাকা
              </p>
              <p className="text-lg font-bold">
                আনুমানিক ভাড়া: {distance ? distance * service.ratePerKm : 0} টাকা
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FareEstimator;
