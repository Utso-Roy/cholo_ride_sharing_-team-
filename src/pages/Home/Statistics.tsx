import React from "react";
import CountUp from "react-countup";
import { FaMotorcycle, FaUserTie, FaHeadset } from "react-icons/fa";

interface StatItem {
  id: number;
  icon: JSX.Element;
  count: number;
  title: string;
}

const stats: StatItem[] = [
  {
    id: 1,
    icon: <FaMotorcycle className="text-5xl text-[#71BBB2]" />,
    count: 5000,
    title: "সম্পন্ন রাইড",
  },
  {
    id: 2,
    icon: <FaUserTie className="text-5xl text-[#71BBB2]" />,
    count: 200,
    title: "পেশাদার ড্রাইভার",
  },
  {
    id: 3,
    icon: <FaHeadset className="text-5xl text-[#71BBB2]" />,
    count: 24,
    title: "২৪/৭ গ্রাহক সহায়তা",
  },
];

const Statistics: React.FC = () => {
  return (
    <section className="py-20  bg-gradient-to-r from-[#e6fcf9] to-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold  text-[#27445D]">
          পরিসংখ্যান 
        </h2>
        <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
          আমাদের সেবার সাফল্য এবং গুরুত্বপূর্ণ তথ্য সমূহ।
        </p>
        <div className="grid md:grid-cols-3 gap-12">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center gap-4 bg-white rounded-2xl p-8 shadow hover:shadow-2xl transition cursor-pointer"
            >
              <div>{stat.icon}</div>
              <h3 className="text-3xl font-extrabold text-[#27445D]">
                <CountUp end={stat.count} duration={2.5} separator="," />
                {stat.id === 3 ? "+ ঘন্টা" : "+"}
              </h3>
              <p className="text-gray-600 text-lg text-center">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
