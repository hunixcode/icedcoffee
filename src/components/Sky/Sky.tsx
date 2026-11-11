import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import "./Sky.css";

/* ==========================================================================
   Night sky at dusk, drawn in chunky pixels.
   --------------------------------------------------------------------------
   One fixed, low-resolution canvas scaled up with `image-rendering: pixelated`:
   a dusk gradient, twinkling stars, the odd shooting star and three ridges of
   mountains. The horizon sits at the bottom of the hero and sinks as the page
   scrolls, so the rest of the site reads as the night that follows.
   ========================================================================== */

/** CSS pixels per canvas pixel — the size of one "pixel-art" pixel. */
const PX = 3;
const STAR_COUNT = 150;

/** Dusk palette (top → horizon), then the colour of the ground. */
const SKY: [number, string][] = [
  [0, "#09071a"],
  [0.38, "#151136"],
  [0.62, "#361b5b"],
  [0.82, "#8a2d74"],
  [0.93, "#d0577a"],
  [1, "#f08c6c"],
];
const GROUND = "#0c0819";

/** Mountain layers, far → near: colour, height (fraction of the view), parallax. */
const RIDGES = [
  { color: "#3a1d5c", height: 0.17, parallax: 0.35, seed: 1.7 },
  { color: "#22123d", height: 0.12, parallax: 0.6, seed: 4.1 },
  { color: GROUND, height: 0.075, parallax: 1, seed: 8.3 },
];

type Star = { x: number; y: number; size: number; phase: number; speed: number; depth: number };
type Meteor = { x: number; y: number; vx: number; vy: number; life: number };

const rand = (min: number, max: number) => min + Math.random() * (max - min);

/** Cheap 1D value: a few layered sines, so ridges look irregular but stay seamless. */
const ridge = (x: number, seed: number) =>
  0.5 +
  0.28 * Math.sin(x * 0.011 + seed) +
  0.14 * Math.sin(x * 0.027 + seed * 2.3) +
  0.07 * Math.sin(x * 0.061 + seed * 5.1) +
  0.03 * Math.sin(x * 0.17 + seed * 7.7);

export default function Sky() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let w = 0;
    let h = 0;
    let horizon0 = 0;
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(),
      y: Math.random() ** 1.6, // denser near the top, fading towards the glow
      size: Math.random() < 0.07 ? 2 : 1,
      phase: rand(0, Math.PI * 2),
      speed: rand(0.6, 2.2),
      depth: rand(0.02, 0.12),
    }));
    let meteor: Meteor | null = null;
    let nextMeteor = performance.now() + rand(2500, 6000);
    let pointer = 0;
    let pointerTarget = 0;

    const resize = () => {
      w = Math.ceil(innerWidth / PX);
      h = Math.ceil(innerHeight / PX);
      canvas.width = w;
      canvas.height = h;
      // Horizon near the bottom of the first screen (the hero is one screen tall).
      horizon0 = h * (innerWidth < 700 ? 0.94 : 0.9);
    };

    const draw = (t: number) => {
      const scroll = scrollY / PX;
      const horizon = horizon0 + scroll * 0.45; // the sun sets: the horizon sinks as the page scrolls
      pointer += (pointerTarget - pointer) * 0.04;

      // Sky — the gradient is anchored to the horizon, so the glow travels with it.
      const top = horizon - h * 1.1;
      const gradient = ctx.createLinearGradient(0, top, 0, horizon);
      for (const [stop, color] of SKY) gradient.addColorStop(stop, color);
      ctx.fillStyle = SKY[0][1];
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, Math.max(0, top), w, Math.min(h, horizon) - Math.max(0, top));

      // Stars, fading out as they near the warm glow.
      for (const s of stars) {
        const y = (((s.y * h - scroll * s.depth) % h) + h) % h;
        const fade = Math.max(0, Math.min(1, (horizon - h * 0.28 - y) / (h * 0.35)));
        if (fade <= 0) continue;
        const twinkle = reduce ? 0.8 : 0.45 + 0.55 * Math.abs(Math.sin(t * 0.001 * s.speed + s.phase));
        ctx.globalAlpha = twinkle * fade;
        ctx.fillStyle = s.size === 2 ? "#ffffff" : "#d9d0ff";
        const x = Math.round(((s.x * w - pointer * s.depth * 40) % w + w) % w);
        ctx.fillRect(x, Math.round(y), s.size, s.size);
        if (s.size === 2 && twinkle > 0.92) {
          // little cross flare on the brightest ones
          ctx.globalAlpha = (twinkle - 0.92) * 8 * fade * 0.6;
          ctx.fillRect(x - 1, Math.round(y) + 0.5, 4, 1);
          ctx.fillRect(x + 0.5, Math.round(y) - 1, 1, 4);
        }
      }
      ctx.globalAlpha = 1;

      // Shooting star.
      if (!reduce) {
        if (!meteor && t > nextMeteor) {
          meteor = { x: rand(w * 0.2, w * 0.95), y: rand(0, h * 0.3), vx: -rand(1.4, 2.2), vy: rand(0.5, 0.9), life: 1 };
        }
        if (meteor) {
          meteor.x += meteor.vx;
          meteor.y += meteor.vy;
          meteor.life -= 0.018;
          for (let i = 0; i < 14; i++) {
            ctx.globalAlpha = meteor.life * (1 - i / 14);
            ctx.fillStyle = i === 0 ? "#ffffff" : "#c9bbff";
            ctx.fillRect(Math.round(meteor.x - meteor.vx * i * 0.8), Math.round(meteor.y - meteor.vy * i * 0.8), 1, 1);
          }
          ctx.globalAlpha = 1;
          if (meteor.life <= 0) {
            meteor = null;
            nextMeteor = t + rand(4000, 9000);
          }
        }
      }

      // Mountains, far to near, then solid ground below the nearest ridge.
      if (horizon > -h * 0.2) {
        for (const r of RIDGES) {
          ctx.fillStyle = r.color;
          const offset = scroll * r.parallax * 0.6 + pointer * r.parallax * 12;
          const base = horizon + (1 - r.parallax) * h * 0.02;
          for (let x = 0; x < w; x++) {
            const peak = Math.round(base - ridge(x + offset, r.seed) * r.height * h);
            if (peak < h) ctx.fillRect(x, Math.max(0, peak), 1, h - Math.max(0, peak));
          }
        }
      }
      if (horizon < h) {
        ctx.fillStyle = GROUND;
        ctx.fillRect(0, Math.max(0, Math.round(horizon)), w, h);
      }
    };

    resize();
    let frame = 0;
    const loop = (t: number) => {
      draw(t);
      frame = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      pointerTarget = (e.clientX / innerWidth) * 2 - 1;
    };
    const redraw = () => draw(performance.now());

    window.addEventListener("resize", resize);
    if (reduce) {
      redraw();
      window.addEventListener("scroll", redraw, { passive: true });
      window.addEventListener("resize", redraw);
    } else {
      window.addEventListener("pointermove", onMove);
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", redraw);
      window.removeEventListener("resize", redraw);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduce]);

  return <canvas ref={ref} className="sky" aria-hidden="true" />;
}
