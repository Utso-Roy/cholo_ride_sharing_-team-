// // src/components/BookingForm.tsx
// import React, { useState, useEffect, useRef, useMemo } from "react";
// import { InputText } from "primereact/inputtext";
// import { Calendar } from "primereact/calendar";
// import { Dropdown } from "primereact/dropdown";
// import { InputNumber } from "primereact/inputnumber";
// import { Button } from "primereact/button";
// import { Dialog } from "primereact/dialog";
// import { motion } from "framer-motion";

// // TypeScript Google Maps types
// //<reference types="@types/google.maps" />

// const PRIMARY = "#274450";
// const ACCENT = "#71BBB2";

// type RideType = "Single" | "Return";

// export type BookingFormData = {
//     pickup: string;
//     drop: string;
//     datetime: Date | null;
//     rideType: RideType;
//     passengers: number;
//     vehicleType: string;
//     pickupCoords?: google.maps.LatLngLiteral;
//     dropCoords?: google.maps.LatLngLiteral;
// };

// interface BookingFormProps {
//     onConfirm?: (data: BookingFormData) => void;
//     googleMapsApiKey: string;
// }

// export default function BookingForm({ onConfirm, googleMapsApiKey }: BookingFormProps) {
//     const [form, setForm] = useState<BookingFormData>({
//         pickup: "",
//         drop: "",
//         datetime: null,
//         rideType: "Single",
//         passengers: 1,
//         vehicleType: "CNG",
//     });
//     const [showFareDialog, setShowFareDialog] = useState(false);
//     const [fareResult, setFareResult] = useState<{ distanceKm: number; fare: number } | null>(null);
//     const [mapLoaded, setMapLoaded] = useState(false);

//     const pickupRef = useRef<HTMLInputElement>(null);
//     const dropRef = useRef<HTMLInputElement>(null);
//     const mapRef = useRef<HTMLDivElement>(null);
//     const mapInstance = useRef<google.maps.Map | null>(null);
//     const pickupMarker = useRef<google.maps.Marker | null>(null);
//     const dropMarker = useRef<google.maps.Marker | null>(null);


//     const handleInput = (key: keyof BookingFormData, value: any) => {
//         setForm((prev) => ({ ...prev, [key]: value }));
//     };

//     const canConfirm = useMemo(() => form.pickup && form.drop && form.datetime, [form]);

//     // Load Google Maps Script
//     useEffect(() => {
//         if (typeof window === "undefined") return;
//         if ((window as any).google) {
//             setMapLoaded(true);
//             return;
//         }
//         const script = document.createElement("script");
//         script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
//         script.async = true;
//         script.onload = () => setMapLoaded(true);
//         document.head.appendChild(script);
//     }, [googleMapsApiKey]);

//     // Initialize Map + Autocomplete + Custom Markers + Bounds
//     useEffect(() => {
//         if (!mapLoaded || !window.google || !mapRef.current) return;

//         const google = window.google;
//         mapInstance.current = new google.maps.Map(mapRef.current, {
//             center: { lat: 23.8103, lng: 90.4125 },
//             zoom: 12,
//             mapTypeControl: false,
//             streetViewControl: false,
//             fullscreenControl: false,
//             styles: [
//                 { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
//             ],
//         });

//         const bounds = new google.maps.LatLngBounds();

//         // Custom Marker Icons
//         const pickupIcon = {
//             url: "https://img.icons8.com/fluency/48/000000/marker.png",
//             scaledSize: new google.maps.Size(36, 36),
//         };
//         const dropIcon = {
//             url: "https://img.icons8.com/fluency/48/000000/marker.png",
//             scaledSize: new google.maps.Size(36, 36),
//         };

//         const updateBounds = () => {
//             const bounds = new google.maps.LatLngBounds();
//             if (pickupMarker.current) bounds.extend(pickupMarker.current.getPosition()!);
//             if (dropMarker.current) bounds.extend(dropMarker.current.getPosition()!);
//             if (mapInstance.current) mapInstance.current.fitBounds(bounds);
//         };



//         // Pickup Autocomplete
//         if (pickupRef.current) {
//             const pickupAC = new google.maps.places.Autocomplete(pickupRef.current);
//             pickupAC.setFields(["formatted_address", "geometry"]);
//             pickupAC.addListener("place_changed", () => {
//                 const place = pickupAC.getPlace();
//                 if (!place.geometry?.location) return;
//                 const coords = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
//                 handleInput("pickup", place.formatted_address || "");
//                 handleInput("pickupCoords", coords);

//                 if (!pickupMarker.current) {
//                     pickupMarker.current = new google.maps.Marker({
//                         map: mapInstance.current,
//                         position: coords,
//                         icon: pickupIcon,
//                         title: "Pickup",
//                         animation: google.maps.Animation.DROP,
//                     });
//                 } else pickupMarker.current.setPosition(coords);

//                 updateBounds();
//             });
//         }

//         // Drop Autocomplete
//         if (dropRef.current) {
//             const dropAC = new google.maps.places.Autocomplete(dropRef.current);
//             dropAC.setFields(["formatted_address", "geometry"]);
//             dropAC.addListener("place_changed", () => {
//                 const place = dropAC.getPlace();
//                 if (!place.geometry?.location) return;
//                 const coords = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
//                 handleInput("drop", place.formatted_address || "");
//                 handleInput("dropCoords", coords);

//                 if (!dropMarker.current) {
//                     dropMarker.current = new google.maps.Marker({
//                         map: mapInstance.current,
//                         position: coords,
//                         icon: dropIcon,
//                         title: "Drop",
//                         animation: google.maps.Animation.DROP,
//                     });
//                 } else dropMarker.current.setPosition(coords);

//                 updateBounds();
//             });
//         }
//     }, [mapLoaded]);

//     // Dummy fare calculation
//     const estimateDistanceKm = (a: string, b: string) => {
//         const s = (a + "|" + b).toLowerCase();
//         let hash = 0;
//         for (let i = 0; i < s.length; i++) {
//             hash = (hash << 5) - hash + s.charCodeAt(i);
//             hash |= 0;
//         }
//         return Math.abs(hash) % 12 + 1;
//     };

//     const calculateFare = () => {
//         const distance = estimateDistanceKm(form.pickup, form.drop);
//         const base = 30;
//         const perKm = 12;
//         const passengerSurcharge = form.passengers > 2 ? (form.passengers - 2) * 8 : 0;
//         const rideTypeMultiplier = form.rideType === "Return" ? 1.8 : 1;
//         const fareRaw = (base + perKm * distance + passengerSurcharge) * rideTypeMultiplier;
//         return { distanceKm: distance, fare: Math.round(fareRaw) };
//     };

