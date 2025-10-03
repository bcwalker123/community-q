import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import "../index.css"; // ensure index.css path matches your project structure

type ThemeMode = "light" | "dark" | "system";

/**
 * Footer with 3-option theme control (light / dark / system)
 */
const Footer: React.FC = () => {
  // stored mode: 'light' | 'dark' | 'system'
  const [mode, setMode] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem("site-theme-mode") as ThemeMode | null;
      return saved || "system";
    } catch {
      return "system";
    }
  });

  // resolved theme (actual 'light' | 'dark' used to set data-theme)
  const [resolved, setResolved] = useState<"light" | "dark">("dark");

  // helper: determine system preference (if available), otherwise undefined
  const getSystemPref = (): "light" | "dark" | undefined => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return undefined;
    try {
      const m = window.matchMedia("(prefers-color-scheme: dark)");
      if (m.matches) return "dark";
      // check light explicitly (fallback)
      const m2 = window.matchMedia("(prefers-color-scheme: light)");
      if (m2.matches) return "light";
      return undefined;
    } catch {
      return undefined;
    }
  };

  // apply theme based on mode
  useEffect(() => {
    const applyResolved = (r: "light" | "dark") => {
      document.documentElement.setAttribute("data-theme", r);
      setResolved(r);
    };

    const saveMode = () => {
      try { localStorage.setItem("site-theme-mode", mode); } catch {}
    };

    if (mode === "light" || mode === "dark") {
      applyResolved(mode);
      saveMode();
    } else {
      // system
      const sys = getSystemPref();
      if (sys) {
        applyResolved(sys);
      } else {
        // if can't detect, choose dark as requested
        applyResolved("dark");
      }
      saveMode();
    }

    // listen for system changes if mode === 'system'
    let mq: MediaQueryList | null = null;
    const listener = (e: MediaQueryListEvent) => {
      if (mode !== "system") return;
      const newPref = e.matches ? "dark" : "light";
      applyResolved(newPref);
    };

    try {
      if ("matchMedia" in window) {
        mq = window.matchMedia("(prefers-color-scheme: dark)");
        if (mq && typeof mq.addEventListener === "function") {
          mq.addEventListener("change", listener);
        } else if (mq && typeof (mq as any).addListener === "function") {
          // older browsers
          (mq as any).addListener(listener);
        }
      }
    } catch {
      mq = null;
    }

    return () => {
      if (mq) {
        try {
          if (typeof mq.removeEventListener === "function") mq.removeEventListener("change", listener);
          else if (typeof (mq as any).removeListener === "function") (mq as any).removeListener(listener);
        } catch {}
      }
    };
  }, [mode]);

  // UI handler
  const selectMode = (m: ThemeMode) => setMode(m);

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-inner">
        <div className="footer-left">
          <img src={logo} alt="Community-Q" className="footer-logo" />
          <div>
            <div className="footer-title">Community-Q</div>
            <div className="footer-muted">Built for creators & communities</div>
          </div>
        </div>

        <div className="footer-middle">
          {/* Replace with SCREENS.md footer content if you have it */}
          <div>
            <div className="footer-links">
              <a href="#privacy">Privacy</a>
              <a href="#terms">Terms</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-social" aria-hidden>
            <a className="social-pill" href="#twitter" aria-label="Twitter">T</a>
            <a className="social-pill" href="#github" aria-label="GitHub">G</a>
            <a className="social-pill" href="#discord" aria-label="Discord">D</a>
          </div>

          <div className="theme-segment" role="radiogroup" aria-label="Theme mode">
            <button
              className="theme-option"
              role="radio"
              aria-checked={mode === "light"}
              onClick={() => selectMode("light")}
              title="Light mode"
            >
              Light
            </button>

            <button
              className="theme-option"
              role="radio"
              aria-checked={mode === "dark"}
              onClick={() => selectMode("dark")}
              title="Dark mode"
            >
              Dark
            </button>

            <button
              className="theme-option"
              role="radio"
              aria-checked={mode === "system"}
              onClick={() => selectMode("system")}
              title="Use system preference"
            >
              System
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
