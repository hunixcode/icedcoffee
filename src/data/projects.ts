/** Projects listed in the "what do i do" section, in display order. */

export interface Project {
  slug: string;
  /** display name */
  title: string;
  description: string;
  /** short mono labels: platform, stack, field */
  tags: string[];
  repoUrl: string;
  /** set when the project ships builds — points at the downloads section */
  downloads?: boolean;
}

export const projects: Project[] = [
  {
    slug: "mocha",
    title: "Mocha Suite",
    description:
      "open-source self-supabase-hosted privacy suite featuring a password manager, authenticator app and a subscription manager",
    tags: ["desktop", "supabase", "privacy"],
    repoUrl: "https://github.com/hunixcode/mocha",
    downloads: true,
  },
  {
    slug: "soundtrail",
    title: "Soundtrail",
    description: "open-source android equalizer, music player and speed changer",
    tags: ["android", "audio"],
    repoUrl: "https://github.com/hunixcode/soundtrail",
    downloads: true,
  },
  {
    slug: "lattelab",
    title: "Latte Lab",
    description:
      "a personal SOC home lab featuring a honeypot, an attacker machine and an open-source dashboard for log monitoring and alert triage",
    tags: ["security", "siem", "home lab"],
    repoUrl: "https://github.com/hunixcode/lattelab",
  },
  {
    slug: "icedcoffee",
    title: "Iced Coffee",
    description:
      "the public repository of this very website, fully hand-made so I could actually learn and understand how React behaves under the hood",
    tags: ["web", "react", "typescript"],
    repoUrl: "https://github.com/hunixcode/icedcoffee",
  },
];