//     const onConfirmClick = () => {
//         if (!canConfirm) return;
//         const res = calculateFare();
//         setFareResult(res);
//         setShowFareDialog(true);
//         onConfirm?.(form);
//     };

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             id="booking-form"
//             className="bg-white border-2 border-[#EFE9D5] rounded-2xl shadow-xl p-4 md:p-8 mx-5 md:mx-10 my-10"
//         >
//             <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center" style={{ color: PRIMARY }}>
//                 রাইড বুক করুন
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
//                 <InputText
//                     ref={pickupRef}
//                     value={form.pickup}
//                     onChange={(e) => handleInput("pickup", e.target.value)}
//                     placeholder="Pickup Location"
//                     className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2"
//                     style={{ borderColor: ACCENT }}
//                 />
//                 <InputText
//                     ref={dropRef}
//                     value={form.drop}
//                     onChange={(e) => handleInput("drop", e.target.value)}
//                     placeholder="Drop Location"
//                     className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2"
//                     style={{ borderColor: ACCENT }}
//                 />
//                 <Calendar
//                     value={form.datetime}
//                     onChange={(e: any) => handleInput("datetime", e.value)}
//                     showTime
//                     hourFormat="24"
//                     placeholder="Select Date & Time"
//                     className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2"
//                     style={{ borderColor: ACCENT }}
//                 />
//                 <Dropdown
//                     value={form.rideType}
//                     options={[
//                         { label: "সিঙ্গেল", value: "Single" },
//                         { label: "রিটার্ন", value: "Return" },
//                     ]}
//                     onChange={(e) => handleInput("rideType", e.value)}
//                     className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2"
//                     style={{ borderColor: ACCENT }}
//                 />
//                 <Dropdown
//                     value={form.vehicleType}
//                     options={[
//                         { label: "CNG", value: "CNG" },
//                         { label: "Bike", value: "Bike" },
//                         { label: "Car", value: "Car" },
//                     ]}
//                     onChange={(e) => handleInput("vehicleType", e.value)}
//                     className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2"
//                     style={{ borderColor: ACCENT }}
//                 />
//                 <InputNumber
//                     value={form.passengers}
//                     min={1}
//                     max={6}
//                     onChange={(e: any) => handleInput("passengers", e.value)}
//                     showButtons
//                     className="w-full"
//                 />
//                 <div className="flex items-end sm:col-span-2">
//                     <Button
//                         label="কনফার্ম করুন"
//                         onClick={onConfirmClick}
//                         className="w-full p-button-lg rounded-md font-bold"
//                         style={{ backgroundColor: PRIMARY, color: "white" }}
//                     />
//                 </div>
//             </div>

//             {/* Map Preview */}
//             <div
//                 className="mt-4 w-full h-60 sm:h-72 md:h-80 rounded-xl overflow-hidden shadow-lg border"
//                 style={{ borderColor: ACCENT }}
//             >
//                 <div ref={mapRef} className="w-full h-full rounded-xl" />
//             </div>

//             {/* Fare Dialog */}
//             <Dialog
//                 header="ভাড়া অনুমান"
//                 visible={showFareDialog}
//                 onHide={() => setShowFareDialog(false)}
//                 modal
//                 className="rounded-xl"
//             >
//                 {fareResult && (
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.4 }}
//                         className="space-y-4 text-center"
//                     >
//                         <div>
//                             আনুমানিক দূরত্ব: <strong>{fareResult.distanceKm} কিমি</strong>
//                         </div>
//                         <div className="text-2xl font-bold" style={{ color: PRIMARY }}>
//                             ৳ {fareResult.fare}
//                         </div>
//                         <Button
//                             label="পেমেন্টে যান"
//                             style={{ backgroundColor: ACCENT, color: PRIMARY, border: "none" }}
//                             className="w-full"
//                         />
//                     </motion.div>
//                 )}
//             </Dialog>
//         </motion.div>
//     );
// }

//=================

// import React, { useState, useEffect, useRef, useMemo } from "react";
// import { InputText } from "primereact/inputtext";
// import { Calendar } from "primereact/calendar";
// import { Dropdown } from "primereact/dropdown";
// import { InputNumber } from "primereact/inputnumber";
// import { Button } from "primereact/button";
// import { Dialog } from "primereact/dialog";
// import { motion } from "framer-motion";

// const PRIMARY = "#274450";
// const ACCENT = "#71BBB2";

// type RideType = "Single" | "Return";

// export type BookingFormData = {
//     pickup: string;
//     drop: string;
//     datetime: Date | null;
//     rideType: RideType;
//     passengers: number;
//     vehicleType: string;
//     pickupCoords?: google.maps.LatLngLiteral;
//     dropCoords?: google.maps.LatLngLiteral;
// };

// interface BookingFormProps {
//     onConfirm?: (data: BookingFormData) => void;
//     googleMapsApiKey: string;
// }

// export default function BookingForm({ onConfirm, googleMapsApiKey }: BookingFormProps) {
//     const [form, setForm] = useState<BookingFormData>({
//         pickup: "",
//         drop: "",
//         datetime: null,
//         rideType: "Single",
//         passengers: 1,
//         vehicleType: "CNG",
//     });
//     const [showFareDialog, setShowFareDialog] = useState(false);
//     const [fareResult, setFareResult] = useState<{ distanceKm: number; fare: number } | null>(null);
//     const [mapLoaded, setMapLoaded] = useState(false);

//     const pickupRef = useRef<HTMLInputElement>(null);
//     const dropRef = useRef<HTMLInputElement>(null);
//     const mapRef = useRef<HTMLDivElement>(null);
//     const mapInstance = useRef<google.maps.Map | null>(null);
//     const pickupMarker = useRef<google.maps.Marker | null>(null);
//     const dropMarker = useRef<google.maps.Marker | null>(null);

//     const handleInput = (key: keyof BookingFormData, value: any) => {
//         setForm(prev => ({ ...prev, [key]: value }));
//     };

//     const canConfirm = useMemo(() => form.pickup && form.drop && form.datetime, [form]);

//     // Load Google Maps Script
//     useEffect(() => {
//         if (typeof window === "undefined") return;
//         if ((window as any).google) {
//             setMapLoaded(true);
//             return;
//         }
//         const script = document.createElement("script");
//         script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
//         script.async = true;
//         script.onload = () => setMapLoaded(true);
//         document.head.appendChild(script);
//     }, [googleMapsApiKey]);

//     // Initialize Map + Autocomplete
//     useEffect(() => {
//         if (!mapLoaded || !window.google || !mapRef.current) return;

//         const google = window.google;
//         mapInstance.current = new google.maps.Map(mapRef.current, {
//             center: { lat: 23.8103, lng: 90.4125 },
//             zoom: 12,
//             mapTypeControl: false,
//             streetViewControl: false,
//             fullscreenControl: false,
//             styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }],
//         });

//         const bounds = new google.maps.LatLngBounds();

//         const pickupIcon = { url: "https://img.icons8.com/fluency/48/000000/marker.png", scaledSize: new google.maps.Size(36, 36) };
//         const dropIcon = { url: "https://img.icons8.com/fluency/48/000000/marker.png", scaledSize: new google.maps.Size(36, 36) };

//         const updateBounds = () => {
//             const b = new google.maps.LatLngBounds();
//             if (pickupMarker.current) b.extend(pickupMarker.current.getPosition()!);
//             if (dropMarker.current) b.extend(dropMarker.current.getPosition()!);
//             mapInstance.current?.fitBounds(b);
//         };

