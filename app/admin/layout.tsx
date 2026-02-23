import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ShieldAlert, MapPin, Map } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== "ADMIN") {
        redirect("/");
    }

    return (
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4 bg-white border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] h-max sticky top-24">
                <h2 className="text-3xl font-black uppercase text-red-500 mb-8 flex items-center gap-2">
                    <ShieldAlert className="w-8 h-8" />
                    Admin Panel
                </h2>

                <nav className="flex flex-col gap-4">
                    <Link href="/admin" className="font-bold text-xl border-2 border-black p-3 hover:bg-yellow-300 transition-colors uppercase flex items-center gap-2 rounded-xl shadow-[2px_2px_0px_#000]">
                        Overview
                    </Link>
                    <Link href="/admin/cities" className="font-bold text-xl border-2 border-black p-3 hover:bg-cyan-300 transition-colors uppercase flex items-center gap-2 rounded-xl shadow-[2px_2px_0px_#000]">
                        <Map className="w-6 h-6" /> Cities
                    </Link>
                    <Link href="/admin/places" className="font-bold text-xl border-2 border-black p-3 hover:bg-green-300 transition-colors uppercase flex items-center gap-2 rounded-xl shadow-[2px_2px_0px_#000]">
                        <MapPin className="w-6 h-6" /> Places
                    </Link>
                </nav>
            </div>
            <div className="md:w-3/4">
                {children}
            </div>
        </div>
    );
}
