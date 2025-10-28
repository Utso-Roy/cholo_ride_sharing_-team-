import React, { useState, FormEvent } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const CustomerCare: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // ✅ Mutation setup for sending message to server
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await axios.post(
        "http://localhost:3000/api/customer-care",
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
    <div className="bg-gradient-to-r from-[#e6fcf9] to-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-[#27445D] mb-10 drop-shadow-md">
          🧭 কাস্টমার কেয়ার সাপোর্ট
        </h2>

        {/* --- Info Cards --- */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center p-6 hover:shadow-2xl transition-transform transform hover:-translate-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#71BBB2] to-[#5AA29F] flex items-center justify-center text-white mb-4 shadow-md text-2xl">
              <FaPhoneAlt />
            </div>
            <h3 className="text-xl font-semibold text-[#27445D] mb-1">
              হেল্পলাইন নাম্বার
            </h3>
            <p className="text-[#27445D] font-medium">+880 1234 567 890</p>
            <p className="text-sm text-gray-500">২৪/৭ খোলা</p>
          </Card>

          <Card className="text-center p-6 hover:shadow-2xl transition-transform transform hover:-translate-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#71BBB2] to-[#5AA29F] flex items-center justify-center text-white mb-4 shadow-md text-2xl">
              <FaEnvelope />
            </div>
            <h3 className="text-xl font-semibold text-[#27445D] mb-1">
              ইমেইল সাপোর্ট
            </h3>
            <p className="text-[#27445D] font-medium">support@choloride.com</p>
            <p className="text-sm text-gray-500">আমরা দ্রুত রিপ্লাই দেব</p>
          </Card>

          <Card className="text-center p-6 hover:shadow-2xl transition-transform transform hover:-translate-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#71BBB2] to-[#5AA29F] flex items-center justify-center text-white mb-4 shadow-md text-2xl">
              <FaMapMarkerAlt />
            </div>
            <h3 className="text-xl font-semibold text-[#27445D] mb-1">
              আমাদের ঠিকানা
            </h3>
            <p className="text-[#27445D] font-medium">ঢাকা, বাংলাদেশ</p>
            <p className="text-sm text-gray-500">Head Office</p>
          </Card>
        </div>

        {/* --- Contact Form --- */}
        <div className="mt-12 bg-white/90 shadow-lg rounded-2xl p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-[#27445D] mb-6 text-center">
            ✉️ আমাদের সাথে যোগাযোগ করুন
          </h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
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
              icon="pi pi-envelope"
              iconPos="left"
              disabled={isPending}
              className={`w-full ${
                isPending
                  ? "opacity-70 cursor-not-allowed"
                  : "p-button-gradient from-[#71BBB2] to-[#5AA29F]"
              }`}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerCare;