//         // Pickup Autocomplete
//         if (pickupRef.current) {
//             const pickupAC = new google.maps.places.Autocomplete(pickupRef.current);
//             pickupAC.setFields(["formatted_address", "geometry"]);
//             pickupAC.addListener("place_changed", () => {
//                 const place = pickupAC.getPlace();
//                 if (!place.geometry?.location) return;
//                 const coords = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
//                 handleInput("pickup", place.formatted_address || "");
//                 handleInput("pickupCoords", coords);

//                 if (!pickupMarker.current) {
//                     pickupMarker.current = new google.maps.Marker({ map: mapInstance.current!, position: coords, icon: pickupIcon, title: "Pickup" });
//                 } else pickupMarker.current.setPosition(coords);

//                 updateBounds();
//             });
//         }

//         // Drop Autocomplete
//         if (dropRef.current) {
//             const dropAC = new google.maps.places.Autocomplete(dropRef.current);
//             dropAC.setFields(["formatted_address", "geometry"]);
//             dropAC.addListener("place_changed", () => {
//                 const place = dropAC.getPlace();
//                 if (!place.geometry?.location) return;
//                 const coords = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
//                 handleInput("drop", place.formatted_address || "");
//                 handleInput("dropCoords", coords);

//                 if (!dropMarker.current) {
//                     dropMarker.current = new google.maps.Marker({ map: mapInstance.current!, position: coords, icon: dropIcon, title: "Drop" });
//                 } else dropMarker.current.setPosition(coords);

//                 updateBounds();
//             });
//         }
//     }, [mapLoaded]);

//     const estimateDistanceKm = (a: string, b: string) => {
//         const s = (a + "|" + b).toLowerCase();
//         let hash = 0;
//         for (let i = 0; i < s.length; i++) hash = (hash << 5) - hash + s.charCodeAt(i);
//         hash |= 0;
//         return Math.abs(hash) % 12 + 1;
//     };

//     const calculateFare = () => {
//         const distance = estimateDistanceKm(form.pickup, form.drop);
//         const base = 30;
//         const perKm = 12;
//         const passengerSurcharge = form.passengers > 2 ? (form.passengers - 2) * 8 : 0;
//         const rideTypeMultiplier = form.rideType === "Return" ? 1.8 : 1;
//         const fareRaw = (base + perKm * distance + passengerSurcharge) * rideTypeMultiplier;
//         return { distanceKm: distance, fare: Math.round(fareRaw) };
//     };

//     const onConfirmClick = () => {
//         if (!canConfirm) return;
//         const res = calculateFare();
//         setFareResult(res);
//         setShowFareDialog(true);
//         onConfirm?.(form);
//     };

