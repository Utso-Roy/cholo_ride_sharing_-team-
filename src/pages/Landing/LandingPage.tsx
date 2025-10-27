import React, { useContext, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaCarSide,
  FaRoute,
  FaUserFriends,
  FaShieldAlt,
  FaClock,
  FaSmile,
} from "react-icons/fa";
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
    {
      src: "https://i.ibb.co.com/sdTWJXgN/Bangladesh-Ace-EX2-Intra-V20-Yodha-31-SC-20240918-jpg.webp",
      title: "মিনি ট্রাক সার্ভিস",
    },
    {
      src: "https://i.ibb.co.com/wNWF0ZS0/Am.png",
      title: "এ্যাম্বুলেন্স সার্ভিস",
    },
    {
      src: "https://i.ibb.co.com/tMwfhQZQ/BigCar.png",
      title: "জার্নি প্যাকেজ",
    },
    {
      src: "https://i.ibb.co.com/sJWM4D61/School-Bus.png",
      title: "স্কুল বাস সার্ভিস",
    },
    { src: "https://i.ibb.co.com/4RQG3k5K/Bus.png", title: "বাস সার্ভিস" },
    { src: "https://i.ibb.co.com/pckHwd6/cc.png", title: "পিকআপ সার্ভিস" },
  ];

  const cards = [
    {
      icon: <FaShieldAlt className="text-4xl sm:text-5xl" />,
      title: "নিরাপত্তা প্রথম",
      description:
        "প্রতিটি যাত্রায় আপনার নিরাপত্তা আমাদের প্রথম অগ্রাধিকার। যাচাইকৃত চালক এবং লাইভ ট্র্যাকিং।",
      gradient: "from-blue-500 to-cyan-500",
      bgPattern: "bg-blue-50",
    },
    {
      icon: <FaClock className="text-4xl sm:text-5xl" />,
      title: "দ্রুত সেবা",
      description:
        "মিনিটেই পেয়ে যান আপনার পছন্দের গাড়ি। সময় বাঁচান, আরামে ভ্রমণ করুন।",
      gradient: "from-teal-500 to-green-500",
      bgPattern: "bg-teal-50",
    },
    {
      icon: <FaSmile className="text-4xl sm:text-5xl" />,
      title: "সন্তুষ্ট গ্রাহক",
      description:
        "হাজারো সন্তুষ্ট গ্রাহকের বিশ্বস্ত পছন্দ। ৫ স্টার রেটিং সহ সেবা।",
      gradient: "from-purple-500 to-pink-500",
      bgPattern: "bg-purple-50",
    },
  ];

  const { user } = useContext(AuthContext);

  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-12 xl:px-16 py-6 sm:py-8 lg:py-12 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://i.ibb.co.com/TMwRrtS3/world-map-page-0001.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#e6fcf9]/80 to-gray-50/80" />
        </div>

        {/* Left Content */}
        <div
          data-aos="fade-right"
          className="w-full lg:w-1/2 text-center lg:text-left space-y-4 sm:space-y-5 lg:space-y-6 z-10 mb-8 lg:mb-0"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#27445D] leading-tight px-2 sm:px-0">
            <span className="text-[#27445D]">চলো</span> – একসাথে যাত্রা করি
          </h1>

          <p className="text-gray-700 text-base sm:text-lg lg:text-xl max-w-md mx-auto lg:mx-0 px-4 sm:px-0">
            একটি{" "}
            <span className="font-semibold text-[#27445D]">
              রাইড-শেয়ারিং প্ল্যাটফর্ম
            </span>
            , যা আপনার প্রতিটি যাত্রা করে তোলে নিরাপদ, সাশ্রয়ী এবং
            পরিবেশবান্ধব।
          </p>

          {/* Buttons */}
          <div
            data-aos="fade-up"
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-5 px-4 sm:px-0"
          >
            {!user?.email && (
              <Link to="/signup" className="w-full sm:w-auto">
                <Button
                  label="এখনই নিবন্ধন"
                  icon="pi pi-user"
                  iconPos="right"
                  className="!w-full sm:!w-auto !bg-gradient-to-r !from-[#71BBB2] !to-[#5AA9A1] !text-white 
                             !font-semibold !px-6 !py-3 sm:!px-7 sm:!py-3.5 !rounded-full !shadow-md hover:!shadow-xl 
                             transition-all duration-300 !text-sm sm:!text-base"
                />
              </Link>
            )}
            <Link to="/learnMore" className="w-full sm:w-auto">
              <Button
                label="আরও জানুন"
                icon="pi pi-arrow-right"
                iconPos="right"
                className="!w-full sm:!w-auto !bg-gradient-to-r !from-[#71BBB2] !to-[#56A89E] 
                           !text-white !border-none !px-6 !py-3 sm:!px-7 sm:!py-3.5 !rounded-full font-semibold 
                           shadow-md hover:shadow-xl transition-all duration-300 hover:brightness-110 !text-sm sm:!text-base"
              />
            </Link>
          </div>

          {/* Feature Badges */}
          <div
            data-aos="zoom-in-up"
            className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 pt-4 sm:pt-6 text-gray-700 px-2 sm:px-0"
          >
            {[
              { icon: <FaCarSide />, text: "আরামদায়ক রাইড" },
              { icon: <FaUserFriends />, text: "বিশ্বস্ত ব্যবহারকারী" },
              { icon: <FaRoute />, text: "স্মার্ট রুট" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full shadow-md 
                hover:scale-105 transition-transform duration-300 text-xs sm:text-sm md:text-base"
              >
                <span className="text-[#27445D] text-base sm:text-lg">
                  {item.icon}
                </span>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Images + Slider */}
        <div
          data-aos="fade-left"
          className="w-full lg:w-1/2 flex flex-col items-center gap-5 sm:gap-6 lg:gap-7 z-10 px-2 sm:px-4"
        >
          {/* Image Gallery */}
          <div
            data-aos="zoom-in"
            className="relative w-full max-w-lg flex justify-center items-center"
          >
            {/* Animated Background Orbs */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/4 left-0 w-32 sm:w-40 h-32 sm:h-40  rounded-full blur-3xl animate-pulse"></div>
              <div
                className="absolute bottom-1/4 right-0 w-40 sm:w-48 h-40 sm:h-48 bg-gradient-to-r  rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>

            {/* Left Image Card */}
            <div className="relative group -mr-6 sm:-mr-8 md:-mr-10 lg:-mr-10 z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl -rotate-6 group-hover:-rotate-3 transition-all duration-500"></div>

              <div className="relative w-20 h-28 xs:w-24 xs:h-32 sm:w-28 sm:h-40 md:w-36 md:h-52 lg:w-48 lg:h-56 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl -rotate-6 group-hover:-rotate-3 group-hover:scale-105 transition-all duration-500 border-2 sm:border-4 border-white/50">
                <img
                  src={LeftPicture}
                  alt="Left"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 text-white text-[10px] sm:text-xs font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                ✨ নিরাপদ
              </div>
            </div>

            {/* Center Main Image Card */}
            <div className="relative z-30 group">
              <div className="absolute -inset-1  rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] blur-lg opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>

              <div className="relative bg-white p-1.5 sm:p-1 rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl">
                <div className="relative w-36 h-48 xs:w-40 xs:h-52 sm:w-48 sm:h-60 md:w-56 md:h-70 lg:w-58 lg:h-76 rounded-[1.25rem] sm:rounded-[1.75rem] lg:rounded-[2rem] overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={userPicture}
                    alt="Main"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 via-transparent to-transparent"></div>

                  <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2 rounded-full shadow-lg transform group-hover:scale-110 transition-all duration-300">
                    <span className="text-[10px] xs:text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent whitespace-nowrap">
                      রিয়েল-টাইম ট্র্যাকিং
                    </span>
                  </div>
                </div>

                <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-7 h-7 sm:w-10 sm:h-10 rounded-full blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              
            </div>

            {/* Right Image Card */}
            <div className="relative group -ml-6 sm:-ml-8 md:-ml-10 lg:-ml-12 z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl rotate-6 group-hover:rotate-3 transition-all duration-500"></div>

              <div className="relative w-20 h-28 xs:w-24 xs:h-32 sm:w-28 sm:h-40 md:w-36 md:h-52 lg:w-48 lg:h-56 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl rotate-6 group-hover:rotate-3 group-hover:scale-105 transition-all duration-500 border-2 sm:border-4 border-white/50">
                <img
                  src={rightSide}
                  alt="Right"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3  text-white text-[10px] sm:text-xs font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                ⚡ দ্রুত
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-4 left-1/4 w-16 sm:w-20 h-1  rounded-full"></div>
            <div className="absolute -bottom-6 right-1/4 w-12 sm:w-16 h-1  rounded-full"></div>
          </div>

          {/* Swiper */}
          <div
            data-aos="fade-up"
            className="w-full max-w-md rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
          >
            <Swiper
              modules={[Autoplay, Pagination, EffectFade]}
              autoplay={{ delay: 2500 }}
              pagination={{ clickable: true }}
              loop
              effect="fade"
              className="h-48 xs:h-52 sm:h-56 md:h-60"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-full">
                    <img
                      src={slide.src}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <h2 className="absolute bottom-3 sm:bottom-4 lg:bottom-5 left-1/2 -translate-x-1/2 text-white text-sm sm:text-base lg:text-lg font-semibold bg-black/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm">
                      {slide.title}
                    </h2>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div >
       
      </div>
    </>
  );
};

export default LandingPage;
