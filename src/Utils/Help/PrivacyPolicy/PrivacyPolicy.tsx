import React from "react";
import { Card } from "primereact/card";
import { Accordion, AccordionTab } from "primereact/accordion";
import { FaShieldAlt, FaUserLock, FaLock, FaRegEye } from "react-icons/fa";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-[#e6fcf9] to-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-[#27445D] mb-12 drop-shadow-md">
          সেফটি ও প্রাইভেসি নীতিমালা
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="p-6 shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2">
            <div className="flex items-center gap-3 mb-3">
              <FaShieldAlt className="text-3xl text-[#71BBB2]" />
              <h3 className="text-xl font-semibold text-[#27445D]">ডেটা সুরক্ষা</h3>
            </div>
            <p className="text-[#27445D]">
              আপনার ব্যক্তিগত তথ্য সর্বদা সুরক্ষিত রাখা হয়। আমরা সর্বশেষ
              এনক্রিপশন প্রযুক্তি ব্যবহার করি।
            </p>
          </Card>

          <Card className="p-6 shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2">
            <div className="flex items-center gap-3 mb-3">
              <FaUserLock className="text-3xl text-[#71BBB2]" />
              <h3 className="text-xl font-semibold text-[#27445D]">গোপনীয়তা</h3>
            </div>
            <p className="text-[#27445D]">
              আমরা আপনার তথ্য কোনো তৃতীয় পক্ষের সাথে বিক্রি, শেয়ার বা অপব্যবহার করি না।
            </p>
          </Card>

          <Card className="p-6 shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2">
            <div className="flex items-center gap-3 mb-3">
              <FaLock className="text-3xl text-[#71BBB2]" />
              <h3 className="text-xl font-semibold text-[#27445D]">সিকিউর লগইন</h3>
            </div>
            <p className="text-[#27445D]">
              প্রতিটি লগইন প্রক্রিয়ায় মাল্টি-লেয়ার সিকিউরিটি ব্যবহার করা হয় যাতে আপনার অ্যাকাউন্ট নিরাপদ থাকে।
            </p>
          </Card>

          <Card className="p-6 shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2">
            <div className="flex items-center gap-3 mb-3">
              <FaRegEye className="text-3xl text-[#71BBB2]" />
              <h3 className="text-xl font-semibold text-[#27445D]">ট্রান্সপারেন্সি</h3>
            </div>
            <p className="text-[#27445D]">
              আপনার তথ্য কিভাবে ব্যবহার হচ্ছে তা আমরা সর্বদা পরিষ্কারভাবে জানিয়ে থাকি।
            </p>
          </Card>
        </div>

        <Card className="p-6 shadow-lg border border-gray-200 bg-white/90">
          <h3 className="text-2xl font-bold text-center text-[#27445D] mb-6">
            বিস্তারিত নীতিমালা
          </h3>
          <Accordion multiple>
            <AccordionTab header="🔒 আমরা কোন তথ্য সংগ্রহ করি?">
              <p className="text-[#27445D]">
                আমরা কেবলমাত্র প্রয়োজনীয় তথ্য যেমন নাম, ইমেইল, ফোন নম্বর এবং
                লোকেশন সংগ্রহ করি আপনার সেবা নিশ্চিত করার জন্য।
              </p>
            </AccordionTab>
            <AccordionTab header="🛡️ আমরা আপনার তথ্য কিভাবে ব্যবহার করি?">
              <p className="text-[#27445D]">
                কেবল রাইড বুকিং, নিরাপত্তা যাচাই, এবং কাস্টমার সার্ভিস এর জন্যই আপনার তথ্য ব্যবহার করা হয়।
              </p>
            </AccordionTab>
            <AccordionTab header="🤝 তৃতীয় পক্ষের সাথে শেয়ারিং নীতি">
              <p className="text-[#27445D]">
                আপনার তথ্য শুধুমাত্র আইনের প্রয়োজনে বা রাইড সম্পূর্ণ করতে
                ড্রাইভারের সাথে সীমিত আকারে শেয়ার করা হতে পারে।
              </p>
            </AccordionTab>
            <AccordionTab header="📜 আপনার অধিকার">
              <p className="text-[#27445D]">
                আপনি চাইলে যেকোনো সময় আপনার তথ্য আপডেট, ডাউনলোড বা মুছে দিতে পারেন।
              </p>
            </AccordionTab>
          </Accordion>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
