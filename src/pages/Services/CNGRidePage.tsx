// src/pages/CNGRidePage.tsx
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { motion } from "framer-motion";
import { Avatar } from "primereact/avatar";
import { Rating } from "primereact/rating";
import BookingForm, { BookingFormData } from "./BookingForm";
import { NavLink } from "react-router";

const PRIMARY = "#274450";
const ACCENT = "#71BBB2";

type Driver = {
    id: number;
    name: string;
    avatar?: string;
    rating: number;
    etaMinutes: number;
    vehicleNo?: string;
};

const mockDrivers: Driver[] = [
    { id: 1, name: "রাফি হোসেন", rating: 4.6, etaMinutes: 3, vehicleNo: "CNG-1201" },
    { id: 2, name: "মাহমুদা বেগম", rating: 4.8, etaMinutes: 5, vehicleNo: "CNG-0873" },
    { id: 3, name: "শাহীন আলম", rating: 4.4, etaMinutes: 7, vehicleNo: "CNG-4462" },
];

export default function CNGRidePage() {
    const [showFareDialog, setShowFareDialog] = useState(false);
    const [fareResult, setFareResult] = useState<{ distanceKm: number; fare: number } | null>(null);

    const estimateDistanceKm = (a: string, b: string) => {
        const s = (a + "|" + b).toLowerCase();
        let hash = 0;
        for (let i = 0; i < s.length; i++) {
            hash = (hash << 5) - hash + s.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash) % 12 + 1;
    };

    const calculateFare = (data: BookingFormData) => {
        const distance = estimateDistanceKm(data.pickup, data.drop);
        const base = 30;
        const perKm = 12;
        const passengerSurcharge = data.passengers > 2 ? (data.passengers - 2) * 8 : 0;
        const rideTypeMultiplier = data.rideType === "Return" ? 1.8 : 1;
        const fareRaw = (base + perKm * distance + passengerSurcharge) * rideTypeMultiplier;
        return { distanceKm: distance, fare: Math.round(fareRaw) };
    };

    const handleBookingConfirm = (data: BookingFormData) => {
        const res = calculateFare(data);
        setFareResult(res);
        setShowFareDialog(true);
        console.log("✅ Booking Confirmed:", data);
    };

    return (
        <div className="space-y-12">

            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative h-[350px] md:h-[400px] w-full flex items-center justify-center text-center overflow-hidden"
                style={{
                    backgroundImage: "url('https://i.ibb.co.com/KzbtHDgP/cng.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-[#274450]/60"></div>
                <div className="relative z-10 text-white px-4">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">তাৎক্ষণিক সিএনজি রাইড বুক করুন</h1>
                    <p className="text-lg md:text-2xl mb-6">সাশ্রয়ী · দ্রুত · নিরাপদ</p>
                    <a
                        href="#booking-form"
                        className="inline-block bg-accent hover:bg-[#497D74] px-6 py-3 rounded-lg font-bold transition-colors"
                        style={{ backgroundColor: ACCENT }}
                    >
                        এখনই বুক করুন
                    </a>
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
                    কেন CNG রাইড বেছে নেবেন?
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-[#71BBB2] text-white rounded-xl p-6 shadow-md flex flex-col items-center text-center">
                        <span className="text-3xl mb-3">⚡</span>
                        <h3 className="font-semibold text-lg mb-2">দ্রুত রাইড</h3>
                        <p className="text-sm">আমাদের নিকটস্থ CNG চালক থেকে কয়েক মিনিটেই রাইড পেয়ে যান, ঝামেলাহীন সার্ভিস।</p>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} className="bg-[#497D74] text-white rounded-xl p-6 shadow-md flex flex-col items-center text-center">
                        <span className="text-3xl mb-3">💰</span>
                        <h3 className="font-semibold text-lg mb-2">সাশ্রয়ী ভাড়া</h3>
                        <p className="text-sm">প্রতি কিলোমিটারে সেরা ভাড়া, কোনো লুকানো চার্জ নেই। আগেই ভাড়া দেখে নিশ্চিত হোন।</p>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} className="bg-[#71BBB2] text-white rounded-xl p-6 shadow-md flex flex-col items-center text-center">
                        <span className="text-3xl mb-3">📍</span>
                        <h3 className="font-semibold text-lg mb-2">লাইভ ট্র্যাকিং</h3>
                        <p className="text-sm">রাইডের অগ্রগতি এবং চালকের অবস্থান রিয়েল-টাইমে মোবাইল স্ক্রিনে দেখতে পারবেন।</p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Booking Form */}
            <BookingForm googleMapsApiKey="AIzaSyCbbOBVZNUTdhdDoJliYuXz4k1mi2OtWc8" onConfirm={handleBookingConfirm} />

            {/* Available Drivers */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="bg-[#EFE9D5] rounded-2xl shadow-lg p-6 sm:p-8 mx-5 md:mx-10 mb-15"
            >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#274450] mb-6 text-center">
                    নিকটস্থ ড্রাইভারগণ
                </h2>

                <div className="grid gap-4 sm:gap-5">
                    {mockDrivers.map((d, idx) => (
                        <motion.div
                            key={d.id}
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.4 }}
                            whileHover={{ scale: 1.02 }}
                            className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border rounded-xl shadow hover:shadow-xl transition-all"
                        >
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <Avatar
                                    label={d.name.split(" ").map(n => n[0]).join("")}
                                    shape="circle"
                                    size="large"
                                    style={{ backgroundColor: ACCENT, color: PRIMARY }}
                                />
                                <div>
                                    <div className="font-semibold text-sm sm:text-base md:text-lg text-[#274450]">{d.name}</div>
                                    <div className="text-xs sm:text-sm text-gray-500">{d.vehicleNo} • ETA <span className="font-medium text-[#497D74]">{d.etaMinutes} min</span></div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:items-end w-full sm:w-auto">
                                <div className="flex items-center gap-2">
                                    <Rating value={d.rating} readOnly cancel={false} />
                                    <span className="text-xs sm:text-sm text-gray-500">({d.rating.toFixed(1)})</span>
                                </div>
                                <span className="text-sm md:text-base font-semibold text-[#274450] mt-1">আনুমানিক ভাড়া: ৳{d.etaMinutes * 20}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-6 text-xs sm:text-sm text-gray-600 text-center">
                    🚖 মোট {mockDrivers.length} জন ড্রাইভার পাওয়া গেছে
                </div>
            </motion.section>


        </div>
    );
}
