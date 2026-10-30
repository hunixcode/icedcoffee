import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Reveal from "../../components/Reveal/Reveal";
import Glyph from "../../components/Glyph/Glyph";
import { downloadApps } from "../../data/downloads";
import type { DownloadApp } from "../../data/downloads";
import releases from "../../data/releases.json";
import { useBodyLock } from "../../hooks/useBodyLock";
import { entrance, lift, pressable } from "../../lib/motion";
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

interface App {
  app: DownloadApp;
  release: Release;
}

const OS_PREFIX = /^(linux|macos|windows|android)-/i;

/** [platform, file name without the platform prefix] */
function platformOf(name: string): [string, string] {
  const m = OS_PREFIX.exec(name);
  if (m) return [m[1].toLowerCase(), name.slice(m[0].length)];
  if (/\.apk$/i.test(name)) return ["android", name];
  return ["other", name];
}

function groupByPlatform(assets: Asset[]) {
  const groups = new Map<string, { asset: Asset; file: string }[]>();
  for (const asset of assets) {
    const [os, file] = platformOf(asset.name);
    groups.set(os, [...(groups.get(os) ?? []), { asset, file }]);
  }
  return [...groups];
}

const formatSize = (bytes: number) => `${(bytes / 1e6).toFixed(1)} MB`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en", { day: "numeric", month: "short", year: "numeric" });

/* Releases are snapshotted at build time (scripts/fetch-releases.mjs), so the
   page never calls the GitHub API. Apps without a release or assets are hidden. */
const apps: App[] = downloadApps.flatMap((app) => {
  const release = (releases as Record<string, Release | undefined>)[app.repo];
  return release?.assets.length ? [{ app, release }] : [];
});

export default function Downloads() {
  const [selected, setSelected] = useState<App | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useBodyLock(selected !== null);

  // Native modal: focus trap, Esc and the blurred ::backdrop come for free.
  useEffect(() => {
    if (selected) dialog.current?.showModal();
  }, [selected]);

  const groups = selected ? groupByPlatform(selected.release.assets) : [];

  return (
    <section id="downloads" className="section downloads" aria-label="Downloads">
      <div className="shell downloads__inner">
        <header className="downloads__head">
          <Reveal as="span" className="downloads__title-wrap">
            <h2 className="downloads__title t-condensed">downloads</h2>
          </Reveal>
          <Reveal className="downloads__sub t-mono" as="p" variant="fade" delay={0.16}>
            latest releases, straight from github
          </Reveal>
        </header>

        {apps.length === 0 ? (
          <p className="downloads__status t-mono">no releases yet</p>
        ) : (
          <Reveal as="ul" className="downloads__gallery" staggerChildren={0.08}>
            {apps.map((entry) => (
              <motion.li key={entry.app.repo} variants={entrance.pop}>
                <motion.button
                  type="button"
                  className="downloads__tile"
                  onClick={() => setSelected(entry)}
                  aria-label={`${entry.app.title} — downloads`}
                  aria-haspopup="dialog"
                  {...pressable}
                >
                  <img src={entry.app.logo} alt="" />
                </motion.button>
              </motion.li>
            ))}
          </Reveal>
        )}
      </div>

      <dialog
        ref={dialog}
        className="downloads__dialog"
        aria-label={selected ? `${selected.app.title} downloads` : undefined}
        onClose={() => setSelected(null)}
        onClick={(e) => {
          // The panel fills the dialog, so a click landing on the dialog itself is on the backdrop.
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
      >
        {selected && (
          <div className="downloads__panel">
            <button
              type="button"
              className="downloads__close"
              onClick={() => dialog.current?.close()}
              aria-label="Close"
            >
              <Glyph name="close" />
            </button>

            <div className="downloads__panel-head">
              <img className="downloads__panel-logo" src={selected.app.logo} alt="" />
              <div>
                <h3 className="downloads__name t-serif-italic">{selected.app.title}</h3>
                <a
                  className="downloads__tag t-mono"
                  href={selected.release.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selected.release.tag_name} · {formatDate(selected.release.published_at)}
                </a>
              </div>
            </div>

            <p className="downloads__desc t-mono">{selected.app.description}</p>

            {groups.map(([os, files]) => (
              <div className="downloads__group" key={os}>
                <h4 className="downloads__os t-mono">{os}</h4>
                <ul className="downloads__assets">
                  {files.map(({ asset, file }) => (
                    <li key={asset.name}>
                      <motion.a className="btn-solid downloads__asset t-mono" href={asset.browser_download_url} {...lift}>
                        <span className="downloads__file">{file}</span>
                        <span className="downloads__size">{formatSize(asset.size)}</span>
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </dialog>
    </section>
  );
}
