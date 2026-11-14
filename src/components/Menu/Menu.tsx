import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { sections, site, socials } from "../../data/site";
import type { SectionId } from "../../data/site";
import { useBodyLock } from "../../hooks/useBodyLock";
import { smooth } from "../../lib/motion";
import "./Menu.css";

interface MenuProps {
  open: boolean;
  active: SectionId;
  onClose: () => void;
}

/** Full-screen white sheet for phones: big bold links, socials underneath. */
export default function Menu({ open, active, onClose }: MenuProps) {
  useBodyLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="site-menu"
          className="menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={smooth(0.25)}
        >
          <nav className="menu__inner shell">
            <ul className="menu__list">
              {sections.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0, transition: smooth(0.5, 0.05 + i * 0.04) }}
                >
                  <a
                    className={`menu__link${active === s.id ? " is-active" : ""}`}
                    href={`#${s.id}`}
                    onClick={onClose}
                  >
                    <span className="menu__dot" aria-hidden="true" />
                    {s.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="menu__foot t-mono">
              <ul className="menu__socials">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a className="link" href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a className="link" href={`mailto:${site.contactEmail}`}>
                {site.contactEmail}
              </a>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
