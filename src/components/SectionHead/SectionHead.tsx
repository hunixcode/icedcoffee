import Reveal from "../Reveal/Reveal";

interface SectionHeadProps {
  caption: string;
  title: string;
  /** small icon hung off the title's last word, as in the mockups */
  badge?: string;
  /** set the badge (a white glyph) on a small button-coloured tile */
  boxed?: boolean;
}

/** Title on the left, a dotted caption on the right, one rule underneath. */
export default function SectionHead({ caption, title, badge, boxed }: SectionHeadProps) {
  // The badge is glued to the last word so a line break can never strand it.
  const cut = title.lastIndexOf(" ") + 1;

  return (
    <Reveal as="header" className="section-head">
      <h2 className="section-head__title">
        {title.slice(0, cut)}
        <span className="section-head__last">
          {title.slice(cut)}
          {badge &&
            (boxed ? (
              <span className="section-head__tile" aria-hidden="true">
                <img src={badge} alt="" />
              </span>
            ) : (
              <img className="section-head__badge" src={badge} alt="" aria-hidden="true" />
            ))}
        </span>
      </h2>
      <p className="section-head__caption">
        <span className="dot" aria-hidden="true" />
        {caption}
      </p>
    </Reveal>
  );
}
