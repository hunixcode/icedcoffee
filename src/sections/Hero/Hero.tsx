import { useState } from "react";
import { motion } from "motion/react";
import { site, socials } from "../../data/site";
import { stack } from "../../data/stack";
import { rise } from "../../lib/motion";
import sprite from "../../assets/sprite.svg";
import "./Hero.css";

const github = socials.find((s) => s.label === "github")!;

export default function Hero() {
  const [avatarFailed, setAvatarFailed] = useState(false);

  return (
    <section id="home" className="hero shell" aria-label="Introduction">
      <motion.figure className="hero__avatar" variants={rise(0.05)} initial="hidden" animate="show">
        {avatarFailed ? (
          <span className="hero__avatar-fallback" aria-hidden="true">
            {site.logo}
          </span>
        ) : (
          <img
            src={site.avatar}
            alt={site.avatarAlt}
            width={460}
            height={460}
            loading="eager"
            decoding="async"
            onError={() => setAvatarFailed(true)}
          />
        )}
      </motion.figure>

      <div className="hero__content">
        <motion.h1 className="hero__name" variants={rise(0.15)} initial="hidden" animate="show">
          {site.name}
          <img className="hero__sprite" src={sprite} alt="" aria-hidden="true" />
        </motion.h1>

        <motion.p className="hero__role t-mono" variants={rise(0.25)} initial="hidden" animate="show">
          {site.role.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </motion.p>

        <motion.ul className="hero__stack" variants={rise(0.35)} initial="hidden" animate="show">
          {stack.map((item) => (
            <li key={item.name} style={{ "--size": item.size } as React.CSSProperties}>
              <img src={item.src} alt={item.name} title={item.name} />
            </li>
          ))}
        </motion.ul>

        <motion.div className="hero__actions" variants={rise(0.45)} initial="hidden" animate="show">
          <a className="btn btn--dark" href="#work">
            see my work
          </a>
          <a className="btn btn--line" href={github.href} target="_blank" rel="noopener noreferrer">
            github
          </a>
          <a className="btn btn--line" href={site.resume} target="_blank" rel="noopener noreferrer">
            resume (fr)
          </a>
        </motion.div>
      </div>
    </section>
  );
}
