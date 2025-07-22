"use client";

import { useEffect } from "react";

export default function Matomo() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window._paq = window._paq || [];
      window._paq.push(["trackPageView"]);
      window._paq.push(["enableLinkTracking"]);

      (function () {
        const u = "//matomo.ageronjoachim.com/";
        window._paq.push(["setTrackerUrl", u + "matomo.php"]);
        window._paq.push(["setSiteId", "1"]);
        const d = document;
        const g = d.createElement("script");
        const s = d.getElementsByTagName("script")[0];
        g.async = true;
        g.src = u + "matomo.js";
        if (s.parentNode) {
          s.parentNode.insertBefore(g, s);
        }
      })();
    }
  }, []);

  return null;
}

declare global {
  interface Window {
    _paq: any[];
  }
}
