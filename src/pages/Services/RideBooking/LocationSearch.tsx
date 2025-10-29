import React, { useState } from "react";

type Location = {
    name: string;
    lat: number;
    lng: number;
};

type Props = {
    pickup: Location | null;
    drop: Location | null;
    setPickup: (loc: Location) => void;
    setDrop: (loc: Location) => void;
};

const LocationSearch = ({ pickup, drop, setPickup, setDrop }: Props) => {
    const [pickupQuery, setPickupQuery] = useState("");
    const [dropQuery, setDropQuery] = useState("");
    const [pickupResults, setPickupResults] = useState<Location[]>([]);
    const [dropResults, setDropResults] = useState<Location[]>([]);

    const fetchLocations = async (query: string, type: "pickup" | "drop") => {
        if (query.length < 3) return;
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
        );
        const data = await res.json();
        const locations = data.map((loc: any) => ({
            name: loc.display_name,
            lat: parseFloat(loc.lat),
            lng: parseFloat(loc.lon),
        }));
        if (type === "pickup") setPickupResults(locations);
        else setDropResults(locations);
    };

    return (
        <div className="space-y-6">
            {/* Pickup Input */}
            <div>
                <label className="block text-gray-700 font-medium mb-1">Pickup</label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1a3b3a] focus:outline-none"
                    placeholder="Enter pickup location..."
                    value={pickupQuery}
                    onChange={(e) => {
                        setPickupQuery(e.target.value);
                        fetchLocations(e.target.value, "pickup");
                    }}
                />
                {pickupResults.length > 0 && (
                    <div className="border rounded-md mt-1 bg-white max-h-40 overflow-y-auto shadow">
                        {pickupResults.map((loc, i) => (
                            <div
                                key={i}
                                onClick={() => {
                                    setPickup(loc);
                                    setPickupQuery(loc.name);
                                    setPickupResults([]);
                                }}
                                className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                            >
                                {loc.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Drop Input */}
            <div>
                <label className="block text-gray-700 font-medium mb-1">Drop</label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1a3b3a] focus:outline-none"
                    placeholder="Enter drop location..."
                    value={dropQuery}
                    onChange={(e) => {
                        setDropQuery(e.target.value);
                        fetchLocations(e.target.value, "drop");
                    }}
                />
                {dropResults.length > 0 && (
                    <div className="border rounded-md mt-1 bg-white max-h-40 overflow-y-auto shadow">
                        {dropResults.map((loc, i) => (
                            <div
                                key={i}
                                onClick={() => {
                                    setDrop(loc);
                                    setDropQuery(loc.name);
                                    setDropResults([]);
                                }}
                                className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                            >
                                {loc.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LocationSearch;

