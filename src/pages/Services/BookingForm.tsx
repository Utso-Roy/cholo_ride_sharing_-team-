// src/components/BookingForm.tsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { motion } from "framer-motion";

// TypeScript Google Maps types
//<reference types="@types/google.maps" /> 

const PRIMARY = "#274450";
const ACCENT = "#71BBB2";

type RideType = "Single" | "Return";

export type BookingFormData = {
    pickup: string;
    drop: string;
    datetime: Date | null;
    rideType: RideType;
    passengers: number;
    vehicleType: string;
    pickupCoords?: google.maps.LatLngLiteral;
    dropCoords?: google.maps.LatLngLiteral;
};

interface BookingFormProps {
    onConfirm?: (data: BookingFormData) => void;
    googleMapsApiKey: string;
}

export default function BookingForm({ onConfirm, googleMapsApiKey }: BookingFormProps) {
    const [form, setForm] = useState<BookingFormData>({
        pickup: "",
        drop: "",
        datetime: null,
        rideType: "Single",
        passengers: 1,
        vehicleType: "CNG",
    });
    const [showFareDialog, setShowFareDialog] = useState(false);
    const [fareResult, setFareResult] = useState<{ distanceKm: number; fare: number } | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);

    const pickupRef = useRef<HTMLInputElement>(null);
    const dropRef = useRef<HTMLInputElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<google.maps.Map | null>(null);
    const pickupMarker = useRef<google.maps.Marker | null>(null);
    const dropMarker = useRef<google.maps.Marker | null>(null);


    const handleInput = (key: keyof BookingFormData, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const canConfirm = useMemo(() => form.pickup && form.drop && form.datetime, [form]);

    // Load Google Maps Script
    useEffect(() => {
        if (typeof window === "undefined") return;
        if ((window as any).google) {
            setMapLoaded(true);
            return;
        }
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
        script.async = true;
        script.onload = () => setMapLoaded(true);
        document.head.appendChild(script);
    }, [googleMapsApiKey]);

    // Initialize Map + Autocomplete + Custom Markers + Bounds
    useEffect(() => {
        if (!mapLoaded || !window.google || !mapRef.current) return;

        const google = window.google;
        mapInstance.current = new google.maps.Map(mapRef.current, {
            center: { lat: 23.8103, lng: 90.4125 },
            zoom: 12,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            styles: [
                { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
            ],
        });

        const bounds = new google.maps.LatLngBounds();

        // Custom Marker Icons
        const pickupIcon = {
            url: "https://img.icons8.com/fluency/48/000000/marker.png",
            scaledSize: new google.maps.Size(36, 36),
        };
        const dropIcon = {
            url: "https://img.icons8.com/fluency/48/000000/marker.png",
            scaledSize: new google.maps.Size(36, 36),
        };

        const updateBounds = () => {
            const bounds = new google.maps.LatLngBounds();
            if (pickupMarker.current) bounds.extend(pickupMarker.current.getPosition()!);
            if (dropMarker.current) bounds.extend(dropMarker.current.getPosition()!);
            if (mapInstance.current) mapInstance.current.fitBounds(bounds);
        };



        // Pickup Autocomplete
        if (pickupRef.current) {
            const pickupAC = new google.maps.places.Autocomplete(pickupRef.current);
            pickupAC.setFields(["formatted_address", "geometry"]);
            pickupAC.addListener("place_changed", () => {
                const place = pickupAC.getPlace();
                if (!place.geometry?.location) return;
                const coords = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
                handleInput("pickup", place.formatted_address || "");
                handleInput("pickupCoords", coords);

                if (!pickupMarker.current) {
                    pickupMarker.current = new google.maps.Marker({
                        map: mapInstance.current,
                        position: coords,
                        icon: pickupIcon,
                        title: "Pickup",
                        animation: google.maps.Animation.DROP,
                    });
                } else pickupMarker.current.setPosition(coords);

                updateBounds();
            });
        }

        // Drop Autocomplete
        if (dropRef.current) {
            const dropAC = new google.maps.places.Autocomplete(dropRef.current);
            dropAC.setFields(["formatted_address", "geometry"]);
            dropAC.addListener("place_changed", () => {
                const place = dropAC.getPlace();
                if (!place.geometry?.location) return;
                const coords = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
                handleInput("drop", place.formatted_address || "");
                handleInput("dropCoords", coords);

                if (!dropMarker.current) {
                    dropMarker.current = new google.maps.Marker({
                        map: mapInstance.current,
                        position: coords,
                        icon: dropIcon,
                        title: "Drop",
                        animation: google.maps.Animation.DROP,
                    });
                } else dropMarker.current.setPosition(coords);

                updateBounds();
            });
        }
    }, [mapLoaded]);

    // Dummy fare calculation
    const estimateDistanceKm = (a: string, b: string) => {
        const s = (a + "|" + b).toLowerCase();
        let hash = 0;
        for (let i = 0; i < s.length; i++) {
            hash = (hash << 5) - hash + s.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash) % 12 + 1;
    };

    const calculateFare = () => {
        const distance = estimateDistanceKm(form.pickup, form.drop);
        const base = 30;
        const perKm = 12;
        const passengerSurcharge = form.passengers > 2 ? (form.passengers - 2) * 8 : 0;
        const rideTypeMultiplier = form.rideType === "Return" ? 1.8 : 1;
        const fareRaw = (base + perKm * distance + passengerSurcharge) * rideTypeMultiplier;
        return { distanceKm: distance, fare: Math.round(fareRaw) };
    };

    const onConfirmClick = () => {
        if (!canConfirm) return;
        const res = calculateFare();
        setFareResult(res);
        setShowFareDialog(true);
        onConfirm?.(form);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            id="booking-form"
            className="bg-white border-2 border-[#EFE9D5] rounded-2xl shadow-xl p-4 md:p-8 mx-5 md:mx-10 "
        >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center" style={{ color: PRIMARY }}>
                রাইড বুক করুন
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <InputText
                    ref={pickupRef}
                    value={form.pickup}
                    onChange={(e) => handleInput("pickup", e.target.value)}
                    placeholder="Pickup Location"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2"
                    style={{ borderColor: ACCENT }}
                />
                <InputText
                    ref={dropRef}
                    value={form.drop}
                    onChange={(e) => handleInput("drop", e.target.value)}
                    placeholder="Drop Location"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2"
                    style={{ borderColor: ACCENT }}
                />
                <Calendar
                    value={form.datetime}
                    onChange={(e: any) => handleInput("datetime", e.value)}
                    showTime
                    hourFormat="24"
                    placeholder="Select Date & Time"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2"
                    style={{ borderColor: ACCENT }}
                />
                <Dropdown
                    value={form.rideType}
                    options={[
                        { label: "সিঙ্গেল", value: "Single" },
                        { label: "রিটার্ন", value: "Return" },
                    ]}
                    onChange={(e) => handleInput("rideType", e.value)}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2"
                    style={{ borderColor: ACCENT }}
                />
                <Dropdown
                    value={form.vehicleType}
                    options={[
                        { label: "CNG", value: "CNG" },
                        { label: "Bike", value: "Bike" },
                        { label: "Car", value: "Car" },
                    ]}
                    onChange={(e) => handleInput("vehicleType", e.value)}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2"
                    style={{ borderColor: ACCENT }}
                />
                <InputNumber
                    value={form.passengers}
                    min={1}
                    max={6}
                    onChange={(e: any) => handleInput("passengers", e.value)}
                    showButtons
                    className="w-full"
                />
                <div className="flex items-end sm:col-span-2">
                    <Button
                        label="কনফার্ম করুন"
                        onClick={onConfirmClick}
                        className="w-full p-button-lg rounded-md font-bold"
                        style={{ backgroundColor: PRIMARY, color: "white" }}
                    />
                </div>
            </div>

            {/* Map Preview */}
            <div
                className="mt-4 w-full h-60 sm:h-72 md:h-80 rounded-xl overflow-hidden shadow-lg border"
                style={{ borderColor: ACCENT }}
            >
                <div ref={mapRef} className="w-full h-full rounded-xl" />
            </div>

            {/* Fare Dialog */}
            <Dialog
                header="ভাড়া অনুমান"
                visible={showFareDialog}
                onHide={() => setShowFareDialog(false)}
                modal
                className="rounded-xl"
            >
                {fareResult && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-4 text-center"
                    >
                        <div>
                            আনুমানিক দূরত্ব: <strong>{fareResult.distanceKm} কিমি</strong>
                        </div>
                        <div className="text-2xl font-bold" style={{ color: PRIMARY }}>
                            ৳ {fareResult.fare}
                        </div>
                        <Button
                            label="পেমেন্টে যান"
                            style={{ backgroundColor: ACCENT, color: PRIMARY, border: "none" }}
                            className="w-full"
                        />
                    </motion.div>
                )}
            </Dialog>
        </motion.div>
    );
}
