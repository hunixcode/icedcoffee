import { lazy, Suspense, useEffect } from "react";
import { useMotionValue, useReducedMotion, useScroll, useSpring } from "motion/react";
import "./Background3D.css";

// three.js is heavy — keep it out of the main bundle.
const Shapes = lazy(() => import("./Shapes"));

/* Fixed backdrop of random 3D shapes. Scroll and pointer are smoothed here
   and handed to the WebGL loop as motion values. */
export default function Background3D() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 20 });
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 50, damping: 18 });
  const py = useSpring(my, { stiffness: 50, damping: 18 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / innerWidth) * 2 - 1);
      my.set((e.clientY / innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  if (reduce) return null;

  return (
    <div className="bg3d" aria-hidden="true">
      <Suspense fallback={null}>
        <Shapes progress={progress} px={px} py={py} />
      </Suspense>
    </div>
  );
}
