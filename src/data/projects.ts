/**
 * Projects showcased in the "what do i do" carousel.
 *
 * `preview` drives the mock application window rendered on the left-hand side.
 * Swap it for `image: "/screenshots/<file>.png"` once real screenshots exist —
 * the component renders the image instead of the mock when `image` is set.
 */

export interface ProjectPreviewItem {
  icon: "key" | "shield" | "receipt" | "terminal" | "cup" | "radar";
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  /** Display title — rendered in Playfair Display italic caps */
  title: string;
  description: string;
  /** Optional real screenshot; takes precedence over `preview` */
  image?: string;
  downloadUrl?: string;
  repoUrl: string;
  preview: {
    heading: string;
    subheading: string;
    items: ProjectPreviewItem[];
  };
}

export const projects: Project[] = [
  {
    slug: "mocha-suite",
    title: "Mocha Suite",
    description:
      "open-source self-supabase-hosted privacy suite featuring a password manager, authenticator app and a subscription manager",
    downloadUrl: "https://github.com/hunixcode/mocha/releases/latest",
    repoUrl: "https://github.com/hunixcode/mocha",
    preview: {
      heading: "Welcome to Mocha",
      subheading: "Your personal suite of privacy tools. Select an app to get started.",
      items: [
        {
          icon: "key",
          title: "Password Manager",
          description:
            "Store and manage your passwords securely with end-to-end encryption.",
        },
        {
          icon: "shield",
          title: "Authenticator",
          description:
            "Generate TOTP two-factor authentication codes right from your desktop.",
        },
        {
          icon: "receipt",
          title: "Subscriptions",
          description:
            "Track your recurring subscriptions and never miss a payment.",
        },
      ],
    },
  },
  {
    slug: "icedcoffee",
    title: "Iced Coffee",
    description:
      "the public repository of this very website, fully hand-made so I could actually learn and understand how React behaves under the hood",
    repoUrl: "https://github.com/hunixcode/icedcoffee",
    preview: {
      heading: "Iced Coffee",
      subheading: "A hand-made portfolio built with React, Vite and TypeScript.",
      items: [
        {
          icon: "cup",
          title: "Zero UI framework",
          description: "Every component and every line of CSS written from scratch.",
        },
        {
          icon: "terminal",
          title: "Vite + TypeScript",
          description: "Strict typing, instant HMR and a tiny production bundle.",
        },
        {
          icon: "radar",
          title: "Open source",
          description: "Clone it, fork it, make it yours — contributions welcome.",
        },
      ],
    },
  },
  {
    slug: "lattelab",
    title: "Latte Lab",
    description:
      "a personal SOC home lab featuring a honeypot, an attacker machine and an open-source dashboard for log monitoring and alert triage",
    repoUrl: "https://github.com/hunixcode/lattelab",
    preview: {
      heading: "Latte Lab",
      subheading: "Blue-team playground — detect, triage, document, repeat.",
      items: [
        {
          icon: "radar",
          title: "Wazuh SIEM",
          description: "Centralised log ingestion with custom detection rules.",
        },
        {
          icon: "shield",
          title: "Honeypot",
          description: "Exposed decoy services capturing real-world attack traffic.",
        },
        {
          icon: "terminal",
          title: "Attacker machine",
          description: "Scripted offensive scenarios to validate every detection.",
        },
      ],
    },
  },
];
