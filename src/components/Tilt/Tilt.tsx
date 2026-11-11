import type { PointerEvent, ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import "./Tilt.css";

interface TiltProps {
  children: ReactNode;
  className?: string;
  /** maximum rotation in degrees */
  max?: number;
  /** border-radius of the glare layer, to match the tilted surface */
  radius?: string;
}

/**
 * Leans its content towards the mouse in 3D, with a soft glare that follows
 * the pointer. Mouse-only — touch scrolling never triggers it.
 */
export default function Tilt({ children, className, max = 10, radius = "0" }: TiltProps) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 220, damping: 22 });
  const sy = useSpring(py, { stiffness: 220, damping: 22 });

  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const gx = useTransform(sx, (v) => `${v * 100}%`);
  const gy = useTransform(sy, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.45), rgba(255,255,255,0) 60%)`;
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 30 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    glareOpacity.set(1);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      className={`tilt${className ? ` ${className}` : ""}`}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
      {!reduce && (
        <motion.span
          className="tilt__glare"
          style={{ background: glare, opacity: glareOpacity, borderRadius: radius }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
}
