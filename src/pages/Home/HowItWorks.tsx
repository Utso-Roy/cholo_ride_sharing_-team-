import React from "react";
import { FaMotorcycle, FaCarSide, FaCreditCard, FaSmile } from "react-icons/fa";
import { motion } from "framer-motion";
import Container from "../../Container/Container";

const steps = [
  {
    id: 1,
    icon: <FaMotorcycle className="text-4xl  text-[#71BBB2]" />,
    title: "Ride নির্বাচন করুন",
    description: "আপনার যাত্রার জন্য বাইক, কার বা সিএনজি নির্বাচন করুন।",
  },
  {
    id: 2,
    icon: <FaCarSide className="text-4xl text-[#71BBB2]" />,
    title: "বুক করুন",
    description: "Pickup এবং Drop location সিলেক্ট করে সহজে বুক করুন।",
  },
  {
    id: 3,
    icon: <FaCreditCard className="text-4xl text-[#71BBB2]" />,
    title: "পেমেন্ট করুন",
    description: "নিরাপদ পেমেন্ট গেটওয়ে ব্যবহার করে অর্থ প্রদান করুন।",
  },
  {
    id: 4,
    icon: <FaSmile className="text-4xl text-[#71BBB2]" />,
    title: "যাত্রা উপভোগ করুন",
    description: "আপনার রাইড নিরাপদ ও আরামে উপভোগ করুন।",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 border-t border-gray-300 bg-gray-50">
      <Container>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl  font-bold text-center text-[#27445D]">
            কিভাবে কাজ করে
          </h2>
          <p className="text-center text-gray-600 mb-12">
            মাত্র ৪ ধাপে সহজ এবং নিরাপদ যাত্রা
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <h3 className="text-xl font-semibold text-[#27445D] mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
