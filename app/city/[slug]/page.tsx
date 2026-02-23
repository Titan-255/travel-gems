import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import CityClientView from "./CityClientView";

export async function generateStaticParams() {
    const cities = await prisma.city.findMany({ select: { slug: true } });
    return cities.map((c) => ({ slug: c.slug }));
}

export default async function CityPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const city = await prisma.city.findUnique({
        where: { slug },
        include: { places: true }
    });

    if (!city) return notFound();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_#f472b6] mb-12 flex flex-col md:flex-row">
                <div className="md:w-1/3 relative min-h-[300px] border-r-4 border-black">
                    <img src={city.imageUrl} alt={city.name} className="absolute inset-0 w-full h-full object-cover grayscale blur-[2px] transition hover:grayscale-0 hover:blur-none" />
                    <div className="absolute inset-0 flex items-center justify-center p-8 bg-black/40 group">
                        <h1 className="text-6xl text-white font-black uppercase text-center border-4 border-yellow-400 p-4 transform -rotate-3 group-hover:rotate-0 transition-transform bg-black/70 rounded-2xl">
                            {city.name}
                        </h1>
                    </div>
                </div>
                <div className="md:w-2/3 p-8 bg-blue-100 flex flex-col justify-center relative">
                    <div className="absolute top-4 right-4 bg-yellow-400 text-black border-2 border-black font-black uppercase px-4 py-1 rounded-full shadow-[2px_2px_0px_#000] rotate-12 text-sm tracking-tighter">
                        {city.state}, {city.country}
                    </div>
                    <p className="text-2xl font-bold italic border-l-8 border-pink-400 pl-4 bg-white p-4 rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] text-gray-800">
                        "{city.description}"
                    </p>
                </div>
            </div>

            {/* Client View handles filtering + map + list */}
            <CityClientView city={city} places={city.places} />
        </div>
    );
}
