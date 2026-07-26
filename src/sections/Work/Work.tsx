import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projects } from "../../data/projects";
import Reveal from "../../components/Reveal/Reveal";
import Glyph from "../../components/Glyph/Glyph";
import ProjectPreview from "../../components/ProjectPreview/ProjectPreview";
import { entrance, fade, lift, makeEntrance, pressable, smooth } from "../../lib/motion";
import question from "../../assets/question.svg";
import github from "../../assets/github.svg";
import "./Work.css";

export default function Work() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const project = projects[index];
  const total = projects.length;

  const paginate = useCallback(
    (step: number) => {
      setDirection(step);
      setIndex((prev) => (prev + step + total) % total);
    },
    [total],
  );

  const jumpTo = useCallback(
    (next: number) => {
      if (next === index) return;
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index],
  );

  return (
    <section id="work" className="section work" aria-label="Projects">
      <div className="shell work__inner">
        <header className="work__head">
          <Reveal as="span" className="work__title-wrap">
            <h2 className="work__title t-condensed">
              what do i do
              {/* Inherits hidden -> show from the Reveal above. It must NOT
                  declare its own initial/whileInView: it would then be driven
                  both by inheritance and by its own observer, and the two
                  competing starts show up as a flicker. */}
              <motion.span
                className="work__badge"
                aria-hidden="true"
                variants={makeEntrance("pop", 0.28)}
              >
                <img src={question} alt="" />
              </motion.span>
            </h2>
          </Reveal>

          <Reveal className="work__sub t-mono" as="p" variant="fade" delay={0.16}>
            available on github
          </Reveal>
        </header>

        <div className="work__stage">
          {/* Crossfade, not `mode="wait"`. Waiting unmounts the old slide before
              mounting the new one, so the stage has zero children for a frame,
              collapses to 0 height and snaps the whole section — the jump was
              the worst of the flickers. Both slides share one grid cell here, so
              the stage height never changes during the swap. */}
          <AnimatePresence initial={false}>
            <motion.div
              key={project.slug}
              className="work__slide"
              initial={{ opacity: 0, x: direction * 34 }}
              animate={{ opacity: 1, x: 0, transition: smooth(0.5) }}
              exit={{ opacity: 0, x: direction * -34, transition: smooth(0.3) }}
            >
              <div className="work__visual">
                <ProjectPreview project={project} />
              </div>

              <div className="work__details">
                <h3 className="work__project t-serif-italic">{project.title}</h3>

                <p className="work__desc t-mono">{project.description}</p>

                <div className="work__actions">
                  {project.downloadUrl && (
                    <motion.a
                      className="btn-solid work__download"
                      href={project.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      {...lift}
                    >
                      download
                    </motion.a>
                  )}

                  <motion.a
                    className="btn-square work__repo"
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} on GitHub`}
                    {...lift}
                  >
                    <img src={github} alt="" aria-hidden="true" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal className="work__nav" delay={0.1} staggerChildren={0.05}>
          <motion.button
            type="button"
            className="work__arrow"
            onClick={() => paginate(-1)}
            aria-label="Previous project"
            variants={entrance.fade}
            {...pressable}
          >
            <Glyph name="arrow-left" />
          </motion.button>

          <motion.ul className="work__dots" variants={entrance.fade}>
            {projects.map((p, i) => (
              <li key={p.slug}>
                <button
                  type="button"
                  className={`work__dot${i === index ? " is-active" : ""}`}
                  onClick={() => jumpTo(i)}
                  aria-label={`Show ${p.title}`}
                  aria-current={i === index}
                />
              </li>
            ))}
          </motion.ul>

          <motion.span className="work__counter t-mono" variants={entrance.fade}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={fade(0.2)}
              >
                {String(index + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
            {` / ${String(total).padStart(2, "0")}`}
          </motion.span>

          <motion.button
            type="button"
            className="work__arrow"
            onClick={() => paginate(1)}
            aria-label="Next project"
            variants={entrance.fade}
            {...pressable}
          >
            <Glyph name="arrow-right" />
          </motion.button>
        </Reveal>
      </div>
    </section>
  );
}
