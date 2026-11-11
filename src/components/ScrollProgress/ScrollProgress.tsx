import { motion, useScroll, useSpring } from "motion/react";
import "./ScrollProgress.css";

/** Hairline at the very top of the viewport that fills as the page scrolls. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
