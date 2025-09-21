import React from "react";
import { Button } from "primereact/button";

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#71BBB2] to-[#27445D] text-white">
      <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center gap-6">
        <h2 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
          আজই রাইড বুক করুন এবং দ্রুত যাত্রার আনন্দ নিন!
        </h2>
        <p className="text-lg md:text-xl text-gray-100 max-w-2xl">
          সহজ, দ্রুত এবং নিরাপদ রাইডিং সার্ভিস এখন এক ক্লিকে।
        </p>
        <Button
          label="Book Now"
          className="!bg-white !text-[#71BBB2] !font-bold !px-10 !py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
        />
      </div>
    </section>
  );
};

export default CallToAction;
