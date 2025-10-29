
// 'use client';
// import React, { useEffect, useRef, useState } from 'react';
// import {
//     MapContainer,
//     TileLayer,
//     Marker,
//     Polyline,
//     useMapEvents,
// } from 'react-leaflet';
// import L, { LatLngExpression } from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { motion } from 'framer-motion';
// import Swal from 'sweetalert2';

// // Types
// type Place = { label: string; lat: number; lon: number };
// type Rider = { id: string; name: string; location: Place };
// type RideRequest = {
//     id: string;
//     pickup: Place;
//     drop: Place;
//     rideType: string;
//     distance: number;
//     fare: number;
//     status: 'pending' | 'confirmed' | 'completed' | 'canceled';
//     rider?: Rider;
// };

// // Colors
// const PRIMARY = '#274450';
// const ACCENT = '#71BBB2';

// // Icons
// const pickupIcon = new L.Icon({
//     iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
//     iconSize: [36, 36],
//     iconAnchor: [18, 36],
// });
// const dropIcon = new L.Icon({
//     iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
//     iconSize: [36, 36],
//     iconAnchor: [18, 36],
// });

// // OSRM Route Fetch
// async function fetchRoute(from: Place, to: Place) {
//     try {
//         const url = `https://router.project-osrm.org/route/v1/driving/${from.lon},${from.lat};${to.lon},${to.lat}?overview=full&geometries=geojson`;
//         const res = await fetch(url);
//         const j = await res.json();
//         if (!j?.routes?.length) return null;
//         const r = j.routes[0];
//         const coords: [number, number][] = r.geometry.coordinates.map(
//             (c: [number, number]) => [c[1], c[0]]
//         );
//         return { distance: r.distance, duration: r.duration, coords };
//     } catch (err) {
//         console.error('Route fetch error:', err);
//         return null;
//     }
// }

// // Helpers
// function toKm(meters: number) { return meters / 1000; }
// function fareModel(km: number, type: string) {
//     const base = 40;
//     const perKm = type === 'Premium' ? 30 : type === 'Bike' ? 8 : 18;
//     return Math.round(base + perKm * km);
// }

// // Map Click Selector
// function ClickSelector({
//     selectMode,
//     setPickup,
//     setDrop,
// }: {
//     selectMode: 'pickup' | 'drop';
//     setPickup: React.Dispatch<React.SetStateAction<Place | null>>;
//     setDrop: React.Dispatch<React.SetStateAction<Place | null>>;
// }) {
//     useMapEvents({
//         click(e) {
//             const { lat, lng } = e.latlng;
//             const p: Place = {
//                 label: `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
//                 lat,
//                 lon: lng,
//             };
//             selectMode === 'pickup' ? setPickup(p) : setDrop(p);
//         },
//     });
//     return null;
// }

// // ---------------- Main Component ----------------
// export default function BookingForm() {
//     // Step control
//     const [step, setStep] = useState<number>(1);

//     // Pickup / Drop / Ride Type
//     const [pickup, setPickup] = useState<Place | null>(null);
//     const [drop, setDrop] = useState<Place | null>(null);
//     const [rideType, setRideType] = useState<string>('Economy');

//     // Route info
//     const [routeCoords, setRouteCoords] = useState<LatLngExpression[]>([]);
//     const [routeDistanceKm, setRouteDistanceKm] = useState<number | null>(null);
//     const [routeDurationMin, setRouteDurationMin] = useState<number | null>(null);
//     const [fare, setFare] = useState<number | null>(null);

//     // Map & Suggestions
//     const [selectMode, setSelectMode] = useState<'pickup' | 'drop'>('pickup');
//     const [query, setQuery] = useState<string>('');
//     const [suggestions, setSuggestions] = useState<Place[]>([]);
//     const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
//     const mapRef = useRef<L.Map | null>(null);
//     const debounceRef = useRef<number | null>(null);

//     // Available Riders
//     const [availableRiders, setAvailableRiders] = useState<Rider[]>([]);
//     const [selectedRider, setSelectedRider] = useState<Rider | null>(null);

