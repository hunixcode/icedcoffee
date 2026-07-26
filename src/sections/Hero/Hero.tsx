import { useState } from "react";
import { motion } from "motion/react";
import { site } from "../../data/site";
import { stack } from "../../data/stack";
import { makeEntrance, spring } from "../../lib/motion";
import sprite from "../../assets/sprite.svg";
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

  return (
    <section id="home" className="section hero" aria-label="Introduction">
      <div className="shell hero__inner">
        <motion.figure
          className="hero__avatar"
          variants={makeEntrance("settle", T.avatar)}
          initial="hidden"
          animate="show"
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

        <div className="hero__content">
          {/* The wrapper owns the entrance, the inner image owns the idle
              float — never the same `transform` on the same element. */}
          <motion.span
            className="hero__sprite"
            aria-hidden="true"
            variants={makeEntrance("pop", T.sprite)}
            initial="hidden"
            animate="show"
          >
            <img src={sprite} alt="" />
          </motion.span>

          <motion.h1
            className="hero__title t-display"
            variants={makeEntrance("bounce", T.title)}
            initial="hidden"
            animate="show"
          >
            {site.name}
          </motion.h1>

          <p className="hero__role t-mono">
            {site.role.map((line, i) => (
              <motion.span
                key={line}
                variants={makeEntrance("fadeUp", T.role + i * T.roleStep)}
                initial="hidden"
                animate="show"
              >
                {line}
              </motion.span>
            ))}
          </p>

          <ul className="hero__stack">
            {stack.map((item, i) => (
              <motion.li
                key={item.name}
                style={{ "--icon-size": String(item.size) } as React.CSSProperties}
                variants={makeEntrance("pop", T.stack + i * T.stackStep)}
                initial="hidden"
                animate="show"
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
