import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { sections, site, socials } from "../../data/site";
import type { SectionId } from "../../data/site";
import { useBodyLock } from "../../hooks/useBodyLock";
import { fade, smooth, spring } from "../../lib/motion";
import "./Menu.css";

interface MenuProps {
  open: boolean;
  active: SectionId;
  onNavigate: (id: SectionId) => void;
  onOpenContact?: () => void;
  onClose: () => void;
}

export default function Menu({ open, active, onNavigate, onOpenContact, onClose }: MenuProps) {
  useBodyLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
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
          transition={fade(0.26)}
        >
          <nav className="menu__inner shell">
            <ul className="menu__list">
              {sections.map((section, i) => (
                <motion.li
                  key={section.id}
                  initial={{ opacity: 0, y: 34 }}
                  animate={{ opacity: 1, y: 0, transition: { ...spring.bouncy, delay: 0.08 + i * 0.06 } }}
                  exit={{ opacity: 0, y: 14, transition: smooth(0.18) }}
                >
                  <button
                    type="button"
                    className={`menu__link t-condensed${
                      active === section.id ? " is-active" : ""
                    }`}
                    onClick={() => onNavigate(section.id)}
                  >
                    <span className="menu__index t-mono">0{i + 1}</span>
                    {section.label}
                  </button>
                </motion.li>
              ))}

              <motion.li
                key="contact-page"
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0, transition: { ...spring.bouncy, delay: 0.08 + sections.length * 0.06 } }}
                exit={{ opacity: 0, y: 14, transition: smooth(0.18) }}
              >
                <button
                  type="button"
                  className="menu__link t-condensed"
                  onClick={() => {
                    onClose();
                    onOpenContact?.();
                  }}
                >
                  <span className="menu__index t-mono">0{sections.length + 1}</span>
                  contact
                </button>
              </motion.li>
            </ul>

            <motion.div
              className="menu__foot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: fade(0.4, 0.3) }}
              exit={{ opacity: 0, transition: fade(0.15) }}
            >
              <ul className="menu__socials t-mono">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>

              <a className="menu__mail t-mono" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
