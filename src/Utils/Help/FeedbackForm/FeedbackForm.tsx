import React, { useState, FormEvent } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("আপনার অভিযোগ/প্রস্তাব সফলভাবে পাঠানো হয়েছে!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gradient-to-br from-[#E3FDFD] via-[#CBF1F5] to-[#A6E3E9] min-h-screen flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-2xl p-8 shadow-2xl rounded-3xl border border-gray-200 hover:shadow-3xl transition-transform transform hover:-translate-y-2 bg-white">
        <h2 className="text-4xl font-extrabold text-center text-[#27445D] mb-8 drop-shadow-sm">
          অভিযোগ/প্রস্তাব দিন
        </h2>
        <p className="text-center text-[#27445D] mb-6">
          আপনার মতামত আমাদের কাছে গুরুত্বপূর্ণ। দয়া করে নিচে ফর্মটি পূরণ করুন।
        </p>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <span className="p-float-label w-full">
            <InputText
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00796B] focus:border-[#00796B] bg-gradient-to-r from-[#E0F2F1] to-[#B2DFDB]"
              required
            />
            <label htmlFor="name">আপনার নাম</label>
          </span>

          <span className="p-float-label w-full">
            <InputText
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00796B] focus:border-[#00796B] bg-gradient-to-r from-[#E0F2F1] to-[#B2DFDB]"
              required
            />
            <label htmlFor="email">আপনার ইমেইল</label>
          </span>

          <span className="p-float-label w-full">
            <InputTextarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00796B] focus:border-[#00796B] bg-gradient-to-r from-[#E0F2F1] to-[#B2DFDB]"
              required
            />
            <label htmlFor="message">আপনার বার্তা লিখুন...</label>
          </span>

          <Button
            type="submit"
            label="পাঠান"
            icon="pi pi-send"
            iconPos="left"
            className="w-full bg-gradient-to-r from-[#00796B] to-[#004D40] hover:from-[#004D40] hover:to-[#00796B] text-white font-semibold py-3 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
          />
        </form>
      </Card>
    </div>
  );
};

export default FeedbackForm;
