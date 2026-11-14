export type GlyphName = "download" | "arrow-up-right";

const PATHS: Record<GlyphName, string> = {
  download: "M12 4v11m0 0l-5-5m5 5l5-5M5 20h14",
  "arrow-up-right": "M7 17L17 7m0 0H8m9 0v9",
};

interface GlyphProps {
  name: GlyphName;
  className?: string;
}

/** Tiny stroke icon — inherits `currentColor` and font-size. */
export default function Glyph({ name, className }: GlyphProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
