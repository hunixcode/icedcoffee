import { createContext, useContext } from "react";

/**
 * False while the page loader still covers the screen. Above-the-fold
 * entrances wait on it, so they play as the curtain lifts instead of
 * finishing unseen behind it.
 */
export const IntroContext = createContext(true);

export const useIntroDone = (): boolean => useContext(IntroContext);
