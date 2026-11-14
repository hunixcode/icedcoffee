import { motion } from "motion/react";
import Reveal from "../../components/Reveal/Reveal";
import SectionHead from "../../components/SectionHead/SectionHead";
import { aiddBlocks } from "../../data/aidd";
import { riseChild } from "../../lib/motion";
import star from "../../assets/star.svg";
import "./Aidd.css";

export default function Aidd() {
  return (
    <section id="ai-dd" className="section shell" aria-label="AI-driven development">
      <SectionHead caption="my take on AI-DD" title="ai-driven development" badge={star} />

      <div className="aidd__grid">
        <Reveal as="ul" className="aidd__meta t-mono" staggerChildren={0.05}>
          <motion.li variants={riseChild}>
            <span>format</span> opinion
          </motion.li>
          <motion.li variants={riseChild}>
            <span>reading</span> 1 min
          </motion.li>
          <motion.li variants={riseChild}>
            <span>topic</span> software engineering &amp; AI
          </motion.li>
        </Reveal>

        <Reveal className="aidd__card" delay={0.1}>
          {aiddBlocks.map((block, i) => (
            <p key={i}>{block}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
