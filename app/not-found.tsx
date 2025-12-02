"use client";

import Link from "next/link";
import { Inter } from "next/font/google";
import CursorHalo from "./ui/components/cursorHalo";

const inter = Inter({ subsets: ["latin"] });

export default function NotFound() {
    return (
        <html lang="fr">
            <body className={`${inter.className} bg-darkbg text-main-text`}>
                <main className="dark relative min-h-screen flex flex-col items-center justify-center">
                    <CursorHalo />
                    <div className="z-10 flex flex-col items-center justify-center gap-6 p-4 text-center">
                        <h2 className="text-4xl font-bold text-white">404 - Page non trouvée</h2>
                        <p className="text-lg">La page que vous recherchez n&apos;existe pas.</p>
                        <Link
                            href="/"
                            className="text-white underline hover:text-main-text transition-colors font-bold"
                        >
                            Retour à l&apos;accueil
                        </Link>
                    </div>
                </main>
            </body>
        </html>
    );
}
