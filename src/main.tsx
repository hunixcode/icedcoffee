import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";

import App from "./App";
import "./index.css";

const container = document.getElementById("root");
if (!container) throw new Error('Root element "#root" was not found.');

createRoot(container).render(
  <StrictMode>
    {/* Honours the OS "reduce motion" setting for every JS-driven animation;
        the CSS side is handled in index.css. */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
);
