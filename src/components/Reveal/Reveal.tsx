import type { ReactNode } from "react";
import { motion } from "motion/react";
import { inView, makeEntrance, stagger } from "../../lib/motion";
import type { EntranceName } from "../../lib/motion";

type Tag = "div" | "section" | "header" | "figure" | "li" | "ul" | "p" | "span";

interface RevealProps {
  children: ReactNode;
  /** entrance flavour — ignored when `staggerChildren` is set */
  variant?: EntranceName;
  /** seconds before the entrance starts */
  delay?: number;
  className?: string;
  as?: Tag;
  /**
   * Releases children that carry their own `variants` one after another.
   * This element then animates nothing itself.
   */
  staggerChildren?: number;
}

/**
 * Scroll-triggered entrance. Single place where the viewport threshold lives,
 * so every block on the page reacts at the same point in the scroll.
 */
export default function Reveal({
  children,
  variant = "rise",
  delay = 0,
  className,
  as = "div",
  staggerChildren,
}: RevealProps) {
  const Tag = motion[as];

  const variants =
    staggerChildren !== undefined
      ? stagger(staggerChildren, delay)
      : makeEntrance(variant, delay);

  return (
    <Tag className={className} variants={variants} initial="hidden" whileInView="show" viewport={inView}>
      {children}
    </Tag>
  );
}
