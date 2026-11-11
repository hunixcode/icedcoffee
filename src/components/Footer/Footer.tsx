import { motion } from "motion/react";
import { sections, site, socials } from "../../data/site";
import { entrance, lift, pressable } from "../../lib/motion";
import Reveal from "../Reveal/Reveal";
import Glyph from "../Glyph/Glyph";
import "./Footer.css";

interface FooterProps {
  onOpenContact: () => void;
}

/**
 * Closing call to action on a frosted card, then the link columns, then the
 * name set huge and fading into the ground like a skyline.
 */
export default function Footer({ onOpenContact }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" aria-label="Site footer">
      <div className="shell footer__inner">
        <Reveal className="footer__cta glass" variant="settle">
          <p className="eyebrow">open to new projects</p>
          <h2 className="footer__title t-display">
            got an idea? <span className="t-accent">let's build it.</span>
          </h2>
          <div className="footer__actions">
            <motion.a
              className="btn-solid footer__btn"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onOpenContact();
              }}
              {...lift}
            >
              get in touch
            </motion.a>
            <motion.a className="btn-square footer__btn footer__btn--ghost" href={`mailto:${site.contactEmail}`} {...lift}>
              {site.contactEmail}
            </motion.a>
          </div>
        </Reveal>

        <Reveal className="footer__cols" staggerChildren={0.06}>
          <motion.div className="footer__brand" variants={entrance.fadeUp}>
            <span className="footer__logo t-display">{site.logo}</span>
            <p className="footer__tagline">
              {site.role.join(" · ")}
            </p>
          </motion.div>

          <motion.nav className="footer__col" aria-label="Footer sections" variants={entrance.fadeUp}>
            <p className="footer__col-title">sections</p>
            <ul>
              {sections.map((s) => (
                <li key={s.id}>
                  <a className="footer__link" href={`#${s.id}`}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div className="footer__col" variants={entrance.fadeUp}>
            <p className="footer__col-title">elsewhere</p>
            <ul>
              {socials.map((s) => (
                <li key={s.label}>
                  <a className="footer__link" href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                    <span className="footer__arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </Reveal>

        <div className="footer__bottom">
          <p>
            © {year} {site.name}. made with react, motion &amp; a lot of coffee.
          </p>
          <motion.button
            type="button"
            className="footer__top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            {...pressable}
          >
            <Glyph name="arrow-left" />
          </motion.button>
        </div>
      </div>

      <p className="footer__wordmark t-display" aria-hidden="true">
        {site.name}
      </p>
    </footer>
  );
}
