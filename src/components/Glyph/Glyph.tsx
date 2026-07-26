export type GlyphName =
  | "key"
  | "shield"
  | "receipt"
  | "terminal"
  | "cup"
  | "radar"
  | "arrow-left"
  | "arrow-right";

const PATHS: Record<GlyphName, string> = {
  key: "M15.5 8.5a3.5 3.5 0 1 0-3.5 3.5M12 12l-8 8v3h3l1-1v-2h2v-2h2l2-2",
  shield: "M12 3l7 3v5.5c0 4.3-2.9 7.7-7 8.5-4.1-.8-7-4.2-7-8.5V6l7-3zM9 12l2 2 4-4",
  receipt:
    "M6 3h12v18l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4L6 21V3zM9 8h6M9 12h6M9 16h3",
  terminal: "M3 5h18v14H3V5zm4 4l3 3-3 3m5 0h5",
  cup: "M4 8h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8zm12 1h2a2.5 2.5 0 0 1 0 5h-2M7 3v2M11 2v3",
  radar: "M12 12l6-4M12 21a9 9 0 1 1 9-9M12 17a5 5 0 1 1 5-5",
  "arrow-left": "M19 12H5m0 0l6-6m-6 6l6 6",
  "arrow-right": "M5 12h14m0 0l-6-6m6 6l-6 6",
};

interface GlyphProps {
  name: GlyphName;
  className?: string;
  strokeWidth?: number;
}

/** Tiny stroke-based icon set — inherits `currentColor` and font-size. */
export default function Glyph({ name, className, strokeWidth = 1.7 }: GlyphProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
