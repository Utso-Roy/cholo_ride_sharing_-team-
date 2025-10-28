import React from "react";
import { motion } from "framer-motion";
import { Button } from "primereact/button";
import { NavLink } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast, faBoxOpen, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import car1 from "../../assets/servicesimg/18.png";
import car2 from "../../assets/servicesimg/19.png";
import clock from "../../assets/servicesimg/1.png";
import HowToBook from "./HowToBook";

const PRIMARY = "#274450";
const ACCENT = "#71BBB2";

export default function Shipment() {
  const features = [
    {
      title: "দ্রুত ডেলিভারি",
      desc: "আপনার পণ্য নির্ধারিত সময়ে দ্রুত এবং নির্ভরযোগ্যভাবে পৌঁছে যাবে।",
      icon: faTruckFast,
      img: car1,
      bg: "from-[#E9FBF8] to-[#F8FFFE]",
    },
    {
      title: "রিয়েল-টাইম ট্র্যাকিং",
      desc: "যেকোনো সময় আপনার পণ্যের অবস্থান লাইভ ট্র্যাক করতে পারবেন।",
      icon: faBoxOpen,
      img: clock,
      bg: "from-[#F2FAF9] to-[#F8FFFE]",
    },
    {
      title: "নিরাপদ পরিবহন",
      desc: "সুরক্ষিত লোডিং সিস্টেম এবং অভিজ্ঞ টিমের মাধ্যমে আপনার পণ্য নিরাপদে পৌঁছাবে।",
      icon: faShieldHalved,
      img: car2,
      bg: "from-[#EBFAF8] to-[#F8FFFE]",
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* 🚚 Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative flex flex-col justify-center items-center text-center py-20 px-4 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://i.ibb.co.com/pckHwd6/cc.png')",
        }}
      >
        <div className="absolute inset-0 bg-[#274450]/70"></div>

        <div className="relative z-10 text-white space-y-6">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-snug">
            এখনই প্যাকেজ / পণ্য প্রেরণ বুক করুন
          </h1>
          <p className="text-lg md:text-xl font-medium opacity-90">
            সাশ্রয়ী · দ্রুত · নিরাপদ
          </p>

          <NavLink to="/ridebooking">
            <Button
              className="!font-bold !bg-gradient-to-r !from-[#71BBB2] !to-[#56A89E] !text-white !border-none 
              px-6 py-3 rounded-full shadow-lg hover:shadow-2xl
              hover:!from-[#56A89E] hover:!to-[#71BBB2] transition-all duration-300"
            >
              <FontAwesomeIcon icon={faTruckFast} className="mr-2" />
              এখনই রাইড বুক করুন
            </Button>
          </NavLink>
        </div>
      </motion.section>

      {/* 🌟 Features Section */}
      <section className="py-16 px-5 md:px-12 bg-gradient-to-br from-[#F9FFFE] to-[#E7F8F5]">
        <motion.h2
          className="text-2xl md:text-4xl font-bold text-center mb-12 text-[#274450]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          কেন প্যাকেজ / পণ্য রাইড ব্যবহার করবেন?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className={`p-6 rounded-3xl shadow-lg bg-gradient-to-br ${feature.bg} 
              hover:shadow-2xl border border-transparent hover:border-[#71BBB2]/30 
              flex flex-col justify-between`}
            >
              <div>
                <div className="flex justify-center mb-4">
                  <FontAwesomeIcon
                    icon={feature.icon}
                    className="text-[#71BBB2] text-5xl"
                  />
                </div>

                <h3 className="text-xl font-semibold text-[#274450] mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-[#274450] text-center font-medium opacity-90">
                  {feature.desc}
                </p>
              </div>

              <div className="mt-6 flex justify-center">
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="w-full h-[200px] object-contain rounded-lg"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 📘 How To Book Section */}
      <HowToBook />
    </div>
  );
}
