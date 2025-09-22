import React from "react";
import { motion } from "framer-motion";

const partners = [
  { id: 1, name: "Bkash", logo: "https://i.ibb.co.com/0Wjv7Cx/bkash.png" },
  { id: 2, name: "Nagad", logo: "https://i.ibb.co.com/v4FXZZqX/images.png" },
  { id: 3, name: "Rocket", logo: "https://i.ibb.co.com/x8tcdhKp/Rocket.png" },
  { id: 4, name: "Visa", logo: "https://i.ibb.co.com/zTTkZkWN/visa2.png" },
  { id: 5, name: "MasterCard", logo: "https://i.ibb.co.com/PztLDn3F/mastercardlogo.png" },
  { id: 6, name: "DBBL", logo: "https://i.ibb.co.com/pjXcYt2W/DBBL.jpg" },
];

const Partners: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#27445D] ">
          আমাদের পার্টনার
        </h2>
        <p className="text-center text-gray-600 mb-12">
          আমরা বিশ্বাসযোগ্য এবং পরিচিত কোম্পানি ও পেমেন্ট গেটওয়ের সাথে কাজ করি
        </p>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.id}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-12 object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