//     return (
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white border-2 border-[#EFE9D5] rounded-2xl shadow-xl p-4 md:p-8 mx-5 md:mx-10 mb-10">
//             <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center" style={{ color: PRIMARY }}>রাইড বুক করুন</h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
//                 <InputText ref={pickupRef} value={form.pickup} onChange={(e) => handleInput("pickup", e.target.value)} placeholder="Pickup Location" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2" style={{ borderColor: ACCENT }} />
//                 <InputText ref={dropRef} value={form.drop} onChange={(e) => handleInput("drop", e.target.value)} placeholder="Drop Location" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2" style={{ borderColor: ACCENT }} />
//                 <Calendar value={form.datetime} onChange={(e: any) => handleInput("datetime", e.value)} showTime hourFormat="24" placeholder="Select Date & Time" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2" style={{ borderColor: ACCENT }} />
//                 <Dropdown value={form.rideType} options={[{ label: "সিঙ্গেল", value: "Single" }, { label: "রিটার্ন", value: "Return" }]} onChange={(e) => handleInput("rideType", e.value)} className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2" style={{ borderColor: ACCENT }} />
//                 <Dropdown value={form.vehicleType} options={[{ label: "CNG", value: "CNG" }, { label: "Bike", value: "Bike" }, { label: "Car", value: "Car" }]} onChange={(e) => handleInput("vehicleType", e.value)} className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2" style={{ borderColor: ACCENT }} />
//                 <InputNumber value={form.passengers} min={1} max={6} onChange={(e: any) => handleInput("passengers", e.value)} showButtons className="w-full" />
//                 <div className="flex items-end sm:col-span-2">
//                     <Button label="কনফার্ম করুন" onClick={onConfirmClick} className="w-full p-button-lg rounded-md font-bold" style={{ backgroundColor: PRIMARY, color: "white" }} />
//                 </div>
//             </div>

//             {/* Map Preview */}
//             <div className="mt-4 w-full h-60 sm:h-72 md:h-80 rounded-xl overflow-hidden shadow-lg border" style={{ borderColor: ACCENT }}>
//                 <div ref={mapRef} className="w-full h-full" />
//             </div>

//             {/* Fare Dialog */}
//             <Dialog header="ভাড়া অনুমান" visible={showFareDialog} onHide={() => setShowFareDialog(false)} modal className="rounded-xl">
//                 {fareResult && (
//                     <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="space-y-4 text-center">
//                         <div>আনুমানিক দূরত্ব: <strong>{fareResult.distanceKm} কিমি</strong></div>
//                         <div className="text-2xl font-bold" style={{ color: PRIMARY }}>৳ {fareResult.fare}</div>
//                         <Button label="পেমেন্টে যান" style={{ backgroundColor: ACCENT, color: PRIMARY, border: "none" }} className="w-full" />
//                     </motion.div>
//                 )}
//             </Dialog>
//         </motion.div>
//     );
// }


//==================


// import React, { useEffect, useRef, useState } from "react";
// import {
//     MapContainer,
//     TileLayer,
//     Marker,
//     Polyline,
//     useMapEvents,
// } from "react-leaflet";
// import L, { LatLngExpression } from "leaflet";
// import { motion } from "framer-motion";
// import Swal from "sweetalert2";
// import "leaflet/dist/leaflet.css";



// // Leaflet icon fix
// import iconUrl from "leaflet/dist/images/marker-icon.png";
// import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
// import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl,
//     iconUrl,
//     shadowUrl,
// });

// type Place = { label: string; lat: number; lon: number };

// const PRIMARY = "#274450";
// const ACCENT = "#71BBB2";

// // OSRM route helper
// async function fetchRoute(from: Place, to: Place) {
//     try {
//         const url = `https://router.project-osrm.org/route/v1/driving/${from.lon},${from.lat};${to.lon},${to.lat}?overview=full&geometries=geojson`;
//         const res = await fetch(url);
//         const j = await res.json();
//         if (!j || !j.routes || !j.routes.length) return null;
//         const r = j.routes[0];
//         const coords: [number, number][] = r.geometry.coordinates.map(
//             (c: [number, number]) => [c[1], c[0]]
//         ); // [lat, lon]
//         return { distance: r.distance, duration: r.duration, coords };
//     } catch (err) {
//         console.error("Route fetch error:", err);
//         return null;
//     }
// }

// function toKm(meters: number) {
//     return meters / 1000;
// }

// function fareModel(km: number, type: string) {
//     const base = 40;
//     const perKm = type === "Premium" ? 30 : type === "Bike" ? 8 : 18;
//     return Math.round(base + perKm * km);
// }

// export default function BookingForm() {
//     const [step, setStep] = useState<number>(1);

//     const [pickup, setPickup] = useState<Place | null>(null);
//     const [drop, setDrop] = useState<Place | null>(null);

//     const [date, setDate] = useState<string>("");
//     const [time, setTime] = useState<string>("");
//     const [rideType, setRideType] = useState<string>("Economy");
//     const [passengers, setPassengers] = useState<number>(1);
//     const [rideNow, setRideNow] = useState<boolean>(true);

//     const [routeCoords, setRouteCoords] = useState<LatLngExpression[]>([]);
//     const [routeDistanceKm, setRouteDistanceKm] = useState<number | null>(null);
//     const [routeDurationMin, setRouteDurationMin] = useState<number | null>(null);
//     const [fare, setFare] = useState<number | null>(null);

//     const [selectMode, setSelectMode] = useState<"pickup" | "drop">("pickup");

//     const mapRef = useRef<L.Map | null>(null);

//     // Geocode (Nominatim)
//     async function geocode(q: string) {
//         if (!q) return [];
//         const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//             q
//         )}&limit=6`;
//         const res = await fetch(url);
//         const data = await res.json();
//         return data.map((d: any) => ({
//             label: d.display_name,
//             lat: +d.lat,
//             lon: +d.lon,
//         }));
//     }

//     // Compute route
//     useEffect(() => {
//         let active = true;
//         async function compute() {
//             if (!pickup || !drop) {
//                 setRouteCoords([]);
//                 setRouteDistanceKm(null);
//                 setRouteDurationMin(null);
//                 setFare(null);
//                 return;
//             }
//             const r = await fetchRoute(pickup, drop);
//             if (!r || !active) return;
//             setRouteCoords(r.coords as LatLngExpression[]);
//             const km = toKm(r.distance);
//             setRouteDistanceKm(km);
//             setRouteDurationMin(Math.round(r.duration / 60));
//             setFare(fareModel(km, rideType));

//             // fit map bounds
//             try {
//                 const map = mapRef.current;
//                 if (map && r.coords.length > 0) {
//                     const latlngs = r.coords.map((c) => L.latLng(c[0], c[1]));
//                     const bounds = L.latLngBounds(latlngs);
//                     map.fitBounds(bounds, { padding: [40, 40] });
//                 }
//             } catch (e) { }
//         }
//         compute();
//         return () => {
//             active = false;
//         };
//     }, [pickup, drop, rideType]);

//     function swap() {
//         setPickup(drop);
//         setDrop(pickup);
//     }

//     // Map click component
//     function ClickSelector({
//         selectMode,
//         setPickup,
//         setDrop,
//     }: {
//         selectMode: "pickup" | "drop";
//         setPickup: React.Dispatch<React.SetStateAction<Place | null>>;
//         setDrop: React.Dispatch<React.SetStateAction<Place | null>>;
//     }) {
//         useMapEvents({
//             click(e) {
//                 const { lat, lng } = e.latlng;
//                 const p: Place = { label: `${lat.toFixed(5)}, ${lng.toFixed(5)}`, lat, lon: lng };
//                 if (selectMode === "pickup") setPickup(p);
//                 else setDrop(p);
//             },
//         });
//         return null;
//     }

//     // Geocode input
//     function GeocodeInput({
//         placeholder,
//         onSelect,
//     }: {
//         placeholder: string;
//         onSelect: (p: Place) => void;
//     }) {
//         const [query, setQuery] = useState("");
//         const [suggestions, setSuggestions] = useState<Place[]>([]);

//         useEffect(() => {
//             if (!query) return setSuggestions([]);
//             const t = setTimeout(async () => {
//                 const res = await geocode(query);
//                 setSuggestions(res);
//             }, 300);
//             return () => clearTimeout(t);
//         }, [query]);

//         return (
//             <div className="relative">
//                 <input
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     placeholder={placeholder}
//                     className="w-full p-3 rounded-md border"
//                 />
//                 {suggestions.length > 0 && (
//                     <div className="absolute z-30 mt-2 w-full bg-white rounded-md shadow-lg max-h-56 overflow-auto">
//                         {suggestions.map((s, i) => (
//                             <div
//                                 key={i}
//                                 className="p-3 hover:bg-gray-100 cursor-pointer"
//                                 onClick={() => {
//                                     onSelect(s);
//                                     setQuery(s.label);
//                                     setSuggestions([]);
//                                 }}
//                             >
//                                 <div className="text-sm font-medium">{s.label}</div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         );
//     }

//     function handleConfirmProceed() {
//         if (!pickup || !drop) {
//             Swal.fire({ icon: "warning", title: "Pickup / Drop missing" });
//             return;
//         }
//         if (!fare) {
//             Swal.fire({ icon: "info", title: "Calculating..." });
//             return;
//         }
//         Swal.fire({
//             title: "Confirm booking",
//             html: `<b>${fare} ৳</b> • ${rideType} • ${routeDistanceKm?.toFixed(
//                 2
//             )} km • ${routeDurationMin} min`,
//             showCancelButton: true,
//             confirmButtonText: "Confirm & Track",
//             icon: "question",
//         }).then((res) => {
//             if (res.isConfirmed) {
//                 Swal.fire({
//                     icon: "success",
//                     title: "Booked (demo)",
//                     text: "Proceeding to tracking (demo)...",
//                 });
//                 setStep(3);
//             }
//         });
//     }

//     return (
//         <div className="min-h-screen flex flex-col items-center p-4 bg-gradient-to-b from-[#EFE9D5] to-white">
//             <div className="w-full max-w-6xl grid md:grid-cols-2 gap-6">
//                 {/* LEFT: form */}
//                 <div className="flex flex-col gap-4">
//                     <div className="flex items-center justify-between">
//                         <h2 className="text-2xl font-semibold" style={{ color: PRIMARY }}>
//                             Book a ride
//                         </h2>
//                         <div
//                             className="text-sm font-medium px-3 py-1 rounded-full"
//                             style={{ border: `1px solid ${ACCENT}`, color: PRIMARY }}
//                         >
//                             Step {step} / 3
//                         </div>
//                     </div>

//                     {/* Step 1 */}
//                     {step === 1 && (
//                         <motion.div
//                             initial={{ opacity: 0, y: 8 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="bg-white rounded-2xl shadow-lg p-6"
//                         >
//                             <div className="flex items-center justify-between mb-3">
//                                 <div className="flex items-center gap-3">
//                                     <div className="flex gap-2 items-center">
//                                         <button
//                                             onClick={() => setSelectMode("pickup")}
//                                             className={`px-3 py-1 rounded ${selectMode === "pickup" ? "font-semibold" : ""
//                                                 }`}
//                                             style={{ border: `1px solid ${ACCENT}` }}
//                                         >
//                                             Pickup
//                                         </button>
//                                         <button
//                                             onClick={() => setSelectMode("drop")}
//                                             className={`px-3 py-1 rounded ${selectMode === "drop" ? "font-semibold" : ""
//                                                 }`}
//                                             style={{ border: `1px solid ${ACCENT}` }}
//                                         >
//                                             Drop
//                                         </button>
//                                     </div>
//                                 </div>

//                                 <button onClick={swap} className="px-3 py-1 rounded border" style={{ borderColor: ACCENT }}>Swap</button>
//                             </div>

//                             <div className="space-y-3">
//                                 <div>
//                                     <label className="text-sm font-medium">Pickup</label>
//                                     <GeocodeInput placeholder="Search pickup location" onSelect={setPickup} />
//                                     <div className="text-xs mt-1 text-gray-500">
//                                         {pickup ? pickup.label : "Or click on map to set"}
//                                     </div>
//                                 </div>

//                                 <div>
//                                     <label className="text-sm font-medium">Drop</label>
//                                     <GeocodeInput placeholder="Search drop location" onSelect={setDrop} />
//                                     <div className="text-xs mt-1 text-gray-500">
//                                         {drop ? drop.label : "Or click on map to set"}
//                                     </div>
//                                 </div>

//                                 <div className="grid grid-cols-2 gap-2">
//                                     <div>
//                                         <label className="text-sm">Date</label>
//                                         <input
//                                             value={date}
//                                             onChange={(e) => setDate(e.target.value)}
//                                             type="date"
//                                             className="w-full mt-1 p-2 rounded-md border"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="text-sm">Time</label>
//                                         <input
//                                             value={time}
//                                             onChange={(e) => setTime(e.target.value)}
//                                             type="time"
//                                             className="w-full mt-1 p-2 rounded-md border"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center gap-3 mt-2">
//                                     <label className="text-sm">Ride Type</label>
//                                     <select
//                                         value={rideType}
//                                         onChange={(e) => setRideType(e.target.value)}
//                                         className="p-2 rounded-md border ml-2"
//                                     >
//                                         <option>Economy</option>
//                                         <option>Premium</option>
//                                         <option>Bike</option>
//                                     </select>

//                                     <label className="text-sm ml-4">Passengers</label>
//                                     <input
//                                         type="number"
//                                         min={1}
//                                         max={6}
//                                         value={passengers}
//                                         onChange={(e) => setPassengers(Number(e.target.value))}
//                                         className="w-20 p-2 rounded-md border ml-2"
//                                     />

//                                     <div className="ml-4 flex items-center gap-2">
//                                         <label className="text-sm">Ride now</label>
//                                         <input
//                                             type="checkbox"
//                                             checked={rideNow}
//                                             onChange={() => setRideNow(!rideNow)}
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="pt-3 border-t" />

//                                 <div className="flex flex-col md:flex-row items-center justify-between gap-3 mt-3">
//                                     <div className="space-y-1">
//                                         <div className="text-xs text-gray-500">Estimated distance</div>
//                                         <div className="text-lg font-semibold">
//                                             {routeDistanceKm ? `${routeDistanceKm.toFixed(2)} km` : "—"}
//                                         </div>
//                                         <div className="text-xs text-gray-500">Estimated time</div>
//                                         <div className="text-sm">
//                                             {routeDurationMin ? `${routeDurationMin} min` : "—"}
//                                         </div>
//                                     </div>

//                                     <div className="text-right">
//                                         <div className="text-xs text-gray-500">Fare breakdown</div>
//                                         <div className="text-xl font-bold">{fare ? `${fare} ৳` : "—"}</div>
//                                         <div className="text-xs text-gray-500">Base + per-km ({rideType})</div>
//                                     </div>

//                                     <div>
//                                         <button
//                                             onClick={() => {
//                                                 if (!pickup || !drop) {
//                                                     Swal.fire({
//                                                         icon: "warning",
//                                                         title: "Select pickup & drop",
//                                                     });
//                                                     return;
//                                                 }
//                                                 if (!fare) {
//                                                     Swal.fire({
//                                                         icon: "info",
//                                                         title: "Calculating route",
//                                                     });
//                                                     return;
//                                                 }
//                                                 setStep(2);
//                                             }}
//                                             className="px-5 py-2 rounded-lg text-white font-semibold"
//                                             style={{ background: PRIMARY }}
//                                         >
//                                             Continue
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     )}

