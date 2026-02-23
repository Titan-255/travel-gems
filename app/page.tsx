import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import Image from "next/image";

export default async function Home() {
  const cities = await prisma.city.findMany({
    take: 5,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center space-y-8 py-16">
        <div className="relative inline-block group">
          <div className="absolute -inset-2 bg-pink-400 rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <h1 className="relative text-6xl md:text-8xl font-black uppercase text-white bg-black p-4 rounded-3xl border-8 border-cyan-400 shadow-[10px_10px_0px_#f472b6] transform rotate-[-2deg]">
            Hidden Gems 💎
          </h1>
        </div>
        <p className="text-2xl md:text-3xl font-bold bg-white border-4 border-black px-6 py-3 rounded-2xl shadow-[6px_6px_0px_#000] rotate-1 max-w-2xl font-[family-name:var(--font-outfit)]">
          Escape the crowds! Find secret epic spots across India for solo travelers.
        </p>

        <a href="#cities" className="mt-8 bg-green-400 text-white border-4 border-black text-2xl font-black px-12 py-4 rounded-full comic-border transform hover:scale-110 flex items-center justify-center gap-2 group comic-text tracking-wider">
          START EXPLORING <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
        </a>
      </div>

      <div id="cities" className="mt-20">
        <h2 className="text-5xl font-black uppercase tracking-tighter mb-12 flex items-center gap-4 comic-text">
          <span className="bg-yellow-300 border-4 border-black p-2 rounded-full shadow-[4px_4px_0px_#000] -rotate-6">🏙️</span>
          Featured Cities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cities.length === 0 ? (
            <div className="col-span-full p-8 bg-white border-4 border-black rounded-3xl comic-text text-2xl shadow-[8px_8px_0px_rgba(0,0,0,1)] text-center font-bold">
              Run the seed script to add amazing cities!
            </div>
          ) : (
            cities.map((city) => (
              <Link href={`/city/${city.slug}`} key={city.id} className="group relative block">
                <div className="bg-white border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_#fb923c] hover:-translate-y-2 hover:-translate-x-2 transition-all flex flex-col h-[400px]">
                  <div className="h-2/3 relative border-b-4 border-black overflow-hidden object-cover">
                    <img
                      src={city.imageUrl}
                      alt={city.name}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-purple-500 border-2 border-black rounded-full p-2 animate-bounce shadow-[2px_2px_0px_#000]">
                      <MapPin className="text-white w-6 h-6" />
                    </div>
                  </div>
                  <div className="p-6 bg-cyan-100 flex-1 flex flex-col justify-between">
                    <h3 className="text-3xl font-black uppercase group-hover:text-cyan-600 transition-colors drop-shadow-[2px_2px_0px_#fff]">
                      {city.name}
                    </h3>
                    <p className="font-bold text-gray-700 line-clamp-2">
                      {city.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
