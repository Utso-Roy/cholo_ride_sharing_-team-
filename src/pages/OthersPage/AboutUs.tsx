import React, { useEffect } from "react";
import { Card } from "primereact/card";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router";
import CountUp from "react-countup";

import {
  FaShieldAlt,
  FaHandshake,
  FaLeaf,
 
  FaMapMarkerAlt,
  FaArrowRight,
  FaCarSide,
  FaUsers,
} from "react-icons/fa";

import aboutBanner from "../../assets/banner/aboutBanner1.jpg";
import aboutBanner2 from "../../assets/banner/aboutBanner2.jpg";

export default function About(): JSX.Element {
  useEffect(() => {
    AOS.init({ duration: 800, offset: 100, once: true });
  }, []);

  const stats = [
    { icon: <FaCarSide size={40} color="#FF6B6B" />, value: 1000000, label: "রাইড সম্পন্ন" },
    { icon: <FaUsers size={40} color="#4ECDC4" />, value: 500000, label: "ইউজার" },
    { icon: <FaHandshake size={40} color="#FFD93D" />, value: 50000, label: "পার্টনার" },
    { icon: <FaMapMarkerAlt size={40} color="#1A535C" />, value: 64, label: "জেলায় সেবা" },
  ];

  const values = [
    {
      icon: <FaShieldAlt className="text-[#71BBB2] text-3xl mb-4" />,
      title: "নিরাপত্তা",
      desc: "যাত্রী এবং চালকের নিরাপত্তা আমাদের প্রথম অগ্রাধিকার।",
    },
    {
      icon: <FaHandshake className="text-[#71BBB2] text-3xl mb-4" />,
      title: "বিশ্বাসযোগ্যতা",
      desc: "সময়ে পৌঁছানো এবং মানসম্মত সেবা দেওয়ার অঙ্গীকার।",
    },
    {
      icon: <FaLeaf className="text-[#71BBB2] text-3xl mb-4" />,
      title: "টেকসই উন্নয়ন",
      desc: "পরিবেশবান্ধব পরিবহন ব্যবস্থা গড়ে তোলা আমাদের লক্ষ্য।",
    },
  ];

  return (
    <div className="w-full overflow-hidden bg-white">
      {/* Hero */}
      <section className="w-full h-[60vh] md:h-[70vh] mb-20 relative">
        <Card
          className="relative w-full h-full rounded-none overflow-hidden"
          style={{
            backgroundImage: `url(${aboutBanner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40 flex flex-col justify-center items-center text-center px-4 md:px-12 text-white">
            <h1 className="text-3xl md:text-6xl font-bold mb-4" data-aos="fade-up">
              চলো
            </h1>
            <p className="text-sm md:text-lg max-w-2xl" data-aos="fade-up" data-aos-delay={200}>
              সবার জন্য নিরাপদ, নির্ভরযোগ্য এবং পরিবেশবান্ধব যাতায়াত নিশ্চিত করছে সমগ্র বাংলাদেশে।
            </p>
            <FaArrowRight className="mt-6 text-3xl animate-bounce" />
          </div>
        </Card>
      </section>

      {/* Mission & Vision / Story */}
      <section className="py-16 px-6 md:px-12 bg-white mb-5 w-full flex flex-col md:flex-row gap-10">
        <div className="flex-1 h-64 md:h-[550px]" data-aos="fade-right">
          <img
            src={aboutBanner2}
            alt="Mission & Vision"
            className="w-full h-full object-cover rounded-2xl shadow-lg"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#27445D]" data-aos="fade-up">
            আমাদের গল্প
          </h2>
          <p className="text-gray-700 mb-6" data-aos="fade-up" data-aos-delay={200}>
            চলো যাত্রা শুরু করেছিল এক সাধারণ ধারণা থেকে – কিভাবে মানুষকে দ্রুত, নিরাপদ এবং
            সাশ্রয়ীভাবে গন্তব্যে পৌঁছে দেওয়া যায়। আজ আমরা হাজারো যাত্রী এবং পার্টনারদের নিয়ে
            এগিয়ে যাচ্ছি আরও স্মার্ট বাংলাদেশের দিকে।
          </p>
          <Link to="/our-story" className="self-center md:self-start">
            <button
              className="btn bg-[#e6fcf9] hover:bg-[#fbfefe] text-[#27445D] border-none mt-4 flex items-center gap-2"
              data-aos="fade-up"
              data-aos-delay={300}
            >
              আরো জানুন <FaArrowRight />
            </button>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full py-16 rounded-2xl bg-[#e6fcf9] text-center mb-5 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {stats.map((stat, idx) => (
            <Card
              key={idx}
              className="bg-transparent shadow-none flex flex-col items-center justify-center p-6"
            >
              <div className="text-4xl flex text-center justify-center mb-3">{stat.icon}</div>
              <h3 className="text-2xl font-bold">
                <CountUp end={stat.value} duration={5} separator="," suffix={stat.value >= 100000 ? "+" : ""} />
              </h3>
              <p className="mt-2 text-lg">{stat.label}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="w-full py-16 px-4 bg-[#e6fcf9] mb-5">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-[#27445D] text-center" data-aos="fade-up">
          আমাদের মূল্যবোধ
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {values.map((item, idx) => (
            <Card
              key={idx}
              className="shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-6 flex flex-col items-center text-center"
              data-aos="flip-left"
              data-aos-delay={idx * 200}
            >
              <div className="flex justify-center items-center">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
