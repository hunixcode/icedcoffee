import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import "./Marquee.css";

interface MarqueeProps {
  items: readonly string[];
  /** copies of the word list travelled per ~10s at rest */
  speed?: number;
  /** tilt of the band in degrees */
  angle?: number;
  /** white band with an ink outline instead of a solid ink band */
  inverted?: boolean;
  /** start travelling left-to-right */
  reverse?: boolean;
}

const COPIES = 4;
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * Endless band of words. Scrolling the page speeds it up and flips its
 * direction with the scroll, so the band feels physically tied to the page.
 */
export default function Marquee({ items, speed = 1, angle = -2, inverted = false, reverse = false }: MarqueeProps) {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1200, 0, 1200], [-4, 0, 4], { clamp: false });
  const direction = useRef(reverse ? -1 : 1);
  const x = useTransform(base, (v) => `${wrap(-100 / COPIES, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get() * (reverse ? -1 : 1);
    if (b < -0.05) direction.current = -1;
    else if (b > 0.05) direction.current = 1;
    const step = (speed * 2.5 / COPIES) * (Math.min(delta, 64) / 1000) * (1 + Math.abs(b));
    base.set(base.get() - direction.current * step);
  });

  return (
    <div className={`marquee${inverted ? " marquee--inverted" : ""}`} aria-hidden="true">
      <div className="marquee__band t-condensed" style={{ rotate: `${angle}deg` }}>
        <motion.div className="marquee__track" style={{ x }}>
          {Array.from({ length: COPIES }, (_, copy) => (
            <span key={copy} className="marquee__copy">
              {items.map((item) => (
                <span key={item} className="marquee__item">
                  <span className="marquee__word">{item}</span>
                  <span className="marquee__sep">✦</span>
                </span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