//                     {/* Step 2 */}
//                     {step === 2 && (
//                         <motion.div
//                             initial={{ opacity: 0, y: 8 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="bg-white rounded-2xl shadow-lg p-6"
//                         >
//                             <h3 className="text-lg font-semibold" style={{ color: PRIMARY }}>
//                                 Ride summary
//                             </h3>
//                             <div className="mt-4 flex justify-between">
//                                 <div>
//                                     <div className="text-xs text-gray-500">Pickup</div>
//                                     <div className="font-medium">{pickup?.label ?? "—"}</div>
//                                 </div>
//                                 <div>
//                                     <div className="text-xs text-gray-500">Drop</div>
//                                     <div className="font-medium">{drop?.label ?? "—"}</div>
//                                 </div>
//                                 <div>
//                                     <div className="text-xs text-gray-500">Distance</div>
//                                     <div className="font-medium">{routeDistanceKm ? `${routeDistanceKm.toFixed(2)} km` : "—"}</div>
//                                 </div>
//                                 <div>
//                                     <div className="text-xs text-gray-500">Duration</div>
//                                     <div className="font-medium">{routeDurationMin ? `${routeDurationMin} min` : "—"}</div>
//                                 </div>
//                             </div>

//                             <div className="mt-4 flex justify-between items-center">
//                                 <div>
//                                     <div className="text-xs text-gray-500">Fare</div>
//                                     <div className="text-2xl font-bold">{fare ? `${fare} ৳` : "—"}</div>
//                                 </div>
//                                 <div className="flex gap-3">
//                                     <button onClick={() => setStep(1)} className="px-4 py-2 rounded-lg border" style={{ borderColor: ACCENT }}>Back</button>
//                                     <button onClick={handleConfirmProceed} className="px-4 py-2 rounded-lg text-white font-semibold" style={{ background: PRIMARY }}>Confirm & Proceed</button>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     )}

//                     {/* Step 3 */}
//                     {step === 3 && (
//                         <motion.div
//                             initial={{ opacity: 0, y: 8 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="bg-white rounded-2xl shadow-lg p-6"
//                         >
//                             <h3 className="text-lg font-semibold" style={{ color: PRIMARY }}>
//                                 Payment / Tracking (Demo)
//                             </h3>
//                             <div className="mt-3">
//                                 <div className="text-xs text-gray-500">Status</div>
//                                 <div className="font-medium text-green-600">
//                                     Driver on the way (demo)
//                                 </div>
//                             </div>

//                             <div className="mt-4">
//                                 <div className="text-xs text-gray-500">Fare</div>
//                                 <div className="text-2xl font-bold">{fare ? `${fare} ৳` : "—"}</div>
//                             </div>

//                             <div className="mt-6 flex gap-3">
//                                 <button onClick={() => setStep(2)} className="px-4 py-2 rounded-lg border" style={{ borderColor: ACCENT }}>Back</button>
//                                 <button
//                                     onClick={() => {
//                                         Swal.fire({ icon: "success", title: "Payment done (demo)" });
//                                         setStep(1);
//                                         setPickup(null);
//                                         setDrop(null);
//                                         setRouteCoords([]);
//                                         setFare(null);
//                                     }}
//                                     className="px-4 py-2 rounded-lg text-white font-semibold"
//                                     style={{ background: PRIMARY }}
//                                 >
//                                     Complete Payment
//                                 </button>
//                             </div>
//                         </motion.div>
//                     )}
//                 </div>

