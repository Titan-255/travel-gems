import prisma from "@/lib/prisma";
import { createPlace, deletePlace } from "../actions";

export default async function AdminPlaces() {
    const cities = await prisma.city.findMany();
    const places = await prisma.place.findMany({ include: { city: true } });

    return (
        <div className="bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_#f472b6]">
            <h1 className="text-4xl font-black uppercase text-pink-500 mb-8 border-b-4 border-black pb-4">
                Manage Places 📍
            </h1>

            <div className="mb-12 bg-gray-100 p-6 rounded-2xl border-4 border-black shadow-[4px_4px_0px_#000]">
                <h2 className="text-2xl font-black uppercase mb-4">Add New Place</h2>

                {cities.length === 0 ? (
                    <div className="text-red-500 font-bold p-4 bg-red-100 border-2 border-red-500 rounded-xl">
                        Please create a city first before adding places!
                    </div>
                ) : (
                    <form action={createPlace} className="grid grid-cols-1 md:grid-cols-2 gap-4 font-bold">
                        <select name="cityId" required className="border-4 border-black p-3 rounded-xl shadow-[2px_2px_0px_#000]">
                            <option value="">Select City</option>
                            {cities.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>

                        <input name="name" placeholder="Place Name" required className="border-4 border-black p-3 rounded-xl shadow-[2px_2px_0px_#000]" />
                        <input name="slug" placeholder="Slug (e.g. coffee-spot)" required className="border-4 border-black p-3 rounded-xl shadow-[2px_2px_0px_#000]" />
                        <input name="lat" type="number" step="any" placeholder="Latitude" required className="border-4 border-black p-3 rounded-xl shadow-[2px_2px_0px_#000]" />
                        <input name="lng" type="number" step="any" placeholder="Longitude" required className="border-4 border-black p-3 rounded-xl shadow-[2px_2px_0px_#000]" />

                        <select name="type" required className="border-4 border-black p-3 rounded-xl shadow-[2px_2px_0px_#000]">
                            <option value="VIEWPOINT">Viewpoint</option>
                            <option value="CAFE">Cafe</option>
                            <option value="BEACH">Beach</option>
                            <option value="TREK">Trek</option>
                            <option value="COWORKING">Coworking</option>
                            <option value="OTHER">Other</option>
                        </select>

                        <select name="costLevel" required className="border-4 border-black p-3 rounded-xl shadow-[2px_2px_0px_#000]">
                            <option value="FREE">Free</option>
                            <option value="CHEAP">Cheap</option>
                            <option value="MID">Mid</option>
                            <option value="EXPENSIVE">Expensive</option>
                        </select>

                        <div className="flex items-center gap-2 border-4 border-black p-3 rounded-xl shadow-[2px_2px_0px_#000] bg-white">
                            <input type="checkbox" name="soloFriendly" value="true" className="w-6 h-6 border-4 border-black accent-yellow-400" />
                            <label>Solo Friendly?</label>
                        </div>

                        <textarea name="description" placeholder="Description" required className="col-span-1 md:col-span-2 border-4 border-black p-3 rounded-xl shadow-[2px_2px_0px_#000] min-h-[100px]" />
                        <input name="bestTime" placeholder="Best Time to Visit" className="border-4 border-black p-3 rounded-xl shadow-[2px_2px_0px_#000]" />
                        <input name="safetyNotes" placeholder="Safety Notes" className="border-4 border-black p-3 rounded-xl shadow-[2px_2px_0px_#000]" />
                        <input name="photos" placeholder="Photos URLs (comma separated)" required className="col-span-1 md:col-span-2 border-4 border-black p-3 rounded-xl shadow-[2px_2px_0px_#000]" />

                        <button type="submit" className="col-span-1 md:col-span-2 bg-yellow-400 border-4 border-black p-3 rounded-xl shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[0px_0px_0px_#000] text-xl uppercase transition-all mt-4">
                            CREATE PLACE
                        </button>
                    </form>
                )}
            </div>

            <div>
                <h2 className="text-2xl font-black uppercase mb-4">Current Places</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {places.map((place: any) => (
                        <div key={place.id} className="border-4 border-black p-4 rounded-2xl flex flex-col shadow-[4px_4px_0px_#000]">
                            <h3 className="text-xl font-black uppercase text-cyan-600">{place.name}</h3>
                            <p className="text-sm font-bold bg-yellow-200 px-2 rounded-lg w-max mb-4">{place.city.name}</p>

                            <form action={async () => {
                                "use server";
                                await deletePlace(place.id);
                            }} className="mt-auto self-end">
                                <button className="bg-red-400 text-white border-4 border-black px-4 py-2 font-black rounded-lg shadow-[2px_2px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[0px_0px_0px_#000]">
                                    DELETE
                                </button>
                            </form>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
