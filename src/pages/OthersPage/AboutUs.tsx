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
  FaRegLightbulb,
  FaMapMarkerAlt,
  FaArrowRight,
  FaCarSide,
  FaUsers,
  FaBriefcase, 
} from "react-icons/fa";

import aboutBanner from "../../assets/banner/aboutBanner1.jpg";
import aboutBanner2 from "../../assets/banner/aboutBanner2.jpg";


export default function About(): JSX.Element {
  useEffect(() => {
    AOS.init({ duration: 1000, offset: 50, once: true });
  }, []);

  const stats = [
    { icon: <FaCarSide size={40} color="#FF6B6B" />, value: 1000000, label: "রাইড সম্পন্ন" },
    { icon: <FaUsers size={40} color="#4ECDC4" />, value: 500000, label: "ইউজার" },
    { icon: <FaHandshake size={40} color="#FFD93D" />, value: 50000, label: "পার্টনার" },
    { icon: <FaMapMarkerAlt size={40} color="#1A535C" />, value: 64, label: "জেলায় সেবা" },
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
      desc: "সময়ে পৌঁছানো এবং মানসম্মত সেবা দেওয়ার অঙ্গীকার।",
    },
    {
      icon: <FaLeaf className="text-[#71BBB2] text-3xl mb-4" />,
      title: "টেকসই উন্নয়ন",
      desc: "পরিবেশবান্ধব পরিবহন ব্যবস্থা গড়ে তোলা আমাদের লক্ষ্য।",
    },

    {
      icon: <FaRegLightbulb className="text-[#71BBB2] text-3xl mb-4" />,
      title: "নতুনত্ব",
      desc: "নিরন্তর গবেষণা ও নতুন প্রযুক্তি ব্যবহার করে সেবাকে এগিয়ে নেওয়া।",
    },
  ];

  return (
    <div
      className="w-full overflow-hidden bg-white  bg-cover bg-center  bg-no-repeat bg-fixed"
      style={{
        backgroundImage: "linear-gradient(to right, rgba(230,252,249,0.8), rgba(249,250,251,0.8)), url('https://i.ibb.co/zTQ6z80G/map.jpg')",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Hero */}
      <section className="w-full  h-[60vh] md:h-[70vh] mb-16 relative">
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
              সবার জন্য নিরাপদ, নির্ভরযোগ্য এবং পরিবেশবান্ধব যাতায়াত নিশ্চিত করছে সমগ্র বাংলাদেশে।
            </p>
            <FaArrowRight className="mt-6 text-3xl animate-bounce" />
          </div>
        </Card>
      </section>

      {/* Mission & Vision Story */}
      <section className="mb-16 px-6 w-full flex flex-col md:flex-row gap-10">
        <div className="flex-1 h-64 md:h-[550px]" data-aos="fade-right"> 
          <img
            src={aboutBanner2}
            alt="Mission & Vision"
            className="w-full h-full object-cover rounded-2xl shadow-lg"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center text-center md:text-left" data-aos="fade-left">
          <h2 className="text-3xl md:text-5xl font-bold mb-3 text-[#27445D]">
            আমাদের গল্প
          </h2>
          <p className="text-gray-500 mb-6 text-lg" data-aos="fade-up" data-aos-delay={100}>
            যাত্রা থেকে গন্তব্যে – আমরা আপনার সাথে আছি।
          </p>
          <p className="text-gray-700 mb-6" data-aos="fade-up" data-aos-delay={200}>
            চলো যাত্রা শুরু করেছিল এক সাধারণ ধারণা থেকে – কিভাবে মানুষকে দ্রুত, নিরাপদ এবং
            সাশ্রয়ীভাবে গন্তব্যে পৌঁছে দেওয়া যায়। আজ আমরা হাজারো যাত্রী এবং পার্টনারদের নিয়ে
            এগিয়ে যাচ্ছি আরও স্মার্ট বাংলাদেশের দিকে।
          </p>
          <Link to="/our-story" className="self-center md:self-start">
            <button
              className="btn bg-[#71BBB2]  hover:bg-[#5AA29F] text-white rounded-2xl border-none mt-4 flex items-center gap-2"
              data-aos="fade-up"
              data-aos-delay={300}
            >
              আরো জানুন <FaArrowRight />
            </button>
          </Link>
        </div>
      </section>

      
<section className="w-full mb-16 rounded-2xl text-center px-6" data-aos="zoom-in"> 
    <h2 className="text-3xl md:text-5xl font-bold mb-3 text-[#27445D] text-center">
        চলো এক নজরে
    </h2>
    <p className="text-gray-500 mb-12 text-lg text-center" data-aos="fade-up" data-aos-delay={100}>
        আমাদের যাত্রাপথের কিছু গুরুত্বপূর্ণ সংখ্যা।
    </p>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full mx-auto">
        {stats.map((stat, idx) => (
            <Card
                key={idx}
        
                className="bg-white shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-6 flex flex-col items-center justify-center text-center rounded-lg"
                data-aos="flip-up" 
                data-aos-delay={idx * 150} 
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
     
      <section className="w-full py-16 px-6  mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-3 text-[#27445D] text-center" data-aos="fade-up">
          আমাদের মূল্যবোধ
        </h2>
        <p className="text-gray-500 mb-12 text-lg text-center" data-aos="fade-up" data-aos-delay={100}>
          যে নীতিগুলো আমাদের চালিত করে।
        </p>

        <div className="grid md:grid-cols-4 gap-8 w-full mx-auto px-6">
          {values.map((item, idx) => (
            <Card
              key={idx}
              className="shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-6 flex flex-col items-center text-center"
              data-aos="flip-up" 
              data-aos-delay={idx * 150} 
            >
              <div className="flex justify-center items-center">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

  
     
      <section className="w-full mb-16 px-6  text-white">
        <div className="full mx-auto text-center" data-aos="fade-up">
          <FaBriefcase className="text-5xl mx-auto mb-4 text-[#71BBB2]" data-aos="zoom-in" data-aos-delay={100} />
          <h2 className="text-3xl text-[#27445D]  md:text-4xl font-bold mb-4" data-aos="fade-up" data-aos-delay={200}>
            আমাদের যাত্রায় যোগ দিন
          </h2>
          <p className="text-lg text-gray-500 mb-8 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay={300}>
            আপনি কি প্রযুক্তিনির্ভর পরিবর্তন আনতে প্রস্তুত? আমাদের সাথে কাজ করার জন্য যোগাযোগ করুন বা আমাদের খালি পদগুলো দেখুন।
          </p>
          <div className=" text-center " data-aos="fade-up" data-aos-delay={400}>
            <Link to="/career">
              <button className="btn bg-[#71BBB2]  hover:bg-[#5AA29F] text-white border-none text-base md:text-lg px-8 py-3 rounded-xl shadow-md transition duration-300">
                খালি পদ দেখুন
              </button>
            </Link>
           
          </div>
        </div>
      </section>
    </div>
  );
}