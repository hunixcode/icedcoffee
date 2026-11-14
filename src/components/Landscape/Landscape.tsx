import { motion, useScroll, useTransform } from "motion/react";
import "./Landscape.css";

/* ==========================================================================
   Monochrome mountains behind the landing.
   --------------------------------------------------------------------------
   Ridges are generated once by midpoint displacement from a fixed seed, so the
   skyline is identical on every visit and costs no image request. The layer is
   fixed to the viewport; scrolling blurs it, lifts it slightly and fades it
   out while the page turns to night (see useScrollTheme).
   ========================================================================== */

const W = 1600;
const H = 900;

/** Tiny seeded PRNG (mulberry32). */
function random(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** One ridge line as a closed SVG path, filled down to the bottom edge. */
function ridge(seed: number, base: number, height: number, roughness: number): string {
  const rand = random(seed);
  const n = 256;
  const ys = new Array<number>(n + 1).fill(0);
  ys[0] = rand();
  ys[n] = rand();

  for (let step = n, scale = 1; step > 1; step /= 2, scale *= roughness) {
    const half = step / 2;
    for (let i = half; i < n; i += step) {
      ys[i] = (ys[i - half] + ys[i + half]) / 2 + (rand() * 2 - 1) * scale;
    }
  }

  const min = Math.min(...ys);
  const max = Math.max(...ys);
  const points = ys.map((y, i) => `${((i / n) * W).toFixed(1)},${(base - ((y - min) / (max - min)) * height).toFixed(1)}`);
  return `M0,${H}L${points.join("L")}L${W},${H}Z`;
}

/* Far → near: lighter and taller at the back, darker and lower in front —
   plain atmospheric perspective, in five greys. */
const RIDGES = [
  { d: ridge(11, 600, 300, 0.5), fill: "#ececec", mist: 470 },
  { d: ridge(23, 660, 230, 0.52), fill: "#dcdcdc", mist: 540 },
  { d: ridge(37, 730, 180, 0.55), fill: "#c4c4c4", mist: 620 },
  { d: ridge(41, 810, 140, 0.58), fill: "#9f9f9f", mist: 700 },
  { d: ridge(59, 880, 100, 0.6), fill: "#6f6f6f", mist: 0 },
];

export default function Landscape() {
  const { scrollY } = useScroll();
  // 0 at the top of the page, 1 once the first screen has been scrolled away.
  const progress = useTransform(scrollY, (y) => Math.min(1, y / (window.innerHeight * 0.85)));

  const opacity = useTransform(progress, [0.1, 1], [1, 0]);
  const filter = useTransform(progress, (p) => `blur(${(p * 14).toFixed(2)}px)`);
  const scale = useTransform(progress, [0, 1], [1, 1.06]);
  const y = useTransform(progress, [0, 1], ["0%", "-4%"]);
  // Once invisible, take the blurred layer out of compositing entirely.
  const visibility = useTransform(progress, (p) => (p >= 1 ? "hidden" : "visible"));

  return (
    <motion.div className="landscape" aria-hidden="true" style={{ opacity, filter, scale, y, visibility }}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice">
        <defs>
          {/* Mist pooling in each valley, tinted with the page background so
              it never reads as a white band. It fades in over 130 units and
              then holds all the way down (the nearer ridge covers the rest). */}
          {RIDGES.slice(0, -1).map((r, i) => (
            <linearGradient
              key={i}
              id={`mist-${i}`}
              gradientUnits="userSpaceOnUse"
              x1={0}
              y1={r.mist}
              x2={0}
              y2={r.mist + 130}
            >
              <stop offset="0" style={{ stopColor: "var(--bg)", stopOpacity: 0 }} />
              <stop offset="1" style={{ stopColor: "var(--bg)", stopOpacity: 0.6 }} />
            </linearGradient>
          ))}
        </defs>

        <circle cx={1290} cy={250} r={60} fill="#ebebeb" />

        {RIDGES.map((r, i) => (
          <g key={i}>
            <path d={r.d} fill={r.fill} />
            {i < RIDGES.length - 1 && <rect x={0} y={r.mist} width={W} height={H - r.mist} fill={`url(#mist-${i})`} />}
          </g>
        ))}
      </svg>
    </motion.div>
  );
}