//     // User Ride Requests (Dashboard)
//     const [rideRequests, setRideRequests] = useState<RideRequest[]>([]);

//     // ------------------ Effects -------------------
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
//         return () => { active = false; };
//     }, [pickup, drop, rideType]);

//     // ------------------ Search -------------------
//     useEffect(() => {
//         if (debounceRef.current) window.clearTimeout(debounceRef.current);
//         if (!query || query.trim().length < 2) {
//             setSuggestions([]);
//             return;
//         }
//         debounceRef.current = window.setTimeout(async () => {
//             try {
//                 const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=6&q=${encodeURIComponent(query)}`;
//                 const res = await fetch(url);
//                 const j = await res.json();
//                 const places: Place[] = (j || []).map((p: any) => ({
//                     label: p.display_name,
//                     lat: parseFloat(p.lat),
//                     lon: parseFloat(p.lon),
//                 }));
//                 setSuggestions(places);
//                 setShowSuggestions(true);
//             } catch (err) { console.error(err); }
//         }, 350);
//         return () => { if (debounceRef.current) window.clearTimeout(debounceRef.current); };
//     }, [query]);

//     // ------------------ Handlers -------------------
//     function handleSelectSuggestion(p: Place) {
//         selectMode === 'pickup' ? setPickup(p) : setDrop(p);
//         setQuery('');
//         setSuggestions([]);
//         setShowSuggestions(false);
//         const map = mapRef.current;
//         if (map) map.setView([p.lat, p.lon], 14, { animate: true });
//     }

//     function handleNextStep() {
//         if (step === 1 && (!pickup || !drop)) {
//             Swal.fire({ icon: 'warning', title: 'Pickup & Drop required' });
//             return;
//         }
//         if (step === 2 && !rideType) {
//             Swal.fire({ icon: 'warning', title: 'Select Ride Type' });
//             return;
//         }
//         if (step === 3 && pickup && drop) {
//             // Step 4: load nearby riders (dummy)
//             const riders: Rider[] = [
//                 { id: '1', name: 'Rider A', location: { label: 'Nearby 1', lat: pickup.lat + 0.005, lon: pickup.lon + 0.005 } },
//                 { id: '2', name: 'Rider B', location: { label: 'Nearby 2', lat: pickup.lat - 0.005, lon: pickup.lon - 0.005 } },
//             ];
//             setAvailableRiders(riders);
//         }
//         setStep(step + 1);
//     }

//     function handleSelectRider(r: Rider) { setSelectedRider(r); }

//     function handleConfirmRide() {
//         if (!selectedRider || !pickup || !drop || !fare) {
//             Swal.fire({ icon: 'warning', title: 'Select rider & ensure route info' });
//             return;
//         }
//         // Add ride request to dashboard (Demo)
//         const newRide: RideRequest = {
//             id: Date.now().toString(),
//             pickup,
//             drop,
//             rideType,
//             distance: routeDistanceKm ?? 0,
//             fare,
//             status: 'confirmed',
//             rider: selectedRider,
//         };
//         setRideRequests([newRide, ...rideRequests]);
//         Swal.fire({ icon: 'success', title: 'Ride Confirmed!', text: `Driver: ${selectedRider.name}` });
//         setStep(6); // Ride confirmed, tracking demo
//     }

//     function handleEndRide(id: string) {
//         setRideRequests(rideRequests.map(r => r.id === id ? { ...r, status: 'completed' } : r));
//     }

//     function handleCancelRide(id: string) {
//         setRideRequests(rideRequests.map(r => r.id === id ? { ...r, status: 'canceled' } : r));
//     }

//     function resetAll() {
//         setPickup(null); setDrop(null); setRouteCoords([]);
//         setRouteDistanceKm(null); setRouteDurationMin(null); setFare(null);
//         setAvailableRiders([]); setSelectedRider(null); setStep(1);
//     }

