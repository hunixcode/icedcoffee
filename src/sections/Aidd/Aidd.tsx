import { motion } from "motion/react";
import Reveal from "../../components/Reveal/Reveal";
import { aiddBlocks } from "../../data/aidd";
import { entrance, inView, makeEntrance, stagger } from "../../lib/motion";
import chatgpt from "../../assets/chatgpt.svg";
import star from "../../assets/star.svg";
import "./Aidd.css";

export default function Aidd() {
  return (
    <section id="ai-dd" className="section aidd" aria-label="AI-driven development">
      <div className="shell aidd__inner">
        {/* The watermark lives in the headline column so it stays optically
            centred on the title at every viewport width. */}
        <div className="aidd__left">
          <motion.img
            className="aidd__watermark"
            src={chatgpt}
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.055 }}
            viewport={inView}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />

          <div className="aidd__head">
            {/* Two lines rising one after the other; the star inherits the
                first line's state change and pops a beat later. */}
            <h2 className="aidd__title t-condensed">
              <motion.span
                className="aidd__line"
                variants={makeEntrance("rise", 0)}
                initial="hidden"
                whileInView="show"
                viewport={inView}
              >
                ai-driver
                <motion.span
                  className="aidd__star-wrap"
                  variants={makeEntrance("pop", 0.42)}
                >
                  <img className="aidd__star" src={star} alt="" aria-hidden="true" />
                </motion.span>
              </motion.span>

              <motion.span
                className="aidd__line"
                variants={makeEntrance("rise", 0.12)}
                initial="hidden"
                whileInView="show"
                viewport={inView}
              >
                development
              </motion.span>
            </h2>

            <Reveal className="aidd__sub t-mono" as="p" variant="fade" delay={0.3}>
              my take on AI-DD
            </Reveal>
          </div>
        </div>

        {/* The card animates itself; the inner wrapper only staggers the
            paragraphs and inherits the card's state — declaring a second
            whileInView here would drive the paragraphs twice. */}
        <Reveal className="aidd__card" variant="settle" delay={0.18}>
          <motion.div className="aidd__stack" variants={stagger(0.075, 0.32)}>
            {aiddBlocks.map((block, i) => (
              <motion.p key={i} className="aidd__par" variants={entrance.fade}>
                {block}
              </motion.p>
            ))}
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
