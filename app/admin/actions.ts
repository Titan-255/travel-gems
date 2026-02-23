"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCity(data: FormData) {
    const name = data.get("name") as string;
    const slug = data.get("slug") as string;
    const state = data.get("state") as string;
    const country = data.get("country") as string;
    const description = data.get("description") as string;
    const imageUrl = data.get("imageUrl") as string;

    await prisma.city.create({
        data: { name, slug, state, country, description, imageUrl }
    });
    revalidatePath("/admin/cities");
}

export async function deleteCity(id: string) {
    await prisma.city.delete({ where: { id } });
    revalidatePath("/admin/cities");
}

export async function createPlace(data: FormData) {
    const name = data.get("name") as string;
    const slug = data.get("slug") as string;
    const cityId = data.get("cityId") as string;
    const description = data.get("description") as string;
    const lat = parseFloat(data.get("lat") as string);
    const lng = parseFloat(data.get("lng") as string);
    const type = data.get("type") as any;
    const costLevel = data.get("costLevel") as any;
    const soloFriendly = data.get("soloFriendly") === "true";
    const bestTime = data.get("bestTime") as string;
    const safetyNotes = data.get("safetyNotes") as string;
    const photosStr = data.get("photos") as string;

    const photosArray = photosStr ? photosStr.split(",").map(s => s.trim()) : [];
    const photos = JSON.stringify(photosArray);

    await prisma.place.create({
        data: {
            name, slug, cityId, description, lat, lng,
            type, costLevel, soloFriendly, bestTime, safetyNotes, photos
        }
    });

    revalidatePath("/admin/places");
}

export async function deletePlace(id: string) {
    await prisma.place.delete({ where: { id } });
    revalidatePath("/admin/places");
}
