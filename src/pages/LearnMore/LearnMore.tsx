import React from "react";
import { motion } from "framer-motion";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";
import {
  FaBiking,
  FaCar,
  FaBus,
  FaHandsHelping,
  FaShieldAlt,
  FaClock,
  FaPhoneAlt,
  FaUsers,
  FaLeaf,
} from "react-icons/fa";

const LearnMore = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-br from-[#E8FCF9] via-[#F8FFFE] to-[#E8FCF9] min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-10 py-16">

      {/* 🔙 Back Button */}
      <motion.div
        className="absolute top-6 left-6 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Button
          label="পেছনে যান"
          icon="pi pi-arrow-left"
          className="!bg-[#71BBB2] !border-none !text-white font-medium px-5 py-2 rounded-full shadow-md hover:!bg-[#5aa69a] transition-all"
          onClick={() => navigate(-1)}
        />
      </motion.div>

      {/* 🌟 Header Section */}
      <motion.div
        className="text-center max-w-4xl mt-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#27445D] mb-6 leading-snug tracking-tight flex justify-center items-center gap-3">
          <FaHandsHelping className="text-[#56A89E]" /> আমাদের সেবাগুলি সম্পর্কে আরও জানুন
        </h1>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-10">
          “চলো” শুধু একটি রাইড-শেয়ারিং সার্ভিস নয় — এটি মানুষের জীবনকে আরও সহজ, নিরাপদ এবং আরামদায়ক করার একটি প্রতিশ্রুতি।
          আমরা প্রতিদিন হাজারো মানুষের যাত্রাকে সহজতর করতে প্রযুক্তি, নির্ভরযোগ্য ড্রাইভার এবং নিরাপদ যাত্রা নিশ্চিত করার চেষ্টা করছি।
        </p>

        {/* যোগাযোগ করুন Button */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            label="যোগাযোগ করুন"
            icon="pi pi-envelope"
            className="!bg-gradient-to-r !from-[#71BBB2] !to-[#56A89E] !text-white !border-none font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all"
          />
        </motion.div>
      </motion.div>

      {/* 🚗 Floating Image Section */}
      <motion.div
        className="relative mt-16 flex flex-wrap items-center justify-center gap-6 md:gap-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <motion.div whileHover={{ rotate: -3, y: -8 }} className="flex flex-col items-center">
          <FaBiking className="text-4xl text-[#56A89E] mb-2" />
          <motion.img
            src="https://i.ibb.co.com/nsYm6vcM/Bike-1.png"
            alt="Bike Ride"
            className="w-40 h-52 md:w-56 md:h-72 object-cover rounded-3xl shadow-lg hover:scale-105 transition-all duration-300"
          />
        </motion.div>

        <motion.div whileHover={{ rotate: 2, y: -10 }} className="flex flex-col items-center">
          <FaCar className="text-4xl text-[#56A89E] mb-2" />
          <motion.img
            src="https://i.ibb.co.com/HTvxSpFd/car.png"
            alt="Car Ride"
            className="w-48 h-64 md:w-72 md:h-80 object-cover rounded-3xl shadow-2xl border-4 border-white hover:scale-110 transition-all duration-300"
          />
        </motion.div>

        <motion.div whileHover={{ rotate: 3, y: -8 }} className="flex flex-col items-center">
          <FaBus className="text-4xl text-[#56A89E] mb-2" />
          <motion.img
            src="https://i.ibb.co.com/4RQG3k5K/Bus.png"
            alt="Bus Service"
            className="w-40 h-52 md:w-56 md:h-72 object-cover rounded-3xl shadow-lg hover:scale-105 transition-all duration-300"
          />
        </motion.div>
      </motion.div>

      {/* ✨ Motivation Text */}
      <motion.div
        className="mt-12 max-w-3xl text-center text-gray-700 px-3"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 flex justify-center items-center gap-2">
          <FaShieldAlt className="text-[#56A89E]" /> আমাদের সাথে থাকুন, প্রতিটি যাত্রাকে আরও সুন্দর করে তুলুন।  
        </p>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed space-y-2">
          <span className="block flex items-center justify-center gap-2">
            <FaUsers className="text-[#56A89E]" /> আমাদের রাইডাররা প্রশিক্ষিত, সেবা দিতে সদা প্রস্তুত।
          </span>
          <span className="block flex items-center justify-center gap-2">
            <FaClock className="text-[#56A89E]" /> প্রতিটি রাইড রিয়েল-টাইমে ট্র্যাক করা যায়।
          </span>
          <span className="block flex items-center justify-center gap-2">
            <FaPhoneAlt className="text-[#56A89E]" /> কাস্টমার সাপোর্ট ২৪/৭ খোলা।
          </span>
        </p>
      </motion.div>

      {/* 🚀 Join Us Section */}
      <motion.div
        className="mt-20 w-full max-w-3xl text-center bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-10 border border-[#71BBB2]/30"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-[#27445D] mb-4 flex justify-center items-center gap-2">
          <FaLeaf className="text-[#56A89E]" /> আমাদের সাথে যোগ দিন
        </h2>
        <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed">
          চলো পরিবারের অংশ হোন — নতুন সুযোগ, উন্নত সেবা এবং একসাথে পরিবর্তনের পথে হাঁটুন।  
          একসাথে আমরা গড়ে তুলব একটি নিরাপদ, পরিবেশবান্ধব এবং টেকসই যাত্রা অভিজ্ঞতা।
        </p>
        <p className="text-gray-500 text-base md:text-lg mb-10">
          আমাদের মিশন হলো শহরের ভেতরকার যোগাযোগ আরও সহজ করা, ট্রাফিক কমানো, এবং পরিবেশ রক্ষা করা।  
          প্রতিটি রাইড যখন ভাগ করা হয়, তখন শুধু সময় নয় — আমরা সবাই একসাথে ভবিষ্যতকে রক্ষা করি।
        </p>

        <motion.div whileHover={{ scale: 1.08 }}>
          <Button
            label="এখনই যোগ দিন"
            icon="pi pi-user-plus"
            className="!bg-gradient-to-r !from-[#71BBB2] !to-[#56A89E] !text-white !border-none 
                       font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl 
                       hover:!from-[#56A89E] hover:!to-[#71BBB2] transition-all duration-300"
          />
        </motion.div>
      </motion.div>

      {/* Floating background shapes */}
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#71BBB2]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#56A89E]/10 rounded-full blur-3xl"></div>
    </div>
  );
};

export default LearnMore;
