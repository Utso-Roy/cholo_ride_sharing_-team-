import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

type Props = HTMLMotionProps<"button"> & { children: React.ReactNode };

const AnimatedButton: React.FC<Props> = ({ children, ...rest }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative px-5 py-2 rounded-lg font-semibold text-white overflow-hidden border border-[#71BBB2] before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-[#71BBB2] before:via-[#274450] before:to-[#71BBB2] before:animate-[marquee_3s_linear_infinite] before:z-0 z-10"
        {...rest}
    >
        <span className="relative z-20">{children}</span>
    </motion.button>
);

export default AnimatedButton;
