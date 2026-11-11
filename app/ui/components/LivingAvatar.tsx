"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/*
 * All measurements are in pixels of the 500×500 artwork (public/pp.png).
 * public/pp-face.webp is that same artwork with the two eye openings cut out,
 * so anything drawn underneath only shows through the eyes.
 */
const ARTWORK = 500;
/** Area behind both eye openings; the face hides everything else of it. */
const EYES = { x: 140, y: 236, width: 212, height: 94 };
const PUPILS = [
  { cx: 193.65, cy: 285.29 },
  { cx: 298.6, cy: 287.92 },
];
const PUPIL_RADIUS = { x: 21.28, y: 30.23 };
const SCLERA = "rgb(233 245 246)";
const SKIN = "rgb(244 180 144)";

/** How far the pupils and the head follow the cursor. */
const PUPIL_TRAVEL = { x: 9, y: 8 };
const HEAD_TRAVEL = { x: 6, y: 5 };
const HEAD_TILT_DEG = 10;
/** Slightly zoomed in so the artwork edges never show when the head moves. */
const HEAD_SCALE = 1.04;
/** Cursor distance (CSS px) at which the gaze reaches half of its travel. */
const FOCUS_DISTANCE = 140;
const EASING_MS = 80;

/** The avatar is only displayed from the `lg` breakpoint up. */
const DESKTOP_QUERY = "(min-width: 1024px)";

function subscribeToDesktop(onChange: () => void) {
  const query = window.matchMedia(DESKTOP_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export default function LivingAvatar() {
  // Rendered on desktop only, so the artwork is never downloaded where it is hidden.
  const isDesktop = useSyncExternalStore(
    subscribeToDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false
  );
  // The eyes are drawn under the face: show nothing until the face is there to cover them.
  const [faceLoaded, setFaceLoaded] = useState(false);

  const frameRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const pupilsRef = useRef<SVGGElement>(null);
  const lidsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const head = headRef.current;
    const pupils = pupilsRef.current;
    const lids = lidsRef.current;
    if (!isDesktop || !frame || !head || !pupils || !lids) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Gaze direction, each axis in [-1, 1]: `target` is where the cursor is, `gaze` eases towards it.
    const target = { x: 0, y: 0 };
    const gaze = { x: 0, y: 0 };
    let raf = 0;
    let last = 0;

    const tick = (now: number) => {
      const ease = 1 - Math.exp(-Math.min(now - last, 50) / EASING_MS);
      last = now;
      gaze.x += (target.x - gaze.x) * ease;
      gaze.y += (target.y - gaze.y) * ease;
      const settled = Math.abs(target.x - gaze.x) + Math.abs(target.y - gaze.y) < 0.002;
      if (settled) {
        gaze.x = target.x;
        gaze.y = target.y;
      }

      frame.style.transform = `perspective(500px) rotateX(${-gaze.y * HEAD_TILT_DEG}deg) rotateY(${gaze.x * HEAD_TILT_DEG}deg)`;
      head.style.transform = `translate(${gaze.x * HEAD_TRAVEL.x}px, ${gaze.y * HEAD_TRAVEL.y}px)`;
      pupils.style.transform = `translate(${gaze.x * PUPIL_TRAVEL.x}px, ${gaze.y * PUPIL_TRAVEL.y}px)`;

      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const wake = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = frame.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy);
      const reach = distance / (distance + FOCUS_DISTANCE);
      target.x = distance ? (dx / distance) * reach : 0;
      target.y = distance ? (dy / distance) * reach : 0;
      wake();
    };

    const lookAhead = () => {
      target.x = 0;
      target.y = 0;
      wake();
    };

    let blinking: Animation | undefined;
    const blink = () => {
      if (blinking?.playState === "running") return; // rapid clicks: let the blink finish
      blinking = lids.animate(
        [
          { transform: "translateY(0)" },
          { transform: `translateY(${EYES.height}px)`, offset: 0.4 },
          { transform: "translateY(0)" },
        ],
        { duration: 190, easing: "ease-in-out" }
      );
    };

    let blinkTimer = 0;
    const scheduleBlink = () => {
      window.clearTimeout(blinkTimer);
      blinkTimer = window.setTimeout(() => {
        if (!document.hidden) blink();
        scheduleBlink();
      }, 2400 + Math.random() * 3600);
    };

    // Any click on the page makes him blink; the next spontaneous blink starts counting from there.
    const onPointerDown = () => {
      blink();
      scheduleBlink();
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.documentElement.addEventListener("mouseleave", lookAhead);
    scheduleBlink();

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(blinkTimer);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.documentElement.removeEventListener("mouseleave", lookAhead);
      frame.style.transform = "";
    };
  }, [isDesktop]);

  const center = ARTWORK / 2;

  return (
    <div
      ref={frameRef}
      className="rounded-full w-28 h-28 relative hidden lg:block -mt-4 overflow-hidden"
    >
      {isDesktop && (
        <svg
          viewBox={`0 0 ${ARTWORK} ${ARTWORK}`}
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label="profile picture"
          className={`w-full h-full transition-opacity duration-300 motion-reduce:transition-none ${
            faceLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <g
            transform={`translate(${center} ${center}) scale(${HEAD_SCALE}) translate(${-center} ${-center})`}
          >
            <g ref={headRef}>
              <rect {...EYES} fill={SCLERA} />
              <g ref={pupilsRef}>
                {PUPILS.map((pupil) => (
                  <ellipse
                    key={pupil.cx}
                    cx={pupil.cx}
                    cy={pupil.cy}
                    rx={PUPIL_RADIUS.x}
                    ry={PUPIL_RADIUS.y}
                  />
                ))}
              </g>
              {/* Eyelids: parked above the eyes, behind the forehead, and slid down to blink. */}
              <g ref={lidsRef}>
                <rect
                  x={EYES.x}
                  y={EYES.y - EYES.height}
                  width={EYES.width}
                  height={EYES.height}
                  fill={SKIN}
                />
                <rect x={EYES.x} y={EYES.y - 5} width={EYES.width} height={5} />
              </g>
              <image
                href="/pp-face.webp"
                width={ARTWORK}
                height={ARTWORK}
                onLoad={() => setFaceLoaded(true)}
              />
            </g>
          </g>
        </svg>
      )}
    </div>
  );
}
