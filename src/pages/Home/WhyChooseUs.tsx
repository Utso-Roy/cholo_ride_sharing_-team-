import React from "react";
import { FaCarSide, FaUserCheck, FaClock, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import Container from "../../Container/Container";

const features = [
  {
    icon: <FaCarSide />,
    title: "আরামদায়ক রাইড",
    desc: "সকল যাত্রা হবে smooth এবং stress-free।",
  },
  {
    icon: <FaUserCheck />,
    title: "বিশ্বস্ত ড্রাইভার",
    desc: "যাচাই করা এবং trusted ড্রাইভাররা আপনার পাশে।",
  },
  {
    icon: <FaClock />,
    title: "দ্রুত বুকিং",
    desc: "মুহূর্তের মধ্যে রাইড নিশ্চিত।",
  },
  {
    icon: <FaLock />,
    title: "নিরাপদ যাত্রা",
    desc: "আপনার সেফটি আমাদের প্রথম প্রাধান্য।",
  },
];

// Motion Variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // Each child animates after 0.2s
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-50 py-20  border-t border-gray-100">
      {/* Heading */}
      <Container>
        
          <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#27445D]">
            কেন চলো ব্যবহার করবেন?
          </h2>
          <p className="text-gray-600 mt-3 text-lg md:text-xl">
            মাত্র কয়েক ধাপে বুক করুন আপনার রাইড — দ্রুত, নিরাপদ ও সুবিধাজনক।
          </p>
        </motion.div>

        {/* Features Grid with smooth stagger animation */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition cursor-pointer"
              variants={itemVariants}
            >
              <div className="text-[#71BBB2] text-4xl mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#27445D] mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Container>
    </section>
  );
};

export default WhyChooseUs;
