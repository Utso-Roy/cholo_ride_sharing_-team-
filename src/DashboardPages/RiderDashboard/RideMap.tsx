import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { FaMotorcycle, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import L from "leaflet";

// 🗺️ Custom marker icon setup
const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// 📍 Helper component to update map position dynamically
function ChangeMapView({ coords }: { coords: [number, number] }) {
  const map = useMap();
  map.setView(coords, 13);
  return null;
}

const RideMap: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]); // 🔹 suggestion state
  const [position, setPosition] = useState<[number, number]>([25.7832, 88.5595]); // Default: Dinajpur

  // 🔹 Fetch suggestions as user types
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        value
      )}&addressdetails=1&limit=5`
    );
    const data = await res.json();
    setSuggestions(data);
  };

  // 🔹 Handle suggestion click
  const handleSelectLocation = (lat: string, lon: string, display_name: string) => {
    setPosition([parseFloat(lat), parseFloat(lon)]);
    setSearchText(display_name);
    setSuggestions([]); // hide list after select
  };

  // 🔹 Manual search (optional)
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchText) return;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        searchText
      )}`
    );
    const data = await res.json();

    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      setPosition([parseFloat(lat), parseFloat(lon)]);
    } else {
      alert("❌ Location not found!");
    }
  };

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col">
      {/* ✅ Top Bar */}
      <div className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Ride Map Dashboard</h1>

        <div className="flex items-center gap-6 relative">
          {/* 🔹 Search Input with Suggestion */}
          <form onSubmit={handleSearch} className="flex flex-col relative">
            <span className="p-input-icon-left">
              <InputText
                value={searchText}
                onChange={handleInputChange}
                placeholder="Search location..."
                className="w-64"
              />
            </span>
            {suggestions.length > 0 && (
              <ul className="absolute top-10 left-0 bg-white border rounded-md shadow-md w-64 max-h-48 overflow-auto z-50">
                {suggestions.map((s, i) => (
                  <li
                    key={i}
                    onClick={() =>
                      handleSelectLocation(s.lat, s.lon, s.display_name)
                    }
                    className="px-3 py-2 text-sm hover:bg-blue-100 cursor-pointer"
                  >
                    {s.display_name}
                  </li>
                ))}
              </ul>
            )}
          </form>

          {/* Online/Offline Toggle */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsOnline(!isOnline)}
          >
            {isOnline ? (
              <FaToggleOn className="text-3xl text-green-500" />
            ) : (
              <FaToggleOff className="text-3xl text-red-500" />
            )}
            <span
              className={`font-semibold ${
                isOnline ? "text-green-600" : "text-red-500"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>

      {/* ✅ Main Content */}
      <div className="flex flex-1">
        {/* 🌍 Leaflet Live Map Section (80%) */}
        <div className="w-full md:w-4/5 bg-gray-200 relative">
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={true}
            className="h-full w-full z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Dynamic position update */}
            <ChangeMapView coords={position} />

            <Marker position={position} icon={markerIcon}>
              <Popup>📍 {searchText || "Current Location"}</Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* 🏍️ Ride Info Sidebar (20%) */}
        <div className="hidden md:flex flex-col w-1/5 bg-white shadow-inner border-l border-gray-200 p-5 space-y-5">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Current Ride Info</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              <span className="font-semibold">Pickup:</span> Rampur Station
            </p>
            <p>
              <span className="font-semibold">Drop:</span> Kaharol Bazar
            </p>
            <p>
              <span className="font-semibold">Distance:</span> 5.8 km
            </p>
            <p>
              <span className="font-semibold">Estimated Fare:</span> ৳85
            </p>
          </div>

          <Button
            label="Start Ride"
            icon={<FaMotorcycle />}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default RideMap;
