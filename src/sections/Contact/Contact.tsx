import { motion } from "motion/react";
import Reveal from "../../components/Reveal/Reveal";
import { site, socials } from "../../data/site";
import { entrance, lift, makeEntrance } from "../../lib/motion";
import coffee from "../../assets/coffee.svg";
import "./Contact.css";

export default function Contact() {
  return (
    <section id="contact" className="section contact" aria-label="Contact">
      <div className="shell contact__inner">
        <Reveal className="contact__head">
          <h2 className="contact__title t-serif-italic">
            Get In Touch
            {/* Wrapper pops in, image keeps its idle steam. State is inherited
                from the Reveal above — a second whileInView here would start the
                same animation twice and flicker. */}
            <motion.span
              className="contact__cup-wrap"
              aria-hidden="true"
              variants={makeEntrance("pop", 0.26)}
            >
              <img className="contact__cup" src={coffee} alt="" />
            </motion.span>
          </h2>
        </Reveal>

        <Reveal variant="bounce" delay={0.18}>
          <motion.a
            className="btn-solid contact__cta"
            href={`mailto:${site.email}?subject=Hey%20hunixcode`}
            {...lift}
          >
            write me something
          </motion.a>
        </Reveal>

        <Reveal className="contact__foot" delay={0.3} staggerChildren={0.06}>
          <motion.ul className="contact__socials t-mono" variants={entrance.fadeUp}>
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </motion.ul>

          <motion.p className="contact__copy t-mono" variants={entrance.fade}>
            © {new Date().getFullYear()} {site.name}
          </motion.p>
        </Reveal>
      </div>
    </section>
  );
}
