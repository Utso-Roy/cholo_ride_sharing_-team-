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
    AOS.init({
      duration: 1000,
      offset: 50,
      once: true,
    });
  }, []);

  const stats = [
    { icon: <FaCarSide />, value: 1000000, label: "রাইড সম্পন্ন" },
    { icon: <FaUsers />, value: 500000, label: "ইউজার" },
    { icon: <FaBriefcase />, value: 50000, label: "পার্টনার" },
    { icon: <FaMapMarkerAlt />, value: 64, label: "জেলায় সেবা" },
  ];

  const values = [
    {
      icon: <FaShieldAlt />,
      title: "নিরাপত্তা",
      desc: "যাত্রী এবং চালকের নিরাপত্তা আমাদের প্রথম অগ্রাধিকার।",
    },
    {
      icon: <FaHandshake />,
      title: "বিশ্বাসযোগ্যতা",
      desc: "সময়ে পৌঁছানো এবং মানসম্মত সেবা দেওয়ার অঙ্গীকার।",
    },
    {
      icon: <FaLeaf />,
      title: "টেকসই উন্নয়ন",
      desc: "পরিবেশবান্ধব পরিবহন ব্যবস্থা গড়ে তোলা আমাদের লক্ষ্য।",
    },
    {
      icon: <FaRegLightbulb />,
      title: "নতুনত্ব",
      desc: "নিরন্তর গবেষণা ও নতুন প্রযুক্তি ব্যবহার করে সেবাকে এগিয়ে নেওয়া।",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={aboutBanner}
            alt="About Cholo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="w-full" data-aos="fade-right">
            <h1 className="text-4xl md:text-5xl text-center lg:text-6xl font-bold text-white leading-tight">
              চলো
            </h1>
            <p className="text-lg  text-center md:text-xl lg:text-2xl text-gray-100 leading-relaxed">
              সবার জন্য নিরাপদ, নির্ভরযোগ্য এবং পরিবেশবান্ধব যাতায়াত নিশ্চিত
              করছে সমগ্র বাংলাদেশে।
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Story Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div data-aos="fade-right">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={aboutBanner2}
                  alt="Our Story"
                  className="w-full h-[400px] lg:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>

            <div data-aos="fade-left">
              <div className="inline-block px-4 py-2 bg-green-100 rounded-full mb-4">
                <span className="text-green-700 font-semibold text-sm">
                  আমাদের গল্প
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                যাত্রা থেকে গন্তব্যে – আমরা আপনার সাথে আছি
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                চলো যাত্রা শুরু করেছিল এক সাধারণ ধারণা থেকে – কিভাবে মানুষকে
                দ্রুত, নিরাপদ এবং সাশ্রয়ীভাবে গন্তব্যে পৌঁছে দেওয়া যায়। আজ
                আমরা হাজারো যাত্রী এবং পার্টনারদের নিয়ে এগিয়ে যাচ্ছি আরও
                স্মার্ট বাংলাদেশের দিকে।
              </p>

              <Link
                to="/learnMore"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#71BBB2] text-white rounded-xl font-semibold hover:bg-[#4caca1] transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px]"
              >
                আরো জানুন
                <FaArrowRight className="text-sm" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#71bbb2]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              চলো এক নজরে
            </h2>
            <p className="text-green-100 text-lg">
              আমাদের যাত্রাপথের কিছু গুরুত্বপূর্ণ সংখ্যা
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                data-aos="zoom-in"
                data-aos-delay={idx * 100}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl lg:text-5xl text-white mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    separator=","
                    suffix={stat.value >= 100000 ? "+" : ""}
                  />
                </div>
                <div className="text-green-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div
            className="text-center max-w-3xl mx-auto mb-16"
            data-aos="fade-up"
          >
            <div className="inline-block px-4 py-2 bg-green-100 rounded-full mb-4">
              <span className="text-green-700 font-semibold text-sm">
                আমাদের মূল্যবোধ
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              যে নীতিগুলো আমাদের চালিত করে
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((item, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-100 hover:border-green-200 hover:translate-y-[-8px]">
                  <div className="w-16 h-16 bg-[#71bbb2] rounded-xl flex items-center justify-center text-white text-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {item.icon}
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={aboutBanner2}
            alt="Join Our Journey"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#71bbb2]/20 backdrop-blur-sm"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <span className="text-green-300 font-semibold text-sm">
                ক্যারিয়ার
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              আমাদের যাত্রায় যোগ দিন
            </h2>
            <p className="text-lg lg:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              আপনি কি প্রযুক্তিনির্ভর পরিবর্তন আনতে প্রস্তুত? আমাদের সাথে কাজ
              করার জন্য যোগাযোগ করুন বা আমাদের খালি পদগুলো দেখুন।
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/careers"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-gray-900 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:translate-y-[-2px]"
              >
                খালি পদ দেখুন
                <FaArrowRight />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-xl hover:shadow-2xl hover:translate-y-[-2px]"
              >
                যোগাযোগ করুন
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20  rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32  rounded-full blur-2xl"></div>
      </section>
    </div>
  );
}
