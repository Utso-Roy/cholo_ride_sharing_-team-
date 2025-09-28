import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import lottieData from "../../../public/map.json";

const steps = [
    { id: 1, title: "ওয়েবসাইট ওপেন করুন", description: "Cholo ওয়েবসাইটে প্রবেশ করুন এবং বুকিং সেকশনে যান।", icon: "🌐" },
    { id: 2, title: "Pickup ও Drop Location দিন", description: "আপনার যাত্রার শুরু ও শেষ লোকেশন টাইপ করুন।", icon: "📍" },
    { id: 3, title: "Ride Type & Vehicle সিলেক্ট করুন", description: "সিএনজি, বাইক অথবা ট্রাক থেকে যেকোনো একটি সিলেক্ট করুন।", icon: "🚖" },
    { id: 4, title: "Booking কনফার্ম করুন", description: "বিস্তারিত চেক করে রাইড বুকিং কনফার্ম করুন।", icon: "✅" },
    { id: 5, title: "Driver Assigned", description: "আপনার নিকটবর্তী ড্রাইভারকে অ্যাসাইন করা হবে এবং যাত্রা শুরু হবে।", icon: "👨‍✈️" },
    { id: 6, title: "Payment সম্পন্ন করুন", description: "যাত্রা শেষে ক্যাশ বা ডিজিটাল পেমেন্ট করুন।", icon: "💳" },
];

const HowToBook: React.FC = () => {
    return (
        <div className="relative py-10 px-5 md:px-16">
            {/* Lottie Background */}
            <div className="absolute inset-0 z-0 opacity-30">
                <Lottie
                    animationData={lottieData}
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%" }}
                />
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-5xl font-bold text-center text-[#274450] mb-5 md:mb-10 relative z-10">
                কীভাবে রাইড বুক করবেন?
            </h2>

            {/* Dot Line Road */}
            <svg className="absolute left-1/2 transform -translate-x-1/2  w-2 md:w-2 h-[85%] z-10">
                <line x1="0" y1="0" x2="0" y2="100%" stroke="#71BBB2" strokeWidth="4" strokeDasharray="8 12" />
            </svg>

            {/* Car Animation */}
            <motion.div
                style={{ position: "absolute", left: "50%", translateX: "-50%", top: 200 }}
                animate={{ y: ["0%", "1000%"] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="text-3xl z-20"
            >
                🚗
            </motion.div>

            {/* Steps */}
            <div className="flex flex-col gap-5 md:gap-10 relative z-10 mt-4">
                {steps.map((step, index) => {
                    const cardColor = index % 2 === 0 ? "#274450" : "#497D74";

                    return (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, x: 0, y: 50 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className={`relative flex flex-col md:flex-row items-center gap-6 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Connector Circle */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 z-0">
                                <div className="w-6 h-6 bg-[#71BBB2] rounded-full border-2 border-white shadow-lg"></div>
                            </div>

                            {/* Step Icon */}
                            <div className="bg-gradient-to-r from-[#274450] to-[#71BBB2] text-white w-16 h-16 flex items-center justify-center rounded-full text-2xl shadow-lg transform transition-transform hover:scale-110 z-10">
                                {step.icon}
                            </div>

                            {/* Card */}
                            <div
                                className="w-full md:w-2/3 p-8 text-white border-2 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 z-10"
                                style={{ backgroundColor: cardColor, borderColor: "#71BBB2" }}
                            >
                                <h3 className="text-xl text-white md:text-2xl font-semibold mb-2">
                                    {step.id}. {step.title}
                                </h3>
                                <p className="text-lg text-white md:text-base">{step.description}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default HowToBook;










