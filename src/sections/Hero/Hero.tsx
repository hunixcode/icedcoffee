import { useState } from "react";
import { motion } from "motion/react";
import { GITHUB_USER, site } from "../../data/site";
import { stack } from "../../data/stack";
import { entrance, lift, makeEntrance, spring, stagger } from "../../lib/motion";
import { useIntroDone } from "../../lib/intro";
import Tilt from "../../components/Tilt/Tilt";
import ScrambleText from "../../components/ScrambleText/ScrambleText";
import sprite from "../../assets/sprite.svg";
import github from "../../assets/github.svg";
import "./Hero.css";

/* Landing timeline (seconds). Explicit rather than nested-staggered so the
   order stays obvious: avatar settles, name springs up, sub-lines fade in,
   then the little playful bits pop. */
const T = {
  avatar: 0,
  title: 0.1,
  role: 0.26,
  roleStep: 0.07,
  stack: 0.42,
  stackStep: 0.05,
  sprite: 0.52,
} as const;

export default function Hero() {
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  // Held until the loader curtain lifts, so the timeline below is actually seen.
  const introDone = useIntroDone();
  const state = introDone ? "show" : "hidden";

  return (
    <section id="home" className="section hero" aria-label="Introduction">
      <div className="shell hero__inner">
        <Tilt className="hero__tilt" max={9} radius="21%">
        <motion.figure
          className="hero__avatar"
          variants={makeEntrance("settle", T.avatar)}
          initial="hidden"
          animate={state}
        >
          {avatarFailed ? (
            <div className="hero__avatar-fallback t-display" aria-hidden="true">
              {site.logo}
            </div>
          ) : (
            /* The avatar is remote, so it lands after the entrance has already
               played. Fading it in on load avoids the hard pop-in. */
            <img
              src={site.avatar}
              alt={site.avatarAlt}
              width={300}
              height={300}
              loading="eager"
              decoding="async"
              data-loaded={avatarLoaded}
              onLoad={() => setAvatarLoaded(true)}
              onError={() => setAvatarFailed(true)}
            />
          )}
        </motion.figure>

        </Tilt>

        <div className="hero__content">
          {/* The wrapper owns the entrance, the inner image owns the idle
              float — never the same `transform` on the same element. */}
          <motion.span
            className="hero__sprite"
            aria-hidden="true"
            variants={makeEntrance("pop", T.sprite)}
            initial="hidden"
            animate={state}
          >
            <img src={sprite} alt="" />
          </motion.span>

          <motion.p
            className="hero__eyebrow eyebrow"
            variants={makeEntrance("fadeUp", 0)}
            initial="hidden"
            animate={state}
          >
            {site.eyebrow}
          </motion.p>

          {/* Letters drop in one by one and each reacts to the cursor. */}
          <motion.h1
            className="hero__title t-display"
            aria-label={site.name}
            variants={stagger(0.045, T.title)}
            initial="hidden"
            animate={state}
          >
            {[...site.name].map((letter, i) => (
              <motion.span
                key={i}
                className="hero__letter"
                aria-hidden="true"
                variants={entrance.bounce}
                whileHover={{ y: -10, rotate: i % 2 ? 6 : -6, transition: spring.bouncy }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>

          <p className="hero__role t-mono">
            {site.role.map((line, i) => (
              <motion.span
                key={line}
                variants={makeEntrance("fadeUp", T.role + i * T.roleStep)}
                initial="hidden"
                animate={state}
              >
                <ScrambleText text={line} play={introDone} delay={T.role + i * T.roleStep + 0.1} />
              </motion.span>
            ))}
          </p>

          <motion.div
            className="hero__ctas"
            variants={makeEntrance("fadeUp", T.stack - 0.06)}
            initial="hidden"
            animate={state}
          >
            <motion.a className="btn-solid hero__cta" href="#work" {...lift}>
              see my work
            </motion.a>
            <motion.a
              className="btn-square hero__cta hero__cta--ghost"
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              {...lift}
            >
              <img className="icon-invert" src={github} alt="" aria-hidden="true" />
              github
            </motion.a>
          </motion.div>

          <ul className="hero__stack">
            {stack.map((item, i) => (
              <motion.li
                key={item.name}
                style={{ "--icon-size": String(item.size) } as React.CSSProperties}
                variants={makeEntrance("pop", T.stack + i * T.stackStep)}
                initial="hidden"
                animate={state}
                whileHover={{ y: -5, scale: 1.12, transition: spring.bouncy }}
                whileTap={{ scale: 0.95, transition: spring.press }}
              >
                <img src={item.src} alt={item.name} title={item.name} />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
