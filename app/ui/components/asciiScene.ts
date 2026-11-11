import {
  Camera,
  CanvasTexture,
  LinearFilter,
  Mesh,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { TEXT_COVER_GLSL, createTextMask } from "@/app/ui/components/textMask";

export interface AsciiOptions {
  /** Freezes the drifting pattern (prefers-reduced-motion). */
  reducedMotion: boolean;
}

export interface AsciiHandle {
  dispose(): void;
}

/** From empty to dense: the characters the light is drawn with. */
const RAMP = " .:-=+*#%@";
const FONT = `ui-monospace, "Cascadia Code", "SF Mono", Menlo, Consolas, monospace`;
const FONT_SIZE = 11;
const LINE_HEIGHT = 17;
/** The glyph sheet is drawn at twice the size so it stays sharp on dense screens. */
const SHEET_SCALE = 2;
/** Reach of the cursor light in CSS pixels: half the width of `.cursor-halo` in globals.css. */
const HALO_RADIUS = 450;
/** Light away from the cursor: the pattern stays faintly visible everywhere (the cursor light is 1). */
const AMBIENT_LIGHT = 0.32;
/** Overall brightness of the characters. */
const INTENSITY = 0.6;
/** Seconds the pattern keeps drifting after the cursor stops. */
const DRIFT_TIME = 0.5;
const MAX_PIXEL_RATIO = 2;

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  ${TEXT_COVER_GLSL}
  uniform sampler2D uSheet;
  uniform vec2 uCell;
  uniform vec3 uBackground;
  uniform vec3 uInk;
  uniform vec2 uPointer;
  uniform vec2 uViewport;
  uniform float uPixelRatio;
  uniform float uScroll;
  uniform float uTime;

  const float GLYPHS = ${RAMP.length.toFixed(1)};

  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float noise(vec2 p) {
    vec2 cell = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(cell), hash(cell + vec2(1.0, 0.0)), u.x),
      mix(hash(cell + vec2(0.0, 1.0)), hash(cell + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    // Viewport position in CSS pixels, y down: the pattern is pinned to the screen.
    vec2 view = vec2(gl_FragCoord.x / uPixelRatio, uViewport.y - gl_FragCoord.y / uPixelRatio);

    // The halo's light around the cursor, over a faint light everywhere.
    float reach = clamp(1.0 - distance(view, uPointer) / ${HALO_RADIUS.toFixed(1)}, 0.0, 1.0);
    float light = max(reach * reach * (3.0 - 2.0 * reach), ${AMBIENT_LIGHT.toFixed(2)});

    // Drifting noise sets how dense each character is; the light makes them denser.
    vec2 cell = floor(view / uCell);
    float drift = noise(cell * vec2(0.09, 0.16) + vec2(uTime * 0.4, -uTime * 0.25));
    float level = clamp(light * (0.25 + 1.1 * drift), 0.0, 0.999);

    vec2 inCell = fract(view / uCell);
    float glyph = floor(level * GLYPHS);
    float ink = texture2D(uSheet, vec2((glyph + inCell.x) / GLYPHS, 1.0 - inCell.y)).r;
    vec3 color = mix(uInk * 0.35, uInk, level) * ink * (0.3 + 0.6 * level) * ${INTENSITY.toFixed(2)};

    // The text scrolling over the pattern pushes it aside.
    color *= 1.0 - textCover(view, view + vec2(0.0, uScroll));
    gl_FragColor = vec4(uBackground + color, 1.0);
  }
`;

/** The ramp's characters side by side, white on black. */
function drawGlyphSheet() {
  const sheet = document.createElement("canvas");
  const context = sheet.getContext("2d");
  if (!context) throw new Error("2D canvas is not available");

  context.font = `${FONT_SIZE}px ${FONT}`;
  const cellWidth = Math.ceil(context.measureText("M").width);
  sheet.width = RAMP.length * cellWidth * SHEET_SCALE;
  sheet.height = LINE_HEIGHT * SHEET_SCALE;

  context.fillStyle = "#000";
  context.fillRect(0, 0, sheet.width, sheet.height);
  context.fillStyle = "#fff";
  context.font = `${FONT_SIZE * SHEET_SCALE}px ${FONT}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  [...RAMP].forEach((glyph, i) => {
    context.fillText(glyph, (i + 0.5) * cellWidth * SHEET_SCALE, sheet.height / 2);
  });
  return { sheet, cellWidth };
}

/**
 * A field of ASCII characters behind the page, faint everywhere and denser in
 * the cursor halo. It drifts while the cursor moves and keeps clear of the text.
 * Colours come from the site palette (--color-bg, --color-ink in globals.css).
 * Nothing is drawn while nothing changes.
 */
export function createAsciiBackground(
  canvas: HTMLCanvasElement,
  { reducedMotion }: AsciiOptions
): AsciiHandle {
  const renderer = new WebGLRenderer({
    canvas,
    antialias: false,
    depth: false,
    powerPreference: "low-power",
  });

  const { sheet, cellWidth } = drawGlyphSheet();
  const sheetTexture = new CanvasTexture(sheet);
  sheetTexture.minFilter = LinearFilter;
  sheetTexture.magFilter = LinearFilter;
  sheetTexture.generateMipmaps = false;

  let frame = 0;
  const invalidate = () => {
    if (!frame) frame = requestAnimationFrame(render);
  };
  const textMask = createTextMask(invalidate);

  const uniforms = {
    uSheet: { value: sheetTexture },
    uCell: { value: new Vector2(cellWidth, LINE_HEIGHT) },
    uBackground: { value: new Vector3() },
    uInk: { value: new Vector3() },
    // Until the mouse moves, the CSS halo sits in the top-left corner of the page.
    uPointer: { value: new Vector2(HALO_RADIUS, HALO_RADIUS) },
    uViewport: { value: new Vector2(1, 1) },
    uPixelRatio: { value: 1 },
    uScroll: { value: 0 },
    uTime: { value: 0 },
    uContentMask: { value: textMask.content },
    uContentSize: { value: textMask.contentSize },
    uStickyMask: { value: textMask.sticky },
    uStickyBox: { value: textMask.stickyBox },
  };
  const material = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    depthTest: false,
    depthWrite: false,
  });
  // The shader writes display values directly, so colours are given in sRGB as-is.
  const readPalette = () => {
    const style = getComputedStyle(document.documentElement);
    for (const [uniform, variable] of [
      [uniforms.uBackground, "--color-bg"],
      [uniforms.uInk, "--color-ink"],
    ] as const) {
      const [r, g, b] = style.getPropertyValue(variable).trim().split(/\s+/).map(Number);
      uniform.value.set(r, g, b).divideScalar(255);
    }
  };
  readPalette();

  const quad = new Mesh(new PlaneGeometry(2, 2), material);
  quad.frustumCulled = false;
  const scene = new Scene();
  scene.add(quad);
  const camera = new Camera(); // the quad is already in clip space

  let lastFrame = 0;
  let lastMove = -Infinity;

  function render(time: number) {
    frame = 0;
    const now = time / 1000;
    // The pattern drifts while the cursor moves and settles shortly after it stops.
    const drifting = !reducedMotion && now - lastMove < DRIFT_TIME;
    if (drifting) uniforms.uTime.value += lastFrame ? Math.min(now - lastFrame, 0.05) : 1 / 60;
    lastFrame = drifting ? now : 0;

    textMask.track();
    uniforms.uScroll.value = window.scrollY;
    renderer.render(scene, camera);
    if (drifting) invalidate();
  }

  const onResize = () => {
    const width = Math.max(canvas.clientWidth, 1);
    const height = Math.max(canvas.clientHeight, 1);
    const pixelRatio = Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height, false);
    uniforms.uViewport.value.set(width, height);
    uniforms.uPixelRatio.value = pixelRatio;
    invalidate();
  };

  const onMouseMove = (event: MouseEvent) => {
    uniforms.uPointer.value.set(event.clientX, event.clientY);
    lastMove = performance.now() / 1000;
    invalidate();
  };

  window.addEventListener("resize", onResize);
  window.addEventListener("mousemove", onMouseMove, { passive: true });
  window.addEventListener("scroll", invalidate, { passive: true });
  canvas.addEventListener("webglcontextrestored", invalidate);
  onResize();

  return {
    dispose() {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", invalidate);
      canvas.removeEventListener("webglcontextrestored", invalidate);
      textMask.dispose();
      sheetTexture.dispose();
      quad.geometry.dispose();
      material.dispose();
      // The canvas keeps its WebGL context for the next renderer (after a resize
      // across the breakpoint, say): hand it over clean.
      renderer.resetState();
      renderer.dispose();
    },
  };
}
