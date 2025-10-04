// src/pages/Shipment.tsx
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { motion } from "framer-motion";
import { Avatar } from "primereact/avatar";
import { Rating } from "primereact/rating";
import BookingForm, { BookingFormData } from "./BookingForm";
import HowToBook from "./HowToBook";
import { NavLink } from "react-router";
import Lottie from "lottie-react";
import lottieData from "../../../public/map.json";

const PRIMARY = "#274450";
const ACCENT = "#71BBB2";



export default function Shipment() {

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
                    backgroundImage: "url('https://i.ibb.co.com/pckHwd6/cc.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-[#274450]/60"></div>
                <div className="relative z-10 text-white px-4">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">এখনই প্যাকেজ / পণ্য প্রেরণ বুক করুন</h1>
                    <p className="text-lg md:text-2xl mb-6">সাশ্রয়ী · দ্রুত · নিরাপদ</p>

                    <NavLink to="/bookingform">
                        <Button
                            label="এখনই রাইড বুক করুন"
                            className="!bg-[#71BBB2] !text-white !border-none !px-4 !py-3 !rounded-md hover:!bg-white hover:!text-[#71BBB2] "
                        />
                    </NavLink>
                </div>
            </motion.section>

            {/* Features Section */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="bg-[#274450] rounded-2xl shadow-lg p-8 mx-5 md:mx-10"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                    কেন ট্রাক রাইড ব্যবহার করবেন?
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
            </motion.section>

            {/* //HowToBook */}
            <HowToBook></HowToBook>


            {/* BTN  */}
            <div className="flex justify-center items-center my-10 pb-5">

                <NavLink to="/RideBooking">
                    <Button
                        label="এখনই রাইড বুক করুন"
                        className="!bg-[#274450]  !text-white !border-none !px-4 !py-3 !rounded-md hover:!bg-[#497D74]"
                    />
                </NavLink>

            </div>

        </div>
    );
}