//     // ------------------ JSX -------------------
//     return (
//         <div className="min-h-screen flex flex-col items-center p-4 bg-gradient-to-b from-white to-[#e6fcf9] mt-14">
//             <div className="w-full max-w-6xl grid md:grid-cols-2 gap-6">

//                 {/* LEFT PANEL: Ride Booking Steps */}
//                 <div className="flex flex-col gap-4">
//                     <h2 className="text-2xl font-semibold text-[#274450]">Book a Ride</h2>

//                     {/* Step 1-3 */}
//                     {step <= 3 && (
//                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-6">
//                             {/* Pickup / Drop buttons */}
//                             <div className="flex gap-2 mb-3">
//                                 <button onClick={() => setSelectMode('pickup')} className={`px-3 py-1 rounded border ${selectMode === 'pickup' ? 'bg-[#71BBB2] text-white' : 'border-[#71BBB2]'}`}>Pickup</button>
//                                 <button onClick={() => setSelectMode('drop')} className={`px-3 py-1 rounded border ${selectMode === 'drop' ? 'bg-[#71BBB2] text-white' : 'border-[#71BBB2]'}`}>Drop</button>
//                             </div>

//                             {/* Search input */}
//                             <input value={query} onChange={e => setQuery(e.target.value)} placeholder={`Search ${selectMode}`} className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#71BBB2]" />
//                             {showSuggestions && suggestions.length > 0 && (
//                                 <ul className="absolute z-30 mt-1 left-0 right-0 bg-white border rounded-lg shadow max-h-56 overflow-auto">
//                                     {suggestions.map((s, idx) => (
//                                         <li key={idx} onClick={() => handleSelectSuggestion(s)} className="px-3 py-2 hover:bg-gray-100 cursor-pointer">{s.label}</li>
//                                     ))}
//                                 </ul>
//                             )}

//                             {/* Ride Type */}
//                             {step === 2 && (
//                                 <select value={rideType} onChange={(e) => setRideType(e.target.value)} className="mt-3 p-2 rounded-md border">
//                                     <option>Economy</option><option>Premium</option><option>Bike</option><option>CNG</option>
//                                 </select>
//                             )}

//                             {/* Distance & Fare */}
//                             <div className="mt-4 flex justify-between">
//                                 <div>Distance: {routeDistanceKm?.toFixed(2) ?? '—'} km</div>
//                                 <div>Fare: {fare ?? '—'} ৳</div>
//                             </div>

//                             <button onClick={handleNextStep} className="mt-4 px-4 py-2 bg-[#274450] text-white rounded-lg">Next</button>
//                         </motion.div>
//                     )}

//                     {/* Step 4-5: Available Riders */}
//                     {step === 4 && (
//                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-6">
//                             <h3 className="text-lg font-semibold mb-3">Available Riders Nearby</h3>
//                             {availableRiders.map(r => (
//                                 <div key={r.id} className={`p-2 border rounded mb-2 cursor-pointer ${selectedRider?.id === r.id ? 'bg-[#71BBB2] text-white' : ''}`} onClick={() => handleSelectRider(r)}>
//                                     {r.name} - {r.location.label}
//                                 </div>
//                             ))}
//                             <button onClick={handleConfirmRide} className="mt-3 px-4 py-2 bg-[#274450] text-white rounded-lg">Confirm Ride</button>
//                         </motion.div>
//                     )}

//                     {/* Step 6-9: Tracking & End Ride */}
//                     {step >= 6 && (
//                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-6">
//                             <h3 className="text-lg font-semibold mb-2">Ride Tracking (Demo)</h3>
//                             <p className="text-sm text-green-600">Driver is on the way...</p>
//                             {rideRequests.map(r => r.status === 'confirmed' && (
//                                 <div key={r.id} className="mt-2 flex justify-between items-center p-2 border rounded">
//                                     <div>{r.rider?.name} • {r.rideType} • {r.fare} ৳</div>
//                                     <button onClick={() => handleEndRide(r.id)} className="px-3 py-1 bg-[#71BBB2] text-white rounded">End Ride</button>
//                                 </div>
//                             ))}
//                             <button onClick={resetAll} className="mt-3 px-4 py-2 bg-[#274450] text-white rounded-lg">Finish</button>
//                         </motion.div>
//                     )}
//                 </div>

