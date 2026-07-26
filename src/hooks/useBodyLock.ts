import { useEffect } from "react";

/**
 * Freezes background scrolling while an overlay is open.
 *
 * No scroll save/restore here on purpose: `html { scrollbar-gutter: stable }`
 * keeps the scrollbar space reserved, so toggling `overflow: hidden` changes
 * neither the layout width nor the scroll offset. The previous version
 * re-applied the saved offset on unlock, which fought the smooth scroll started
 * by a menu click and produced a visible jump.
 */
export function useBodyLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    document.body.classList.add("is-locked");
    return () => document.body.classList.remove("is-locked");
  }, [locked]);
}
