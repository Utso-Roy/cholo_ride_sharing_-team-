// Statistics.tsx
import React from "react";
import CountUp from "react-countup";
import { FaMotorcycle, FaUserTie, FaHeadset } from "react-icons/fa";
import { motion } from "framer-motion";
import Container from "../../Container/Container";

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
    <section className="py-20 border-t border-gray-100 bg-gradient-to-r from-[#e6fcf9] to-gray-50">
      <Container>

        <div className="w-full text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#27445D] mb-4">
          পরিসংখ্যান
        </h2>
        <p className="text-gray-600 mb-16 max-w-3xl mx-auto text-lg md:text-xl">
          আমাদের সেবার সাফল্য এবং গুরুত্বপূর্ণ তথ্য সমূহ।
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              className="flex flex-col items-center gap-5 bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-transform transform hover:-translate-y-2 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-[#E0F7F5] p-4 rounded-full">{stat.icon}</div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#27445D]">
                <CountUp end={stat.count} duration={2.5} separator="," />
                {stat.id === 3 ? "+ ঘন্টা" : "+"}
              </h3>
              <p className="text-gray-600 text-lg md:text-xl font-medium text-center">
                {stat.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      </Container>
    </section>
  );
};

export default Statistics;
