/// RideBooking.tsx
import React from "react";
import Lottie from "lottie-react";
import lottieData from "../../../public/Booking.json";

const RideBooking: React.FC = () => {
    return (
        <div className="relative h-screen overflow-hidden w-full  -ml-[calc((100vw-100%)/2)]">
            {/* Lottie Background */}
            <div className="absolute inset-0 z-0 opacity-30">
                <Lottie
                    animationData={lottieData}
                    loop
                    autoplay
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Title */}
            {/* <h2 className="text-3xl md:text-5xl font-bold text-center text-[#274450] mb-5 md:mb-10 relative z-10">
                কীভাবে রাইড বুক করবেন?
            </h2> */}
        </div>
    );
};

export default RideBooking;
