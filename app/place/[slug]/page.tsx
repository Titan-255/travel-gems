import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import PlaceClientView from "./PlaceClientView";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
    const places = await prisma.place.findMany({ select: { slug: true } });
    return places.map((p) => ({ slug: p.slug }));
}

export default async function PlacePage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const place = await prisma.place.findUnique({
        where: { slug },
        include: { city: true }
    });

    if (!place) return notFound();

    return (
        <div className="container mx-auto px-4 py-8">
            <Link href={`/city/${place.city.slug}`} className="inline-flex items-center gap-2 mb-8 bg-white border-4 border-black px-4 py-2 font-black uppercase rounded-2xl shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[0px_0px_0px_#000] transition-all">
                <ArrowLeft /> BACK TO {place.city.name}
            </Link>
            <PlaceClientView place={place} />
        </div>
    );
}
