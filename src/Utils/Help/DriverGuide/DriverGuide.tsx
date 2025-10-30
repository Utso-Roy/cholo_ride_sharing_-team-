import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Accordion, AccordionTab } from "primereact/accordion";
import { FaPhoneAlt } from "react-icons/fa";

interface Driver {
  name: string;
  vehicle: string;
  rating: number;
  phone: string;
  experience: string;
  image: string;
}

const drivers: Driver[] = [
  {
    name: "রাকিব হাসান",
    vehicle: "বাইক",
    rating: 4.9,
    phone: "+880 1789 123456",
    experience: "৫ বছর অভিজ্ঞতা, সব ধরনের রাইডে দক্ষ।",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "সুমি আক্তার",
    vehicle: "সিএনজি",
    rating: 4.7,
    phone: "+880 1987 654321",
    experience: "৩ বছর অভিজ্ঞতা, নিরাপদ ও দ্রুত সেবা।",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const guidelines: string[] = [
  "রাইড শুরু করার আগে গাড়ি/বাইক সবসময় চেক করুন।",
  "যাত্রীদের সাথে সদয় ও ভদ্র আচরণ করুন।",
  "সময়মতো পৌঁছানোর চেষ্টা করুন।",
  "রাইডের সময় নিরাপত্তা সরঞ্জাম ব্যবহার নিশ্চিত করুন।",
  "যদি কোনো সমস্যা হয়, সরাসরি কাস্টমার কেয়ারকে জানান।",
];

const DriverGuide: React.FC = () => {
  return (
    <div className="bg-[#e6fcf9]  min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#112253] mb-14 drop-shadow-lg">
           ড্রাইভার গাইড
        </h2>

        {/* Driver Accordion Section */}
        <Accordion multiple className="mb-12 backdrop-blur-md">
          {drivers.map((driver, index) => (
            <AccordionTab
              key={index}
              header={
                <div className="flex items-center gap-4 cursor-pointer">
                  <img
                    src={driver.image}
                    alt={driver.name}
                    className="w-14 h-14 rounded-full ring-4 ring-[#71BBB2]/50 shadow-lg hover:scale-105 transition-transform"
                  />
                  <div>
                    <p className="font-semibold text-lg text-[#1E293B]">
                      {driver.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {driver.vehicle} • ⭐ {driver.rating}
                    </p>
                  </div>
                </div>
              }
            >
              <Card className="bg-white/80 backdrop-blur-lg shadow-xl border border-gray-200 rounded-2xl p-6 transition-all hover:shadow-2xl">
                <p className="text-[#1E293B] text-base mb-2">
                  <strong>📞 ফোন:</strong> {driver.phone}
                </p>
                <p className="text-[#1E293B] mb-4">
                  <strong>অভিজ্ঞতা:</strong> {driver.experience}
                </p>
                <Button
                  label="কল করুন"
                  icon={<FaPhoneAlt />}
                  className="w-full py-3 bg-gradient-to-r from-[#5AA29F] to-[#71BBB2] hover:from-[#71BBB2] hover:to-[#5AA29F] border-none text-white font-semibold rounded-xl shadow-md transition-transform hover:scale-105"
                />
              </Card>
            </AccordionTab>
          ))}
        </Accordion>

        {/* Guidelines Section */}
        <Card className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl border border-gray-200 p-8 text-center">
          <h3 className="text-2xl font-bold text-[#1E3A8A] mb-6">
            🧭 ড্রাইভারদের জন্য নির্দেশিকা
          </h3>
          <ul className="list-disc list-inside space-y-3 text-gray-700 text-base text-left md:text-lg">
            {guidelines.map((tip, idx) => (
              <li
                key={idx}
                className="hover:text-[#5AA29F] transition-colors duration-200"
              >
                {tip}
              </li>
            ))}
          </ul>
        </Card>

        {/* Footer */}
        <p className="text-center mt-10 text-gray-500 text-sm">
          © 2025 চলো রাইড শেয়ারিং | নিরাপদ ও বিশ্বস্ত রাইডের প্রতিশ্রুতি
        </p>
      </div>
    </div>
  );
};

export default DriverGuide;
