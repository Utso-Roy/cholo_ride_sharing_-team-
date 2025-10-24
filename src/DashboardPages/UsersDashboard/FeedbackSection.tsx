import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

interface FeedbackForm {
  name: string;
  email: string;
  message: string;
}

const FeedbackSection: React.FC = () => {
  const [form, setForm] = useState<FeedbackForm>({ name: "", email: "", message: "" });

  const mutation = useMutation({
    mutationFn: (newFeedback: FeedbackForm) =>
      axios.post(`${import.meta.env.VITE_API_URL}/api/feedbacks`, {
        name: newFeedback.name,
        email: newFeedback.email,
        message: newFeedback.message,
        status: "unread",
        createdAt: new Date(),
      }),
    onSuccess: () => {
      toast.success("ফিডব্যাক সফলভাবে পাঠানো হয়েছে!");
      setForm({ name: "", email: "", message: "" });
    },
    onError: () => {
      toast.error("কিছু ভুল হয়েছে, আবার চেষ্টা করুন।");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="w-full px-6 py-16  flex justify-center bg-[#f0fcfc]">
      <div className="
                      rounded-3xl shadow-2xl p-10 md:p-16 max-w-xl w-full
                      border border-gray-100">
        <h2 className="text-3xl font-bold text-[#27445D] mb-4 text-center">
          যোগাযোগ / ফিডব্যাক
        </h2>
        <p className="text-gray-600 text-center mb-8">
          আপনার মতামত বা প্রশ্ন আমাদের জানান। আমরা সর্বোচ্চ গুরুত্ব দিয়ে উত্তর দেব।
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="আপনার নাম"
            required
            className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#71BBB2] focus:outline-none transition shadow-md hover:shadow-lg"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="আপনার ইমেইল"
            required
            className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#71BBB2] focus:outline-none transition shadow-md hover:shadow-lg"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="আপনার বার্তা"
            required
            rows={4}
            className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#71BBB2] focus:outline-none transition shadow-md hover:shadow-lg resize-none"
          />
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="bg-[#71BBB2] text-white font-semibold p-4 rounded-xl hover:bg-[#5aa49c] transition shadow-md hover:shadow-lg"
          >
            {mutation.isLoading ? "পাঠানো হচ্ছে..." : "ফিডব্যাক পাঠান"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackSection;
