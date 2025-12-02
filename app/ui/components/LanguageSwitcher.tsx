"use client";

import { useLocale } from "next-intl";
import Link from "next/link";

export default function LanguageSwitcher() {
    const locale = useLocale();

    return (
        <div className="flex gap-3 text-sm font-bold mt-6">
            <Link
                href="/fr"
                className={`${locale === "fr" ? "text-main-text" : "text-white hover:text-main-text"
                    } transition-colors`}
            >
                FR
            </Link>
            <span className="text-white">/</span>
            <Link
                href="/en"
                className={`${locale === "en" ? "text-main-text" : "text-white hover:text-main-text"
                    } transition-colors`}
            >
                EN
            </Link>
        </div>
    );
}
