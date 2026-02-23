import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { placeId } = await req.json();
        if (!placeId) {
            return NextResponse.json({ error: "Place ID is required" }, { status: 400 });
        }

        const existingFavorite = await prisma.favorite.findUnique({
            where: {
                userId_placeId: {
                    userId: (session.user as any).id,
                    placeId: placeId,
                }
            }
        });

        if (existingFavorite) {
            await prisma.favorite.delete({
                where: { id: existingFavorite.id }
            });
            return NextResponse.json({ message: "Removed from favorites", status: "removed" });
        } else {
            await prisma.favorite.create({
                data: {
                    userId: (session.user as any).id,
                    placeId: placeId,
                }
            });
            return NextResponse.json({ message: "Added to favorites", status: "added" });
        }
    } catch (error) {
        console.error("Favorite API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const placeId = searchParams.get('placeId');

        if (placeId) {
            const fav = await prisma.favorite.findUnique({
                where: {
                    userId_placeId: {
                        userId: (session.user as any).id,
                        placeId: placeId,
                    }
                }
            });
            return NextResponse.json({ isFavorite: !!fav });
        }

        const favorites = await prisma.favorite.findMany({
            where: { userId: (session.user as any).id },
            include: { place: true }
        });

        return NextResponse.json(favorites);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
