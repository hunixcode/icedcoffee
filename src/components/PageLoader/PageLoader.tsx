import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useReducedMotion } from "motion/react";
import { site } from "../../data/site";
import { useBodyLock } from "../../hooks/useBodyLock";
import "./PageLoader.css";

/* Timeline (ms). The exit values mirror the delays/durations in PageLoader.css:
   the mark slides out, then two stacked panels lift like a curtain. */

/** Longest we wait for the display font before showing the mark anyway. */
const FONT_TIMEOUT = 1200;
/** The mark's own entrance gets to land before the curtain may lift. */
const MIN_SHOW = 800;
/** After the exit starts: the curtain is about to clear the middle of the screen. */
const REVEAL_AT = 700;
/** After the exit starts: the trailing panel is fully off-screen. */
const EXIT_DURATION = 1320;

type LoaderPhase = "loading" | "leaving" | "done";

interface PageLoaderProps {
  modulesReady: boolean;
  /** Fired while the curtain lifts — the cue for the page's own entrance. */
  onReveal: () => void;
}

export default function PageLoader({ modulesReady, onReveal }: PageLoaderProps) {
  const reduceMotion = useReducedMotion();
  const [pageLoaded, setPageLoaded] = useState(() => document.readyState === "complete");
  const [armed, setArmed] = useState(false);
  const [settled, setSettled] = useState(false);
  const [phase, setPhase] = useState<LoaderPhase>("loading");

  useBodyLock(phase !== "done");

  useEffect(() => {
    if (pageLoaded) return;

    const onLoad = () => setPageLoaded(true);
    window.addEventListener("load", onLoad, { once: true });
    return () => window.removeEventListener("load", onLoad);
  }, [pageLoaded]);

  // Hold the mark back until its font is in, so it never swaps mid-animation.
  useEffect(() => {
    let cancelled = false;
    const arm = () => {
      if (!cancelled) setArmed(true);
    };

    const timeout = window.setTimeout(arm, FONT_TIMEOUT);
    document.fonts.load('600 1em "Bricolage Grotesque"').then(arm, arm);
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!armed) return;

    const timeout = window.setTimeout(() => setSettled(true), MIN_SHOW);
    return () => window.clearTimeout(timeout);
  }, [armed]);

  useEffect(() => {
    if (!pageLoaded || !modulesReady || phase !== "loading") return;
    if (!settled && !reduceMotion) return;

    const frame = window.requestAnimationFrame(() => setPhase("leaving"));
    return () => window.cancelAnimationFrame(frame);
  }, [modulesReady, pageLoaded, phase, settled, reduceMotion]);

  useEffect(() => {
    if (phase !== "leaving") return;

    const reveal = window.setTimeout(onReveal, reduceMotion ? 0 : REVEAL_AT);
    const done = window.setTimeout(() => setPhase("done"), reduceMotion ? 0 : EXIT_DURATION);
    return () => {
      window.clearTimeout(reveal);
      window.clearTimeout(done);
    };
  }, [phase, reduceMotion, onReveal]);

  if (phase === "done") return null;

  const isLeaving = phase === "leaving";
  const className = [
    "page-loader",
    armed && "page-loader--armed",
    isLeaving && "page-loader--leaving",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className} role="status" aria-live="polite" aria-atomic="true" aria-hidden={isLeaving}>
      <div className="page-loader__panel page-loader__panel--back" />

      <div className="page-loader__panel page-loader__panel--front">
        <div className="page-loader__brand" aria-hidden="true">
          <span className="page-loader__mark">
            {[...site.logo].map((letter, i) => (
              <span key={i} className="page-loader__letter" style={{ "--i": i } as CSSProperties}>
                {letter}
              </span>
            ))}
          </span>
          <span className="page-loader__bar" />
        </div>
      </div>

      <span className="page-loader__sr-only">Loading page</span>
    </div>
  );
}
