import React, { useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
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
  { name: "জার্নি প্যাকেজ", ratePerKm: 22, icon: <FaMapMarkedAlt className="text-4xl text-[#71BBB2]" /> },
  { name: "অ্যাম্বুলেন্স সার্ভিস", ratePerKm: 35, icon: <FaAmbulance className="text-4xl text-[#71BBB2]" /> },
  { name: "পণ্য প্রেরণ", ratePerKm: 12, icon: <FaShippingFast className="text-4xl text-[#71BBB2]" /> },
];

const FareEstimator: React.FC = () => {
  const [distance, setDistance] = useState<number>(0);

  const handleReset = () => setDistance(0);

  // Generate chart data dynamically
  const chartData = {
    labels: services.map((s) => s.name),
    datasets: [
      {
        label: "আনুমানিক ভাড়া (টাকা)",
        backgroundColor: [
          "#71BBB2",
          "#6DD3B3",
          "#4CB8A0",
          "#92E3A9",
          "#71BBB2",
          "#4CB8A0",
          "#6DD3B3",
          "#92E3A9",
        ],
        borderColor: "#27445D",
        borderWidth: 1,
        data: services.map((s) => distance * s.ratePerKm),
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#27445D",
          font: { size: 14 },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#27445D" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#27445D" },
        grid: { color: "#E5E7EB" },
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#F7FAFC] to-white">
      <div className="w-full px-6 text-center">
        <h2 className="text-4xl md:text-5xl  text-[#27445D] font-bold mb-4">
          ভাড়া পরিকল্পনা
        </h2>
        <p className="text-gray-600 mb-12 max-w-4xl mx-auto">
          দূরত্ব (কি.মি.) দিয়ে আনুমানিক ভাড়া দেখুন এবং গ্রাফ আকারে তুলনা করুন।
        </p>

        {/* Input Section */}
        <div className="mb-10 flex justify-center gap-4 flex-wrap items-center">
          <InputNumber
            value={distance}
            onValueChange={(e) => setDistance(e.value || 0)}
            placeholder="দূরত্ব (কিমি)"
            min={0}
            showButtons
            buttonLayout="horizontal"
            decrementButtonClassName="!bg-[#71BBB2] !text-white"
            incrementButtonClassName="!bg-[#71BBB2] !text-white"
            inputClassName="border  !shadow-none border-gray-300 rounded-lg px-4 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-[#71BBB2]"
          />

          <Button
            label="রিসেট"
            className="!bg-[#71BBB2] !hover:bg-[#58a59a] !shadow-none !border-none !text-white"
            onClick={handleReset}
          />
        </div>

        {/* Chart Section */}
        <div className="w-full mb-16 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
          <Chart type="bar" data={chartData} options={chartOptions} />
        </div>

     
      </div>
    </section>
  );
};

export default FareEstimator;
