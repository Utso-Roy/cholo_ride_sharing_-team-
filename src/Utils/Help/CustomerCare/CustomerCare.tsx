import React, { FormEvent } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const CustomerCare: React.FC = () => {

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <div className="bg-gradient-to-br from-[#E3FDFD] via-[#CBF1F5] to-[#A6E3E9] min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-[#27445D] mb-10 drop-shadow-md">
          কাস্টমার কেয়ার
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center p-6 hover:shadow-2xl transition-transform transform hover:-translate-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#71BBB2] to-[#5AA29F] flex items-center justify-center text-white mb-4 shadow-md text-2xl">
              <FaPhoneAlt />
            </div>
            <h3 className="text-xl font-semibold text-[#27445D] mb-1">হেল্পলাইন নাম্বার</h3>
            <p className="text-[#27445D] font-medium">+880 1234 567 890</p>
            <p className="text-sm text-gray-500">২৪/৭ খোলা</p>
          </Card>

          <Card className="text-center p-6 hover:shadow-2xl transition-transform transform hover:-translate-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#71BBB2] to-[#5AA29F] flex items-center justify-center text-white mb-4 shadow-md text-2xl">
              <FaEnvelope />
            </div>
            <h3 className="text-xl font-semibold text-[#27445D] mb-1">ইমেইল সাপোর্ট</h3>
            <p className="text-[#27445D] font-medium">support@choloride.com</p>
            <p className="text-sm text-gray-500">আমরা দ্রুত রিপ্লাই দেব</p>
          </Card>

          <Card className="text-center p-6 hover:shadow-2xl transition-transform transform hover:-translate-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#71BBB2] to-[#5AA29F] flex items-center justify-center text-white mb-4 shadow-md text-2xl">
              <FaMapMarkerAlt />
            </div>
            <h3 className="text-xl font-semibold text-[#27445D] mb-1">আমাদের ঠিকানা</h3>
            <p className="text-[#27445D] font-medium">ঢাকা, বাংলাদেশ</p>
            <p className="text-sm text-gray-500">Head Office</p>
          </Card>
        </div>
        <div className="mt-12 bg-white/90 shadow-lg rounded-2xl p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-[#27445D] mb-6 text-center">আমাদের সাথে যোগাযোগ করুন</h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <span className="p-float-label w-full">
              <InputText id="name" className="w-full" required />
              <label htmlFor="name">আপনার নাম</label>
            </span>

            <span className="p-float-label w-full">
              <InputText id="email" type="email" className="w-full" required />
              <label htmlFor="email">আপনার ইমেইল</label>
            </span>

            <span className="p-float-label w-full">
              <InputTextarea id="message" rows={4} className="w-full" required />
              <label htmlFor="message">আপনার বার্তা লিখুন...</label>
            </span>

            <Button
              type="submit"
              label="বার্তা পাঠান"
              icon="pi pi-envelope"
              iconPos="left"
              className="w-full p-button-gradient from-[#71BBB2] to-[#5AA29F]"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerCare;
