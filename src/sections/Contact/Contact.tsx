import { motion } from "motion/react";
import Reveal from "../../components/Reveal/Reveal";
import { site, socials } from "../../data/site";
import { riseChild } from "../../lib/motion";
import coffee from "../../assets/coffee.svg";
import "./Contact.css";

export default function Contact() {
  return (
    <section id="contact" className="section shell contact" aria-label="Contact">
      <Reveal className="contact__body" staggerChildren={0.08}>
        <motion.p className="contact__status" variants={riseChild}>
          <span className="dot" aria-hidden="true" />
          open to new projects
        </motion.p>

        <motion.h2 className="contact__title t-heading" variants={riseChild}>
          Get In Touch
          <img className="contact__cup pictogram" src={coffee} alt="" aria-hidden="true" />
        </motion.h2>

        <motion.div variants={riseChild}>
          <a className="btn btn--dark contact__cta" href={`mailto:${site.contactEmail}`}>
            write me something
          </a>
        </motion.div>

        <motion.p className="contact__mail t-mono" variants={riseChild}>
          {site.contactEmail}
        </motion.p>

        <motion.ul className="contact__socials t-mono" variants={riseChild}>
          {socials.map((s) => (
            <li key={s.label}>
              <a className="link" href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label} ↗
              </a>
            </li>
          ))}
          <li>
            <a className="link" href={site.resume} target="_blank" rel="noopener noreferrer">
              resume (fr) ↗
            </a>
          </li>
        </motion.ul>
      </Reveal>
    </section>
  );
}
