import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Place } from "./types";
import { LatLngExpression } from "leaflet";
import LocationInput from "./LocationSearch";
import AnimatedButton from "./AnimatedButton";
import MapSelector from "./MapSelector";

export default function BookingForm() {
    const [step, setStep] = useState(1);
    const [pickup, setPickup] = useState<Place | null>(null);
    const [drop, setDrop] = useState<Place | null>(null);
    const [routeCoords, setRouteCoords] = useState<LatLngExpression[]>([]);
    const [selectMode, setSelectMode] = useState<"pickup" | "drop">("pickup");
    const [rideType, setRideType] = useState("Economy");
    const [fare, setFare] = useState<number | null>(null);
    const [routeDistance, setRouteDistance] = useState<number | null>(null);
    const [routeDuration, setRouteDuration] = useState<number | null>(null);

    // vehicle progress 0-1
    const [vehicleProgress, setVehicleProgress] = useState(0);

    async function fetchRoute(from: Place, to: Place) {
        try {
            const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${from.lon},${from.lat};${to.lon},${to.lat}?overview=full&geometries=geojson`);
            const j = await res.json();
            if (!j.routes || !j.routes.length) return null;
            const r = j.routes[0];
            const coords: [number, number][] = r.geometry.coordinates.map((c: [number, number]) => [c[1], c[0]]);
            return { coords, distance: r.distance, duration: r.duration };
        } catch {
            return null;
        }
    }

    useEffect(() => {
        if (!pickup || !drop) return;
        fetchRoute(pickup, drop).then((r) => {
            if (!r) return;
            setRouteCoords(r.coords as LatLngExpression[]);
            setRouteDistance(r.distance / 1000);
            setRouteDuration(Math.round(r.duration / 60));
            setFare(Math.round(40 + (rideType === "Premium" ? 30 : rideType === "Bike" ? 8 : 18) * (r.distance / 1000)));
        });
    }, [pickup, drop, rideType]);

    // simulate vehicle moving
    useEffect(() => {
        if (step !== 3 || routeCoords.length === 0) return;
        let progress = 0;
        const interval = setInterval(() => {
            progress += 0.01;
            if (progress >= 1) progress = 1;
            setVehicleProgress(progress);
            if (progress === 1) clearInterval(interval);
        }, 500);
        return () => clearInterval(interval);
    }, [step, routeCoords]);

    function handleConfirm() {
        if (!pickup || !drop) { Swal.fire("Select pickup & drop"); return; }
        if (!fare) { Swal.fire("Calculating route..."); return; }
        Swal.fire({ title: "Confirm Booking", html: `<b>${fare} ৳</b><br>${rideType}<br>${routeDistance?.toFixed(2)} km, ${routeDuration} min`, showCancelButton: true }).then(res => {
            if (res.isConfirmed) setStep(3);
        });
    }

    return (
        <div className="min-h-screen p-4 flex flex-col md:flex-row gap-6">
            {/* LEFT: form */}
            <div className="md:w-1/2 flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-[#274450]">Book a Ride</h2>

                {step === 1 && (
                    <>
                        <div className="flex gap-2">
                            <button onClick={() => setSelectMode("pickup")} className={`px-3 py-1 rounded border ${selectMode === "pickup" ? "bg-[#71BBB2] text-white" : ""}`}>Pickup</button>
                            <button onClick={() => setSelectMode("drop")} className={`px-3 py-1 rounded border ${selectMode === "drop" ? "bg-[#71BBB2] text-white" : ""}`}>Drop</button>
                        </div>
                        <LocationInput placeholder="Search Pickup" onSelect={setPickup} />
                        <LocationInput placeholder="Search Drop" onSelect={setDrop} />

                        <div className="mt-4">
                            <label>Ride Type:</label>
                            <select className="ml-2 p-2 border rounded" value={rideType} onChange={(e) => setRideType(e.target.value)}>
                                <option>Economy</option>
                                <option>Premium</option>
                                <option>Bike</option>
                            </select>
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                            <div>Fare: <b>{fare ? `${fare} ৳` : "--"}</b></div>
                            <AnimatedButton onClick={handleConfirm}>Next</AnimatedButton>
                        </div>
                    </>
                )}

                {step === 3 && (
                    <>
                        <h3 className="text-xl font-semibold">Ride Tracking</h3>
                        <div className="mt-2">Driver moving along route (demo)</div>
                        <div className="mt-4">Distance: {routeDistance?.toFixed(2)} km | ETA: {routeDuration} min</div>
                        <AnimatedButton className="mt-4" onClick={() => { setStep(1); setPickup(null); setDrop(null); setRouteCoords([]); setVehicleProgress(0); setFare(null); }}>Complete Ride</AnimatedButton>
                    </>
                )}
            </div>

            {/* RIGHT: map */}
            <div className="md:w-1/2 h-[500px]">
                <MapSelector pickup={pickup} drop={drop} routeCoords={routeCoords} selectMode={selectMode} setPickup={setPickup} setDrop={setDrop} vehicleProgress={vehicleProgress} />
            </div>
        </div>
    );
}
