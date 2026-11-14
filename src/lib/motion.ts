import type { Transition, Variants } from "motion/react";

/* One entrance for the whole site: a short, quiet rise with an expo-out
   landing. Anything louder would fight the black-on-white restraint. */

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const smooth = (duration = 0.6, delay = 0): Transition =>
  delay ? { duration, delay, ease: EASE } : { duration, ease: EASE };

export const rise = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: smooth(0.7, delay) },
});

/** Child variant for staggered lists — no own delay, the parent drives it. */
export const riseChild: Variants = rise();

export const stagger = (each = 0.06, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren: delay } },
});

/** Viewport trigger shared by every scroll-revealed block. */
export const inView = { once: true, amount: 0.2 } as const;
