import React, { ReactNode } from 'react';
import {
  FaCar,
  FaClipboardCheck,
  FaClock,
  FaHeadset,
  FaIdCard,
  FaMapMarkerAlt,
  FaMobileAlt,
  FaMoneyBillWave,
  FaShieldAlt,
  FaStar,
  FaRoute
} from 'react-icons/fa';

type Item = {
  icon: ReactNode;
  title: string;
  desc: string;
};

const CarEarnArticle = () => {
  const steps: Item[] = [
    {
      icon: <FaMobileAlt className="text-2xl" />,
      title: "অ্যাপে ড্রাইভার সাইন আপ",
      desc: "মৌলিক তথ্য দিয়ে একাউন্ট খুলুন।"
    },
    {
      icon: <FaIdCard className="text-2xl" />,
      title: "ডকুমেন্ট ভেরিফিকেশন",
      desc: "NID, ড্রাইভিং লাইসেন্স, গাড়ির রেজিস্ট্রেশন/ইনস্যুরেন্স আপলোড ও যাচাই।"
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: "ফ্লেক্সিবল সময়",
      desc: "আপনার সুবিধামতো অনলাইনে এসে ট্রিপ নিন।"
    },
    {
      icon: <FaStar className="text-2xl" />,
      title: "সেফটি ও সার্ভিস",
      desc: "ইন-অ্যাপ সেফটি ফিচার মেনে ৫-স্টার সার্ভিস দিন।"
    },
    {
      icon: <FaMoneyBillWave className="text-2xl" />,
      title: "সাপ্তাহিক পেআউট",
      desc: "আয় সহজে উইথড্র করুন।"
    }
  ];

  const benefits: Item[] = [
    {
      icon: <FaCar className="text-xl" />,
      title: "সহজে আয় শুরু",
      desc: "নিজের কার ব্যবহার করে দ্রুত আয়ের সুযোগ — নতুনদের জন্য বান্ধব অনবোর্ডিং।"
    },
    {
      icon: <FaMapMarkerAlt className="text-xl" />,
      title: "আপনার শহরেই কাজ",
      desc: "ঢাকা, চট্টগ্রাম, সিলেটসহ একাধিক শহরে অপারেশন।"
    },
    {
      icon: <FaShieldAlt className="text-xl" />,
      title: "সেফটি কভারেজ",
      desc: "ইন-অ্যাপ সেফটি, SOS এবং ট্রিপ ট্র্যাকিং সাপোর্ট।"
    },
    {
      icon: <FaClipboardCheck className="text-xl" />,
      title: "কম কমিশন/অফার",
      desc: "সময়ভেদে প্রমোশনাল অফার ও কমিশন বেনিফিট।"
    },
    {
      icon: <FaHeadset className="text-xl" />,
      title: "ডেডিকেটেড সাপোর্ট",
      desc: "অ্যাপে/ফোনে দ্রুত সাপোর্ট ও রিসোর্স।"
    },
    {
      icon: <FaRoute className="text-xl" />,
      title: "স্মার্ট রুটিং",
      desc: "ডিমান্ড-ভিত্তিক সাজেশন, ট্রিপ প্ল্যানিং ও অপ্টিমাইজড রুট।"
    }
  ];

  return (
    <article className="border-white/30
    bg-[#e6fcf9]/60 backdrop-blur-6xl
    shadow-lg rounded-lg p-5 md:p-6 text-[#27445D]">
      {/* Header */}
      <header className="text-center mb-6">
        <h2 className="text-2xl font-bold">কিভাবে কার রাইড দিয়ে আয় করবেন</h2>
        <p className="mt-2 opacity-90 text-sm">
          দ্রুত রেজিস্ট্রেশন, ফ্লেক্সিবল সময় আর সাপ্তাহিক পেআউট— সবকিছু এক জায়গায়।
        </p>
      </header>

      {/* Steps */}
      <section aria-label="Steps" className="space-y-3">
        {steps.map((s, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-lg bg-[#27445D]/6 hover:bg-[#27445D]/10 transition"
          >
            <div className="shrink-0 mt-0.5">{s.icon}</div>
            <div>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm opacity-90">{s.desc}</p>
            </div>
            <span className="ml-auto rounded-full bg-[#27445D]/10 px-2 py-0.5 text-xs">
              ধাপ {i + 1}
            </span>
          </div>
        ))}
      </section>

      {/* Benefits */}
      <section aria-label="Benefits" className="mt-6">
        <h3 className="text-lg font-semibold mb-3">কেন আমাদের সঙ্গে চালাবেন?</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg border border-[#27445D]"
            >
              <div className="shrink-0 mt-0.5">{b.icon}</div>
              <div>
                <h4 className="font-medium">{b.title}</h4>
                <p className="text-sm opacity-90">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Info/Note */}
      <section className="mt-6 text-sm opacity-90">
        <p className="italic">
          নোট: বৈধ ডকুমেন্ট (NID, ড্রাইভিং লাইসেন্স, গাড়ির রেজিস্ট্রেশন, ফিটনেস/ইনস্যুরেন্স)
          ছাড়া একাউন্ট ভেরিফাই নাও হতে পারে। কমিশন/প্রমোশন বা কভারেজ শহরভেদে সময়ের সাথে
          পরিবর্তিত হতে পারে।
        </p>
      </section>
    </article>
  );
};

export default CarEarnArticle;
