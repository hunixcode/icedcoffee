import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const GLYPHS = "!<>-_/[]{}=+*^?#$%&@01";

interface ScrambleTextProps {
  text: string;
  /** starts decoding when true */
  play: boolean;
  /** seconds before decoding starts */
  delay?: number;
  /** ms per frame */
  speed?: number;
}

const scramble = (text: string, locked: number) =>
  [...text]
    .map((ch, i) => (ch === " " || i < locked ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
    .join("");

/**
 * Terminal-style decode: characters cycle through random glyphs and lock in
 * left to right. Screen readers get the final text straight away.
 */
export default function ScrambleText({ text, play, delay = 0, speed = 34 }: ScrambleTextProps) {
  const reduce = useReducedMotion();
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (!play || reduce) return;

    let frame = 0;
    let interval = 0;
    const frames = Math.max(14, Math.round(text.length * 1.4));

    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        frame += 1;
        const locked = Math.floor((frame / frames) * text.length);
        if (locked >= text.length) {
          window.clearInterval(interval);
          setOutput(text);
        } else {
          setOutput(scramble(text, locked));
        }
      }, speed);
    }, delay * 1000);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [play, reduce, text, delay, speed]);

  return (
    <span aria-label={text}>
      <span aria-hidden="true">{output}</span>
    </span>
  );
}
