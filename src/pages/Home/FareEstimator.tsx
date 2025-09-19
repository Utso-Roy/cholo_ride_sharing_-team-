import React, { useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import {
  FaMotorcycle,
  FaCar,
  FaBus,
  FaAmbulance,
  FaShippingFast,
  FaTaxi,
  FaShuttleVan,
  FaMapMarkedAlt,
} from "react-icons/fa";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";

interface ServiceFare {
  name: string;
  ratePerKm: number;
  icon: JSX.Element;
}

const services: ServiceFare[] = [
  { name: "বাইক রাইড", ratePerKm: 15, icon: <FaMotorcycle className="text-4xl text-[#71BBB2]" /> },
  { name: "CNG / অটো রাইড", ratePerKm: 20, icon: <FaTaxi className="text-4xl text-[#71BBB2]" /> },
  { name: "কার রাইড", ratePerKm: 25, icon: <FaCar className="text-4xl text-[#71BBB2]" /> },
  { name: "ট্র্যাক সার্ভিস", ratePerKm: 30, icon: <FaBus className="text-4xl text-[#71BBB2]" /> },
  { name: "শাটল সার্ভিস", ratePerKm: 18, icon: <FaShuttleVan className="text-4xl text-[#71BBB2]" /> },
  { name: "জার্নি প্যাকেজ সিস্টেম", ratePerKm: 22, icon: <FaMapMarkedAlt className="text-4xl text-[#71BBB2]" /> },
  { name: "মেডিকেল সার্ভিস / অ্যাম্বুলেন্স", ratePerKm: 35, icon: <FaAmbulance className="text-4xl text-[#71BBB2]" /> },
  { name: "প্যাকেজ / পণ্য প্রেরণ", ratePerKm: 12, icon: <FaShippingFast className="text-4xl text-[#71BBB2]" /> },
];

const FareEstimator: React.FC = () => {
  const [distance, setDistance] = useState<number>(0);

  const handleReset = () => setDistance(0); // Reset distance

  return (
    <section className="py-16 bg-[#e6fcf9]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl text-[#27445D] font-bold mb-6">
          ভাড়া পরিকল্পনা
        </h2>
        <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
          দূরত্ব দিয়ে আনুমানিক ভাড়া দেখুন। সার্ভিস অনুযায়ী সহজে তুলনা করুন।
        </p>

        {/* Distance Input */}
        <div className="mb-8 flex justify-center gap-4 flex-wrap items-center">
          <InputNumber
            value={distance}
            onValueChange={(e) => setDistance(e.value || 0)}
            placeholder="দূরত্ব (কিমি)"
            min={0}
            showButtons
            buttonLayout="horizontal"
            decrementButtonClassName="!bg-[#71BBB2] !text-white"
            incrementButtonClassName="!bg-[#71BBB2] !text-white"
            inputClassName="border border-gray-300 rounded-lg px-4 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-[#71BBB2]"
          />

          {/* Reset Button */}
          <Button
            label="রিসেট"
            className="!bg-red-400 !hover:bg-red-600 !border-none !shadow-none !text-white"
            onClick={handleReset}
          />
        </div>

        {/* Fare Cards */}
        <div className="grid gap-6 md:grid-cols-4 sm:grid-cols-2">
          {services.map((service, idx) => {
            const fare = distance > 0 ? distance * service.ratePerKm : 0;
            return (
              <Card
                key={idx}
                className="bg-white p-3 space-y-2 rounded-2xl shadow hover:shadow-xl transition cursor-pointer flex flex-col items-center gap-4"
              >
                <div className="text-5xl flex items-center justify-center text-[#71BBB2]">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-1">{service.name}</h3>
                <p className="text-gray-600 mb-1">রেট প্রতি কিমি: {service.ratePerKm} টাকা</p>
                <p className="text-lg font-bold text-[#27445D]">
                  আনুমানিক ভাড়া: {fare.toLocaleString()} টাকা
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FareEstimator;
