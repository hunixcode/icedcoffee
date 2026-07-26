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
  email: "hunixcode@proton.me",
} as const;

export const socials = [
  { label: "github", href: `https://github.com/${GITHUB_USER}` },
  { label: "linkedin", href: `https://www.linkedin.com/in/${GITHUB_USER}` },
  { label: "tryhackme", href: `https://tryhackme.com/p/${GITHUB_USER}` },
  { label: "buy me a coffee", href: `https://buymeacoffee.com/${GITHUB_USER}` },
] as const;

export type SectionId = "home" | "work" | "ai-dd" | "contact";

export const sections: { id: SectionId; label: string }[] = [
  { id: "home", label: "home" },
  { id: "work", label: "what do i do" },
  { id: "ai-dd", label: "ai-dd" },
  { id: "contact", label: "contact" },
];
