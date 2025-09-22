import React from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { FaQuestionCircle } from "react-icons/fa";

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
    answer:
      "বুকিংয়ের ২ মিনিটের মধ্যে ক্যানসেল করলে কোনো চার্জ নেই। এর পরে ক্যানসেল করলে একটি ছোট চার্জ প্রযোজ্য হতে পারে।",
  },
  {
    question: "আমি রাইডের সময় ও অবস্থান শেয়ার করতে পারি কি?",
    answer:
      "হ্যাঁ, রাইড চলাকালীন আপনি আপনার লাইভ লোকেশন পরিবার বা বন্ধুদের সাথে শেয়ার করতে পারবেন।",
  },
  {
    question: "যদি চালক সময়মতো না আসে তাহলে কী করবো?",
    answer:
      "চালক নির্ধারিত সময়ে না এলে আপনি বুকিং ক্যানসেল করে নতুন চালক নির্বাচন করতে পারবেন অথবা হেল্পলাইন-এ যোগাযোগ করতে পারেন।",
  },
  {
    question: "আমি কিভাবে অভিযোগ জানাবো?",
    answer:
      "‘সাপোর্ট’ মেনুতে গিয়ে অভিযোগ/প্রস্তাব দিন অপশন থেকে অভিযোগ জানাতে পারবেন।",
  },
];

const FAQ: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-[#e6fcf9] to-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-[#27445D] mb-10 drop-shadow-md">
          সাধারণ জিজ্ঞাসা (FAQ)
        </h2>

        <Accordion multiple className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200">
          {faqItems.map((item, index) => (
            <AccordionTab
              key={index}
              header={
                <div className="flex items-center gap-3 text-[#27445D] font-semibold text-lg">
                  <FaQuestionCircle className="text-[#71BBB2]" />
                  {item.question}
                </div>
              }
              headerClassName="hover:text-[#71BBB2] transition-colors"
              contentClassName="text-[#27445D] text-base leading-relaxed px-4 py-3"
            >
              {item.answer}
            </AccordionTab>
          ))}
        </Accordion>

        <div className="mt-8 text-center text-gray-600 text-lg font-medium">
          💡 মনে রাখবেন: সবসময় নিরাপদে এবং নিয়ম মেনে রাইড করুন।
        </div>
      </div>
    </div>
  );
};

export default FAQ;
