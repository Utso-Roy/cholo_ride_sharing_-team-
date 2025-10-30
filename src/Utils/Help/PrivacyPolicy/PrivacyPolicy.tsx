import React from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { FaShieldAlt, FaUserLock, FaLock, FaRegEye } from "react-icons/fa";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-[#E8FAF7] via-[#F9FAFB] to-[#EEF5F3] min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#233d54] mb-14 tracking-wide drop-shadow-md">
           সেফটি ও প্রাইভেসি নীতিমালা
        </h2>

        {/* Feature Boxes */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {[
            {
              icon: <FaShieldAlt />,
              title: "ডেটা সুরক্ষা",
              text: "আপনার ব্যক্তিগত তথ্য সর্বদা সুরক্ষিত রাখা হয়। আমরা সর্বশেষ এনক্রিপশন প্রযুক্তি ব্যবহার করি।",
            },
            {
              icon: <FaUserLock />,
              title: "গোপনীয়তা",
              text: "আমরা আপনার তথ্য কোনো তৃতীয় পক্ষের সাথে বিক্রি, শেয়ার বা অপব্যবহার করি না।",
            },
            {
              icon: <FaLock />,
              title: "সিকিউর লগইন",
              text: "প্রতিটি লগইনে মাল্টি-লেয়ার সিকিউরিটি ব্যবহার করা হয় যাতে আপনার অ্যাকাউন্ট নিরাপদ থাকে।",
            },
            {
              icon: <FaRegEye />,
              title: "ট্রান্সপারেন্সি",
              text: "আপনার তথ্য কিভাবে ব্যবহার হচ্ছে তা আমরা সর্বদা পরিষ্কারভাবে জানিয়ে থাকি।",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-start p-8 bg-white/80 backdrop-blur-lg rounded-3xl border border-gray-200 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl text-[#5AA29F] bg-[#E6FCF9] p-3 rounded-full shadow-inner">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#1E293B]">
                  {item.title}
                </h3>
              </div>
              <p className="text-[#334155] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-12"></div>

        {/* Accordion Section */}
        <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl border border-gray-200 p-10">
          <h3 className="text-3xl font-bold text-center text-[#233d54] mb-8">
            📘 বিস্তারিত নীতিমালা
          </h3>
          <Accordion multiple>
            <AccordionTab header="🔒 আমরা কোন তথ্য সংগ্রহ করি?">
              <p className="text-[#334155] leading-relaxed">
                আমরা কেবলমাত্র প্রয়োজনীয় তথ্য যেমন নাম, ইমেইল, ফোন নম্বর এবং
                লোকেশন সংগ্রহ করি আপনার সেবা নিশ্চিত করার জন্য।
              </p>
            </AccordionTab>
            <AccordionTab header="🛡️ আমরা আপনার তথ্য কিভাবে ব্যবহার করি?">
              <p className="text-[#334155] leading-relaxed">
                কেবল রাইড বুকিং, নিরাপত্তা যাচাই, এবং কাস্টমার সার্ভিস এর জন্যই আপনার তথ্য ব্যবহার করা হয়।
              </p>
            </AccordionTab>
            <AccordionTab header="🤝 তৃতীয় পক্ষের সাথে শেয়ারিং নীতি">
              <p className="text-[#334155] leading-relaxed">
                আপনার তথ্য শুধুমাত্র আইনের প্রয়োজনে বা রাইড সম্পূর্ণ করতে
                ড্রাইভারের সাথে সীমিত আকারে শেয়ার করা হতে পারে।
              </p>
            </AccordionTab>
            <AccordionTab header="📜 আপনার অধিকার">
              <p className="text-[#334155] leading-relaxed">
                আপনি চাইলে যেকোনো সময় আপনার তথ্য আপডেট, ডাউনলোড বা মুছে দিতে পারেন।
              </p>
            </AccordionTab>
          </Accordion>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 mt-12 text-sm">
          © 2025 চলো রাইড শেয়ারিং | আপনার সুরক্ষা, আমাদের প্রতিশ্রুতি
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
