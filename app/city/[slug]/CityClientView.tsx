"use client";

import { useState } from "react";
import Link from "next/link";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Filter, Star, Info, Backpack } from "lucide-react";

export default function CityClientView({ city, places }: { city: any, places: any[] }) {
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [costFilter, setCostFilter] = useState("ALL");
    const [soloFriendlyMode, setSoloFriendlyMode] = useState(false);
    const [hoveredPlace, setHoveredPlace] = useState<string | null>(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
    });

    const filteredPlaces = places.filter(place => {
        if (typeFilter !== "ALL" && place.type !== typeFilter) return false;
        if (costFilter !== "ALL" && place.costLevel !== costFilter) return false;
        if (soloFriendlyMode && !place.soloFriendly) return false;
        return true;
    });

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar List and Filters */}
            <div className="lg:w-1/2 flex flex-col gap-6">
                <div className="bg-yellow-300 p-6 border-4 border-black rounded-3xl shadow-[6px_6px_0px_#000]">
                    <h2 className="text-2xl font-black uppercase flex items-center gap-2 mb-4">
                        <Filter /> Filters
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        <select className="border-4 border-black p-2 rounded-xl bg-white font-bold shadow-[3px_3px_0px_#000]" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                            <option value="ALL">All Types</option>
                            <option value="VIEWPOINT">Viewpoints</option>
                            <option value="CAFE">Cafes</option>
                            <option value="BEACH">Beaches</option>
                            <option value="TREK">Treks</option>
                            <option value="COWORKING">Coworking</option>
                            <option value="OTHER">Other</option>
                        </select>

                        <select className="border-4 border-black p-2 rounded-xl bg-white font-bold shadow-[3px_3px_0px_#000]" value={costFilter} onChange={(e) => setCostFilter(e.target.value)}>
                            <option value="ALL">All Costs</option>
                            <option value="FREE">Free</option>
                            <option value="CHEAP">Cheap ($)</option>
                            <option value="MID">Mid ($$)</option>
                            <option value="EXPENSIVE">Expensive ($$$)</option>
                        </select>

                        <button
                            onClick={() => setSoloFriendlyMode(!soloFriendlyMode)}
                            className={`border-4 border-black p-2 px-4 rounded-xl font-bold font-black flex items-center gap-2 shadow-[3px_3px_0px_#000] transition-colors ${soloFriendlyMode ? 'bg-green-400 text-white' : 'bg-white'}`}
                        >
                            <Backpack /> Solo-Friendly
                        </button>
                    </div>
                </div>

                <div className="h-[600px] overflow-y-auto pr-4 space-y-4 comic-scrollbar">
                    {filteredPlaces.length === 0 ? (
                        <div className="bg-white border-4 border-black rounded-3xl p-8 text-center shadow-[6px_6px_0px_#f472b6]">
                            <h3 className="text-xl font-black">No spots match your filters!</h3>
                        </div>
                    ) : (
                        filteredPlaces.map(place => (
                            <Link
                                href={`/place/${place.slug}`}
                                key={place.id}
                                onMouseEnter={() => setHoveredPlace(place.id)}
                                onMouseLeave={() => setHoveredPlace(null)}
                            >
                                <div className={`flex flex-col sm:flex-row gap-4 bg-white border-4 border-black p-4 rounded-3xl transition-transform cursor-pointer ${hoveredPlace === place.id ? 'shadow-[8px_8px_0px_#3b82f6] -translate-x-1 -translate-y-1' : 'shadow-[4px_4px_0px_#000]'}`}>
                                    <div className="sm:w-32 sm:h-32 bg-gray-200 border-2 border-black rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                                        {place.photos && (place.photos as string[])[0] ? (
                                            <img src={(place.photos as string[])[0]} alt={place.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="font-bold text-gray-500">No Image</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-2xl font-black uppercase text-blue-600">{place.name}</h3>
                                            <p className="font-bold text-sm bg-purple-200 inline-block px-2 py-1 rounded-md border-2 border-black mt-2">
                                                {place.type} • {place.costLevel}
                                            </p>
                                        </div>
                                        {place.soloFriendly && (
                                            <span className="text-green-600 font-black flex gap-1 items-center mt-2 text-sm bg-green-100 px-3 py-1 rounded-full border-2 border-black w-max shadow-[currentColor_2px_2px_0]">
                                                <Star className="w-4 h-4" /> SOLO APPROVED
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>

            {/* Map */}
            <div className="lg:w-1/2 h-[500px] lg:h-auto border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_#000] relative">
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        center={city.places[0] ? { lat: city.places[0].lat, lng: city.places[0].lng } : { lat: 20.5937, lng: 78.9629 }}
                        zoom={city.places[0] ? 12 : 5}
                    >
                        {filteredPlaces.map(place => (
                            <Marker
                                key={place.id}
                                position={{ lat: place.lat, lng: place.lng }}
                                title={place.name}
                                onClick={() => setHoveredPlace(place.id)}
                                icon={{
                                    url: hoveredPlace === place.id ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" : "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                                }}
                            />
                        ))}
                    </GoogleMap>
                ) : (
                    <div className="w-full h-full bg-blue-100 flex flex-col items-center justify-center p-8 text-center gap-4">
                        <Info className="w-16 h-16 text-blue-500 animate-bounce" />
                        <p className="text-2xl font-black">Map Loading / Needs API Key</p>
                        <p className="font-bold border-2 border-black p-4 bg-white rounded-xl shadow-[4px_4px_0px_#000]">
                            To see this amazing comic gamified map, please configure NEXT_PUBLIC_GOOGLE_MAPS_API_KEY inside your .env file!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
