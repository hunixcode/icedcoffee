/**
 * Single source of truth for everything that is "content" rather than "layout".
 * Edit here, never inside the components.
 */

export const GITHUB_USER = "hunixcode";

export const site = {
  name: "hunixcode",
  logo: "hx",
  role: ["full-stack developer", "cybersecurity enthusiast"],
  avatar: `https://github.com/${GITHUB_USER}.png`,
  avatarAlt: "hunixcode avatar",
  contactEmail: "dylan.peterano@pm.me",
  /** served from public/ */
  resume: `${import.meta.env.BASE_URL}resume-fr.pdf`,
} as const;

export const socials = [
  { label: "github", href: `https://github.com/${GITHUB_USER}` },
  { label: "linkedin", href: `https://www.linkedin.com/in/hauani` },
  { label: "tryhackme", href: `https://tryhackme.com/p/${GITHUB_USER}` },
  { label: "buy me a coffee", href: `https://buymeacoffee.com/hauani` },
] as const;

export type SectionId = "home" | "work" | "downloads" | "ai-dd" | "contact";

/** Navigation order — also the order of the sections on the page. */
export const sections: { id: SectionId; label: string }[] = [
  { id: "work", label: "work" },
  { id: "downloads", label: "downloads" },
  { id: "ai-dd", label: "ai-dd" },
  { id: "contact", label: "contact" },
];
