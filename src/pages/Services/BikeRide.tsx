// src/pages/BikeRide.tsx
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { motion } from "framer-motion";
import { Avatar } from "primereact/avatar";
import { Rating } from "primereact/rating";
import HowToBook from "./HowToBook";
import { NavLink } from "react-router";
import clock from "../../assets/servicesimg/1.png";
import car1 from "../../assets/servicesimg/5.png";
import car2 from "../../assets/servicesimg/4.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCab } from "@fortawesome/free-solid-svg-icons";



const PRIMARY = "#274450";
const ACCENT = "#71BBB2";



export default function BikeRide() {

    return (
        <div className="relative ">

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
                className="bg-cover bg-center  bg-no-repeat bg-fixed"
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
                    className="px-5 bg-gradient-to-br from-[#F9FFFE] to-[#E7F8F5] md:px-10 "
                >
                    <h2
                        className="text-2xl md:text-4xl font-bold mb-8 text-center pt-8"
                        style={{ color: "#274450" }}
                    >
                        কেন বাইক রাইড ব্যবহার করবেন?
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
                                background:
                                    "linear-gradient(135deg, #ffffff 0%, #F6FBF8 100%)",
                            }}
                        >
                            <img
                                src={clock}
                                alt="রিয়েল-টাইম ট্র্যাকিং"
                                className="w-full h-[200px] object-cover rounded-lg mb-4"
                            />
                            <h3 className="font-bold text-lg mb-2" style={{ color: "#274450" }}>
                                রিয়েল-টাইম ট্র্যাকিং
                            </h3>
                            <p className="text-sm font-semibold" style={{ color: "#274450" }}>
                                আপনার বাইকের অবস্থান এবং অগ্রগতি যেকোনো সময় লাইভ ট্র্যাক করুন।
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
                                background:
                                    "linear-gradient(135deg, #ffffff 0%, #EAF7F4 100%)",
                            }}
                        >
                            <img
                                src={car1}
                                alt="সঠিক ETA"
                                className="w-full h-[200px] object-cover rounded-lg mb-4"
                            />
                            <h3 className="font-bold text-lg mb-2" style={{ color: "#274450" }}>
                                সঠিক ETA
                            </h3>
                            <p className="text-sm font-semibold" style={{ color: "#274450" }}>
                                আপনার রাইড কখন পৌঁছাবে তা নির্ভুলভাবে জানতে পারবেন।
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
                                background:
                                    "linear-gradient(135deg, #ffffff 0%, #F1F7F0 100%)",
                            }}
                        >
                            <img
                                src={car2}
                                alt="নিরাপদ যাত্রা"
                                className="w-full h-[200px] object-cover rounded-lg mb-4"
                            />
                            <h3 className="font-bold text-lg mb-2" style={{ color: "#274450" }}>
                                নিরাপদ যাত্রা
                            </h3>
                            <p className="text-sm font-semibold" style={{ color: "#274450" }}>
                                আপনার যাত্রা হবে নিরাপদ, আরামদায়ক এবং নির্ভরযোগ্য।
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
