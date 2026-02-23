"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, MapPin, Trash2 } from "lucide-react";

export default function FavoritesClientView({ initialFavorites }: { initialFavorites: any[] }) {
    const [favorites, setFavorites] = useState(initialFavorites);

    const removeFavorite = async (id: string, placeId: string) => {
        setFavorites(favorites.filter(f => f.id !== id));
        await fetch("/api/favorites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ placeId })
        });
    };

    if (favorites.length === 0) {
        return (
            <div className="bg-white border-4 border-black p-12 rounded-3xl text-center shadow-[10px_10px_0px_#fb923c] animate-pulse">
                <h2 className="text-3xl font-black uppercase text-pink-500 mb-4">No Gems Saved Yet 💎</h2>
                <p className="font-bold text-lg">Go explore some cities and click SAVE on the hidden spots!</p>
                <Link href="/" className="inline-block mt-8 bg-black text-white px-6 py-3 border-4 border-yellow-300 font-black uppercase rounded-xl hover:bg-yellow-300 hover:text-black transition-colors">
                    Explore Now
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((fav) => (
                <div key={fav.id} className="bg-white border-4 border-black rounded-3xl overflow-hidden shadow-[6px_6px_0px_#000] flex flex-col pt-4">
                    <div className="h-[200px] bg-blue-100 flex items-center justify-center relative mb-4">
                        {fav.place.photos && JSON.parse(fav.place.photos).length > 0 ? (
                            <img src={JSON.parse(fav.place.photos)[0]} alt={fav.place.name} className="w-full h-[200px] object-cover" />
                        ) : <MapPin className="w-16 h-16 animate-bounce text-blue-500" />}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-2xl font-black uppercase text-cyan-600 truncate">{fav.place.name}</h3>
                        <p className="font-bold my-2 bg-purple-200 inline-block px-2 rounded-lg border-2 border-black w-max">
                            {fav.place.type} • {fav.place.costLevel}
                        </p>
                        <div className="flex gap-4 mt-auto pt-6">
                            <Link href={`/place/${fav.place.slug}`} className="bg-green-400 font-black px-4 py-2 border-2 border-black rounded-xl shadow-[3px_3px_0px_#000] flex-1 text-center hover:translate-x-1 hover:translate-y-1 hover:shadow-[0px_0px_0px_#000]">
                                VIEW
                            </Link>
                            <button
                                onClick={() => removeFavorite(fav.id, fav.placeId)}
                                className="bg-red-400 text-white p-2 border-2 border-black rounded-xl shadow-[3px_3px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[0px_0px_0px_#000]"
                            >
                                <Trash2 />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
