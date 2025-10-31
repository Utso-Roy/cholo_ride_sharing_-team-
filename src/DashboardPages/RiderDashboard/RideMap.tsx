import React, { useContext, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Polyline,
} from "react-leaflet";
import { FaMotorcycle, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import L from "leaflet";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../../Auth/AuthProvider";
import { MdOnlinePrediction } from "react-icons/md";
import { IoCloudOffline } from "react-icons/io5";

// 🔹 Custom marker icon
const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// 🔹 Map click listener
function LocationMarker({ onSetPosition }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onSetPosition(lat, lng);
    },
  });
  return null;
}

const RideMap = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [pickupName, setPickupName] = useState("");
  const [pickupSelected, setPickupSelected] = useState(false);
  const [position, setPosition] = useState([25.7832, 88.5595]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const { user } = useContext(AuthContext);

  // 🔹 Get current user location once on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = [pos.coords.latitude, pos.coords.longitude];
          setCurrentLocation(coords);
        },
        (err) => {
          console.error(err);
          toast.error("Unable to get your current location!");
        }
      );
    }
  }, []);

  // 🔹 Toggle online/offline
  const handleToggle = async () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);

    try {
      await axios.put(
        `https://cholo-ride-sharing-website-server-side.onrender.com/api/verified_riders/${user.email}`,
        { isActive: newStatus }
      );
      toast.success(
        <div className="flex items-center gap-2">
          {newStatus ? (
            <>
              <MdOnlinePrediction className="text-green-500 text-xl" />
              <span>You are now Online</span>
            </>
          ) : (
            <>
              <IoCloudOffline className="text-red-500 text-xl" />
              <span>You are now Offline</span>
            </>
          )}
        </div>
      );
    } catch (err) {
      toast.error("Failed to update user status!");
      console.error(err);
    }
  };

  // 🔹 Search location
  const handleInputChange = async (e) => {
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

  // 🔹 Select from suggestion
  const handleSelectLocation = (lat, lon, name) => {
    setPosition([parseFloat(lat), parseFloat(lon)]);
    setPickupName(name);
    setPickupSelected(true);
    setSearchText(name);
    setSuggestions([]);
  };

  // 🔹 Manual search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchText) return;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        searchText
      )}`
    );
    const data = await res.json();

    if (data && data.length > 0) {
      const { lat, lon, display_name } = data[0];
      setPosition([parseFloat(lat), parseFloat(lon)]);
      setPickupName(display_name);
      setPickupSelected(true);
    } else {
      toast.error("Location not found!");
    }
  };

  // 🔹 Set pickup by clicking map
  const handleSetPosition = async (lat, lon) => {
    setPosition([lat, lon]);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await res.json();
      const address = data.display_name || "Unnamed Location";
      setPickupName(address);
      setPickupSelected(true);
      toast.success("Pickup location selected!");
    } catch (err) {
      setPickupName("Unknown location");
      toast.error("Failed to get location name.");
    }
  };

  const startRideHandler = () => {
    if (!pickupSelected) return;
    toast.success(`🏍 Ride started from: ${pickupName}`);
  };

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col">
      {/* 🔹 Top Bar */}
      <div className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold text-[#27445D]">Ride Map</h1>

        <div className="flex items-center gap-6 relative">
          {/* 🔹 Search Input */}
          <form onSubmit={handleSearch} className="flex flex-col relative">
            <InputText
              value={searchText}
              onChange={handleInputChange}
              placeholder="Search location..."
              className="w-64"
            />
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

          {/* 🔹 Online/Offline Toggle */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleToggle}
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

      {/* 🔹 Map Section */}
      <div className="flex flex-1">
        <div className="w-full md:w-4/5 bg-gray-200 relative">
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom
            className="h-full w-full z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Click handler */}
            <LocationMarker onSetPosition={handleSetPosition} />

            {/* Rider current location marker */}
            {currentLocation && (
              <Marker
                position={currentLocation}
                icon={
                  new L.Icon({
                    iconUrl:
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                  })
                }
              >
                <Popup>🚴 You are here</Popup>
              </Marker>
            )}

            {/* Pickup marker */}
            {pickupSelected && (
              <Marker position={position} icon={markerIcon}>
                <Popup>{pickupName}</Popup>
              </Marker>
            )}

            {/* 🔹 Polyline between current location & pickup */}
            {currentLocation && pickupSelected && (
              <Polyline
                positions={[currentLocation, position]}
                pathOptions={{ color: "blue", weight: 4 }}
              />
            )}
          </MapContainer>
        </div>

        {/* 🔹 Sidebar */}
        <div className="hidden md:flex flex-col w-1/5 bg-white shadow-inner border-l border-gray-200 p-5 space-y-5">
          <h2 className="text-xl font-bold text-[#27445D] mb-2">
            Current Ride Info
          </h2>
          <div className="space-y-3 text-sm text-[#27445D]">
            <p>
              <span className="font-semibold">Pickup:</span>{" "}
              {pickupName || "Not selected"}
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
            disabled={!pickupSelected}
            onClick={startRideHandler}
            className={`${
              pickupSelected
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed"
            } text-white font-semibold py-2 rounded-xl transition-all duration-300`}
          />
        </div>
      </div>
    </div>
  );
};

export default RideMap;
