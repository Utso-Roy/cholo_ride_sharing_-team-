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
                <div className="h-[400px] z-0 rounded-2xl overflow-hidden shadow-lg">
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
