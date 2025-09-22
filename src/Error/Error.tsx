import React from "react";
import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";
import { NavLink } from "react-router";

const Error: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-[#ffe6e6] to-[#fff0f0] overflow-hidden p-4">
      {/* Floating circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-red-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>

      <motion.div
        className="relative bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center text-center max-w-md z-10"
        initial={{ opacity: 0, y: -40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="text-7xl text-red-500 mb-6"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <FaExclamationTriangle />
        </motion.div>

        <motion.h1
          className="text-4xl font-bold text-red-600 mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          404 | পেজটি পাওয়া যায়নি
        </motion.h1>

        <motion.p
          className="text-gray-700 mb-6"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি। হয়তো URL ভুল বা পেজটি সরানো হয়েছে।
        </motion.p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <NavLink
            to="/"
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full shadow-lg transition-all"
          >
            হোমপেজে ফিরে যান
          </NavLink>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Error;
