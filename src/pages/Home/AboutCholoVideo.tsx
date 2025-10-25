import React from "react";
import { motion } from "framer-motion";
import { FaCar, FaUser, FaLock } from "react-icons/fa";
import { Button } from "primereact/button";

const VideoSection = () => {
  return (
    <section className="bg-white border-t border-gray-100 py-20 px-6 md:px-12">
      {/* Heading Area */}
      <div className="text-center mb-12">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-[#27445D]"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          চলো কীভাবে কাজ করে?
        </motion.h2>

        <motion.p
          className="text-gray-600 mt-3 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          মাত্র কয়েক ধাপে বুক করুন আপনার রাইড — দ্রুত, সহজ, নির্ভরযোগ্য।
        </motion.p>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Side - Video */}
        <motion.div
          className="relative rounded-2xl border-3 border-[#71BBB2] overflow-hidden shadow-2xl"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <iframe
            src="https://drive.google.com/file/d/1hnB0B-gaKWKeZdUbcPXd6pKREYs7a8js/preview"
            width="580"
            height="328"
            allow="autoplay"
              allowFullScreen
              loading="lazy"
              title="চলো রাইড বুকিং প্রক্রিয়া"
          ></iframe>
        </motion.div>

        {/* Right Side - Steps with React Icons */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-3">
            <div className="text-[#71BBB2] text-2xl mt-1">
              <FaCar />
            </div>
            <p className="text-gray-700 text-lg">
              রাইড বুক করুন মুহূর্তেই — মাত্র কয়েকটি ক্লিকেই প্রস্তুত আপনার
              যাত্রা।
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="text-[#71BBB2] text-2xl mt-1">
              <FaUser />
            </div>
            <p className="text-gray-700 text-lg">
              কাছের ড্রাইভার পাবেন সঙ্গে সঙ্গে, দ্রুত এবং নির্ভুলভাবে।
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="text-[#71BBB2] text-2xl mt-1">
              <FaLock />
            </div>
            <p className="text-gray-700 text-lg">
              নিরাপদ ও সাশ্রয়ী যাত্রা — আপনার গন্তব্যে নিশ্চিন্তে পৌঁছে দিন।
            </p>
          </div>
        </motion.div>
      </div>

      {/* CTA Button */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Button
          label=" রাইড বুক করুন"
          icon="pi pi-user-plus"
          className="!bg-gradient-to-r !from-[#71BBB2] !to-[#56A89E] !text-white !border-none 
                       font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl 
                       hover:!from-[#56A89E] hover:!to-[#71BBB2] transition-all duration-300"
        />
      </motion.div>
    </section>
  );
};

export default VideoSection;
