// LatestNews.tsx
import React from "react";
import { motion } from "framer-motion";
import { FaRegNewspaper, FaBolt, FaBell } from "react-icons/fa";
import Container from "../../Container/Container";

interface NewsItem {
  id: number;
  date: string;
  title: string;
  category: "নতুন" | "গুরুত্বপূর্ণ" | "সাধারণ";
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    date: "24 অক্টোবর 2025",
    title: "নতুন রাইড বুকিং ফিচার চালু",
    category: "নতুন",
  },
  {
    id: 2,
    date: "23 অক্টোবর 2025",
    title: "নিরাপত্তা আপডেট করা হয়েছে",
    category: "গুরুত্বপূর্ণ",
  },
  {
    id: 3,
    date: "22 অক্টোবর 2025",
    title: "নতুন ড্রাইভার যোগ করা হয়েছে",
    category: "সাধারণ",
  },
  {
    id: 4,
    date: "21 অক্টোবর 2025",
    title: "অ্যাপের পারফরম্যান্স উন্নত করা হয়েছে",
    category: "নতুন",
  },
];

const categoryColors: { [key in NewsItem["category"]]: string } = {
  নতুন: "bg-green-100 text-green-700",
  গুরুত্বপূর্ণ: "bg-red-100 text-red-700",
  সাধারণ: "bg-blue-100 text-blue-700",
};

const LatestNews: React.FC = () => {
  return (
    <section className="  bg-gradient-to-b from-[#F7FAFC] to-white border-t border-gray-200  ">
    
      <Container>


          <div className="py-16  mx-auto max-w-7xl">
        
          {/* Heading */}
      <div className="text-center mb-12">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-[#27445D]"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          সর্বশেষ খবর
        </motion.h2>
        <motion.p
          className="text-gray-600 mt-3 text-lg md:text-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          আমাদের সেবার সাথে সম্পর্কিত সর্বশেষ আপডেট এবং গুরুত্বপূর্ণ সংবাদ।
        </motion.p>
      </div>

      {/* Timeline / Split Layout */}
      <div className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left timeline */}
        <div className="relative">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="flex items-start gap-4 mb-12 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Icon */}
              <div className="mt-1">
                {item.category === "নতুন" && <FaRegNewspaper className="text-green-500 text-2xl" />}
                {item.category === "গুরুত্বপূর্ণ" && <FaBolt className="text-red-500 text-2xl" />}
                {item.category === "সাধারণ" && <FaBell className="text-blue-500 text-2xl" />}
              </div>

              {/* Dot/Line */}
              <div className="absolute top-0 left-5 w-1 h-full bg-gray-300 rounded-full hidden md:block"></div>

              {/* Content */}
              <div className="ml-8">
                <span className={`px-2 py-1 rounded-full text-sm font-semibold ${categoryColors[item.category]}`}>
                  {item.category}
                </span>
                <h3 className="text-[#27445D] font-bold text-lg md:text-xl mt-1">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.date}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right highlights / mini cards */}
        <div className="flex flex-col gap-6">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${categoryColors[item.category]}`}>
                  {item.category}
                </span>
                <p className="text-gray-400 text-xs">{item.date}</p>
              </div>
              <h4 className="text-[#27445D] font-semibold text-lg">{item.title}</h4>
              <p className="text-gray-500 text-sm mt-2">বিস্তারিত পড়তে এখানে ক্লিক করুন...</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
      </Container>
    </section>
  );
};

export default LatestNews;
