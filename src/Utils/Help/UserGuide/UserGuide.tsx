import React from "react";
import { Card } from "primereact/card";
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

const guideSteps = [
  {
    icon: <FaMobileAlt size={24} />,
    title: "অ্যাপ ইনস্টল করুন",
    description: "আপনার মোবাইলে আমাদের চলো রাইড শেয়ারিং অ্যাপ ইনস্টল করুন।",
  },
  {
    icon: <FaRegEdit size={24} />,
    title: "সাইন আপ বা লগইন করুন",
    description: "নতুন ইউজার হলে রেজিস্টার করুন অথবা পূর্বের অ্যাকাউন্ট দিয়ে লগইন করুন।",
  },
  {
    icon: <FaCarSide size={24} />,
    title: "রাইড বুক করুন",
    description: "সার্ভিস টাইপ নির্বাচন করুন, লোকেশন ও সময় দিন এবং বুকিং কনফার্ম করুন।",
  },
  {
    icon: <FaMapMarkerAlt size={24} />,
    title: "রাইড ট্র্যাক করুন",
    description: "ড্রাইভার এবং গাড়ির তথ্য আপনার অ্যাপে দেখতে পারবেন, রিয়েল-টাইম ট্র্যাকিং সুবিধা থাকবে।",
  },
  {
    icon: <FaStar size={24} />,
    title: "রেটিং দিন",
    description: "রাইড শেষে ড্রাইভারকে রেট করুন এবং অভিজ্ঞতা শেয়ার করুন।",
  },
  {
    icon: <FaWallet size={24} />,
    title: "পেমেন্ট সম্পন্ন করুন",
    description: "নিরাপদ পেমেন্ট গেটওয়ে ব্যবহার করে আপনার রাইডের পেমেন্ট করুন।",
  },
  {
    icon: <FaBell size={24} />,
    title: "নোটিফিকেশন চেক করুন",
    description: "আপনার বুকিং, প্রমো এবং আপডেট সম্পর্কে নোটিফিকেশন পান।",
  },
  {
    icon: <FaHeadset size={24} />,
    title: "সাপোর্ট পান",
    description: "যেকোনো সমস্যা বা প্রশ্নের জন্য কাস্টমার কেয়ার এর সঙ্গে যোগাযোগ করুন।",
  },
];

const UserGuide: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-[#e6fcf9] to-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-[#27445D] mb-12 drop-shadow-md">
          ইউজার গাইড
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guideSteps.map((step, index) => (
            <Card
              key={index}
              className="hover:shadow-2xl transition-transform transform hover:-translate-y-2 p-6 border border-gray-200 rounded-2xl"
              header={
                <div className="flex items-center justify-center w-16 h-16 bg-[#71BBB2] rounded-full text-white text-2xl mb-4 shadow-md">
                  {step.icon}
                </div>
              }
            >
              <h3 className="text-xl font-semibold text-[#27445D] mb-2">{step.title}</h3>
              <p className="text-[#27445D]">{step.description}</p>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center text-gray-600 text-lg font-medium">
          💡 মনে রাখবেন: সবসময় নিরাপদে এবং নিয়ম মেনে রাইড করুন।
        </div>
      </div>
    </div>
  );
};

export default UserGuide;
