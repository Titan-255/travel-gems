import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import FavoritesClientView from "./FavoritesClientView";

export default async function FavoritesPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }

    const favorites = await prisma.favorite.findMany({
        where: { userId: (session.user as any).id },
        include: {
            place: true,
        }
    });

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-5xl font-black uppercase tracking-tighter text-black bg-pink-400 inline-block px-6 py-4 border-4 border-black rounded-3xl shadow-[8px_8px_0px_#000] rotate-2 mb-12">
                My Favorites 🌟
            </h1>

            <FavoritesClientView initialFavorites={favorites} />
        </div>
    );
}
