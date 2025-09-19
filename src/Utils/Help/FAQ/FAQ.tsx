import React, { useState } from "react";

const faqItems = [
  {
    question: "আমি কিভাবে রাইড বুক করতে পারি?",
    answer: "আপনি সার্ভিস নির্বাচন করে লোকেশন ও টাইম দিয়ে সহজে বুক করতে পারবেন।",
  },
  {
    question: "ড্রাইভার রেটিং কিভাবে কাজ করে?",
    answer: "প্রতিটি রাইড শেষে আপনি ড্রাইভারকে ১–৫ স্টার দিতে পারবেন।",
  },
  {
    question: "আমি কিভাবে আমার রাইড ক্যান্সেল করতে পারি?",
    answer: "আপনি মাই রাইডস থেকে ক্যান্সেল বাটনে ক্লিক করে রাইড বাতিল করতে পারবেন।",
  },
  {
    question: "রাইড ক্যানসেল করলে কোনো চার্জ লাগবে কি?",
    answer:"বুকিংয়ের ২ মিনিটের মধ্যে ক্যানসেল করলে কোনো চার্জ নেই। এর পরে ক্যানসেল করলে একটি ছোট চার্জ প্রযোজ্য হতে পারে।",
  },
  {
    question: "আমি রাইডের সময় ও অবস্থান শেয়ার করতে পারি কি?",
    answer:"হ্যাঁ, রাইড চলাকালীন আপনি আপনার লাইভ লোকেশন পরিবার বা বন্ধুদের সাথে শেয়ার করতে পারবেন।",
  },
  {
    question: "যদি চালক সময়মতো না আসে তাহলে কী করবো?",
    answer:"চালক নির্ধারিত সময়ে না এলে আপনি বুকিং ক্যানসেল করে নতুন চালক নির্বাচন করতে পারবেন অথবা হেল্পলাইন-এ যোগাযোগ করতে পারেন।",
  },
  {
    question: "আমি কিভাবে অভিযোগ জানাবো?",
    answer:"‘সাপোর্ট’ মেনুতে গিয়ে অভিযোগ/প্রস্তাব দিন অপশন থেকে অভিযোগ জানাতে পারবেন।",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-br from-[#E3FDFD] via-[#CBF1F5] to-[#A6E3E9] min-h-screen py-12 px-4">
      <h2 className="text-4xl font-extrabold text-center text-[#27445D] mb-10 drop-shadow-md">
        সাধারণ জিজ্ঞাসা (FAQ)
      </h2>

      <div className="max-w-2xl mx-auto flex flex-col gap-5">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="backdrop-blur-md bg-white/80 border border-gray-200 shadow-lg rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-lg font-semibold text-[#27445D] hover:bg-[#71BBB2]/20 transition"
            >
              {item.question}
              <span
                className={`transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            <div
              className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index ? "max-h-40 py-4" : "max-h-0"
              }`}
            >
              <p className="text-[#27445D] text-base leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
