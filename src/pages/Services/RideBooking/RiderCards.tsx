import React from "react";

type RiderCardsProps = {
    rideType: string;
    pickup: any;
    drop: any;
    selectedRider: string | null;
    onSelect: (rider: string) => void;
};

const RiderCards: React.FC<RiderCardsProps> = ({
    rideType,
    pickup,
    drop,
    selectedRider,
    onSelect,
}) => {
    // Demo Data by Ride Type
    const riderData: Record<string, any[]> = {
        Car: [
            { name: "Rakib Ahmed", vehicle: "Toyota Prius", fare: 220, rating: 4.9 },
            { name: "Sakib Hasan", vehicle: "Honda City", fare: 200, rating: 4.7 },
        ],
        Bike: [
            { name: "Nusrat Jahan", vehicle: "Yamaha R15", fare: 120, rating: 4.8 },
            { name: "Aminul Islam", vehicle: "Bajaj Pulsar", fare: 100, rating: 4.6 },
        ],
        CNG: [
            { name: "Tanvir Hossain", vehicle: "Green Auto", fare: 150, rating: 4.5 },
        ],
        Truck: [
            { name: "Kamrul Alam", vehicle: "Tata Cargo", fare: 500, rating: 4.4 },
        ],
        Ambulance: [
            { name: "Dr. Rahim", vehicle: "Toyota Hiace", fare: 800, rating: 4.9 },
        ],
    };

    const riders = riderData[rideType] || [];

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {riders.map((r) => (
                <div
                    key={r.name}
                    onClick={() => onSelect(r.name)}
                    className={`border rounded-2xl p-4 cursor-pointer transition-all hover:shadow-lg ${selectedRider === r.name
                        ? "border-[#1a3b3a] bg-[#EAF6F5]"
                        : "border-gray-200"
                        }`}
                >
                    <h4 className="text-lg font-semibold text-[#1a3b3a]">{r.name}</h4>
                    <p className="text-sm text-gray-600">{r.vehicle}</p>
                    <p className="text-sm text-gray-500">⭐ {r.rating}</p>
                    <p className="text-[#1a3b3a] font-medium mt-2">৳ {r.fare}</p>
                </div>
            ))}
        </div>
    );
};

export default RiderCards;