//                 {/* RIGHT: map */}
//                 <div className="h-[520px] rounded-2xl overflow-hidden shadow-lg">
//                     <MapContainer
//                         center={[23.8103, 90.4125]}
//                         zoom={13}
//                         style={{ height: "100%", width: "100%" }}
//                         whenCreated={(map) => (mapRef.current = map)}
//                     >
//                         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                         <ClickSelector
//                             selectMode={selectMode}
//                             setPickup={setPickup}
//                             setDrop={setDrop}
//                         />
//                         {pickup && <Marker position={[pickup.lat, pickup.lon]} />}
//                         {drop && <Marker position={[drop.lat, drop.lon]} />}
//                         {routeCoords.length > 0 && (
//                             <Polyline positions={routeCoords} color={ACCENT} weight={4} />
//                         )}
//                     </MapContainer>
//                 </div>



//             </div>
//         </div>
//     );
// }


//==================================

// 'use client';
// import React, { useEffect, useRef, useState } from "react";
// import {
//     MapContainer,
//     TileLayer,
//     Marker,
//     Polyline,
//     useMapEvents,
// } from "react-leaflet";
// import L, { LatLngExpression } from "leaflet";
// import { motion } from "framer-motion";
// import Swal from "sweetalert2";
// import "leaflet/dist/leaflet.css";

// // Custom icons
// const pickupIcon = new L.Icon({
//     iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
//     iconSize: [38, 38],
// });
// const dropIcon = new L.Icon({
//     iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
//     iconSize: [38, 38],
//     className: "drop-icon",
// });

// type Place = { label: string; lat: number; lon: number };

// const PRIMARY = "#274450";
// const ACCENT = "#71BBB2";

// // 🧭 Fetch Route from OSRM
// async function fetchRoute(from: Place, to: Place) {
//     try {
//         const url = `https://router.project-osrm.org/route/v1/driving/${from.lon},${from.lat};${to.lon},${to.lat}?overview=full&geometries=geojson`;
//         const res = await fetch(url);
//         const j = await res.json();
//         if (!j?.routes?.length) return null;
//         const r = j.routes[0];
//         const coords: [number, number][] = r.geometry.coordinates.map(
//             (c: [number, number]) => [c[1], c[0]]
//         ); // [lat, lon]
//         return { distance: r.distance, duration: r.duration, coords };
//     } catch (err) {
//         console.error("Route fetch error:", err);
//         return null;
//     }
// }

// function toKm(meters: number) {
//     return meters / 1000;
// }

// function fareModel(km: number, type: string) {
//     const base = 40;
//     const perKm = type === "Premium" ? 30 : type === "Bike" ? 8 : 18;
//     return Math.round(base + perKm * km);
// }

// export default function BookingForm() {
//     const [step, setStep] = useState<number>(1);
//     const [pickup, setPickup] = useState<Place | null>(null);
//     const [drop, setDrop] = useState<Place | null>(null);
//     const [rideType, setRideType] = useState<string>("Economy");

//     const [routeCoords, setRouteCoords] = useState<LatLngExpression[]>([]);
//     const [routeDistanceKm, setRouteDistanceKm] = useState<number | null>(null);
//     const [routeDurationMin, setRouteDurationMin] = useState<number | null>(null);
//     const [fare, setFare] = useState<number | null>(null);
//     const [selectMode, setSelectMode] = useState<"pickup" | "drop">("pickup");

//     const mapRef = useRef<L.Map | null>(null);

//     // 🗺️ Compute route
//     useEffect(() => {
//         let active = true;
//         async function compute() {
//             if (!pickup || !drop) {
//                 setRouteCoords([]);
//                 setRouteDistanceKm(null);
//                 setRouteDurationMin(null);
//                 setFare(null);
//                 return;
//             }
//             const r = await fetchRoute(pickup, drop);
//             if (!r || !active) return;
//             setRouteCoords(r.coords as LatLngExpression[]);
//             const km = toKm(r.distance);
//             setRouteDistanceKm(km);
//             setRouteDurationMin(Math.round(r.duration / 60));
//             setFare(fareModel(km, rideType));

//             const map = mapRef.current;
//             if (map && r.coords.length > 0) {
//                 const latlngs = r.coords.map((c) => L.latLng(c[0], c[1]));
//                 const bounds = L.latLngBounds(latlngs);
//                 map.fitBounds(bounds, { padding: [40, 40] });
//             }
//         }
//         compute();
//         return () => {
//             active = false;
//         };
//     }, [pickup, drop, rideType]);

//     // 🖱️ Map click to select pickup/drop
//     function ClickSelector({
//         selectMode,
//         setPickup,
//         setDrop,
//     }: {
//         selectMode: "pickup" | "drop";
//         setPickup: React.Dispatch<React.SetStateAction<Place | null>>;
//         setDrop: React.Dispatch<React.SetStateAction<Place | null>>;
//     }) {
//         useMapEvents({
//             click(e) {
//                 const { lat, lng } = e.latlng;
//                 const p: Place = {
//                     label: `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
//                     lat,
//                     lon: lng,
//                 };
//                 if (selectMode === "pickup") setPickup(p);
//                 else setDrop(p);
//             },
//         });
//         return null;
//     }

//     // 🚀 Confirm booking
//     function handleConfirmProceed() {
//         if (!pickup || !drop) {
//             Swal.fire({ icon: "warning", title: "Pickup / Drop missing" });
//             return;
//         }
//         if (!fare) {
//             Swal.fire({ icon: "info", title: "Calculating..." });
//             return;
//         }
//         Swal.fire({
//             title: "Confirm booking",
//             html: `<b>${fare} ৳</b> • ${rideType} • ${routeDistanceKm?.toFixed(
//                 2
//             )} km • ${routeDurationMin} min`,
//             showCancelButton: true,
//             confirmButtonText: "Confirm & Track",
//             icon: "question",
//         }).then((res) => {
//             if (res.isConfirmed) {
//                 Swal.fire({
//                     icon: "success",
//                     title: "Booked (demo)",
//                     text: "Proceeding to tracking (demo)...",
//                 });
//                 setStep(3);
//             }
//         });
//     }

//     return (
//         <div className="min-h-screen flex flex-col items-center p-4 bg-gradient-to-b from-[#EFE9D5] to-white">
//             <div className="w-full max-w-6xl grid md:grid-cols-2 gap-6 relative z-0">
//                 {/* LEFT */}
//                 <div className="flex flex-col gap-4 z-10">
//                     <h2 className="text-2xl font-semibold text-[#274450]">Book a Ride</h2>

