"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Map, Star, ShieldAlert } from "lucide-react";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="bg-yellow-400 border-b-4 border-black p-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-3xl font-black tracking-tighter uppercase font-[family-name:var(--font-outfit)] flex items-center gap-2 transform hover:scale-105 transition-transform group">
                    <Map className="w-8 h-8 group-hover:animate-bounce" />
                    <span className="bg-white px-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                        Solo Gems
                    </span>
                </Link>
                <div className="flex items-center gap-4 font-bold">
                    {session ? (
                        <>
                            <Link href="/favorites" className="flex items-center gap-2 hover:text-white transition-colors bg-pink-400 px-4 py-2 border-2 border-black rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]">
                                <Star className="w-5 h-5 fill-current" />
                                Favorites
                            </Link>
                            {(session.user as any)?.role === 'ADMIN' && (
                                <Link href="/admin" className="flex items-center gap-2 hover:text-white transition-colors bg-purple-400 px-4 py-2 border-2 border-black rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]">
                                    <ShieldAlert className="w-5 h-5" />
                                    Admin
                                </Link>
                            )}
                            <button
                                onClick={() => signOut()}
                                className="bg-white px-4 py-2 border-2 border-black rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-red-400 hover:text-white transition-colors"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link href="/api/auth/signin" className="bg-blue-400 text-white px-6 py-2 border-2 border-black rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase tracking-wider">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
