// This is an external Component I've found on internet, the only thing I've twisted is the CSS

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  duration = 2,
  speed = 0.2,
  scrambleChars = 'u?hnxi',
  className = '',
  style = {},
  children
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const charsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!rootRef.current) return;

    const split = SplitText.create(rootRef.current.querySelector('p'), {
      type: 'chars',
      charsClass: 'char'
    });

    charsRef.current = split.chars as HTMLElement[];

    charsRef.current.forEach((c, i) => {
      gsap.set(c, {
        display: 'inline-block',
        attr: { 'data-content': c.innerHTML }
      });

      gsap.to(c, {
        delay: i * 0.03,
        duration,
        scrambleText: {
            text: c.dataset.content || "",
            chars: scrambleChars,
            speed,
        },
        ease: "none",
      })

    });
    return () => {
        split.revert();
    }

  }, [duration, speed, scrambleChars]);

  return (
    <div ref={rootRef} className={`text-block ${className}`} style={style}>
      <p style={{fontSize:"32px", fontWeight:"800"}}>{children}</p>
    </div>
  );
};

export default ScrambledText;