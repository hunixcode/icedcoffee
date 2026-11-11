import { useState } from "react";
import type { CSSProperties } from "react";
import { motion } from "motion/react";
import Reveal from "../../components/Reveal/Reveal";
import Glyph from "../../components/Glyph/Glyph";
import { downloadApps } from "../../data/downloads";
import type { DownloadApp } from "../../data/downloads";
import releases from "../../data/releases.json";
import { entrance } from "../../lib/motion";
import "./Downloads.css";

interface Asset {
  name: string;
  size: number;
  browser_download_url: string;
}

interface Release {
  tag_name: string;
  published_at: string;
  html_url: string;
  assets: Asset[];
}

interface PlatformFile {
  asset: Asset;
  /** file name without the platform prefix */
  file: string;
}

type PlatformGroup = [platform: string, files: PlatformFile[]];

interface App {
  app: DownloadApp;
  release: Release;
  groups: PlatformGroup[];
}

const OS_PREFIX = /^(linux|macos|windows|android)-/i;

/** [platform, file name without the platform prefix] */
function platformOf(name: string): [string, string] {
  const m = OS_PREFIX.exec(name);
  if (m) return [m[1].toLowerCase(), name.slice(m[0].length)];
  if (/\.apk$/i.test(name)) return ["android", name];
  return ["other", name];
}

function groupByPlatform(assets: Asset[]): PlatformGroup[] {
  const groups = new Map<string, PlatformFile[]>();
  for (const asset of assets) {
    const [os, file] = platformOf(asset.name);
    groups.set(os, [...(groups.get(os) ?? []), { asset, file }]);
  }
  return [...groups];
}

/** The visitor's platform, in the same vocabulary as the asset prefixes. */
function detectPlatform(): string {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua)) return "";
  if (/windows/i.test(ua)) return "windows";
  if (/mac/i.test(ua)) return "macos";
  if (/linux/i.test(ua)) return "linux";
  return "";
}

const visitorPlatform = detectPlatform();

const extensionOf = (file: string) => file.slice(file.lastIndexOf(".") + 1).toLowerCase();

const formatSize = (bytes: number) => `${(bytes / 1e6).toFixed(1)} MB`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en", { day: "numeric", month: "short", year: "numeric" });

/* Releases are snapshotted at build time (scripts/fetch-releases.mjs), so the
   page never calls the GitHub API. Apps without a release or assets are hidden. */
const apps: App[] = downloadApps.flatMap((app) => {
  const release = (releases as Record<string, Release | undefined>)[app.repo];
  return release?.assets.length ? [{ app, release, groups: groupByPlatform(release.assets) }] : [];
});

/* One app, with its files one click away: the platform switch opens on the
   visitor's own system when the release ships a build for it. */
function AppCard({ app, release, groups }: App) {
  const [platform, setPlatform] = useState(() =>
    groups.some(([os]) => os === visitorPlatform) ? visitorPlatform : groups[0][0],
  );
  const files = groups.find(([os]) => os === platform)?.[1] ?? [];
  // The list reserves room for the longest platform, so switching never resizes the card.
  const rows = Math.max(...groups.map(([, list]) => list.length));

  return (
    <motion.li className="downloads__card glass" variants={entrance.rise}>
      <div className="downloads__card-head">
        <img className="downloads__logo" src={app.logo} alt="" />
        <div>
          <h3 className="downloads__name t-serif-italic">{app.title}</h3>
          <a className="downloads__tag t-mono" href={release.html_url} target="_blank" rel="noopener noreferrer">
            {release.tag_name} · {formatDate(release.published_at)}
          </a>
        </div>
      </div>

      <p className="downloads__desc">{app.description}</p>

      <div className="downloads__platforms t-mono" role="group" aria-label={`${app.title} — platform`}>
        {groups.map(([os]) => (
          <button
            key={os}
            type="button"
            className="downloads__platform"
            aria-pressed={os === platform}
            onClick={() => setPlatform(os)}
          >
            {os}
          </button>
        ))}
      </div>

      {/* Keyed by platform so the rows replay their fade when the switch flips. */}
      <ul key={platform} className="downloads__files" style={{ "--rows": rows } as CSSProperties}>
        {files.map(({ asset, file }) => (
          <li key={asset.name}>
            <a className="downloads__file t-mono" href={asset.browser_download_url} title={file}>
              <span className="downloads__ext">{extensionOf(file)}</span>
              <span className="downloads__file-name">{file}</span>
              <span className="downloads__size">{formatSize(asset.size)}</span>
              <Glyph name="download" className="downloads__arrow" />
            </a>
          </li>
        ))}
      </ul>
    </motion.li>
  );
}

export default function Downloads() {
  return (
    <section id="downloads" className="section downloads" aria-label="Downloads">
      <div className="shell downloads__inner">
        <header className="downloads__head">
          <Reveal as="span" className="downloads__title-wrap">
            <h2 className="downloads__title t-condensed">
              <span className="t-accent">downloads</span>
            </h2>
          </Reveal>
          <Reveal className="downloads__sub t-mono" as="p" variant="fade" delay={0.16}>
            latest releases, straight from github
          </Reveal>
        </header>

        {apps.length === 0 ? (
          <p className="downloads__status t-mono">no releases yet</p>
        ) : (
          <Reveal as="ul" className="downloads__grid" staggerChildren={0.1}>
            {apps.map((entry) => (
              <AppCard key={entry.app.repo} {...entry} />
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
