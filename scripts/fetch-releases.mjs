// Snapshots the latest GitHub release of every app listed in
// src/data/downloads.ts into src/data/releases.json, so visitors never hit the
// GitHub API (60 requests/hour per IP). Runs before every build; if GitHub is
// unreachable, the committed snapshot is kept and the build goes on.
import { readFileSync, writeFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const user = read("src/data/site.ts").match(/GITHUB_USER = "([^"]+)"/)[1];
// shortcut: repos are scraped from downloads.ts with a regex; move them to a JSON file if that list ever gets computed.
const repos = [...read("src/data/downloads.ts").matchAll(/repo: "([^"]+)"/g)].map((m) => m[1]);
const out = new URL("../src/data/releases.json", import.meta.url);

try {
  const releases = {};
  for (const repo of repos) {
    const res = await fetch(`https://api.github.com/repos/${user}/${repo}/releases/latest`);
    if (res.status === 404) continue; // no release published yet
    if (!res.ok) throw new Error(`${repo}: GitHub API ${res.status}`);
    const r = await res.json();
    releases[repo] = {
      tag_name: r.tag_name,
      published_at: r.published_at,
      html_url: r.html_url,
      // Only keep links that really point at GitHub — they end up as hrefs on the site.
      assets: r.assets
        .filter((a) => a.browser_download_url.startsWith("https://github.com/"))
        .map(({ name, size, browser_download_url }) => ({ name, size, browser_download_url })),
    };
  }
  writeFileSync(out, `${JSON.stringify(releases, null, 2)}\n`);
  console.log(`releases.json updated: ${Object.keys(releases).join(", ") || "no releases"}`);
} catch (err) {
  console.warn(`releases.json kept as is (${err.message})`);
}
