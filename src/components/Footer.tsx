import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

/* Theme mode */
type ThemeMode = "dark" | "system" | "light";

/* Cycle order: dark -> system -> light */
const CYCLE: ThemeMode[] = ["dark", "system", "light"];

const Footer: React.FC = () => {
  // load mode or default to 'dark'
  const [mode, setMode] = useState<ThemeMode>(() => {
    try {
      const v = localStorage.getItem("site-theme-mode") as ThemeMode | null;
      return (v as ThemeMode) || "dark";
    } catch {
      return "dark";
    }
  });

  // resolved theme (what is actually applied)
  const [resolved, setResolved] = useState<"dark" | "light">("dark");

  // return system pref if available
  const getSystemPref = (): "dark" | "light" | undefined => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return undefined;
    try {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      if (mq.matches) return "dark";
      const mq2 = window.matchMedia("(prefers-color-scheme: light)");
      if (mq2.matches) return "light";
      return undefined;
    } catch {
      return undefined;
    }
  };

  // apply mode -> resolved theme, persist mode, listen to system changes
  useEffect(() => {
    const apply = (r: "dark" | "light") => {
      document.documentElement.setAttribute("data-theme", r);
      setResolved(r);
    };

    const persistMode = () => {
      try { localStorage.setItem("site-theme-mode", mode); } catch {}
    };

    if (mode === "dark" || mode === "light") {
      apply(mode);
      persistMode();
    } else {
      // system
      const sys = getSystemPref();
      if (sys) apply(sys);
      else apply("dark"); // fallback to dark if unable to detect
      persistMode();
    }

    // listen for system changes when in system mode
    let mq: MediaQueryList | null = null;
    const listener = (e: MediaQueryListEvent) => {
      if (mode !== "system") return;
      const newPref: "dark" | "light" = e.matches ? "dark" : "light";
      apply(newPref);
    };

    try {
      if ("matchMedia" in window) {
        mq = window.matchMedia("(prefers-color-scheme: dark)");
        if (mq.addEventListener) mq.addEventListener("change", listener);
        else if ((mq as any).addListener) (mq as any).addListener(listener);
      }
    } catch {
      mq = null;
    }

    return () => {
      if (mq) {
        try {
          if ((mq as any).removeEventListener) (mq as any).removeEventListener("change", listener);
          else if ((mq as any).removeListener) (mq as any).removeListener(listener);
        } catch {}
      }
    };
  }, [mode]);

  // cycle the mode: dark -> system -> light -> dark...
  const cycleMode = () => {
    const idx = CYCLE.indexOf(mode);
    const next = CYCLE[(idx + 1) % CYCLE.length];
    setMode(next);
  };

  // choose icon for display based on mode
  const IconForMode = ({ m }: { m: ThemeMode }) => {
    if (m === "dark") {
      return (
        // moon icon
        <svg viewBox="0 0 24 24" aria-hidden focusable="false">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      );
    } else if (m === "light") {
      return (
        // sun icon
        <svg viewBox="0 0 24 24" aria-hidden focusable="false">
          <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 7a5 5 0 100 10 5 5 0 000-10z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      );
    } else {
      return (
        // system / auto icon (globe)
        <svg viewBox="0 0 24 24" aria-hidden focusable="false">
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2v16m8-8H4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      );
    }
  };

  // social icons markup (svg) helper
  const Social = ({ name, href, children }: { name: string; href: string; children: React.ReactNode }) => (
    <a className="social-link" href={href} target="_blank" rel="noreferrer noopener" aria-label={name} title={name}>
      {children}
    </a>
  );

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-inner">
        <div className="footer-left">
          <img src={logo} alt="Community-Q" className="footer-logo" />
          <div>
            <div className="footer-title">
              Community-Q<span style={{ fontSize: 14, opacity: 0.85 }}>™</span>
            </div>
            <div className="footer-muted">Built for creators & communities</div>
          </div>
        </div>

        <div className="footer-middle">
          <div style={{ display: "flex", gap: 28 }}>
            <div className="footer-links-col">
              <h4>Product</h4>
              <Link to="/how-it-works">How it works</Link>
              <Link to="/features">Features</Link>
              <Link to="/templates">Templates</Link>
            </div>

            <div className="footer-links-col">
              <h4>Company</h4>
              <Link to="/about">About</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/privacy">Privacy</Link>
            </div>
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-social-row" aria-hidden>
            <Social name="YouTube" href="https://youtube.com/">
              {/* YouTube */}
              <svg viewBox="0 0 24 24"><path d="M10 15l5.2-3L10 9v6zM21.6 7.2c-.2-.7-.8-1.3-1.5-1.5C18.6 5 12 5 12 5s-6.6 0-8.1.7c-.7.2-1.3.8-1.5 1.5C1.6 9 1.6 12 1.6 12s0 3 .8 4.8c.2.7.8 1.3 1.5 1.5 1.6.7 8.1.7 8.1.7s6.6 0 8.1-.7c.7-.2 1.3-.8 1.5-1.5.8-1.8.8-4.8.8-4.8s0-3-.8-4.8z" fill="currentColor"/></svg>
            </Social>

            <Social name="Twitch" href="https://twitch.tv/">
              {/* Twitch */}
              <svg viewBox="0 0 24 24"><path d="M4 3h13l3 3v10a1 1 0 01-1 1h-4v3l-3-3H7a1 1 0 01-1-1V4a1 1 0 011-1z" fill="currentColor"/></svg>
            </Social>

            <Social name="Instagram" href="https://instagram.com/">
              {/* Instagram */}
              <svg viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>
            </Social>

            <Social name="X (Twitter)" href="https://twitter.com/">
              {/* X / twitter */}
              <svg viewBox="0 0 24 24"><path d="M23 4.5c-.8.4-1.6.7-2.4.8.9-.5 1.6-1.3 1.9-2.2-.8.5-1.8.9-2.8 1.1C18.8 3.8 17.6 3 16.2 3c-2 0-3.6 1.7-3.6 3.8 0 .3 0 .6.1.9C9.7 7.6 6.1 5.9 3.9 3.2c-.4.7-.6 1.5-.6 2.5 0 1.6.9 3 2.2 3.8-.7 0-1.4-.2-2-.6v.1c0 2.2 1.5 4 3.6 4.4-.4.1-.8.2-1.3.2-.3 0-.6 0-.9-.1.6 1.9 2.4 3.3 4.6 3.4-1.7 1.3-3.8 2.1-6.1 2.1-.4 0-.7 0-1.1-.1C2.6 20.1 5.5 21 8.7 21c8.3 0 12.8-7 12.8-13 0-.2 0-.3 0-.5.9-.7 1.6-1.4 2.2-2.3-.8.3-1.6.5-2.4.6z" fill="currentColor"/></svg>
            </Social>

            <Social name="Discord" href="https://discord.com/">
              {/* Discord */}
              <svg viewBox="0 0 24 24"><path d="M20 3H4a1 1 0 00-1 1v14c0 .6.4 1 1 1h14l3 3V4a1 1 0 00-1-1z" stroke="currentColor" strokeWidth="1.1" fill="none"/></svg>
            </Social>

            <Social name="TikTok" href="https://tiktok.com/">
              {/* Tiktok (note: simplified icon) */}
              <svg viewBox="0 0 24 24"><path d="M9 3v12a4 4 0 104 4V7h4V3h-8z" fill="currentColor"/></svg>
            </Social>

            <Social name="Facebook" href="https://facebook.com/">
              {/* Facebook */}
              <svg viewBox="0 0 24 24"><path d="M22 12.1C22 6.7 17.5 2 12 2S2 6.7 2 12.1C2 17 5.9 21 10.9 21V14.2H8.3v-2.9h2.6V9.5c0-2.6 1.5-4 3.8-4 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6v1.9h2.7l-.4 2.9h-2.3V21C18.1 21 22 17 22 12.1z" fill="currentColor"/></svg>
            </Social>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button
              className="theme-cycle-button"
              onClick={cycleMode}
              aria-label={`Theme mode: ${mode}. Click to switch.`}
              title={`Theme: ${mode}`}
            >
              <IconForMode m={mode} />
            </button>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>
              {/* show resolved theme */}
              {`Theme: ${mode}${mode === "system" ? ` → ${resolved}` : ""}`}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
