import { useEffect, useState } from "react";
import { sections, site } from "../../data/site";
import type { SectionId } from "../../data/site";
import { useActiveSection } from "../../hooks/useActiveSection";
import Menu from "../Menu/Menu";
import "./Header.css";

/** Mirrors the breakpoint in Header.css where the inline links take over. */
const DESKTOP = "(min-width: 721px)";

const SPY_IDS: SectionId[] = ["home", ...sections.map((s) => s.id)];

/**
 * Plain white bar: the logo on the left, the section links on the right.
 * A hairline appears once content scrolls beneath it. Phones get a burger.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8);
  const active = useActiveSection(SPY_IDS, "home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The burger disappears on wide screens, so an open menu must not outlive it.
  useEffect(() => {
    const query = window.matchMedia(DESKTOP);
    const onChange = () => query.matches && setOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <header className={`header${scrolled || open ? " is-scrolled" : ""}`}>
        <div className="header__bar shell">
          <a className="header__logo" href="#home" aria-label={`${site.name} — back to top`}>
            {site.logo}
          </a>

          <nav className="header__nav" aria-label="Sections">
            <ul>
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    className="header__link t-mono"
                    href={`#${s.id}`}
                    aria-current={active === s.id ? "true" : undefined}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className={`burger${open ? " is-open" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <Menu open={open} active={active} onClose={() => setOpen(false)} />
    </>
  );
}
