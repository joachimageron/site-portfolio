import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Joachim Ageron Portfolio",
        short_name: "Joachim Ageron",
        description: "Portfolio of Joachim Ageron, full stack TypeScript developer",
        start_url: "/",
        display: "standalone",
        // --color-bg in globals.css
        background_color: "#02040e",
        theme_color: "#02040e",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
            {
                src: "/pp.png",
                sizes: "192x192",
                type: "image/png",
            },
        ],
    };
}
