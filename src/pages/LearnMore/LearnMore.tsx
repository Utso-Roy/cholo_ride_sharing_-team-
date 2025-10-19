import React from "react";
import { motion } from "framer-motion";
import { Button } from "primereact/button";

const LearnMore = () => {
  return (
    <div className="bg-gradient-to-r from-[#e6fcf9] via-white to-[#e6fcf9] min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {/* Header Section */}
      <motion.div
        className="text-center max-w-3xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#27445D] mb-6 leading-tight">
          আমাদের সেবাগুলি সম্পর্কে আরও জানুন 
        </h1>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-10">
          আমরা প্রতিদিন আপনার যাত্রা ও অভিজ্ঞতাকে আরও সহজ ও আরামদায়ক করার জন্য কাজ করছি। 
          আমাদের সেবাগুলি শুধু পরিবহন নয়, এটি একটি নির্ভরযোগ্যতা ও আস্থার প্রতীক।
        </p>

        {/* Button */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            label="যোগাযোগ করুন"
            icon="pi pi-envelope"
            className="!bg-[#71BBB2] !border-none !text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:!bg-[#5aa69a] transition-all"
          />
        </motion.div>
      </motion.div>

      {/* Image + Animation Section */}
      <motion.div
        className="relative mt-16 flex flex-wrap items-center justify-center gap-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <motion.img
          src="https://i.ibb.co.com/nsYm6vcM/Bike-1.png"
          alt="Bike Ride"
          className="w-48 h-56 md:w-60 md:h-72 object-cover rounded-3xl shadow-xl hover:scale-105 transition-all duration-300"
          whileHover={{ rotate: -3 }}
        />
        <motion.img
          src="https://i.ibb.co.com/HTvxSpFd/car.png"
          alt="Car Ride"
          className="w-52 h-64 md:w-72 md:h-80 object-cover rounded-3xl shadow-2xl border-4 border-white hover:scale-105 transition-all duration-300"
          whileHover={{ rotate: 2 }}
        />
        <motion.img
          src="https://i.ibb.co.com/4RQG3k5K/Bus.png"
          alt="Bus Service"
          className="w-48 h-56 md:w-60 md:h-72 object-cover rounded-3xl shadow-xl hover:scale-105 transition-all duration-300"
          whileHover={{ rotate: 3 }}
        />
      </motion.div>

      {/* Bottom Text */}
      <motion.div
        className="mt-12 max-w-2xl text-center text-gray-700"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <p className="text-lg md:text-xl font-medium">
          আমাদের সাথে থাকুন, প্রতিটি যাত্রাকে আরও সুন্দর করে তুলুন।  
          আমরা আস্থা, নিরাপত্তা ও আরামের প্রতিশ্রুতি দিই।
        </p>
      </motion.div>
    </div>
  );
};

export default LearnMore;
