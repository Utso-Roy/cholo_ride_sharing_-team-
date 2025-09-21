import React from "react";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

interface Testimonial {
  id: number;
  name: string;
  photo: string;
  rating: number;
  comment: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "রহিম উদ্দিন",
    photo: "https://randomuser.me/api/portraits/men/21.jpg",
    rating: 5,
    comment: "সেবাটি খুবই দ্রুত এবং নির্ভরযোগ্য। আমি খুবই সন্তুষ্ট।",
  },
  {
    id: 2,
    name: "সাবিনা খাতুন",
    photo: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 4,
    comment: "ড্রাইভাররা অভিজ্ঞ এবং courteous। রাইডের অভিজ্ঞতা চমৎকার।",
  },
  {
    id: 3,
    name: "মমতাজা বেগম",
    photo: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 5,
    comment: "লাইভ ট্র্যাকিং সুবিধা খুবই সাহায্য করেছে। নিরাপদ রাইড।",
  },
  {
    id: 4,
    name: "জাহিদুল ইসলাম",
    photo: "https://randomuser.me/api/portraits/men/50.jpg",
    rating: 4,
    comment: "সহজ এবং দ্রুত বুকিং। দামও সঠিক।",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-[#e6fcf9]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-[#27445D] mb-4">
          ব্যবহারকারীদের <span className="text-[#71BBB2]">মতামত</span>
        </h2>
        <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
          আমাদের সেবার উপর গ্রাহকদের বিশ্বাসযোগ্য মতামত।
        </p>

        {/* Swiper Slider */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#71BBB2] mb-2">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl text-[#27445D] font-semibold">{t.name}</h3>
                <div className="flex items-center gap-1 text-yellow-400 mb-2">
                  {Array.from({ length: t.rating }, (_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="text-[#27445D] max-w-xl mx-auto italic">
                  "{t.comment}"
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
