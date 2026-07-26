import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";

import App from "./App";
import "./index.css";

const container = document.getElementById("root");
if (!container) throw new Error('Root element "#root" was not found.');

createRoot(container).render(
  <StrictMode>
    {/* `reducedMotion="user"` disables every JS-driven transform and layout
        animation when the OS asks for it — the CSS side is handled by the
        prefers-reduced-motion block in index.css. */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
);
