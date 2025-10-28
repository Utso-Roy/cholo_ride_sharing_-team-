import React, { useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { FaLifeRing, FaEnvelope, FaPhone } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

interface FeedbackForm {
  name: string;
  email: string;
  message: string;
}

const HelpCenter: React.FC = () => {
  const faqs = [
    {
      question: "আমি কিভাবে আমার রাইড বুক করতে পারি?",
      answer: "আপনি 'আমার রাইডসমূহ' পেজ থেকে নতুন রাইড বুক করতে পারেন। Pickup এবং Dropoff লোকেশন সিলেক্ট করুন এবং বুক করুন।"
    },
    {
      question: "আমি কিভাবে পেমেন্ট করতে পারি?",
      answer: "পেমেন্ট পেজে গিয়ে আপনার রাইডের জন্য Online Payment বা Cash Payment করতে পারবেন।"
    },
    {
      question: "আমি কি প্রিয় ড্রাইভার সেভ করতে পারি?",
      answer: "হ্যাঁ, প্রিয় ড্রাইভার পেজে গিয়ে আপনার প্রিয় ড্রাইভারকে Favorite হিসেবে সেভ করতে পারবেন।"
    },
    {
      question: "আমি কিভাবে Support টিমের সাথে যোগাযোগ করতে পারি?",
      answer: "আপনি নিচের Contact/Feedback section থেকে ইমেইল বা ফোনের মাধ্যমে আমাদের সাথে যোগাযোগ করতে পারেন।"
    },
  ];

  const [form, setForm] = useState<FeedbackForm>({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/feedbacks`, form);
       toast.success("ফিডব্যাক সফলভাবে পাঠানো হয়েছে!")
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      
      toast.error("কিছু ভুল হয়েছে, আবার চেষ্টা করুন।");
    }
  };

  return (
    <div
      className="py-16 w-full px-6 min-h-screen"
      style={{ background: "linear-gradient(to bottom, #e0f7f5, #f0fcfc)" }}
    >
      {/* শিরোনাম */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-[#27445D] flex items-center gap-3">
          <FaLifeRing className="text-[#71BBB2]" /> সহায়তা কেন্দ্র
        </h2>
        <p className="text-gray-600 mt-2 md:mt-0">
          দ্রুত সমাধানের জন্য আমাদের FAQ এবং ফিডব্যাক সেকশন ব্যবহার করুন।
        </p>
      </div>

      {/* প্রায়শই জিজ্ঞাসিত প্রশ্ন (FAQ) */}
      <h1 className="text-[#27445D] mb-4 font-medium text-lg">প্রায়শই জিজ্ঞাসিত প্রশ্ন</h1>
      <Accordion multiple className="shadow-lg rounded-xl bg-white border border-gray-200">
        {faqs.map((faq, idx) => (
          <AccordionTab
            key={idx}
            header={<span className="text-sm font-semibold text-[#27445D]">{faq.question}</span>}
            headerClassName="hover:bg-[#e6f9f7] transition-colors"
          >
            <p className="text-sm font-normal text-[#27445D]">{faq.answer}</p>
          </AccordionTab>
        ))}
      </Accordion>

      {/* ফিডব্যাক সেকশন */}
      <h1 className="text-[#27445D] font-medium text-lg mt-10 mb-6">যোগাযোগ / ফিডব্যাক</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* ফিডব্যাক ফর্ম */}
        <div
          className="bg-white p-6 rounded-xl shadow-lg"
          style={{ background: "linear-gradient(to bottom right, #ffffff, #e0f7f5)" }}
        >
          {success && <p className="mb-4 text-green-600 font-medium">{success}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="আপনার নাম"
              required
              className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#71BBB2] focus:outline-none transition"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="আপনার ইমেইল"
              required
              className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#71BBB2] focus:outline-none transition"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="আপনার বার্তা"
              required
              rows={4}
              className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#71BBB2] focus:outline-none transition"
            />
            <button
              type="submit"
              className="bg-[#71BBB2] text-white p-3 rounded hover:bg-[#5aa49c] transition font-semibold"
            >
              ফিডব্যাক পাঠান
            </button>
          </form>
        </div>

        {/* যোগাযোগ তথ্য */}
        <div
          className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4"
          style={{ background: "linear-gradient(to bottom right, #ffffff, #e0f7f5)" }}
        >
          <h3 className="text-xl font-semibold text-[#27445D] ">যোগাযোগের তথ্য</h3>
          <p className="text-[#27445D]">
            আপনার যেকোনো প্রশ্ন বা সাহায্যের জন্য আমাদের Support টিম সর্বদা প্রস্তুত।
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <FaEnvelope className="text-[#71BBB2]" /> ইমেইল:{" "}
            <a href="mailto:support@rideapp.com" className="text-blue-600 ml-1">
              support@rideapp.com
            </a>
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <FaPhone className="text-[#71BBB2]" /> ফোন:{" "}
            <a href="tel:+880123456789" className="text-blue-600 ml-1">
              +880 1234 56789
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
