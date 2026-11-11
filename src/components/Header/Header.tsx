import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { sections, site } from "../../data/site";
import type { SectionId } from "../../data/site";
import { useActiveSection } from "../../hooks/useActiveSection";
import { lift, pressable, smooth, spring } from "../../lib/motion";
import { useIntroDone } from "../../lib/intro";
import Menu from "../Menu/Menu";
import "./Header.css";

/** Mirrors the breakpoint in Header.css where the inline links take over. */
const DESKTOP = "(min-width: 761px)";

interface HeaderProps {
  onOpenContact?: () => void;
  /** Set on standalone pages; the scroll-spy only applies to the home sections. */
  page?: "contact";
}

/**
 * Floating capsule. Wide screens get the section links inline, with a marker
 * that slides under the active one; narrow screens fall back to the current
 * section's label and a burger that opens the full-screen menu.
 */
export default function Header({ onOpenContact, page }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8);

  // Transparent over the hero, frosted as soon as content slides beneath it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const introDone = useIntroDone();

  const ids = useMemo(() => sections.map((s) => s.id), []);
  const active = useActiveSection(ids, "home");
  const current = page ?? active;
  const currentLabel = page ?? sections.find((s) => s.id === active)?.label ?? "home";

  const goTo = useCallback((id: SectionId) => {
    setOpen(false);
    const target = document.getElementById(id);
    if (!target) {
      // Not on the home page (e.g. contact): App swaps back on the hash change and scrolls there.
      window.location.hash = `#${id}`;
      return;
    }

    window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
    });
  }, []);

  // The burger disappears on wide screens, so an open menu must not outlive it.
  useEffect(() => {
    const query = window.matchMedia(DESKTOP);
    const onChange = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  /* Marker geometry is measured rather than left to a shared layout animation:
     the bar is fixed, and layout projection inside fixed elements drifts while
     the page scrolls. The observer also fires once on observe (first measure)
     and again whenever the web font lands and the links change width. */
  const list = useRef<HTMLUListElement>(null);
  const [marker, setMarker] = useState<{ x: number; width: number } | null>(null);

  useLayoutEffect(() => {
    const el = list.current;
    if (!el) return;

    const measure = () => {
      const link = el.querySelector<HTMLElement>('[aria-current="true"]');
      setMarker(link ? { x: link.offsetLeft, width: link.offsetWidth } : null);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [current]);

  return (
    <>
      <motion.header
        className={`header${scrolled || open ? " is-scrolled" : ""}`}
        initial={{ opacity: 0, y: -14 }}
        animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }}
        transition={smooth(0.6, 0.05)}
      >
        <div className="header__bar">
          <motion.a
            className="header__logo t-display"
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              goTo("home");
            }}
            aria-label={`${site.name} — back to top`}
            {...pressable}
          >
            {site.logo}
          </motion.a>

          <nav className="header__nav" aria-label="Sections">
            <ul ref={list}>
              <motion.li
                className="header__marker"
                aria-hidden="true"
                initial={false}
                animate={marker ? { ...marker, opacity: 1 } : { opacity: 0 }}
                transition={spring.gentle}
              />
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    className="header__link"
                    href={`#${section.id}`}
                    aria-current={current === section.id ? "true" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(section.id);
                    }}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* `mode="wait"` so the two labels never overlap — in sync mode the
              outgoing and incoming text stack in the same grid cell and read as
              doubled/ghosted text. The cell's min-width keeps the layout still
              during the gap. */}
          <span className="header__current" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={currentLabel}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={smooth(0.2)}
              >
                {currentLabel}
              </motion.span>
            </AnimatePresence>
          </span>

          <motion.a
            className="header__cta"
            href="#contact"
            aria-current={page === "contact" ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              onOpenContact?.();
            }}
            {...lift}
          >
            contact
          </motion.a>

          <button
            type="button"
            className={`burger${open ? " is-open" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="burger__bar" />
            <span className="burger__bar" />
            <span className="burger__bar" />
          </button>
        </div>
      </motion.header>

      <Menu open={open} active={current} onNavigate={goTo} onOpenContact={onOpenContact} onClose={() => setOpen(false)} />
    </>
  );
}
