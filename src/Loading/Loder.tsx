import React, { FC } from "react";
import { motion } from "framer-motion";
import Logo from "../assets/Logo.png";

const Loader: FC = () => {
    return (
        <div className="bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center h-screen"
            style={{
                /// backgroundImage: "url('https://i.ibb.co.com/zTQ6z80G/map.jpg')",
                backgroundImage: "linear-gradient(to right, rgba(230,252,249,0.8), rgba(249,250,251,0.8)), url('https://i.ibb.co/zTQ6z80G/map.jpg')",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                backgroundBlendMode: "overlay",
            }} >

            <div className="relative w-50 h-50 flex items-center justify-center">
                {/* Static Border */}
                <div className="absolute inset-0 rounded-full border-8 border-red-500"></div>

                {/* Rotating Border */}
                <motion.div
                    className="absolute inset-0 rounded-full border-8 border-transparent"
                    style={{
                        borderTopColor: "#497D74",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                {/* Logo */}
                <div className="w-50 h-50 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <img src={Logo} alt="Logo" className="w-50 h-50 object-contain p-3" />
                </div>
            </div>
        </div>
    );
};

export default Loader;
