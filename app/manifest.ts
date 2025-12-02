import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Joachim Ageron Portfolio",
        short_name: "Joachim Ageron",
        description: "Full stack developer portfolio",
        start_url: "/",
        display: "standalone",
        background_color: "#050318",
        theme_color: "#050318",
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
