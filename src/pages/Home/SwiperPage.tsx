import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  Thumbs,
  FreeMode,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

import { motion } from "framer-motion";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";

interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

const SwiperPage: React.FC = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const bannerSlides: BannerSlide[] = [
    {
      id: 1,
      title: "দ্রুত রাইড বুক করুন",
      subtitle: "আপনার গন্তব্যে দ্রুত এবং নির্ভরযোগ্য যাত্রা",
      image: "https://i.ibb.co.com/jPWJ9xPX/Ride-booking.jpg",
    },
    {
      id: 2,
      title: "লাইভ ট্র্যাকিং সুবিধা",
      subtitle: "আপনার রাইড সর্বদা নজরদারিতে",
      image: "https://i.ibb.co.com/RG98MsL3/live-track.jpg",
    },
    {
      id: 3,
      title: "নিরাপদ এবং স্বাচ্ছন্দ্যপূর্ণ",
      subtitle: "প্রতিটি যাত্রাই হবে নিশ্চিন্ত",
      image: "https://i.ibb.co.com/zVNCVH3N/original.jpg",
    },
    {
      id: 4,
      title: "অভিজ্ঞ ড্রাইভাররা",
      subtitle: "সতর্ক ও প্রশিক্ষিত ড্রাইভারদের সাথে নিশ্চিন্ত ভ্রমণ",
      image: "https://i.ibb.co.com/DPKJVNCz/professionla-driver.jpg",
    },
    {
      id: 5,
      title: "সহজ পেমেন্ট ব্যবস্থা",
      subtitle: "ক্যাশ, কার্ড বা মোবাইল ব্যাংকিং — যা ইচ্ছা",
      image: "https://i.ibb.co.com/SDHYSpK9/phone-pay.jpg",
    },
    {
      id: 6,
      title: "২৪/৭ সাপোর্ট সার্ভিস",
      subtitle: "যেকোন সমস্যায় সবসময় পাশে আছি",
      image: "https://i.ibb.co.com/JFFhgvhg/support-service.jpg",
    },
  ];

  return (
    <div className=" lg:min-h-screen ">
      <section className="w-full">
        {/* Main Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay, Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop
          className="overflow-hidden  shadow-2xl"
        >
          {bannerSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="relative h-[500px] lg:h-[600px] bg-cover bg-center flex items-center justify-center text-white"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"></div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="relative z-10 text-center px-6 md:px-20"
                >
                  <h2 className="text-4xl md:text-6xl font-extrabold leading-snug drop-shadow-xl">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-2xl font-light max-w-2xl mx-auto drop-shadow-md">
                    {slide.subtitle}
                  </p>

          
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbs Slider */}
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={4}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="mt-6"
        >
          {bannerSlides.map((slide) => (
            <SwiperSlide
              key={slide.id}
              className="cursor-pointer group transition-all"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-[80%] h-30 object-cover rounded-xl border-2 border-transparent group-hover:border-[#71BBB2] shadow-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default SwiperPage;
