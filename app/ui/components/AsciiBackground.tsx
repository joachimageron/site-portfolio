"use client";
import { useEffect, useRef } from "react";
import type { AsciiHandle } from "@/app/ui/components/asciiScene";

/**
 * ASCII backdrop behind the page, denser in the cursor halo.
 * Desktop only, like the halo: three.js is not even downloaded below the `lg` breakpoint.
 */
export default function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let background: AsciiHandle | undefined;
    let generation = 0;

    const sync = () => {
      const current = ++generation;
      background?.dispose();
      background = undefined;
      if (!desktop.matches) return;

      import("@/app/ui/components/asciiScene")
        .then(({ createAsciiBackground }) => {
          if (current !== generation) return;
          background = createAsciiBackground(canvas, { reducedMotion: reducedMotion.matches });
        })
        .catch((error) => {
          // Purely decorative: without WebGL the page keeps its plain background.
          console.warn("ASCII background disabled:", error);
        });
    };

    sync();
    desktop.addEventListener("change", sync);
    reducedMotion.addEventListener("change", sync);
    return () => {
      generation++;
      desktop.removeEventListener("change", sync);
      reducedMotion.removeEventListener("change", sync);
      background?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="hidden lg:block fixed inset-0 -z-10 h-full w-full pointer-events-none"
    />
  );
}
