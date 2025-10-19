import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaMoneyBillWave, FaHeadset, FaUserCheck } from "react-icons/fa";

const features = [
  {
    icon: <FaShieldAlt className="text-4xl text-[#71BBB2]" />,
    title: "নিরাপদ যাত্রা",
    description: "আমাদের সেফটি নীতিমালা আপনার প্রতিটি যাত্রাকে নিরাপদ রাখে।",
  },
  {
    icon: <FaMoneyBillWave className="text-4xl text-[#71BBB2]" />,
    title: "কম খরচে রাইড",
    description: "সাশ্রয়ী মূল্যে বাইক, কার ও সিএনজি রাইড বুকিং সুবিধা।",
  },
  {
    icon: <FaHeadset className="text-4xl text-[#71BBB2]" />,
    title: "২৪/৭ কাস্টমার কেয়ার",
    description: "যেকোনো সময়ে সহায়তার জন্য আমাদের টিম আপনার পাশে।",
  },
  {
    icon: <FaUserCheck className="text-4xl text-[#71BBB2]" />,
    title: "ভেরিফায়েড ড্রাইভার",
    description: "প্রত্যেক ড্রাইভারকে যাচাই-বাছাই করা হয়েছে আপনার নিরাপত্তার জন্য।",
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="w-full px-6 text-center">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-[#27445D] "
        >
          কেন আমাদের বেছে নেবেন?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-600 mb-12"
        >
          আমরা দিচ্ছি নিরাপদ, সাশ্রয়ী এবং বিশ্বস্ত রাইড শেয়ারিং সেবা।
        </motion.p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white shadow-md  p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
            >
              {feature.icon}
              <h3 className="mt-4 text-lg font-semibold text-[#27445D]">{feature.title}</h3>
              <p className="text-gray-500 mt-2 text-sm text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
