import React, { useState, useEffect } from "react";
import { Place } from "./types";

type Props = { placeholder: string; onSelect: (p: Place) => void; };

const LocationInput: React.FC<Props> = ({ placeholder, onSelect }) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Place[]>([]);

    useEffect(() => {
        if (!query) return setSuggestions([]);
        const timer = setTimeout(async () => {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`);
            const data = await res.json();
            setSuggestions(data.map((d: any) => ({ label: d.display_name, lat: +d.lat, lon: +d.lon })));
        }, 300);
        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div className="relative">
            <input
                className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#71BBB2]"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {suggestions.length > 0 && (
                <div className="absolute z-30 mt-1 w-full bg-white shadow-lg rounded-md max-h-56 overflow-auto">
                    {suggestions.map((s, i) => (
                        <div key={i} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => { onSelect(s); setQuery(s.label); setSuggestions([]); }}>
                            {s.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LocationInput;
