import React from "react";
import {
  FaMobileAlt,
  FaRegEdit,
  FaCarSide,
  FaMapMarkerAlt,
  FaStar,
  FaWallet,
  FaBell,
  FaHeadset,
} from "react-icons/fa";
import { motion } from "framer-motion";

const guideSteps = [
  {
    icon: <FaMobileAlt />,
    title: "অ্যাপ ইনস্টল করুন",
    description: "আপনার মোবাইলে আমাদের চলো রাইড শেয়ারিং অ্যাপ ইনস্টল করুন।",
  },
  {
    icon: <FaRegEdit />,
    title: "সাইন আপ বা লগইন করুন",
    description:
      "নতুন ইউজার হলে রেজিস্টার করুন অথবা পূর্বের অ্যাকাউন্ট দিয়ে লগইন করুন।",
  },
  {
    icon: <FaCarSide />,
    title: "রাইড বুক করুন",
    description:
      "সার্ভিস টাইপ নির্বাচন করুন, লোকেশন ও সময় দিন এবং বুকিং কনফার্ম করুন।",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "রাইড ট্র্যাক করুন",
    description:
      "ড্রাইভার এবং গাড়ির তথ্য আপনার অ্যাপে দেখতে পারবেন, রিয়েল-টাইম ট্র্যাকিং সুবিধা থাকবে।",
  },
  {
    icon: <FaStar />,
    title: "রেটিং দিন",
    description: "রাইড শেষে ড্রাইভারকে রেট করুন এবং অভিজ্ঞতা শেয়ার করুন।",
  },
  {
    icon: <FaWallet />,
    title: "পেমেন্ট সম্পন্ন করুন",
    description:
      "নিরাপদ পেমেন্ট গেটওয়ে ব্যবহার করে আপনার রাইডের পেমেন্ট করুন।",
  },
  {
    icon: <FaBell />,
    title: "নোটিফিকেশন চেক করুন",
    description:
      "আপনার বুকিং, প্রমো এবং আপডেট সম্পর্কে নোটিফিকেশন পান।",
  },
  {
    icon: <FaHeadset />,
    title: "সাপোর্ট পান",
    description:
      "যেকোনো সমস্যা বা প্রশ্নের জন্য কাস্টমার কেয়ার এর সঙ্গে যোগাযোগ করুন।",
  },
];

const UserGuide: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-[#d0f3ef] via-[#f6fbfa] to-[#eef2f3] min-h-screen py-16 px-6">
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-extrabold text-center text-[#27445D] mb-14 drop-shadow-md"
      >
         ইউজার গাইড
      </motion.h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {guideSteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-3xl shadow-lg p-8 text-center transition-all duration-300 hover:shadow-2xl"
          >
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-[#71BBB2] to-[#5AA29F] text-white text-2xl shadow-md mb-5">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold text-[#27445D] mb-2">
              {step.title}
            </h3>
            <p className="text-[#27445D] leading-relaxed text-base">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16 text-center text-gray-600 text-lg font-medium"
      >
        💡 মনে রাখবেন: সবসময় নিরাপদে এবং নিয়ম মেনে রাইড করুন।
      </motion.div>
    </div>
  );
};

export default UserGuide;
