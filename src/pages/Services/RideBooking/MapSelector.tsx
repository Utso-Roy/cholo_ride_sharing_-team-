import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Location = {
    name: string;
    lat: number;
    lng: number;
};

type Props = {
    pickup: Location | null;
    drop: Location | null;
};

const MapUpdater = ({ pickup, drop }: Props) => {
    const map = useMap();

    useEffect(() => {
        if (pickup && drop) {
            const bounds = L.latLngBounds(
                [pickup.lat, pickup.lng],
                [drop.lat, drop.lng]
            );
            map.fitBounds(bounds, { padding: [50, 50] });
        } else if (pickup) {
            map.setView([pickup.lat, pickup.lng], 13);
        } else if (drop) {
            map.setView([drop.lat, drop.lng], 13);
        }
    }, [pickup, drop, map]);

    return null;
};

const MapSelector = ({ pickup, drop }: Props) => {
    const pickupIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
        iconSize: [36, 36],
    });

    const dropIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
        iconSize: [36, 36],
    });

    const routeLine =
        pickup && drop ? [[pickup.lat, pickup.lng], [drop.lat, drop.lng]] : [];

    return (
        <div className="rounded-2xl overflow-hidden border shadow-md">
            <MapContainer
                center={[23.8103, 90.4125]}
                zoom={12}
                className="h-80 w-full"
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapUpdater pickup={pickup} drop={drop} />
                {pickup && <Marker position={[pickup.lat, pickup.lng]} icon={pickupIcon} />}
                {drop && <Marker position={[drop.lat, drop.lng]} icon={dropIcon} />}
                {routeLine.length > 0 && (
                    <Polyline positions={routeLine as any} color="#1a3b3a" weight={4} />
                )}
            </MapContainer>
        </div>
    );
};

export default MapSelector;
