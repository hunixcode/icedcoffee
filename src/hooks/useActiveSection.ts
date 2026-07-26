import { useEffect, useState } from "react";
import type { SectionId } from "../data/site";

/** Where the "you are here" line sits, as a fraction of viewport height. */
const REFERENCE_LINE = 0.42;

/**
 * Scroll-spy driven by a single reference line rather than intersection
 * ratios.
 *
 * Ratio-based spying oscillates: at a boundary two sections report nearly
 * identical ratios and the winner flips back and forth every frame, which made
 * the header label re-mount continuously (the flicker). Sections are
 * contiguous, so exactly one of them contains the reference line at any scroll
 * offset — that makes the result monotonic and impossible to oscillate.
 */
export function useActiveSection(ids: SectionId[], fallback: SectionId): SectionId {
  const [active, setActive] = useState<SectionId>(fallback);

  useEffect(() => {
    let frame = 0;

    const compute = () => {
      frame = 0;
      const line = window.innerHeight * REFERENCE_LINE;
      let current = ids[0] ?? fallback;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        // last section whose top has already crossed the line
        if (el.getBoundingClientRect().top <= line) current = id;
      }

      // Snap to the last section once the page bottom is reached, otherwise a
      // short final section can never win.
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = ids[ids.length - 1] ?? current;

      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, fallback]);

  return active;
}
