import prisma from "@/lib/prisma";
import { createCity, deleteCity } from "../actions";

export default async function AdminCities() {
    const cities = await prisma.city.findMany();

    return (
        <div className="bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_#f472b6]">
            <h1 className="text-4xl font-black uppercase text-pink-500 mb-8 border-b-4 border-black pb-4">
                Manage Cities 🏙️
            </h1>

            <div className="mb-12 bg-gray-100 p-6 rounded-2xl border-4 border-black shadow-[4px_4px_0px_#000]">
                <h2 className="text-2xl font-black uppercase mb-4">Add New City</h2>
                <form action={createCity} className="flex flex-col gap-4 font-bold">
                    <input name="name" placeholder="City Name" required className="border-4 border-black p-3 rounded-xl shadow-[2px_2px_0px_#000]" />
                    <input name="slug" placeholder="Slug (e.g. jaipur)" required className="border-4 border-black p-3 rounded-xl shadow-[2px_2px_0px_#000]" />
                    <input name="state" placeholder="State" className="border-4 border-black p-3 rounded-xl shadow-[2px_2px_0px_#000]" />
                    <input name="country" placeholder="Country" required className="border-4 border-black p-3 rounded-xl shadow-[2px_2px_0px_#000]" />
                    <textarea name="description" placeholder="Description" required className="border-4 border-black p-3 rounded-xl shadow-[2px_2px_0px_#000] min-h-[100px]" />
                    <input name="imageUrl" placeholder="Image URL" required className="border-4 border-black p-3 rounded-xl shadow-[2px_2px_0px_#000]" />

                    <button type="submit" className="bg-yellow-400 border-4 border-black p-3 rounded-xl shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[0px_0px_0px_#000] text-xl uppercase transition-all mt-4">
                        CREATE CITY
                    </button>
                </form>
            </div>

            <div>
                <h2 className="text-2xl font-black uppercase mb-4">Current Cities</h2>
                <div className="flex flex-col gap-4">
                    {cities.map((city: any) => (
                        <div key={city.id} className="border-4 border-black p-4 rounded-2xl flex justify-between items-center shadow-[4px_4px_0px_#000]">
                            <div>
                                <h3 className="text-xl font-black uppercase text-cyan-600">{city.name}</h3>
                                <p className="text-sm font-bold">/{city.slug}</p>
                            </div>
                            <form action={async () => {
                                "use server";
                                await deleteCity(city.id);
                            }}>
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
