import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { sections, site } from "../../data/site";
import type { SectionId } from "../../data/site";
import { useActiveSection } from "../../hooks/useActiveSection";
import { pressable, smooth } from "../../lib/motion";
import Menu from "../Menu/Menu";
import "./Header.css";

interface HeaderProps {
  onOpenContact?: () => void;
}

export default function Header({ onOpenContact }: HeaderProps) {
  const [open, setOpen] = useState(false);

  const ids = useMemo(() => sections.map((s) => s.id), []);
  const active = useActiveSection(ids, "home");
  const activeLabel = sections.find((s) => s.id === active)?.label ?? "home";

  const goTo = useCallback((id: SectionId) => {
    setOpen(false);
    const target = document.getElementById(id);
    if (!target) return;

    window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
    });
  }, []);

  return (
    <>
      <motion.header
        className="header"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={smooth(0.6, 0.05)}
      >
        <div className="header__inner shell">
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

          {/* `mode="wait"` so the two labels never overlap — in sync mode the
              outgoing and incoming text stack in the same grid cell and read as
              doubled/ghosted text. The cell's min-width keeps the layout still
              during the gap. */}
          <span className="header__current t-mono" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={activeLabel}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={smooth(0.2)}
              >
                {activeLabel}
              </motion.span>
            </AnimatePresence>
          </span>

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

      <Menu open={open} active={active} onNavigate={goTo} onOpenContact={onOpenContact} onClose={() => setOpen(false)} />
    </>
  );
}
