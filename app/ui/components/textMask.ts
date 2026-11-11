import { CanvasTexture, LinearFilter, Vector2, Vector4 } from "three";

/** The masks are drawn at a quarter of the page size: they only need soft shapes. */
const SCALE = 0.25;
/** Breathing room kept clear around every line of text, in CSS pixels. */
const PAD_X = 14;
const PAD_Y = 7;
const FEATHER = 16;

/** One box per rendered line of text inside `root`. */
function textBoxes(root: Element, accept: (element: Element) => boolean) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  const boxes: DOMRect[] = [];
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const parent = node.parentElement;
    if (!parent || !node.textContent?.trim() || !accept(parent)) continue;
    range.selectNodeContents(node);
    boxes.push(...range.getClientRects());
  }
  return boxes;
}

/** White, feathered boxes on black: white is where text sits. */
function paintBoxes(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  boxes: DOMRect[],
  originX: number,
  originY: number
) {
  canvas.width = Math.max(Math.ceil(width * SCALE), 1);
  canvas.height = Math.max(Math.ceil(height * SCALE), 1);
  const context = canvas.getContext("2d");
  if (!context) return;
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#fff";
  context.shadowColor = "#fff";
  context.shadowBlur = FEATHER * SCALE;
  for (const box of boxes) {
    context.fillRect(
      (box.left - originX - PAD_X) * SCALE,
      (box.top - originY - PAD_Y) * SCALE,
      (box.width + 2 * PAD_X) * SCALE,
      (box.height + 2 * PAD_Y) * SCALE
    );
  }
}

function createMaskTexture(canvas: HTMLCanvasElement) {
  const texture = new CanvasTexture(canvas);
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

/**
 * Where the page's text is, so a background can keep clear of it.
 * Two masks, because the page has two kinds of text: the content, which scrolls
 * (mapped in page coordinates), and the sticky header, which does not (mapped
 * inside the header's own box, whose position is read every frame).
 */
export function createTextMask(onChange: () => void) {
  const main = document.querySelector("main");
  const header = main?.querySelector("header") ?? null;
  const contentCanvas = document.createElement("canvas");
  const stickyCanvas = document.createElement("canvas");
  const content = createMaskTexture(contentCanvas);
  const sticky = createMaskTexture(stickyCanvas);
  const contentSize = new Vector2(1, 1);
  const stickyBox = new Vector4(0, 0, 1, 1);

  const measure = () => {
    if (!main) return;
    const page = main.getBoundingClientRect();
    paintBoxes(
      contentCanvas,
      page.width,
      page.height,
      textBoxes(main, (element) => !header?.contains(element)),
      page.left,
      page.top
    );
    contentSize.set(page.width, page.height);

    if (header) {
      const box = header.getBoundingClientRect();
      paintBoxes(stickyCanvas, box.width, box.height, textBoxes(header, () => true), box.left, box.top);
    }
    // The canvases may have changed size: let the textures be allocated again.
    content.dispose();
    sticky.dispose();
    content.needsUpdate = true;
    sticky.needsUpdate = true;
  };

  // Fonts loading, a language switch or a resize all move the text around.
  let scheduled = 0;
  const schedule = () => {
    if (scheduled) return;
    scheduled = requestAnimationFrame(() => {
      scheduled = 0;
      measure();
      onChange();
    });
  };
  const observer = new ResizeObserver(schedule);
  if (main) observer.observe(main);
  document.fonts?.ready.then(schedule);
  measure();

  return {
    content,
    sticky,
    /** Size of the page the content mask covers, in CSS pixels. */
    contentSize,
    /** Header box in the viewport (x, y, width, height), refreshed by `track()`. */
    stickyBox,
    track() {
      if (!header) return;
      const box = header.getBoundingClientRect();
      stickyBox.set(box.left, box.top, Math.max(box.width, 1), Math.max(box.height, 1));
    },
    dispose() {
      cancelAnimationFrame(scheduled);
      observer.disconnect();
      content.dispose();
      sticky.dispose();
    },
  };
}

/** GLSL: 0 over empty space, 1 where the page has text. Positions in CSS pixels, y down. */
export const TEXT_COVER_GLSL = /* glsl */ `
  uniform sampler2D uContentMask;
  uniform vec2 uContentSize;
  uniform sampler2D uStickyMask;
  uniform vec4 uStickyBox;

  float textCover(vec2 view, vec2 page) {
    float cover = texture2D(uContentMask, vec2(page.x / uContentSize.x, 1.0 - page.y / uContentSize.y)).r;
    vec2 inSticky = (view - uStickyBox.xy) / uStickyBox.zw;
    if (inSticky.x > 0.0 && inSticky.x < 1.0 && inSticky.y > 0.0 && inSticky.y < 1.0) {
      cover = max(cover, texture2D(uStickyMask, vec2(inSticky.x, 1.0 - inSticky.y)).r);
    }
    return smoothstep(0.0, 0.7, cover);
  }
`;
