// RideBooking.tsx
import React from "react";
import Lottie from "lottie-react";
import lottieData from "../../../public/Booking.json";
import BookingForm from "./BookingForm";

const RideBooking: React.FC = () => {
    return (
        <div>
            <div className="relative w-screen h-[200px] overflow-hidden -ml-[calc((100vw-100%)/2)]">
                {/* Lottie Background */}
                <div className="absolute inset-0 z-0">
                    <Lottie
                        animationData={lottieData}
                        loop
                        autoplay
                        style={{ width: "100vw", height: "200px", objectFit: "cover" }}
                    />
                </div>

                {/* Centered Title */}
                {/* <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
                    <h2 className="text-lg md:text-2xl font-bold text-[#71BBB2] text-center drop-shadow-md">
                        নিচের তথ্য প্রদান করে রাইড বুক করুন !!
                    </h2>
                </div> */}
            </div>
            <BookingForm></BookingForm>
        </div>
    );
};

export default RideBooking;
