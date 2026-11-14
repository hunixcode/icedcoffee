import { useEffect } from "react";

/* ==========================================================================
   Day → night on scroll.
   --------------------------------------------------------------------------
   The page starts black on white and turns white on black while the visitor
   leaves the landing. Every colour token in index.css is rewritten inline on
   <html>, so components only ever read var(--…) and need no theme logic.

   Two clocks, so text never sits grey on grey for long:
   · surfaces (background, hairlines) follow the scroll smoothly;
   · ink (text, buttons, icons) flips over a short window around the middle.
   ========================================================================== */

type RGBA = [number, number, number, number];

interface Token {
  name: string;
  light: RGBA;
  dark: RGBA;
  /** "surface" follows the scroll, "ink" flips around the midpoint */
  clock: "surface" | "ink";
}

const TOKENS: Token[] = [
  { name: "--bg", light: [255, 255, 255, 1], dark: [11, 11, 11, 1], clock: "surface" },
  { name: "--bg-soft", light: [246, 246, 245, 1], dark: [24, 24, 24, 1], clock: "surface" },
  { name: "--line", light: [0, 0, 0, 0.1], dark: [255, 255, 255, 0.12], clock: "surface" },
  { name: "--ink", light: [11, 11, 11, 1], dark: [242, 242, 240, 1], clock: "ink" },
  { name: "--ink-2", light: [46, 46, 46, 1], dark: [200, 200, 198, 1], clock: "ink" },
  { name: "--muted", light: [110, 110, 110, 1], dark: [140, 140, 140, 1], clock: "ink" },
  { name: "--line-strong", light: [0, 0, 0, 0.85], dark: [255, 255, 255, 0.8], clock: "ink" },
  { name: "--btn-bg", light: [34, 34, 34, 1], dark: [242, 242, 240, 1], clock: "ink" },
  { name: "--btn-hover", light: [0, 0, 0, 1], dark: [255, 255, 255, 1], clock: "ink" },
  { name: "--btn-ink", light: [255, 255, 255, 1], dark: [11, 11, 11, 1], clock: "ink" },
];

/** Where the night starts and ends, as fractions of the landing's height. */
const START = 0.25;
const END = 0.92;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smoothstep = (a: number, b: number, v: number) => {
  const x = clamp01((v - a) / (b - a));
  return x * x * (3 - 2 * x);
};

const mix = (a: RGBA, b: RGBA, t: number) => {
  const c = a.map((v, i) => v + (b[i] - v) * t);
  return `rgba(${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])}, ${c[3].toFixed(3)})`;
};

export function useScrollTheme(heroId: string): void {
  useEffect(() => {
    const root = document.documentElement;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    let frame = 0;
    let last = -1;

    const apply = () => {
      frame = 0;
      const hero = document.getElementById(heroId);
      const span = hero?.offsetHeight || window.innerHeight;
      const progress = (window.scrollY - span * START) / (span * (END - START));

      const surface = smoothstep(0, 1, progress);
      // Rounded so a still page stops writing styles.
      const key = Math.round(surface * 1000);
      if (key === last) return;
      last = key;

      const ink = smoothstep(0.4, 0.6, surface);
      for (const token of TOKENS) {
        root.style.setProperty(token.name, mix(token.light, token.dark, token.clock === "ink" ? ink : surface));
      }
      // Black pictograms (github, star, cup…) turn white with the text.
      root.style.setProperty("--invert", ink.toFixed(3));
      root.style.colorScheme = surface > 0.5 ? "dark" : "light";
      meta?.setAttribute("content", mix(TOKENS[0].light, TOKENS[0].dark, surface));
    };

    const schedule = () => {
      if (frame === 0) frame = window.requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [heroId]);
}