//                     {/* Step 1 */}
//                     {step === 1 && (
//                         <motion.div
//                             initial={{ opacity: 0, y: 8 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="bg-white rounded-2xl shadow-lg p-6"
//                         >
//                             <div className="flex justify-between mb-4">
//                                 <div className="flex gap-2">
//                                     <button
//                                         onClick={() => setSelectMode("pickup")}
//                                         className={`px-3 py-1 rounded border ${selectMode === "pickup"
//                                             ? "bg-[#71BBB2] text-white"
//                                             : "border-[#71BBB2]"
//                                             }`}
//                                     >
//                                         Pickup
//                                     </button>
//                                     <button
//                                         onClick={() => setSelectMode("drop")}
//                                         className={`px-3 py-1 rounded border ${selectMode === "drop"
//                                             ? "bg-[#71BBB2] text-white"
//                                             : "border-[#71BBB2]"
//                                             }`}
//                                     >
//                                         Drop
//                                     </button>
//                                 </div>
//                             </div>

//                             <div className="text-sm text-gray-600 mb-2">
//                                 Click on the map to set pickup/drop points.
//                             </div>

//                             <div className="space-y-3">
//                                 <div>
//                                     <div className="text-sm text-gray-500">Pickup:</div>
//                                     <div className="text-base font-medium">
//                                         {pickup?.label ?? "—"}
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <div className="text-sm text-gray-500">Drop:</div>
//                                     <div className="text-base font-medium">{drop?.label ?? "—"}</div>
//                                 </div>
//                             </div>

//                             <div className="mt-4">
//                                 <div className="text-sm text-gray-500">Ride Type</div>
//                                 <select
//                                     value={rideType}
//                                     onChange={(e) => setRideType(e.target.value)}
//                                     className="p-2 rounded-md border w-full"
//                                 >
//                                     <option>Economy</option>
//                                     <option>Premium</option>
//                                     <option>Bike</option>
//                                 </select>
//                             </div>

//                             <div className="mt-5 flex justify-between items-center">
//                                 <div>
//                                     <div className="text-xs text-gray-500">Distance</div>
//                                     <div className="font-semibold">
//                                         {routeDistanceKm ? `${routeDistanceKm.toFixed(2)} km` : "—"}
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <div className="text-xs text-gray-500">Fare</div>
//                                     <div className="font-bold text-lg text-[#274450]">
//                                         {fare ? `${fare} ৳` : "—"}
//                                     </div>
//                                 </div>
//                                 <button
//                                     onClick={handleConfirmProceed}
//                                     className="px-4 py-2 bg-[#274450] text-white rounded-lg font-semibold"
//                                 >
//                                     Continue
//                                 </button>
//                             </div>
//                         </motion.div>
//                     )}

//                     {/* Step 3: Tracking demo */}
//                     {step === 3 && (
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             className="bg-white rounded-2xl shadow-lg p-6"
//                         >
//                             <h3 className="text-lg font-semibold text-[#274450] mb-2">
//                                 Tracking (Demo)
//                             </h3>
//                             <p className="text-sm text-green-600 mb-3">
//                                 🚗 Driver is on the way...
//                             </p>
//                             <button
//                                 onClick={() => setStep(1)}
//                                 className="px-4 py-2 bg-[#71BBB2] text-white rounded-lg"
//                             >
//                                 Finish
//                             </button>
//                         </motion.div>
//                     )}
//                 </div>

//                 {/* RIGHT: Map */}
//                 <div
//                     className="h-[520px] rounded-2xl overflow-hidden shadow-lg relative z-0"
//                     style={{ zIndex: 0 }}
//                 >
//                     <MapContainer
//                         center={[23.8103, 90.4125]}
//                         zoom={13}
//                         scrollWheelZoom={true}
//                         style={{ height: "100%", width: "100%", zIndex: 0 }}
//                         whenCreated={(map) => (mapRef.current = map)}
//                     >
//                         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                         <ClickSelector
//                             selectMode={selectMode}
//                             setPickup={setPickup}
//                             setDrop={setDrop}
//                         />
//                         {pickup && <Marker position={[pickup.lat, pickup.lon]} icon={pickupIcon} />}
//                         {drop && <Marker position={[drop.lat, drop.lon]} icon={dropIcon} />}
//                         {routeCoords.length > 0 && (
//                             <Polyline
//                                 positions={routeCoords}
//                                 color={ACCENT}
//                                 weight={5}
//                                 opacity={0.8}
//                             />
//                         )}
//                     </MapContainer>
//                 </div>
//             </div>
//         </div>
//     );
// }

//========================

'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
    MapContainer,
    TileLayer,
    Marker,
    Polyline,
    useMapEvents,
} from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

// --- Custom small helper types
type Place = { label: string; lat: number; lon: number };

const PRIMARY = '#274450';
const ACCENT = '#71BBB2';

// Custom icons (you can replace URLs with local / bundled images)
const pickupIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
});
const dropIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
});

