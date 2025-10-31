import React, { useState, FormEvent } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const CustomerCare: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await axios.post(
        "https://cholo-ride-sharing-website-server-side.onrender.com/api/customer-care",
        data
      );
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "ধন্যবাদ!",
        text: "আপনার বার্তা সফলভাবে পাঠানো হয়েছে 💬",
        icon: "success",
        confirmButtonColor: "#5AA29F",
      });
      setFormData({ name: "", email: "", message: "" });
    },
    onError: () => {
      Swal.fire({
        title: "দুঃখিত!",
        text: "কিছু একটা ভুল হয়েছে, আবার চেষ্টা করুন 😥",
        icon: "error",
        confirmButtonColor: "#5AA29F",
      });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-16 px-6 flex flex-col items-center">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-extrabold text-center text-[#27445D] mb-12 drop-shadow-md"
      >
        🧭 কাস্টমার কেয়ার সাপোর্ট
      </motion.h2>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl mb-14">
        {[
          {
            icon: <FaPhoneAlt />,
            title: "হেল্পলাইন নাম্বার",
            info: "+880 1234 567 890",
            sub: "২৪/৭ খোলা",
          },
          {
            icon: <FaEnvelope />,
            title: "ইমেইল সাপোর্ট",
            info: "support@choloride.com",
            sub: "আমরা দ্রুত রিপ্লাই দেব",
          },
          {
            icon: <FaMapMarkerAlt />,
            title: "আমাদের ঠিকানা",
            info: "ঢাকা, বাংলাদেশ",
            sub: "Head Office",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#71BBB2] to-[#5AA29F] flex items-center justify-center text-white mb-4 text-2xl shadow-md">
              {card.icon}
            </div>
            <h3 className="text-xl font-semibold text-[#27445D] mb-1">
              {card.title}
            </h3>
            <p className="text-[#27445D] font-medium">{card.info}</p>
            <p className="text-sm text-gray-600">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full max-w-3xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-10"
      >
        <h3 className="text-2xl font-bold text-[#27445D] mb-6 text-center">
          ✉️ আমাদের সাথে যোগাযোগ করুন
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <span className="p-float-label w-full">
            <InputText
              id="name"
              className="w-full"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <label htmlFor="name">আপনার নাম</label>
          </span>

          <span className="p-float-label w-full">
            <InputText
              id="email"
              type="email"
              className="w-full"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <label htmlFor="email">আপনার ইমেইল</label>
          </span>

          <span className="p-float-label w-full">
            <InputTextarea
              id="message"
              rows={4}
              className="w-full"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
            />
            <label htmlFor="message">আপনার বার্তা লিখুন...</label>
          </span>

          <Button
            type="submit"
            label={isPending ? "পাঠানো হচ্ছে..." : "বার্তা পাঠান"}
            icon="pi pi-send"
            iconPos="left"
            disabled={isPending}
            className={`w-full py-3 rounded-xl text-lg font-semibold ${
              isPending
                ? "opacity-70 cursor-not-allowed"
                : "bg-gradient-to-r from-[#71BBB2] to-[#5AA29F] hover:from-[#5AA29F] hover:to-[#71BBB2] text-white transition-all duration-300"
            }`}
          />
        </form>
      </motion.div>
    </div>
  );
};

export default CustomerCare;
