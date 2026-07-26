import type { Transition, Variants } from "motion/react";

/* ==========================================================================
   Motion vocabulary
   --------------------------------------------------------------------------
   Three flavours, used deliberately:

   · smooth  — expo-out tween. The house curve for anything that travels
               (headlines rising, slides sliding). Fast out, long soft landing.
   · bouncy  — spring with low damping. Reserved for small playful objects
               (the sprite, the star, the cup, icons, buttons under the cursor).
   · fade    — plain opacity. For text bodies and overlays, where movement
               would only add noise.

   Note: helpers below omit `delay` entirely when it is 0. An explicit
   `delay: 0` inside a child variant would cancel a parent's `staggerChildren`.
   ========================================================================== */

type Cubic = [number, number, number, number];

/** expo-out */
export const EASE_SMOOTH: Cubic = [0.22, 1, 0.36, 1];
/** back-out — overshoots ~10%; the CSS mirror of `spring.bouncy` */
export const EASE_BACK: Cubic = [0.34, 1.56, 0.64, 1];

const SPRINGS = {
  /** visible overshoot — playful */
  bouncy: { type: "spring", stiffness: 400, damping: 15, mass: 0.8 },
  /** settles without overshooting — for larger surfaces */
  gentle: { type: "spring", stiffness: 220, damping: 26 },
  /** snappy, for pointer feedback */
  press: { type: "spring", stiffness: 550, damping: 30 },
} satisfies Record<string, Transition>;

export const spring = SPRINGS;

export const smooth = (duration = 0.6, delay = 0): Transition =>
  delay ? { duration, delay, ease: EASE_SMOOTH } : { duration, ease: EASE_SMOOTH };

export const fade = (duration = 0.5, delay = 0): Transition =>
  delay ? { duration, delay, ease: "easeOut" } : { duration, ease: "easeOut" };

const bouncy = (delay = 0): Transition =>
  delay ? { ...SPRINGS.bouncy, delay } : SPRINGS.bouncy;

const gentle = (delay = 0): Transition =>
  delay ? { ...SPRINGS.gentle, delay } : SPRINGS.gentle;

/* ---- entrances ---------------------------------------------------------- */

const BUILDERS = {
  /** travels up, expo-out — the default */
  rise: (delay: number): Variants => ({
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: smooth(0.62, delay) },
  }),

  /** travels up on a spring — lands with a small bounce */
  bounce: (delay: number): Variants => ({
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: bouncy(delay) },
  }),

  /** scales in from small — the playful one */
  pop: (delay: number): Variants => ({
    hidden: { opacity: 0, scale: 0.62 },
    show: { opacity: 1, scale: 1, transition: bouncy(delay) },
  }),

  /** opacity only */
  fade: (delay: number): Variants => ({
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: fade(0.55, delay) },
  }),

  /** opacity with a short, restrained lift */
  fadeUp: (delay: number): Variants => ({
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: smooth(0.5, delay) },
  }),

  /** larger surfaces easing into place */
  settle: (delay: number): Variants => ({
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1, transition: gentle(delay) },
  }),
} as const;

export type EntranceName = keyof typeof BUILDERS;

/** Entrance with a delay baked into the variant (safe for standalone blocks). */
export const makeEntrance = (name: EntranceName, delay = 0): Variants =>
  BUILDERS[name](delay);

/**
 * Delay-free entrances — use these on children of a staggered container so the
 * parent's `staggerChildren` timing is what actually drives them.
 */
export const entrance = {
  rise: BUILDERS.rise(0),
  bounce: BUILDERS.bounce(0),
  pop: BUILDERS.pop(0),
  fade: BUILDERS.fade(0),
  fadeUp: BUILDERS.fadeUp(0),
  settle: BUILDERS.settle(0),
} as const;

/** Parent variant that releases its children one after another. */
export const stagger = (each = 0.07, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren: delay } },
});

/* ---- pointer feedback --------------------------------------------------- */

/** Bouncy lift for wide buttons. Spread onto any motion component. */
export const lift = {
  whileHover: { y: -3, scale: 1.03, transition: SPRINGS.bouncy },
  whileTap: { y: 0, scale: 0.96, transition: SPRINGS.press },
} as const;

/** Same idea without vertical travel — for square and circular controls. */
export const pressable = {
  whileHover: { scale: 1.09, transition: SPRINGS.bouncy },
  whileTap: { scale: 0.94, transition: SPRINGS.press },
} as const;

/** Viewport trigger shared by every scroll-revealed block. */
export const inView = { once: true, amount: 0.25 } as const;
