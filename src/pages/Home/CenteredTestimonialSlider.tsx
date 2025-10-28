import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaQuoteLeft } from "react-icons/fa";

interface Testimonial {
  id: number;
  name: string;
  title: string;
  text: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "রহিম উদ্দিন",
    title: "ড্রাইভার",
    text: "সেবাটি খুবই দ্রুত এবং নির্ভরযোগ্য। আমি খুবই সন্তুষ্ট।",
    image: "https://randomuser.me/api/portraits/men/21.jpg",
  },
  {
    id: 2,
    name: "সাবিনা খাতুন",
    title: "গ্রাহক",
    text: "ড্রাইভাররা অভিজ্ঞ এবং courteous। রাইডের অভিজ্ঞতা চমৎকার।",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    id: 3,
    name: "মমতাজা বেগম",
    title: "গ্রাহক",
    text: "লাইভ ট্র্যাকিং সুবিধা খুবই সাহায্য করেছে। নিরাপদ রাইড।",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: 4,
    name: "জাহিদুল ইসলাম",
    title: "গ্রাহক",
    text: "সহজ এবং দ্রুত বুকিং। দামও সঠিক।",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
  },
];

const CenteredTestimonialSlider: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-16 bg-gradient-to-r from-[#e6fcf9] to-gray-50 text-center">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-[#27445D] mb-3">
        আমাদের গ্রাহকদের মতামত
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-10">
        চলো রাইড ব্যবহারকারীরা আমাদের সেবা সম্পর্কে যা বলছেন। দ্রুত, নিরাপদ
        এবং সুবিধাজনক রাইড অভিজ্ঞতা।
      </p>

      <div className="relative flex justify-center items-center overflow-hidden">
        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute left-2 md:left-10 z-20 bg-[#27445D] text-white p-3 rounded-full hover:bg-[#0D5EA6] transition-all duration-300 shadow-lg"
        >
          <FaArrowLeft />
        </button>

        {/* Testimonial Cards */}
        <div className="flex items-center justify-center w-full h-[380px] relative">
          <AnimatePresence initial={false}>
            {testimonials.map((item, i) => {
              const position = (i - index + testimonials.length) % testimonials.length;
              const isCenter = position === 0;
              const isLeft = position === testimonials.length - 1;
              const isRight = position === 1;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8, x: 100 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.4,
                    scale: isCenter ? 1 : 0.9,
                    x: isCenter ? 0 : isLeft ? -250 : isRight ? 250 : 0,
                    zIndex: isCenter ? 10 : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.8, x: isLeft ? -300 : 300 }}
                  transition={{ duration: 0.7 }}
                  className={`absolute bg-white shadow-2xl border border-gray-100 rounded-3xl p-8 max-w-md w-[85%] md:w-[340px] mx-auto ${
                    isCenter ? "cursor-default" : "blur-[1px]"
                  }`}
                >
                  <FaQuoteLeft className="text-2xl text-[#27445D] mb-4 mx-auto" />
                  <p className="text-gray-700 mb-6 text-sm md:text-base">{item.text}</p>
                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-full border-4 border-[#71BBB2] object-cover"
                    />
                    <div className="flex flex-col justify-center">
                      <h3 className="text-[#27445D] font-semibold text-lg">{item.name}</h3>
                      <span className="text-gray-500 text-sm">{item.title}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute right-2 md:right-10 bg-[#27445D] text-white p-3 rounded-full hover:bg-[#0D5EA6] transition-all duration-300 shadow-lg"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              i === index ? "bg-[#27445D] w-6" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default CenteredTestimonialSlider;
