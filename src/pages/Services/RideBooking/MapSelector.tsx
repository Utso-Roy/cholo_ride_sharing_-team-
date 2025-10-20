import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Place } from "./types";

// Icon imports
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default icon for Vite/ESM
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const defaultIcon = new L.Icon.Default();

type Props = {
    pickup: Place | null;
    drop: Place | null;
    routeCoords: LatLngExpression[];
    selectMode: "pickup" | "drop";
    setPickup: React.Dispatch<React.SetStateAction<Place | null>>;
    setDrop: React.Dispatch<React.SetStateAction<Place | null>>;
    vehicleProgress?: number; // 0 - 1 for animated vehicle marker
};

// Map click handler
function ClickSelector({
    selectMode,
    setPickup,
    setDrop,
}: {
    selectMode: "pickup" | "drop";
    setPickup: React.Dispatch<React.SetStateAction<Place | null>>;
    setDrop: React.Dispatch<React.SetStateAction<Place | null>>;
}) {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            const p: Place = { label: `${lat.toFixed(5)}, ${lng.toFixed(5)}`, lat, lon: lng };
            selectMode === "pickup" ? setPickup(p) : setDrop(p);
        },
    });
    return null;
}

const MapSelector: React.FC<Props> = ({
    pickup,
    drop,
    routeCoords,
    selectMode,
    setPickup,
    setDrop,
    vehicleProgress,
}) => {
    const mapRef = useRef<L.Map | null>(null);
    const [vehiclePos, setVehiclePos] = useState<LatLngExpression | null>(null);

    // Fit map bounds when route/pickup/drop changes
    useEffect(() => {
        const map = mapRef.current;
        const points: LatLngExpression[] = [];
        if (pickup) points.push([pickup.lat, pickup.lon]);
        if (drop) points.push([drop.lat, drop.lon]);
        if (routeCoords.length) points.push(...routeCoords);
        if (points.length && map) {
            const bounds = L.latLngBounds(points as L.LatLngExpression[]);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [pickup, drop, routeCoords]);

    // Animate vehicle along route
    useEffect(() => {
        if (vehicleProgress === undefined || routeCoords.length === 0) return;
        const index = Math.floor(vehicleProgress * (routeCoords.length - 1));
        setVehiclePos(routeCoords[index]);
    }, [vehicleProgress, routeCoords]);

    return (
        <MapContainer
            center={[23.8103, 90.4125]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            whenCreated={(map: L.Map) => (mapRef.current = map)}
            scrollWheelZoom={false} // prevent page scroll
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <ClickSelector selectMode={selectMode} setPickup={setPickup} setDrop={setDrop} />

            {pickup && <Marker position={[pickup.lat, pickup.lon]} icon={defaultIcon} />}
            {drop && <Marker position={[drop.lat, drop.lon]} icon={defaultIcon} />}
            {routeCoords.length > 0 && <Polyline positions={routeCoords} color="#71BBB2" weight={4} />}
            {vehiclePos && <Marker position={vehiclePos} icon={defaultIcon} />}
        </MapContainer>
    );
};

export default MapSelector;
