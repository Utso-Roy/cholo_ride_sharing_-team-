import React from "react";
import { motion } from "framer-motion";
import { FaCarSide, FaRoute, FaUserFriends } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import userPicture from "../../assets/user.jpg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Button } from "primereact/button";
import { Link} from "react-router";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-10 overflow-hidden">

      {/* Background Image + Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://i.ibb.co.com/TMwRrtS3/world-map-page-0001.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#e6fcf9]/80 to-gray-50/80" />
      </div>

      {/* Left Section */}
      <motion.div
        className="md:w-1/2 text-center md:text-left space-y-6 z-10"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#27445D] leading-tight cursor-target">
          <span className="text-[#27445D]">চলো</span> – একসাথে যাত্রা করি
        </h1>

        <p className="text-gray-700 text-lg md:text-xl max-w-md mx-auto md:mx-0">
          একটি <span className="font-semibold text-[#27445D]">রাইড-শেয়ারিং প্ল্যাটফর্ম</span>, যা আপনার প্রতিটি যাত্রা করে তোলে নিরাপদ, সাশ্রয়ী এবং পরিবেশবান্ধব। 
          কাছের বিশ্বস্ত যাত্রীদের সাথে সংযোগ করুন এবং যাত্রার আনন্দ উপভোগ করুন 
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 md:gap-6">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
          >
                      <Link to="/signup">
                          
                           <Button
                label="এখনই নিবন্ধন"
  className="
    !bg-gradient-to-r !from-[#71BBB2] !to-[#5AA9A1]
    !text-white 
    !font-semibold
    !px-6 !py-3 
    !rounded-full 
    !shadow-md 
    !border-none
    hover:!shadow-xl
    hover:!from-[#5AA9A1] hover:!to-[#71BBB2]
    hover:scale-105
    transition-all duration-300 ease-in-out
    focus:!ring-2 focus:!ring-offset-2 focus:!ring-[#71BBB2]
  "
  icon="pi pi-user"
  iconPos="right"
/>
 </Link>
          </motion.button>

          <motion.button
            className="px-8 py-3 border border-green-500 text-[#27445D] bg-white rounded-full font-semibold text-lg shadow hover:bg-green-50 transition-all cursor-target"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
          >
            আরও জানুন
          </motion.button>
        </div>

        {/* Feature Highlights */}
        <div className="flex justify-center md:justify-start gap-6 pt-6 text-gray-700">
          {[
            { icon: <FaCarSide />, text: "আরামদায়ক রাইড" },
            { icon: <FaUserFriends />, text: "বিশ্বস্ত ব্যবহারকারী" },
            { icon: <FaRoute />, text: "স্মার্ট রুট" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 bg-white/60 backdrop-blur-lg px-4 py-2 rounded-full shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-[#27445D]">{item.icon}</span>
              <span>{item.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right Section - Top Image + Bottom Slider */}
      <motion.div
        className="md:w-1/2 mt-12 md:mt-0 flex flex-col items-center gap-6 z-10"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Top Static Image */}
        <motion.div
          className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative"
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={userPicture}
            alt="User"
            className="w-full h-64 object-cover"
          />
          <motion.div
            className="absolute inset-0 rounded-3xl border-4 border-green-300/40"
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Bottom Slider */}
        <motion.div
          className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative"
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            effect="fade"
            className="h-64"
          >
            <SwiperSlide>
              <img
                src="https://i.ibb.co.com/TMwRrtS3/world-map-page-0001.jpg"
                alt="Ride Together"
                className="w-full h-64 object-cover"
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src="https://i.ibb.co.com/TMwRrtS3/world-map-page-0001.jpg"
                alt="City Carpool"
                className="w-full h-64 object-cover"
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src="https://i.ibb.co.com/TMwRrtS3/world-map-page-0001.jpg"
                alt="Eco Travel"
                className="w-full h-64 object-cover"
              />
            </SwiperSlide>
          </Swiper>
          <motion.div
            className="absolute inset-0 rounded-3xl border-4 border-green-400/40"
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
