// src / components / HowToBook.tsx
// import React from "react";
// import { motion } from "framer-motion";
// import { Card } from "primereact/card";

// const steps = [
//     {
//         id: 1,
//         title: "ওয়েবসাইট ওপেন করুন",
//         description: "Cholo ওয়েবসাইটে প্রবেশ করুন এবং বুকিং সেকশনে যান।",
//         icon: "🌐",
//     },
//     {
//         id: 2,
//         title: "Pickup ও Drop Location দিন",
//         description: "আপনার যাত্রার শুরু ও শেষ লোকেশন টাইপ করুন।",
//         icon: "📍",
//     },
//     {
//         id: 3,
//         title: "Ride Type & Vehicle সিলেক্ট করুন",
//         description: "সিএনজি, বাইক অথবা ট্রাক থেকে যেকোনো একটি সিলেক্ট করুন।",
//         icon: "🚖",
//     },
//     {
//         id: 4,
//         title: "Booking কনফার্ম করুন",
//         description: "বিস্তারিত চেক করে রাইড বুকিং কনফার্ম করুন।",
//         icon: "✅",
//     },
//     {
//         id: 5,
//         title: "Driver Assigned",
//         description: "আপনার নিকটবর্তী ড্রাইভারকে অ্যাসাইন করা হবে এবং যাত্রা শুরু হবে।",
//         icon: "👨‍✈️",
//     },
//     {
//         id: 6,
//         title: "Payment সম্পন্ন করুন",
//         description: "যাত্রা শেষে ক্যাশ বা ডিজিটাল পেমেন্ট করুন।",
//         icon: "💳",
//     },
// ];

// const HowToBook: React.FC = () => {
//     return (
//         <div className="bg-[#EFE9D5] py-12 px-4 md:px-16 relative overflow-hidden">
//             {/* Title */}
//             <h2 className="text-3xl md:text-5xl font-bold text-center text-[#274450] mb-16">
//                 কীভাবে রাইড বুক করবেন?
//             </h2>

//             {/* SVG Road */}
//             <svg className="absolute left-1/2 transform -translate-x-1/2 top-24 w-6 h-[80%] hidden md:block">
//                 <path
//                     d="M3 0 C3 100 3 200 3 300 C3 400 3 500 3 600"
//                     stroke="#71BBB2"
//                     strokeWidth="6"
//                     fill="transparent"
//                     strokeDasharray="10 10"
//                 />
//             </svg>

//             {/* 🚗 Car Animation */}
//             <motion.div
//                 style={{ position: "absolute", left: "50%", translateX: "-50%", top: 0 }}
//                 animate={{ y: ["0%", "100%"] }}
//                 transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
//                 className="text-3xl"
//             >
//                 🚗
//             </motion.div>

//             {/* Steps */}
//             <div className="flex flex-col gap-16 relative z-10 mt-4">
//                 {steps.map((step, index) => (
//                     <motion.div
//                         key={step.id}
//                         initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
//                         whileInView={{ opacity: 1, x: 0 }}
//                         viewport={{ once: true, amount: 0.3 }}
//                         transition={{ duration: 0.8, delay: index * 0.2 }}
//                         className={`flex items-center gap-6 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
//                             }`}
//                     >
//                         {/* Step Icon */}
//                         <div className="bg-gradient-to-r from-[#274450] to-[#71BBB2] text-white w-16 h-16 flex items-center justify-center rounded-full text-2xl shadow-lg transform transition-transform hover:scale-110">
//                             {step.icon}
//                         </div>

//                         {/* Card */}
//                         <Card className="w-full md:w-2/3 bg-white border-2 border-[#71BBB2] rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
//                             <h3 className="text-xl md:text-2xl font-semibold text-[#274450] mb-2">
//                                 {step.id}. {step.title}
//                             </h3>
//                             <p className="text-gray-700 text-lg">{step.description}</p>
//                         </Card>
//                     </motion.div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default HowToBook;




// src/components/HowToBook.tsx
import React from "react";
import { motion } from "framer-motion";
import { Card } from "primereact/card";

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
        <div className=" py-10 px-5 md:px-16 relative overflow-hidden">
            {/* Title */}
            <h2 className="text-3xl md:text-5xl font-bold text-center text-[#274450] mb-16">
                কীভাবে রাইড বুক করবেন?
            </h2>

            {/* Dot Line Road */}
            <svg className="absolute left-1/2 transform -translate-x-1/2 top-24 w-1 md:w-2 h-[90%] hidden md:block">
                <line x1="0" y1="0" x2="0" y2="100%" stroke="#71BBB2" strokeWidth="4" strokeDasharray="8 12" />
            </svg>

            {/* Car Animation */}
            <motion.div
                style={{ position: "absolute", left: "50%", translateX: "-50%", top: 0 }}
                animate={{ y: ["0%", "100%"] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="text-3xl z-20"
            >
                🚗
            </motion.div>

            {/* Steps */}
            <div className="flex flex-col gap-24 relative z-10 mt-4">
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
                            <Card
                                className="w-full md:w-2/3 text-white border-2 rounded-4xl shadow-xl hover:shadow-2xl transition-shadow duration-300 z-10"
                                style={{ backgroundColor: cardColor, borderColor: "#71BBB2" }}
                            >
                                <h3 className="text-xl text-white md:text-2xl font-semibold mb-2">{step.id}. {step.title}</h3>
                                <p className="text-lg text-white md:text-base">{step.description}</p>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default HowToBook;











