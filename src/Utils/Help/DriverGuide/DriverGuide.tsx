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
    experience: "5 বছর অভিজ্ঞতা, সব ধরনের রাইডে দক্ষ।",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "সুমি আক্তার",
    vehicle: "সিএনজি",
    rating: 4.7,
    phone: "+880 1987 654321",
    experience: "3 বছর অভিজ্ঞতা, নিরাপদ এবং দ্রুত সেবা।",
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
    <div className="bg-gradient-to-r from-[#e6fcf9] to-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-[#27445D] mb-12 drop-shadow-md">
          ড্রাইভার গাইড
        </h2>
        <Accordion multiple className="mb-12">
          {drivers.map((driver, index) => (
            <AccordionTab
              key={index}
              header={
                <div className="flex items-center gap-4">
                  <img
                    src={driver.image}
                    alt={driver.name}
                    className="w-14 h-14 rounded-full ring-2 ring-white shadow-md"
                  />
                  <div>
                    <p className="font-semibold">{driver.name}</p>
                    <p className="text-sm">
                      {driver.vehicle} • ⭐ {driver.rating}
                    </p>
                  </div>
                </div>
              }
            >
              <Card className="bg-gray-50 text-[#27445D] p-4 shadow-md">
                <p>
                  <strong>ফোন:</strong> {driver.phone}
                </p>
                <p>
                  <strong>অভিজ্ঞতা:</strong> {driver.experience}
                </p>
                <Button
                  label="কল করুন"
                  icon={<FaPhoneAlt />}
                  className="mt-3 w-full bg-gradient-to-r from-[#71BBB2] to-[#5AA29F] hover:from-[#5AA29F] hover:to-[#71BBB2] text-white"
                />
              </Card>
            </AccordionTab>
          ))}
        </Accordion>
        <Card className="bg-white/90 shadow-lg rounded-2xl border border-gray-200 p-6">
          <h3 className="text-2xl font-bold text-[#27445D] mb-4 text-center">
            ড্রাইভারদের জন্য নির্দেশিকা
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[#27445D]">
            {guidelines.map((tip, idx) => (
              <li key={idx} className="hover:text-[#71BBB2] transition-colors">
                {tip}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default DriverGuide;
