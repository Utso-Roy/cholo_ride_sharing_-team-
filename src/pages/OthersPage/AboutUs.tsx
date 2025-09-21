import React, { useEffect } from "react";
import { Card } from "primereact/card";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaArrowRight,
  FaShieldAlt,
  FaHandshake,
  FaLeaf,
  FaUserFriends,
  FaRoute,
  FaCheckCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import CountUp from "react-countup";

import aboutBanner from "../../assets/banner/aboutBanner1.jpg";
import aboutBanner2 from "../../assets/banner/aboutBanner2.jpg";

export default function About(): JSX.Element {
  useEffect(() => {
    AOS.init({ duration: 800, offset: 100, once: true });
  }, []);

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

      {/* Mission & Vision */}
    {/* Mission & Vision */}
<section className="py-16 px-6 md:px-12 bg-white mb-20 w-full">
  <h2 className="text-3xl md:text-5xl font-bold mb-12 text-[#27445D] text-center">
    আমাদের লক্ষ্য ও উদ্দেশ্য
  </h2>
  <div className="flex flex-col md:flex-row justify-between gap-10">
    {/* Left Image */}
    <div className="flex-1 h-64 md:h-[550px]" data-aos="fade-right">
      <img
        src={aboutBanner2}
        alt="Mission & Vision"
        className="w-full h-full object-cover rounded-2xl shadow-lg"
      />
    </div>

    {/* Right Cards */}
    <div className="flex-1 grid grid-cols-1 gap-6" data-aos="fade-left">
      {[
        { icon: <FaCheckCircle className="text-[#71BBB2]" />, text: "নিরাপদ ও নির্ভরযোগ্য যাতায়াত সেবা প্রদান করা।" },
        { icon: <FaRoute className="text-[#71BBB2]" />, text: "প্রযুক্তি-নির্ভর সমাধানের মাধ্যমে যাতায়াতকে সহজ ও সাশ্রয়ী করা।" },
        { icon: <FaLeaf className="text-[#71BBB2]" />, text: "পরিবেশবান্ধব পরিবহন ব্যবস্থার প্রসার ঘটানো।" },
        { icon: <FaHandshake className="text-[#71BBB2]" />, text: "যাত্রী ও চালকের মধ্যে আস্থা ও সম্মানের সংস্কৃতি তৈরি করা।" },
        { icon: <FaUserFriends className="text-[#71BBB2]" />, text: "বাংলাদেশকে একটি স্মার্ট পরিবহন যুগে নিয়ে যাওয়া।" },
      ].map((item, idx) => (
        <Card
          key={idx}
          className="shadow-md flex items-start gap-4 p-5 hover:shadow-xl transition transform hover:-translate-y-1 min-h-[80px]"
        >
          <p className=" text-3xl mb-2 flex justify-center items-center">{item.icon}</p>
          <p className="text-[#27445D] text-lg">{item.text}</p>
        </Card>
      ))}
    </div>
  </div>
</section>

      {/* Stats */}
      <section className="w-full py-16 rounded-2xl bg-[#e6fcf9] text-white text-center mb-20 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <FaRoute />, count: 1000000, label: "রাইড সম্পন্ন" },
            { icon: <FaUserFriends />, count: 500000, label: "ইউজার" },
            { icon: <FaHandshake />, count: 50000, label: "পার্টনার" },
            { icon: <FaMapMarkerAlt />, count: 64, label: "জেলায় সেবা" },
          ].map((stat, idx) => (
            <Card
              key={idx}
              className="bg-transparent shadow-none flex flex-col items-center justify-center p-6"
            >
              <div className="text-4xl flex text-center justify-center mb-3 ">{stat.icon}</div>
              <h3 className="text-2xl font-bold">
                <CountUp end={stat.count} duration={10} separator="," />
              </h3>
              <p className="mt-2 text-lg">{stat.label}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="w-full py-16 px-4 bg-[#e6fcf9] mb-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-[#27445D] text-center" data-aos="fade-up">
          আমাদের মূল্যবোধ
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
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
          ].map((item, idx) => (
            <Card
              key={idx}
              className="shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-6 flex flex-col items-center text-center"
              data-aos="flip-left"
              data-aos-delay={idx * 200}
            >
              <p className="flex items-center justify-center">{item.icon}</p>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
