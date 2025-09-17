import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-flip";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

const Home: React.FC = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const bannerSlides: BannerSlide[] = [
    {
      id: 1,
      title: "দ্রুত রাইড বুক করুন",
      subtitle: "আপনার গন্তব্যে দ্রুত এবং নির্ভরযোগ্য যাত্রা",
      image: "https://images.unsplash.com/photo-1520342868574-5fa3804e551c",
    },
    {
      id: 2,
      title: "লাইভ ট্র্যাকিং সুবিধা",
      subtitle: "আপনার রাইড সর্বদা নজরদারিতে",
      image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca",
    },
    {
      id: 3,
      title: "নিরাপদ এবং স্বাচ্ছন্দ্যপূর্ণ",
      subtitle: "প্রতিটি যাত্রাই হবে নিশ্চিন্ত",
      image: "https://images.unsplash.com/photo-1556742400-b5e3b3c39d94",
    },
  ];

  return (
    <div className="min-h-screen my-10 bg-[#e6fcf9]">

      <section className="w-full max-w-6xl mx-auto">
        {/* Main Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay, Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500 }}
          loop
          effect="flip"
          className="rounded-xl overflow-hidden shadow-2xl"
        >
          {bannerSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="relative h-[500px] md:h-[600px] lg:h-[700px] bg-cover bg-center flex items-center justify-center text-white transition-transform duration-500 hover:scale-105"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/25 to-black/60"></div>
                <div className="relative z-10 text-center px-6 md:px-20">
                  <h2 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-2xl">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-2xl max-w-3xl mx-auto drop-shadow-lg">
                    {slide.subtitle}
                  </p>
                  <button className="mt-6 bg-[#71BBB2] text-[#27445D] font-semibold px-10 py-4 rounded-full hover:bg-white hover:text-[#27445D] transition duration-300">
                    এখনই শুরু করুন
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbs Slider */}
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="mt-4"
        >
          {bannerSlides.map((slide) => (
            <SwiperSlide key={slide.id} className="cursor-pointer">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-24 md:h-28 object-cover rounded-lg border-2 border-transparent hover:border-[#71BBB2] transition"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Header */}
      <header className="bg-[#27445D] text-white p-4 flex justify-between items-center mt-10">
        <h1 className="text-2xl font-bold">চলো</h1>
        <nav className="space-x-4">
          <a href="#home" className="hover:text-[#71BBB2]">হোম</a>
          <a href="#services" className="hover:text-[#71BBB2]">সার্ভিসসমূহ</a>
          <a href="#contact" className="hover:text-[#71BBB2]">যোগাযোগ</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 bg-[#71BBB2] text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">যাত্রী-এ স্বাগতম</h2>
        <p className="text-lg md:text-xl mb-6">
          দ্রুত, নির্ভরযোগ্য এবং নিরাপদ রাইডসবার জন্য
        </p>
        <button className="bg-[#e6fcf9] text-[#27445D] font-semibold px-6 py-3 rounded-lg hover:bg-white transition">
          শুরু করুন
        </button>
      </section>
    </div>
  );
};

export default Home;
