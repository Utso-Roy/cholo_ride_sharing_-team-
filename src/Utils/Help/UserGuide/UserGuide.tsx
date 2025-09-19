import React from "react";

const guideSteps = [
  {
    icon: "📱",
    title: "অ্যাপ ইনস্টল করুন",
    description: "আপনার মোবাইলে আমাদের চলো রাইড শেয়ারিং অ্যাপ ইনস্টল করুন।",
  },
  {
    icon: "📝",
    title: "সাইন আপ বা লগইন করুন",
    description: "নতুন ইউজার হলে রেজিস্টার করুন অথবা পূর্বের অ্যাকাউন্ট দিয়ে লগইন করুন।",
  },
  {
    icon: "🚗",
    title: "রাইড বুক করুন",
    description:
      "সার্ভিস টাইপ নির্বাচন করুন, লোকেশন ও সময় দিন এবং বুকিং কনফার্ম করুন।",
  },
  {
    icon: "📍",
    title: "রাইড ট্র্যাক করুন",
    description:
      "ড্রাইভার এবং গাড়ির তথ্য আপনার অ্যাপে দেখতে পারবেন, রিয়েল-টাইম ট্র্যাকিং সুবিধা থাকবে।",
  },
  {
    icon: "⭐",
    title: "রেটিং ও ফিডব্যাক দিন",
    description:
      "রাইড শেষে ড্রাইভারকে রেট করুন এবং প্রয়োজনে ফিডব্যাক দিন।",
  },
];

const UserGuide = () => {
  return (
    <div className="bg-gradient-to-br from-[#E3FDFD] via-[#CBF1F5] to-[#A6E3E9] min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-[#27445D] mb-12 drop-shadow-md">
          ইউজার গাইড
        </h2>

        <div className="relative">
          {/* Connector Line */}
          <div className="absolute left-6 top-0 w-1 h-full bg-gray-300"></div>

          {guideSteps.map((step, index) => (
            <div
              key={index}
              className="flex mb-10 relative group"
            >
              {/* Step Circle */}
              <div className="flex-shrink-0 z-10 w-12 h-12 rounded-full bg-[#71BBB2] text-white flex items-center justify-center text-xl font-bold shadow-lg transition-transform group-hover:scale-110">
                {step.icon}
              </div>

              {/* Step Content */}
              <div className="ml-8 p-4 bg-white/90 rounded-2xl shadow-md border border-gray-200 flex-1 hover:shadow-xl transition">
                <h3 className="text-xl font-semibold text-[#27445D] mb-1">
                  {step.title}
                </h3>
                <p className="text-[#27445D] text-base">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-600">
          💡 মনে রাখবেন: সবসময় নিরাপদে এবং নিয়ম মেনে রাইড করুন।
        </div>
      </div>
    </div>
  );
};

export default UserGuide;
