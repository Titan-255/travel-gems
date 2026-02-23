"use client";

import { useEffect, useState } from "react";
import { Star, MessageCircle, MapPin, Calendar, ShieldAlert } from "lucide-react";
import { useSession } from "next-auth/react";

export default function PlaceClientView({ place }: { place: any }) {
    const { data: session } = useSession();
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (session) {
            fetch(`/api/favorites?placeId=${place.id}`)
                .then(res => res.json())
                .then(data => setIsFavorite(data.isFavorite));
        }
    }, [session, place.id]);

    const toggleFavorite = async () => {
        if (!session) {
            alert("Please login to save favorites! 💎");
            return;
        }
        setLoading(true);
        const res = await fetch("/api/favorites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ placeId: place.id })
        });
        const data = await res.json();
        if (data.status === "added") setIsFavorite(true);
        if (data.status === "removed") setIsFavorite(false);
        setLoading(false);
    };

    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = `Check out this amazing hidden gem: ${place.name} on Solo Gems! 💎`;

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Detail Card */}
            <div className="lg:w-2/3 flex flex-col gap-6">
                {place.photos && JSON.parse(place.photos).length > 0 && (
                    <div className="border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_#000]">
                        <img src={JSON.parse(place.photos)[0]} alt={place.name} className="w-full h-[400px] object-cover hover:scale-105 transition duration-500" />
                    </div>
                )}

                <div className="bg-white p-8 border-4 border-black rounded-3xl shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                    <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
                        <h1 className="text-5xl font-black uppercase tracking-tighter text-fuchsia-600 drop-shadow-[2px_2px_0px_#000]">
                            {place.name}
                        </h1>
                        <div className="flex gap-4">
                            <button
                                onClick={toggleFavorite}
                                disabled={loading}
                                className={`border-4 border-black p-3 rounded-2xl shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[0px_0px_0px_#000] transition-all flex items-center gap-2 font-bold ${isFavorite ? 'bg-yellow-400' : 'bg-gray-100 hover:bg-yellow-200'}`}
                            >
                                <Star className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                                {isFavorite ? 'SAVED' : 'SAVE'}
                            </button>

                            <a
                                href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + currentUrl)}`}
                                target="_blank" rel="noopener noreferrer"
                                className="bg-green-400 text-white border-4 border-black p-3 rounded-2xl shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[0px_0px_0px_#000] transition-all flex items-center gap-2 font-bold"
                            >
                                <MessageCircle className="w-6 h-6 fill-current" />
                                SHARE
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-8">
                        <span className="bg-blue-200 border-2 border-black px-4 py-2 font-black rounded-xl shadow-[2px_2px_0px_#000] uppercase">
                            {place.type}
                        </span>
                        <span className="bg-green-200 border-2 border-black px-4 py-2 font-black rounded-xl shadow-[2px_2px_0px_#000] uppercase">
                            Cost: {place.costLevel}
                        </span>
                        {place.soloFriendly && (
                            <span className="bg-orange-300 border-2 border-black px-4 py-2 font-black rounded-xl shadow-[2px_2px_0px_#000] uppercase flex items-center gap-2 animate-pulse">
                                <Star className="w-4 h-4" /> SOLO GEM
                            </span>
                        )}
                    </div>

                    <div className="prose prose-lg font-bold text-gray-800 leading-relaxed mb-8">
                        {place.description}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 pb-4">
                        {place.bestTime && (
                            <div className="bg-blue-50 border-4 border-black p-4 rounded-2xl shadow-[4px_4px_0px_#000] flex gap-4">
                                <div className="bg-blue-200 p-2 rounded-xl flex-shrink-0 animate-bounce self-start">
                                    <Calendar className="w-8 h-8 text-blue-800" />
                                </div>
                                <div>
                                    <h3 className="font-black uppercase text-xl text-blue-800">Best Time</h3>
                                    <p className="font-semibold">{place.bestTime}</p>
                                </div>
                            </div>
                        )}
                        {place.safetyNotes && (
                            <div className="bg-red-50 border-4 border-black p-4 rounded-2xl shadow-[4px_4px_0px_#000] flex gap-4">
                                <div className="bg-red-200 p-2 rounded-xl flex-shrink-0 animate-pulse self-start">
                                    <ShieldAlert className="w-8 h-8 text-red-800" />
                                </div>
                                <div>
                                    <h3 className="font-black uppercase text-xl text-red-800">Safety Notes</h3>
                                    <p className="font-semibold">{place.safetyNotes}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Map Side */}
            <div className="lg:w-1/3 flex flex-col gap-6">
                <div className="bg-white border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_#f472b6]">
                    <h2 className="text-2xl font-black uppercase text-center mb-4 flex items-center justify-center gap-2">
                        <MapPin className="text-fuchsia-600" /> Map Spot
                    </h2>
                    <div className="bg-gray-200 h-[400px] border-4 border-black rounded-2xl relative overflow-hidden flex items-center justify-center">
                        {/* Fallback for Map when Google Maps API isn't supplied */}
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight={0}
                            marginWidth={0}
                            src={`https://maps.google.com/maps?q=${place.lat},${place.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