//                 {/* RIGHT PANEL: Map */}
//                 <div className="h-[300px] z-0 rounded-2xl overflow-hidden shadow-lg">
//                     <MapContainer center={[23.8103, 90.4125]} zoom={13} scrollWheelZoom style={{ height: '100%', width: '100%' }} whenCreated={map => mapRef.current = map}>
//                         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                         <ClickSelector selectMode={selectMode} setPickup={setPickup} setDrop={setDrop} />
//                         {pickup && <Marker position={[pickup.lat, pickup.lon]} icon={pickupIcon} />}
//                         {drop && <Marker position={[drop.lat, drop.lon]} icon={dropIcon} />}
//                         {routeCoords.length > 0 && <Polyline positions={routeCoords} color={ACCENT} weight={5} />}
//                         {availableRiders.map(r => <Marker key={r.id} position={[r.location.lat, r.location.lon]} />)}
//                     </MapContainer>
//                 </div>
//             </div>

//             {/* Dashboard: My Rides */}
//             <div className="w-full max-w-6xl mt-6">
//                 <h3 className="text-xl font-semibold mb-2">My Ride Requests</h3>
//                 <div className="flex flex-col gap-2">
//                     {rideRequests.map(r => (
//                         <div key={r.id} className="p-3 border rounded flex justify-between items-center">
//                             <div>
//                                 {r.pickup.label} → {r.drop.label} | {r.rideType} | {r.fare} ৳ | <span className="capitalize">{r.status}</span>
//                             </div>
//                             {r.status === 'pending' && <button onClick={() => handleCancelRide(r.id)} className="px-3 py-1 bg-red-500 text-white rounded">Cancel</button>}
//                         </div>
//                     ))}
//                     {rideRequests.length === 0 && <div className="text-gray-500">No rides yet.</div>}
//                 </div>
//             </div>
//         </div>
//     );
// }



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

// ------------------ Types ------------------
type Place = { label: string; lat: number; lon: number };
type Rider = { id: string; name: string; location: Place; rideType?: string };
type RideStatus = 'pending' | 'confirmed' | 'inprogress' | 'completed' | 'canceled';
type RideRequest = {
    id: string;
    pickup: Place;
    drop: Place;
    rideType: string;
    distance: number;
    fare: number;
    status: RideStatus;
    rider?: Rider;
};

// ------------------ Constants ------------------
const PRIMARY = '#274450';
const ACCENT = '#71BBB2';

// Icons
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
const riderIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

