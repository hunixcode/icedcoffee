import type { ReactNode } from "react";
import { motion } from "motion/react";
import { inView, rise, stagger } from "../../lib/motion";

type Tag = "div" | "header" | "ul" | "p";

interface RevealProps {
  children: ReactNode;
  /** seconds before the entrance starts */
  delay?: number;
  className?: string;
  as?: Tag;
  /**
   * Releases children that carry `riseChild` one after another; this element
   * then animates nothing itself.
   */
  staggerChildren?: number;
}

/** Scroll-triggered entrance: the one place the viewport threshold lives. */
export default function Reveal({ children, delay = 0, className, as = "div", staggerChildren }: RevealProps) {
  const Tag = motion[as];
  const variants = staggerChildren !== undefined ? stagger(staggerChildren, delay) : rise(delay);

  return (
    <Tag className={className} variants={variants} initial="hidden" whileInView="show" viewport={inView}>
      {children}
    </Tag>
  );
}
