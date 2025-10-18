// src/pages/BikeRide.tsx
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { motion } from "framer-motion";
import { Avatar } from "primereact/avatar";
import { Rating } from "primereact/rating";
import HowToBook from "./HowToBook";
import { NavLink } from "react-router";
import Lottie from "lottie-react";
import lottieData from "../../../public/map.json";
import clock from "../../assets/servicesimg/1.png"
import car1 from "../../assets/servicesimg/2.png"
import car2 from "../../assets/servicesimg/3.png"

const PRIMARY = "#274450";
const ACCENT = "#71BBB2";



export default function BikeRide() {

    return (
        <div className="relative space-y-12">
            {/* Lottie Background */}
            <div className="absolute inset-0 z-0 opacity-30">
                <Lottie
                    animationData={lottieData}
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%" }}
                />
            </div>

            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative h-[350px] md:h-[400px] w-full flex items-center justify-center text-center overflow-hidden"
                style={{
                    backgroundImage: "url('https://i.ibb.co.com/nsYm6vcM/Bike-1.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-[#274450]/60"></div>
                <div className="relative z-10 text-white px-4">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">এখনই বাইক রাইড বুক করুন</h1>
                    <p className="text-lg md:text-2xl mb-6">সাশ্রয়ী · দ্রুত · নিরাপদ</p>

                    <NavLink to="/ridebooking">
                        <Button
                            className="
                     relative !bg-gradient-to-r from-[#497D74] to-[#74B49B]
                     !text-white !border-none !px-4 !py-3 !rounded-xl 
                     overflow-hidden
                     before:absolute before:-inset-1 before:rounded-xl
                     before:bg-gradient-to-r before:from-[#497D74] before:via-[#74B49B] before:to-[#497D74]
                     before:bg-[length:200%_200%] before:animate-border-slide
                     before:z-[-1]
                     hover:scale-105 transition-transform duration-300
                     "
                        >
                            <span className="mr-2 text-2xl animate-pulse">✨</span>
                            এখনই রাইড বুক করুন
                        </Button>
                    </NavLink>


                </div>
            </motion.section>

            {/* Features Section */}
            {/* <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="bg-[#274450] rounded-2xl shadow-lg p-8 mx-5 md:mx-10"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                    কেন বাইক রাইড ব্যবহার করবেন?
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-[#71BBB2] text-white rounded-xl p-6 shadow-md flex flex-col items-center text-center">
                        <span className="text-3xl mb-3">🚚</span>
                        <h3 className="font-semibold text-lg mb-2">রিয়েল-টাইম ট্র্যাকিং</h3>
                        <p className="text-sm">আপনার ট্রাকের অবস্থান এবং অগ্রগতি যেকোনো সময় রিয়েল-টাইমে দেখুন।</p>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} className="bg-[#497D74] text-white rounded-xl p-6 shadow-md flex flex-col items-center text-center">
                        <span className="text-3xl mb-3">⏱️</span>
                        <h3 className="font-semibold text-lg mb-2">সঠিক ETA</h3>
                        <p className="text-sm">ডেলিভারি এবং ট্রাকের আনুমানিক আগমনের সময় নিশ্চিতভাবে জানুন।</p>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} className="bg-[#71BBB2] text-white rounded-xl p-6 shadow-md flex flex-col items-center text-center">
                        <span className="text-3xl mb-3">🔒</span>
                        <h3 className="font-semibold text-lg mb-2">নিরাপদ ডেলিভারি</h3>
                        <p className="text-sm">আপনার মালামাল নিরাপদে গন্তব্যে পৌঁছানোর নিশ্চয়তা সহ।</p>
                    </motion.div>
                </div>
            </motion.section> */}

            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="px-5 md:px-10"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-[#274450] mb-8 text-center">
                    কেন বাইক রাইড ব্যবহার করবেন?
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Feature 1 */}
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="bg-gradient-to-r from-white to-[#EFE9D5] rounded-xl shadow-md p-4 flex flex-col items-center text-center"
                    >
                        <img
                            src={clock}
                            alt="রিয়েল-টাইম ট্র্যাকিং"
                            className="w-full h-[200px] object-cover rounded-lg mb-4"
                        />
                        <h3 className="font-semibold text-lg text-[#274450] mb-2">রিয়েল-টাইম ট্র্যাকিং</h3>
                        <p className="text-sm text-[#274450]">আপনার বাইকের অবস্থান এবং অগ্রগতি যেকোনো সময় লাইভ ট্র্যাক করুন।</p>
                    </motion.div>

                    {/* Feature 2 */}
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="bg-gradient-to-r from-white to-[#71BBB2] rounded-xl shadow-md p-4 flex flex-col items-center text-center"
                    >
                        <img
                            src={car1}
                            alt="সঠিক ETA"
                            className="w-full h-[200px] object-cover rounded-lg mb-4"
                        />
                        <h3 className="font-semibold text-lg text-[#274450] mb-2">সঠিক ETA</h3>
                        <p className="text-sm text-[#274450]">আপনার রাইড কখন পৌঁছাবে তা নির্ভুলভাবে জানতে পারবেন।</p>
                    </motion.div>

                    {/* Feature 3 */}
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="bg-gradient-to-r from-white to-[#497D74] rounded-xl shadow-md p-4 flex flex-col items-center text-center"
                    >
                        <img
                            src={car2}
                            alt="নিরাপদ যাত্রা"
                            className="w-full h-[200px] object-cover rounded-lg mb-4"
                        />
                        <h3 className="font-semibold text-lg text-white mb-2">নিরাপদ যাত্রা</h3>
                        <p className="text-sm text-white">আপনার যাত্রা হবে নিরাপদ, আরামদায়ক এবং নির্ভরযোগ্য।</p>
                    </motion.div>
                </div>
            </motion.section>



            {/* //HowToBook */}
            <HowToBook></HowToBook>


            {/* BTN  */}
            <div className="flex justify-center items-center my-10 pb-5">

                {/* <NavLink to="/ridebooking">
                    <Button
                        className="!bg-[#274450]  !text-white !border-none !px-4 !py-3 !rounded-xl hover:!bg-[#497D74]"

                    >
                        <span className="mr-2 text-xl animate-pulse">✨</span>
                        এখনই রাইড বুক করুন
                    </Button>
                </NavLink> */}

                <NavLink to="/ridebooking">
                    <Button
                        className="
                     relative !bg-gradient-to-r from-[#497D74] to-[#74B49B]
                     !text-white !border-none !px-4 !py-3 !rounded-xl 
                     overflow-hidden
                     before:absolute before:-inset-1 before:rounded-xl
                     before:bg-gradient-to-r before:from-[#497D74] before:via-[#74B49B] before:to-[#497D74]
                     before:bg-[length:200%_200%] before:animate-border-slide
                     before:z-[-1]
                     hover:scale-105 transition-transform duration-300
                     "
                    >
                        <span className="mr-2 text-2xl animate-pulse">✨</span>
                        এখনই রাইড বুক করুন
                    </Button>
                </NavLink>



            </div>

        </div>
    );
}