// ------------------ Helpers ------------------
async function fetchRoute(from: Place, to: Place) {
    try {
        const url = `https://router.project-osrm.org/route/v1/driving/${from.lon},${from.lat};${to.lon},${to.lat}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        const j = await res.json();
        if (!j?.routes?.length) return null;
        const r = j.routes[0];
        const coords: [number, number][] = r.geometry.coordinates.map(
            (c: [number, number]) => [c[1], c[0]]
        );
        return { distance: r.distance, duration: r.duration, coords };
    } catch (err) {
        console.error('Route fetch error:', err);
        return null;
    }
}

function toKm(meters: number) { return meters / 1000; }
function fareModel(km: number, type: string) {
    const base = 40;
    const perKm = type === 'Premium' ? 30 : type === 'Bike' ? 8 : 18;
    const variation = Math.floor(Math.random() * 20 - 10); // ±10 ৳ variation
    return Math.max(0, Math.round(base + perKm * km + variation));
}

// ------------------ Map Click Selector ------------------
function ClickSelector({
    selectMode,
    setPickup,
    setDrop,
}: {
    selectMode: 'pickup' | 'drop';
    setPickup: React.Dispatch<React.SetStateAction<Place | null>>;
    setDrop: React.Dispatch<React.SetStateAction<Place | null>>;
}) {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            const p: Place = { label: `${lat.toFixed(5)}, ${lng.toFixed(5)}`, lat, lon: lng };
            selectMode === 'pickup' ? setPickup(p) : setDrop(p);
        },
    });
    return null;
}

// ------------------ Main Component ------------------
export default function BookingForm() {
    // Step
    const [step, setStep] = useState<number>(1);

    // Pickup / Drop / Ride Type
    const [pickup, setPickup] = useState<Place | null>(null);
    const [drop, setDrop] = useState<Place | null>(null);
    const [rideType, setRideType] = useState<string>('Economy');

    // Route
    const [routeCoords, setRouteCoords] = useState<LatLngExpression[]>([]);
    const [routeDistanceKm, setRouteDistanceKm] = useState<number | null>(null);
    const [routeDurationMin, setRouteDurationMin] = useState<number | null>(null);
    const [fare, setFare] = useState<number | null>(null);

    // Map & Search
    const [selectMode, setSelectMode] = useState<'pickup' | 'drop'>('pickup');
    const [query, setQuery] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Place[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const mapRef = useRef<L.Map | null>(null);
    const debounceRef = useRef<number | null>(null);

    // Riders
    const [availableRiders, setAvailableRiders] = useState<Rider[]>([]);
    const [selectedRider, setSelectedRider] = useState<Rider | null>(null);

    // Ride Requests
    const [rideRequests, setRideRequests] = useState<RideRequest[]>([]);

    // ------------------ Effects ------------------
    useEffect(() => {
        let active = true;
        async function compute() {
            if (!pickup || !drop) {
                setRouteCoords([]); setRouteDistanceKm(null); setRouteDurationMin(null); setFare(null);
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
                const latlngs = r.coords.map(c => L.latLng(c[0], c[1]));
                const bounds = L.latLngBounds(latlngs);
                map.fitBounds(bounds, { padding: [40, 40] });
            }
        }
        compute();
        return () => { active = false; };
    }, [pickup, drop, rideType]);

    // Search
    useEffect(() => {
        if (debounceRef.current) window.clearTimeout(debounceRef.current);
        if (!query || query.trim().length < 2) { setSuggestions([]); return; }
        debounceRef.current = window.setTimeout(async () => {
            try {
                const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=6&q=${encodeURIComponent(query)}`;
                const res = await fetch(url);
                const j = await res.json();
                const places: Place[] = (j || []).map((p: any) => ({
                    label: p.display_name,
                    lat: parseFloat(p.lat),
                    lon: parseFloat(p.lon),
                }));
                setSuggestions(places); setShowSuggestions(true);
            } catch (err) { console.error(err); }
        }, 350);
        return () => { if (debounceRef.current) window.clearTimeout(debounceRef.current); };
    }, [query]);

    // ------------------ Handlers ------------------
    function handleSelectSuggestion(p: Place) {
        selectMode === 'pickup' ? setPickup(p) : setDrop(p);
        setQuery(''); setSuggestions([]); setShowSuggestions(false);
        const map = mapRef.current;
        if (map) map.setView([p.lat, p.lon], 14, { animate: true });
    }

    function handleNextStep() {
        if (step === 1 && (!pickup || !drop)) {
            Swal.fire({ icon: 'warning', title: 'Pickup & Drop required' }); return;
        }
        if (step === 2 && !rideType) {
            Swal.fire({ icon: 'warning', title: 'Select Ride Type' }); return;
        }
        if (step === 3 && pickup && drop) {
            // Demo riders
            const riders: Rider[] = [
                { id: '1', name: 'Rider A', location: { label: 'Nearby 1', lat: pickup.lat + 0.005, lon: pickup.lon + 0.005 }, rideType: 'Economy' },
                { id: '2', name: 'Rider B', location: { label: 'Nearby 2', lat: pickup.lat - 0.005, lon: pickup.lon - 0.005 }, rideType: 'Premium' },
                { id: '3', name: 'Rider C', location: { label: 'Nearby 3', lat: pickup.lat + 0.007, lon: pickup.lon - 0.003 }, rideType: 'Bike' },
                { id: '4', name: 'Rider D', location: { label: 'Nearby 4', lat: pickup.lat - 0.006, lon: pickup.lon + 0.004 }, rideType: 'Economy' },
                { id: '5', name: 'Rider E', location: { label: 'Nearby 5', lat: pickup.lat + 0.002, lon: pickup.lon - 0.005 }, rideType: 'CNG' },
            ];
            setAvailableRiders(riders);
        }
        setStep(step + 1);
    }

    function handleSelectRider(r: Rider) { setSelectedRider(r); }

    function handleConfirmRide() {
        if (!selectedRider || !pickup || !drop || !fare) {
            Swal.fire({ icon: 'warning', title: 'Select rider & ensure route info' }); return;
        }
        const newRide: RideRequest = {
            id: Date.now().toString(),
            pickup, drop, rideType, distance: routeDistanceKm ?? 0,
            fare, status: 'confirmed', rider: selectedRider,
        };
        setRideRequests([newRide, ...rideRequests]);
        Swal.fire({ icon: 'success', title: 'Ride Confirmed!', text: `Driver: ${selectedRider.name}` });
        setStep(6);

        // Auto progress demo ride
        setTimeout(() => {
            setRideRequests(prev => prev.map(r => r.id === newRide.id ? { ...r, status: 'inprogress' } : r));
        }, 3000);
        setTimeout(() => {
            setRideRequests(prev => prev.map(r => r.id === newRide.id ? { ...r, status: 'completed' } : r));
        }, 15000);
    }

    function handleEndRide(id: string) {
        setRideRequests(rideRequests.map(r => r.id === id ? { ...r, status: 'completed' } : r));
    }

    function handleCancelRide(id: string) {
        setRideRequests(rideRequests.map(r => r.id === id ? { ...r, status: 'canceled' } : r));
    }

    function resetAll() {
        setPickup(null); setDrop(null); setRouteCoords([]);
        setRouteDistanceKm(null); setRouteDurationMin(null); setFare(null);
        setAvailableRiders([]); setSelectedRider(null); setStep(1);
    }

    // ------------------ JSX ------------------
    return (


        <div className="min-h-screen flex flex-col items-center p-4 bg-gradient-to-b from-white to-[#e6fcf9] pt-14"
            style={{
                // backgroundImage: "url('https://i.ibb.co.com/zTQ6z80G/map.jpg')",
                backgroundImage: "linear-gradient(to right, rgba(230,252,249,0.8), rgba(249,250,251,0.8)), url('https://i.ibb.co/zTQ6z80G/map.jpg')",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                backgroundBlendMode: "overlay",
            }}
        >
            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-6">
                {/* LEFT PANEL */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold text-[#274450]">Book a Ride</h2>
                    {/* Step 1-3 */}
                    {step <= 3 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex gap-2 mb-3">
                                <button onClick={() => setSelectMode('pickup')} className={`px-3 py-1 rounded border ${selectMode === 'pickup' ? 'bg-[#71BBB2] text-white' : 'border-[#71BBB2]'}`}>Pickup</button>
                                <button onClick={() => setSelectMode('drop')} className={`px-3 py-1 rounded border ${selectMode === 'drop' ? 'bg-[#71BBB2] text-white' : 'border-[#71BBB2]'}`}>Drop</button>
                            </div>
                            <input value={query} onChange={e => setQuery(e.target.value)} placeholder={`Search ${selectMode}`} className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#71BBB2]" />
                            {showSuggestions && suggestions.length > 0 && (
                                <ul className="absolute z-30 mt-1 left-0 right-0 bg-white border rounded-lg shadow max-h-56 overflow-auto">
                                    {suggestions.map((s, idx) => (
                                        <li key={idx} onClick={() => handleSelectSuggestion(s)} className="px-3 py-2 hover:bg-gray-100 cursor-pointer">{s.label}</li>
                                    ))}
                                </ul>
                            )}
                            {step === 2 && (
                                <select value={rideType} onChange={(e) => setRideType(e.target.value)} className="mt-3 p-2 rounded-md border">
                                    <option>Economy</option><option>Premium</option><option>Bike</option><option>CNG</option>
                                </select>
                            )}
                            <div className="mt-4 flex justify-between">
                                <div>Distance: {routeDistanceKm?.toFixed(2) ?? '—'} km</div>
                                <div>Fare: {fare ?? '—'} ৳</div>
                            </div>
                            <button onClick={handleNextStep} className="mt-4 px-4 py-2 bg-[#274450] text-white rounded-lg">Next</button>
                        </motion.div>
                    )}

                    {/* Step 4: Riders */}
                    {step === 4 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold mb-3">Available Riders Nearby</h3>
                            {availableRiders.map(r => (
                                <div key={r.id} className={`p-2 border rounded mb-2 cursor-pointer ${selectedRider?.id === r.id ? 'bg-[#71BBB2] text-white' : ''}`} onClick={() => handleSelectRider(r)}>
                                    {r.name} • {r.rideType} • {r.location.label}
                                </div>
                            ))}
                            <button onClick={handleConfirmRide} className="mt-3 px-4 py-2 bg-[#274450] text-white rounded-lg">Confirm Ride</button>
                        </motion.div>
                    )}

                    {/* Step 6+: Tracking */}
                    {step >= 6 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold mb-2">Ride Tracking (Demo)</h3>
                            {rideRequests.map(r => r.status !== 'canceled' && (
                                <div key={r.id} className="mt-2 flex justify-between items-center p-2 border rounded">
                                    <div>{r.rider?.name} • {r.rideType} • {r.fare} ৳ | <span className="capitalize">{r.status}</span></div>
                                    {r.status === 'inprogress' && <button onClick={() => handleEndRide(r.id)} className="px-3 py-1 bg-[#71BBB2] text-white rounded">End Ride</button>}
                                </div>
                            ))}
                            <button onClick={resetAll} className="mt-3 px-4 py-2 bg-[#274450] text-white rounded-lg">Finish</button>
                        </motion.div>
                    )}
                </div>

                {/* RIGHT PANEL: Map */}
                <div className="h-[300px] z-0 rounded-2xl overflow-hidden shadow-lg">
                    <MapContainer center={[23.8103, 90.4125]} zoom={13} scrollWheelZoom style={{ height: '100%', width: '100%' }} whenCreated={map => mapRef.current = map}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <ClickSelector selectMode={selectMode} setPickup={setPickup} setDrop={setDrop} />
                        {pickup && <Marker position={[pickup.lat, pickup.lon]} icon={pickupIcon} />}
                        {drop && <Marker position={[drop.lat, drop.lon]} icon={dropIcon} />}
                        {routeCoords.length > 0 && <Polyline positions={routeCoords} color={ACCENT} weight={5} />}
                        {availableRiders.map(r => <Marker key={r.id} position={[r.location.lat, r.location.lon]} icon={riderIcon} />)}
                    </MapContainer>
                </div>
            </div>

            {/* Dashboard */}
            <div className="w-full max-w-6xl mt-6">
                <h3 className="text-xl font-semibold mb-2">My Ride Requests</h3>
                <div className="flex flex-col gap-2">
                    {rideRequests.map(r => (
                        <div key={r.id} className="p-3 border rounded flex justify-between items-center">
                            <div>{r.pickup.label} → {r.drop.label} | {r.rideType} | {r.fare} ৳ | <span className="capitalize">{r.status}</span></div>
                            {r.status === 'pending' && <button onClick={() => handleCancelRide(r.id)} className="px-3 py-1 bg-red-500 text-white rounded">Cancel</button>}
                        </div>
                    ))}
                    {rideRequests.length === 0 && <div className="text-gray-500">No rides yet.</div>}
                </div>
            </div>
        </div>


    );
}


