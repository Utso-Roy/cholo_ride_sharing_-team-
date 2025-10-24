// src/pages/CNGRidePage.tsx
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { motion } from "framer-motion";
import { Avatar } from "primereact/avatar";
import { Rating } from "primereact/rating";
import { NavLink } from "react-router";
import HowToBook from "./HowToBook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clock from "../../assets/servicesimg/1.png"
import car1 from "../../assets/servicesimg/7.png"
import car2 from "../../assets/servicesimg/6.png"
import { faCab } from "@fortawesome/free-solid-svg-icons";


const PRIMARY = "#274450";
const ACCENT = "#71BBB2";

export default function CNGRidePage() {

    return (
        <div className="relative ">

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

                    <NavLink to="/ridebooking">
                        <Button
                            className="!my-10 !font-extrabold !bg-gradient-to-r !from-[#71BBB2] !to-[#56A89E] !text-white !border-none 
                        px-8 py-3 rounded-full shadow-lg hover:shadow-xl 
                       hover:!from-[#56A89E] hover:!to-[#71BBB2] transition-all duration-300"

                        >
                            <FontAwesomeIcon icon={faCab} className="w-6 h-6 mr-2 animate-car" />
                            এখনই রাইড বুক করুন
                        </Button>
                    </NavLink>

                </div>
            </motion.section>

            {/* Features Section */}

            <section
                className="bg-cover bg-center bg-no-repeat bg-fixed"
                style={{
                    // backgroundImage: "url('https://i.ibb.co.com/zTQ6z80G/map.jpg')",
                    backgroundImage: "linear-gradient(to right, rgba(230,252,249,0.8), rgba(249,250,251,0.8)), url('https://i.ibb.co/zTQ6z80G/map.jpg')",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    backgroundBlendMode: "overlay",
                }}
            >
                {/* Features Section */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="px-5 md:px-10 "
                >
                    <h2
                        className="text-2xl md:text-4xl font-bold mb-8 text-center pt-8"
                        style={{ color: "#274450" }}
                    >
                        কেন সিএনজি রাইড ব্যবহার করবেন?
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {/* Feature 1 */}
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className="rounded-3xl p-4 flex flex-col items-center text-center 
                 border border-transparent hover:border-gray-200
                 shadow-sm hover:shadow-lg transition-all duration-300
                 backdrop-blur-sm"
                            style={{
                                background: "linear-gradient(135deg, #ffffff 0%, #F6FBF8 100%)",
                            }}
                        >
                            <img
                                src={car1}
                                alt="সহজলভ্য যাত্রা"
                                className="w-full h-[200px] object-cover rounded-lg mb-4"
                            />
                            <h3 className="font-bold text-lg mb-2" style={{ color: "#274450" }}>
                                সহজলভ্য যাত্রা
                            </h3>
                            <p className="text-sm font-semibold" style={{ color: "#274450" }}>
                                শহরের যেকোনো জায়গায় দ্রুত সিএনজি পাওয়া যায়, তাই যাত্রা শুরু করা সহজ।
                            </p>
                        </motion.div>

                        {/* Feature 2 */}
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className="rounded-3xl p-4 flex flex-col items-center text-center
                 border border-transparent hover:border-gray-200
                 shadow-sm hover:shadow-lg transition-all duration-300
                 backdrop-blur-sm"
                            style={{
                                background: "linear-gradient(135deg, #ffffff 0%, #EAF7F4 100%)",
                            }}
                        >
                            <img
                                src={clock}
                                alt="সাশ্রয়ী ভাড়া"
                                className="w-full h-[200px] object-cover rounded-lg mb-4"
                            />
                            <h3 className="font-bold text-lg mb-2" style={{ color: "#274450" }}>
                                দ্রুত গন্তব্যে পৌঁছানো
                            </h3>
                            <p className="text-sm font-semibold" style={{ color: "#274450" }}>
                                ট্রাফিকের ভিড়েও সিএনজি সহজে চলাচল করতে পারে, তাই দ্রুত গন্তব্যে পৌঁছানো যায়।
                            </p>

                        </motion.div>

                        {/* Feature 3 */}
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className="rounded-3xl p-4 flex flex-col items-center text-center
                 border border-transparent hover:border-gray-200
                 shadow-sm hover:shadow-lg transition-all duration-300
                 backdrop-blur-sm"
                            style={{
                                background: "linear-gradient(135deg, #ffffff 0%, #F1F7F0 100%)",
                            }}
                        >
                            <img
                                src={car2}
                                alt="দ্রুত গন্তব্যে পৌঁছানো"
                                className="w-full h-[200px] object-cover rounded-lg mb-4"
                            />
                            <h3 className="font-bold text-lg mb-2" style={{ color: "#274450" }}>
                                সাশ্রয়ী ভাড়া
                            </h3>
                            <p className="text-sm font-semibold" style={{ color: "#274450" }}>
                                অন্যান্য রাইডের তুলনায় সিএনজি ভাড়া অনেকটাই সাশ্রয়ী ও বাজেট-ফ্রেন্ডলি।
                            </p>
                        </motion.div>
                    </div>
                </motion.section>


                {/* ///HowToBook */}
                <HowToBook></HowToBook>

            </section>

        </div>
    );
}
