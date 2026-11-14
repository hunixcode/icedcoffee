import { useState } from "react";
import type { CSSProperties } from "react";
import { motion } from "motion/react";
import Reveal from "../../components/Reveal/Reveal";
import SectionHead from "../../components/SectionHead/SectionHead";
import Glyph from "../../components/Glyph/Glyph";
import { downloadApps } from "../../data/downloads";
import type { DownloadApp } from "../../data/downloads";
import releases from "../../data/releases.json";
import { riseChild } from "../../lib/motion";
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


/* One app, its files one click away: the platform switch opens on the
   visitor's own system when the release ships a build for it. */
function AppCard({ app, release, groups }: App) {
  const [platform, setPlatform] = useState(() =>
    groups.some(([os]) => os === visitorPlatform) ? visitorPlatform : groups[0][0],
  );
  const files = groups.find(([os]) => os === platform)?.[1] ?? [];
  // The list reserves room for the longest platform, so switching never resizes the card.
  const rows = Math.max(...groups.map(([, list]) => list.length));

  return (
    <motion.li className="dl__card" variants={riseChild}>
      <div className="dl__head">
        <img className="dl__logo" src={app.logo} alt="" />
        <div className="dl__id">
          <h3 className="dl__name t-heading">{app.title}</h3>
          <a className="dl__tag t-mono link" href={release.html_url} target="_blank" rel="noopener noreferrer">
            {release.tag_name} · {formatDate(release.published_at)}
          </a>
        </div>
      </div>

      <p className="dl__desc">{app.description}</p>

      {groups.length > 1 && (
        <div className="dl__platforms t-mono" role="group" aria-label={`${app.title} — platform`}>
          {groups.map(([os]) => (
            <button
              key={os}
              type="button"
              className="dl__platform"
              aria-pressed={os === platform}
              onClick={() => setPlatform(os)}
            >
              {os}
            </button>
          ))}
        </div>
      )}

      {/* Keyed by platform so the rows replay their fade when the switch flips. */}
      <ul key={platform} className="dl__files" style={{ "--rows": rows } as CSSProperties}>
        {files.map(({ asset, file }) => (
          <li key={asset.name}>
            <a className="dl__file t-mono" href={asset.browser_download_url} title={file}>
              <span className="dl__ext">{extensionOf(file)}</span>
              <span className="dl__file-name">{file}</span>
              <span className="dl__size">{formatSize(asset.size)}</span>
              <Glyph name="download" className="dl__icon" />
            </a>
          </li>
        ))}
      </ul>
    </motion.li>
  );
}

export default function Downloads() {
  return (
    <section id="downloads" className="section shell" aria-label="Downloads">
      <SectionHead caption="latest releases, straight from github" title="downloads" />

      {apps.length === 0 ? (
        <p className="dl__status t-mono">no releases yet</p>
      ) : (
        <Reveal as="ul" className="dl__grid" staggerChildren={0.08}>
          {apps.map((entry) => (
            <AppCard key={entry.app.repo} {...entry} />
          ))}
        </Reveal>
      )}
    </section>
  );
}
