import { motion } from "motion/react";
import { projects } from "../../data/projects";
import Reveal from "../../components/Reveal/Reveal";
import SectionHead from "../../components/SectionHead/SectionHead";
import Glyph from "../../components/Glyph/Glyph";
import { riseChild } from "../../lib/motion";
import question from "../../assets/question.svg";
import github from "../../assets/github.svg";
import "./Work.css";

export default function Work() {
  return (
    <section id="work" className="section shell" aria-label="Projects">
      <SectionHead caption="available on github" title="what do i do" badge={question} boxed />

      <Reveal as="ul" className="work__list" staggerChildren={0.07}>
        {projects.map((p) => (
          <motion.li key={p.slug} className="work__row" variants={riseChild}>
            <div className="work__head">
              <h3 className="work__title t-heading">
                <span className="dot" aria-hidden="true" />
                <a href={p.repoUrl} target="_blank" rel="noopener noreferrer">
                  {p.title}
                </a>
              </h3>
              <ul className="work__tags t-mono" aria-label="Tags">
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>

            <p className="work__desc">{p.description}</p>

            <div className="work__actions">
              {p.downloads && (
                <a className="btn btn--dark" href="#downloads">
                  download
                </a>
              )}
              <a
                className="btn btn--line btn--icon"
                href={p.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.title} on GitHub`}
              >
                <img src={github} alt="" aria-hidden="true" />
              </a>
            </div>

            <Glyph name="arrow-up-right" className="work__arrow" />
          </motion.li>
        ))}
      </Reveal>
    </section>
  );
}
