// src/components/BookingForm.tsx
import React, { useState, useMemo } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { motion } from "framer-motion";

// Color Palette
const PRIMARY = "#274450"; // গাঢ় সবুজ-নীল
const ACCENT = "#71BBB2";  // হালকা টিল

type RideType = "Single" | "Return";

export type BookingFormData = {
    pickup: string;
    drop: string;
    datetime: Date | null;
    rideType: RideType;
    passengers: number;
    vehicleType: string;
};

interface BookingFormProps {
    onConfirm?: (data: BookingFormData) => void;
}

export default function BookingForm({ onConfirm }: BookingFormProps) {
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

    const handleInput = (key: keyof BookingFormData, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const canConfirm = useMemo(() => form.pickup && form.drop && form.datetime, [form]);

    // আনুমানিক দূরত্ব হিসাব
    const estimateDistanceKm = (a: string, b: string) => {
        const s = (a + "|" + b).toLowerCase();
        let hash = 0;
        for (let i = 0; i < s.length; i++) {
            hash = (hash << 5) - hash + s.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash) % 12 + 1;
    };

    // ভাড়া হিসাব
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
            className="bg-white rounded-2xl shadow-xl p-6 md:p-10 max-w-4xl mx-auto"
            id="booking-form"
        >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center" style={{ color: PRIMARY }}>
                সিএনজি বুকিং ফর্ম
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pickup */}
                <motion.div whileHover={{ scale: 1.02 }}>
                    <label className="block text-sm mb-2 font-semibold text-gray-700">পিকআপ লোকেশন</label>
                    <InputText
                        value={form.pickup}
                        onChange={(e) => handleInput("pickup", e.target.value)}
                        placeholder="লোকেশন লিখুন"
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2"
                        style={{ borderColor: ACCENT }}
                    />
                </motion.div>

                {/* Drop */}
                <motion.div whileHover={{ scale: 1.02 }}>
                    <label className="block text-sm mb-2 font-semibold text-gray-700">ড্রপ লোকেশন</label>
                    <InputText
                        value={form.drop}
                        onChange={(e) => handleInput("drop", e.target.value)}
                        placeholder="লোকেশন লিখুন"
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2"
                        style={{ borderColor: ACCENT }}
                    />
                </motion.div>

                {/* Date & Time */}
                <motion.div whileHover={{ scale: 1.02 }}>
                    <label className="block text-sm mb-2 font-semibold text-gray-700">তারিখ ও সময়</label>
                    <Calendar
                        value={form.datetime}
                        onChange={(e: any) => handleInput("datetime", e.value)}
                        showTime
                        hourFormat="24"
                        placeholder="তারিখ ও সময় নির্বাচন করুন"
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2"
                        style={{ borderColor: ACCENT }}
                    />
                </motion.div>

                {/* Ride Type */}
                <motion.div whileHover={{ scale: 1.02 }}>
                    <label className="block text-sm mb-2 font-semibold text-gray-700">যাত্রার ধরণ</label>
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
                </motion.div>

                {/* Vehicle Type */}
                <motion.div whileHover={{ scale: 1.02 }}>
                    <label className="block text-sm mb-2 font-semibold text-gray-700">যানবাহন নির্বাচন করুন</label>
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
                </motion.div>

                {/* Passengers */}
                <motion.div whileHover={{ scale: 1.02 }}>
                    <label className="block text-sm mb-2 font-semibold text-gray-700">যাত্রী সংখ্যা</label>
                    <InputNumber
                        value={form.passengers}
                        min={1}
                        max={6}
                        onChange={(e: any) => handleInput("passengers", e.value)}
                        showButtons
                        className="w-full"
                    />
                </motion.div>

                {/* Confirm Button */}
                <div className="flex items-end">
                    <Button
                        label="কনফার্ম করুন"
                        onClick={onConfirmClick}
                        className="w-full p-button-lg rounded-md font-bold"
                        style={{ backgroundColor: PRIMARY, color: "white" }}
                    />
                </div>
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
                        <div>আনুমানিক দূরত্ব: <strong>{fareResult.distanceKm} কিমি</strong></div>
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
