/**
 * Apps shown in the downloads gallery. Each `repo` (under GITHUB_USER) is
 * queried for its latest GitHub release; apps without a release or without
 * assets are hidden, so an entry can be added before the first release ships.
 *
 * Name assets "<Os>-<file>" (Linux-, MacOS-, Windows-, Android-) to group them
 * by platform; `.apk` files are recognised as Android without a prefix.
 */

import mochaLogo from "../assets/apps/mocha.svg";
import soundtrailLogo from "../assets/apps/soundtrail.png";

export interface DownloadApp {
  repo: string;
  title: string;
  description: string;
  /** Square app icon, shown alone in the gallery tile */
  logo: string;
}

export const downloadApps: DownloadApp[] = [
  {
    repo: "mocha",
    title: "Mocha Suite",
    description: "self-hosted privacy suite: password manager, authenticator and subscription manager",
    logo: mochaLogo,
  },
  {
    repo: "soundtrail",
    title: "Soundtrail",
    description: "open-source android equalizer, music player and speed changer",
    logo: soundtrailLogo,
  },
];
