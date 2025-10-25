import React from "react";
import { motion } from "framer-motion";
import {
  FaMotorcycle,
  FaCar,
  FaTruck,
  FaShuttleVan,
  FaAmbulance,
  FaBoxOpen,
  FaMapMarkedAlt,
  FaTaxi,
} from "react-icons/fa";

const services = [
  { icon: <FaMotorcycle />, title: "বাইক" },
  { icon: <FaTaxi />, title: "অটো" },
  { icon: <FaCar />, title: "কার" },
  { icon: <FaTruck />, title: "ট্রাক" },
  { icon: <FaShuttleVan />, title: "শাটল" },
  { icon: <FaMapMarkedAlt />, title: "ভ্রমণ প্যাকেজ" },
  { icon: <FaAmbulance />, title: "অ্যাম্বুলেন্স" },
  { icon: <FaBoxOpen />, title: "প্যাকেজ" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const OurServices: React.FC = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat border-t border-gray-100 py-16 md:py-20 px-6"
      style={{
        backgroundImage:
          "url('https://i.ibb.co.com/MkSgJWYZ/service-2.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px]"></div>

      <div className="relative z-10 w-full text-center">
        {/* Section Title */}
        <motion.h2
          className="text-3xl md:text-5xl font-extrabold text-[#27445D] leading-snug md:leading-tight mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-[#71BBB2]">চলো</span> প্ল্যাটফর্ম <br />
          আপনার যাত্রার জন্য{" "}
          <span className="decoration-[#71BBB2] decoration-4">
            সম্পূর্ণ সমাধান
          </span>
        </motion.h2>

        {/* Services Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-4 justify-center items-center">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                scale: 1.08,
                y: -3,
                boxShadow:
                  "0 6px 12px rgba(113, 187, 178, 0.25), 0 0 8px rgba(113, 187, 178, 0.2)",
              }}
              className="flex flex-col items-center justify-center gap-2 bg-white rounded-xl border border-[#E6F4F1] shadow-sm hover:shadow-md p-4 cursor-target cursor-pointer transition-all duration-300"
            >
              <div className="text-3xl text-[#71BBB2]">{service.icon}</div>
              <h3 className="text-sm font-semibold text-[#27445D]">
                {service.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
