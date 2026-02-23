import prisma from "@/lib/prisma";

export default async function AdminDashboardOverview() {
    const cityCount = await prisma.city.count();
    const placeCount = await prisma.place.count();
    const userCount = await prisma.user.count();

    return (
        <div className="bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_#f472b6]">
            <h1 className="text-4xl font-black uppercase text-pink-500 mb-8 border-b-4 border-black pb-4">
                Dashboard Overview 🗺️
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-cyan-200 border-4 border-black p-6 rounded-2xl shadow-[6px_6px_0px_#000] text-center transform hover:scale-105 transition-transform">
                    <h3 className="text-2xl font-black uppercase mb-2">Total Cities</h3>
                    <p className="text-6xl font-black">{cityCount}</p>
                </div>
                <div className="bg-yellow-300 border-4 border-black p-6 rounded-2xl shadow-[6px_6px_0px_#000] text-center transform hover:scale-105 transition-transform">
                    <h3 className="text-2xl font-black uppercase mb-2">Total Places</h3>
                    <p className="text-6xl font-black">{placeCount}</p>
                </div>
                <div className="bg-green-300 border-4 border-black p-6 rounded-2xl shadow-[6px_6px_0px_#000] text-center transform hover:scale-105 transition-transform">
                    <h3 className="text-2xl font-black uppercase mb-2">Total Users</h3>
                    <p className="text-6xl font-black">{userCount}</p>
                </div>
            </div>
        </div>
    );
}
