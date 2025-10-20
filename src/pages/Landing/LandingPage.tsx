import React, { useContext, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCarSide, FaRoute, FaUserFriends } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import userPicture from "../../assets/realtime.jpg";
import LeftPicture from "../../assets/left side.jpg";
import rightSide from "../../assets/right side2.jpg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Button } from "primereact/button";
import { Link } from "react-router";
import { AuthContext } from "../../Auth/AuthProvider";

const LandingPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out-sine",
      once: true,
    });
  }, []);

  const slides = [
    { src: "https://i.ibb.co.com/nsYm6vcM/Bike-1.png", title: "বাইক রাইড" },
    { src: "https://i.ibb.co.com/KzbtHDgP/cng.webp", title: "সিএনজি সার্ভিস" },
    { src: "https://i.ibb.co.com/HTvxSpFd/car.png", title: "কার সার্ভিস" },
    { src: "https://i.ibb.co.com/sdTWJXgN/Bangladesh-Ace-EX2-Intra-V20-Yodha-31-SC-20240918-jpg.webp", title: "মিনি ট্রাক সার্ভিস" },
    { src: "https://i.ibb.co.com/wNWF0ZS0/Am.png", title: "এ্যাম্বুলেন্স সার্ভিস" },
    { src: "https://i.ibb.co.com/tMwfhQZQ/BigCar.png", title: "জার্নি প্যাকেজ" },
    { src: "https://i.ibb.co.com/sJWM4D61/School-Bus.png", title: "স্কুল বাস সার্ভিস" },
    { src: "https://i.ibb.co.com/4RQG3k5K/Bus.png", title: "বাস সার্ভিস" },
    { src: "https://i.ibb.co.com/pckHwd6/cc.png", title: "পিকআপ সার্ভিস" },
  ];

  const { user } = useContext(AuthContext);

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-12 py-10 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://i.ibb.co.com/TMwRrtS3/world-map-page-0001.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#e6fcf9]/80 to-gray-50/80 " />
      </div>

      {/* Left Section */}
      <div
        data-aos="fade-right"
        className="md:w-1/2 text-center md:text-left space-y-6 z-10"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#27445D] leading-tight cursor-target">
          <span className="text-[#27445D]">চলো</span> – একসাথে যাত্রা করি
        </h1>

        <p className="text-gray-700 text-lg md:text-xl max-w-md mx-auto md:mx-0">
          একটি{" "}
          <span className="font-semibold text-[#27445D]">
            রাইড-শেয়ারিং প্ল্যাটফর্ম
          </span>
          , যা আপনার প্রতিটি যাত্রা করে তোলে নিরাপদ, সাশ্রয়ী এবং পরিবেশবান্ধব।
          কাছের বিশ্বস্ত যাত্রীদের সাথে সংযোগ করুন এবং যাত্রার আনন্দ উপভোগ করুন।
        </p>

        {/* Buttons */}
        <div
          data-aos="fade-up"
          className="flex flex-col sm:flex-row items-center md:items-start gap-4 md:gap-6"
        >
          {!user?.email && (
            <Link to="/signup">
              <Button
                label="এখনই নিবন্ধন"
                icon="pi pi-user"
                iconPos="right"
                className="!bg-gradient-to-r !from-[#71BBB2] !to-[#5AA9A1] !text-white !font-semibold 
                           !px-6 !py-3 !rounded-full !shadow-md !border-none hover:!shadow-xl 
                           hover:!from-[#5AA9A1] hover:!to-[#71BBB2] transition-all duration-300"
              />
            </Link>
          )}

          <Link to="/learnMore">
            <Button
              label="আরও জানুন"
              icon="pi pi-arrow-right"
              iconPos="right"
              className="!bg-gradient-to-r !from-[#71BBB2] !to-[#56A89E] !text-white !border-none 
                         !px-6 !py-3 !rounded-full font-semibold shadow-md hover:shadow-xl 
                         transition-all duration-300 hover:brightness-110"
            />
          </Link>
        </div>

        {/* Features */}
        <div
          data-aos="zoom-in-up"
          className="flex justify-center md:justify-start gap-6 pt-6 text-gray-700"
        >
          {[
            { icon: <FaCarSide />, text: "আরামদায়ক রাইড" },
            { icon: <FaUserFriends />, text: "বিশ্বস্ত ব্যবহারকারী" },
            { icon: <FaRoute />, text: "স্মার্ট রুট" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
            >
              <span className="text-[#27445D] text-lg">{item.icon}</span>
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div
        data-aos="fade-left"
        className="md:w-1/2 mt-12 md:mt-0 flex flex-col items-center gap-7 z-10"
      >
        {/* 3 Image Group */}
        <div
          data-aos="zoom-in"
          className="relative w-full max-w-3xl mx-auto flex justify-center items-center"
        >
          <img
            src={LeftPicture}
            alt="Left"
            className="w-36 h-52 md:w-44 md:h-60 object-cover rounded-3xl shadow-2xl 
            opacity-85 hover:opacity-100 transition-all duration-500 
            -rotate-6 hover:-rotate-3 brightness-90 hover:brightness-105"
          />

          <div className="relative z-20 scale-110 hover:scale-115 transition-transform duration-500">
            <img
              src={userPicture}
              alt="Main"
              className="w-52 h-64 md:w-60 md:h-72 object-cover rounded-[2rem] 
              shadow-[0_10px_25px_rgba(0,0,0,0.25)] border-2 border-white 
              hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] transition-all duration-500"
            />
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          </div>

          <img
            src={rightSide}
            alt="Right"
            className="w-36 h-52 md:w-44 md:h-60 object-cover rounded-3xl shadow-2xl 
            opacity-85 hover:opacity-100 transition-all duration-500 
            rotate-6 hover:rotate-3 brightness-90 hover:brightness-105"
          />

          {/* Background Glow */}
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 -z-10"></div>
        </div>

        {/* Bottom Swiper */}
        <div
          data-aos="fade-up"
          className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative"
        >
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            effect="fade"
            className="h-64"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-64">
                  <img
                    src={slide.src}
                    alt={slide.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-xl md:text-2xl font-semibold tracking-wide bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
                    {slide.title}
                  </h2>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
