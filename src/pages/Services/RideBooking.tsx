// RideBooking.tsx
import React from "react";
import Lottie from "lottie-react";
import lottieData from "../../../public/Booking.json";
import BookingForm from "./BookingForm";

const RideBooking: React.FC = () => {
    return (
        <div>
            {/* <div className="relative w-screen h-[200px] overflow-hidden -ml-[calc((100vw-100%)/2)]">
       
                <div className="absolute inset-0 z-0">
                    <Lottie
                        animationData={lottieData}
                        loop
                        autoplay
                        style={{ width: "100vw", height: "200px", objectFit: "cover" }}
                    />
                </div>

            </div> */}
            <BookingForm></BookingForm>
        </div>
    );
};

export default RideBooking;