// fetch route from OSRM public server
async function fetchRoute(from: Place, to: Place) {
    try {
        const url = `https://router.project-osrm.org/route/v1/driving/${from.lon},${from.lat};${to.lon},${to.lat}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        const j = await res.json();
        if (!j?.routes?.length) return null;
        const r = j.routes[0];
        const coords: [number, number][] = r.geometry.coordinates.map((c: [number, number]) => [c[1], c[0]]);
        return { distance: r.distance, duration: r.duration, coords };
    } catch (err) {
        console.error('Route fetch error:', err);
        return null;
    }
}

function toKm(meters: number) {
    return meters / 1000;
}

function fareModel(km: number, type: string) {
    const base = 40;
    const perKm = type === 'Premium' ? 30 : type === 'Bike' ? 8 : 18;
    return Math.round(base + perKm * km);
}

// --- Map click selector component
function ClickSelector({ selectMode, setPickup, setDrop }: { selectMode: 'pickup' | 'drop'; setPickup: React.Dispatch<React.SetStateAction<Place | null>>; setDrop: React.Dispatch<React.SetStateAction<Place | null>>; }) {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            const p: Place = { label: `${lat.toFixed(5)}, ${lng.toFixed(5)}`, lat, lon: lng };
            if (selectMode === 'pickup') setPickup(p);
            else setDrop(p);
        },
    });
    return null;
}

export default function BookingMapWithSearch() {
    const [step, setStep] = useState<number>(1);
    const [pickup, setPickup] = useState<Place | null>(null);
    const [drop, setDrop] = useState<Place | null>(null);
    const [rideType, setRideType] = useState<string>('Economy');

    const [routeCoords, setRouteCoords] = useState<LatLngExpression[]>([]);
    const [routeDistanceKm, setRouteDistanceKm] = useState<number | null>(null);
    const [routeDurationMin, setRouteDurationMin] = useState<number | null>(null);
    const [fare, setFare] = useState<number | null>(null);
    const [selectMode, setSelectMode] = useState<'pickup' | 'drop'>('pickup');

    const [query, setQuery] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Place[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

    const mapRef = useRef<L.Map | null>(null);
    const debounceRef = useRef<number | null>(null);

    // compute route whenever pickup / drop / rideType changes
    useEffect(() => {
        let active = true;
        async function compute() {
            if (!pickup || !drop) {
                setRouteCoords([]);
                setRouteDistanceKm(null);
                setRouteDurationMin(null);
                setFare(null);
                return;
            }
            const r = await fetchRoute(pickup, drop);
            if (!r || !active) return;
            setRouteCoords(r.coords as LatLngExpression[]);
            const km = toKm(r.distance);
            setRouteDistanceKm(km);
            setRouteDurationMin(Math.round(r.duration / 60));
            setFare(fareModel(km, rideType));

            const map = mapRef.current;
            if (map && r.coords.length > 0) {
                const latlngs = r.coords.map((c) => L.latLng(c[0], c[1]));
                const bounds = L.latLngBounds(latlngs);
                map.fitBounds(bounds, { padding: [40, 40] });
            }
        }
        compute();
        return () => { active = false; };
    }, [pickup, drop, rideType]);

    // --- Nominatim search (OpenStreetMap) with debounce
    useEffect(() => {
        if (debounceRef.current) window.clearTimeout(debounceRef.current);
        if (!query || query.trim().length < 2) {
            setSuggestions([]);
            return;
        }
        debounceRef.current = window.setTimeout(async () => {
            try {
                // Nominatim public search endpoint
                const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=6&q=${encodeURIComponent(query)}`;
                const res = await fetch(url, {
                    headers: { 'Accept-Language': 'en' },
                });
                const j = await res.json();
                const places: Place[] = (j || []).map((p: any) => ({ label: p.display_name, lat: parseFloat(p.lat), lon: parseFloat(p.lon) }));
                setSuggestions(places);
                setShowSuggestions(true);
            } catch (err) {
                console.error('Search error', err);
            }
        }, 350);

        return () => {
            if (debounceRef.current) window.clearTimeout(debounceRef.current);
        };
    }, [query]);

    // when user selects suggestion -> set pickup or drop + center map
    function handleSelectSuggestion(p: Place) {
        if (selectMode === 'pickup') setPickup(p);
        else setDrop(p);
        setQuery('');
        setSuggestions([]);
        setShowSuggestions(false);

        // center map to selected point
        const map = mapRef.current;
        if (map) {
            map.setView([p.lat, p.lon], 14, { animate: true });
        }
    }

    // Confirm booking
    function handleConfirmProceed() {
        if (!pickup || !drop) {
            Swal.fire({ icon: 'warning', title: 'Pickup / Drop missing' });
            return;
        }
        if (!fare) {
            Swal.fire({ icon: 'info', title: 'Calculating...' });
            return;
        }
        Swal.fire({
            title: 'Confirm booking',
            html: `<b>${fare} ৳</b> • ${rideType} • ${routeDistanceKm?.toFixed(2)} km • ${routeDurationMin} min`,
            showCancelButton: true,
            confirmButtonText: 'Confirm & Track',
            icon: 'question',
        }).then((res) => {
            if (res.isConfirmed) {
                Swal.fire({ icon: 'success', title: 'Booked (demo)', text: 'Proceeding to tracking (demo)...' });
                setStep(3);
            }
        });
    }

    // small helper to clear route & markers
    function resetAll() {
        setPickup(null);
        setDrop(null);
        setRouteCoords([]);
        setRouteDistanceKm(null);
        setRouteDurationMin(null);
        setFare(null);
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-4 bg-gradient-to-b from-[#EFE9D5] to-white">
            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-6">
                {/* LEFT: Booking Form */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold text-[#274450]">Book a Ride</h2>

                    {step === 1 && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg p-6">

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                                <div className="flex gap-2">
                                    <button onClick={() => setSelectMode('pickup')} className={`px-3 py-1 rounded border ${selectMode === 'pickup' ? 'bg-[#71BBB2] text-white' : 'border-[#71BBB2]'}`}>
                                        Pickup
                                    </button>
                                    <button onClick={() => setSelectMode('drop')} className={`px-3 py-1 rounded border ${selectMode === 'drop' ? 'bg-[#71BBB2] text-white' : 'border-[#71BBB2]'}`}>
                                        Drop
                                    </button>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="text-sm text-gray-600">Ride Type</div>
                                    <select value={rideType} onChange={(e) => setRideType(e.target.value)} className="p-2 rounded-md border">
                                        <option>Economy</option>
                                        <option>Premium</option>
                                        <option>Bike</option>
                                    </select>
                                </div>
                            </div>

                            {/* Search input */}
                            <div className="relative">
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onFocus={() => setShowSuggestions(true)}
                                    placeholder={`Search ${selectMode === 'pickup' ? 'pickup' : 'drop'} location (e.g. Gulshan, Dhanmondi)`}
                                    className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#71BBB2]"
                                />

                                {showSuggestions && suggestions.length > 0 && (
                                    <ul className="absolute z-30 mt-1 left-0 right-0 bg-white border rounded-lg shadow max-h-56 overflow-auto">
                                        {suggestions.map((s, idx) => (
                                            <li key={idx} onClick={() => handleSelectSuggestion(s)} className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                                                <div className="text-sm font-medium text-gray-700">{s.label}</div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-3 rounded">
                                    <div className="text-xs text-gray-500">Pickup</div>
                                    <div className="text-sm font-medium">{pickup?.label ?? '—'}</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded">
                                    <div className="text-xs text-gray-500">Drop</div>
                                    <div className="text-sm font-medium">{drop?.label ?? '—'}</div>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div className="flex gap-6">
                                    <div>
                                        <div className="text-xs text-gray-500">Distance</div>
                                        <div className="font-semibold">{routeDistanceKm ? `${routeDistanceKm.toFixed(2)} km` : '—'}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500">Duration</div>
                                        <div className="font-semibold">{routeDurationMin ? `${routeDurationMin} min` : '—'}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div>
                                        <div className="text-xs text-gray-500">Fare</div>
                                        <div className="font-bold text-lg text-[#274450]">{fare ? `${fare} ৳` : '—'}</div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button onClick={resetAll} className="px-3 py-2 rounded-lg border">Reset</button>
                                        <button onClick={handleConfirmProceed} className="px-4 py-2 bg-[#274450] text-white rounded-lg font-semibold">Continue</button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-[#274450] mb-2">Tracking (Demo)</h3>
                            <p className="text-sm text-green-600 mb-3">🚗 Driver is on the way...</p>
                            <button onClick={() => setStep(1)} className="px-4 py-2 bg-[#71BBB2] text-white rounded-lg">Finish</button>
                        </motion.div>
                    )}
                </div>

                {/* RIGHT: Map */}
                <div className="h-[520px] rounded-2xl overflow-hidden shadow-lg">
                    <MapContainer center={[23.8103, 90.4125]} zoom={13} scrollWheelZoom style={{ height: '100%', width: '100%' }} whenCreated={(map) => (mapRef.current = map)}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <ClickSelector selectMode={selectMode} setPickup={setPickup} setDrop={setDrop} />

                        {pickup && <Marker position={[pickup.lat, pickup.lon]} icon={pickupIcon} />}
                        {drop && <Marker position={[drop.lat, drop.lon]} icon={dropIcon} />}

                        {routeCoords.length > 0 && (
                            <Polyline positions={routeCoords} color={ACCENT} weight={5} opacity={0.9} />
                        )}
                    </MapContainer>
                </div>
            </div>

            {/* small footer info */}
            <div className="w-full max-w-6xl mt-4 text-xs text-gray-500">Tip: Click on the map to set pickup/drop OR search above. Works on desktop, tablet and mobile.</div>
        </div>
    );
}
