import React, { useState } from "react";

/**
 * LandingPage.tsx — content-only landing page.
 * Drop into src/pages/LandingPage.tsx
 * Make sure Header & Footer are rendered once in App.tsx (not inside this file)
 */

export default function LandingPage(): JSX.Element {
  const [hoveredPlatform, setHoveredPlatform] = useState<string>("");

  const platforms = [
    { id: "twitch", name: "Twitch", label: "T" },
    { id: "youtube", name: "YouTube", label: "Y" },
    { id: "telegram", name: "Telegram", label: "TG" },
    { id: "discord", name: "Discord", label: "D" },
    { id: "other", name: "Other", label: "..." },
  ];

  const displayLabel = hoveredPlatform || "multiple platforms";

  return (
    <div className="landing-page">
      {/* HERO */}
      <div className="container">
        <main className="hero">
          <div className="hero-inner">
            <section className="hero-copy">
              <h1 className="hero-title">
                Community Intelligence, <span className="accent">Simplified</span>
              </h1>
              <p className="hero-blurb">
                Centralize chats, moderate at scale, and gain actionable insights.
                Built for creators and communities who want to grow with control and clarity.
              </p>

              <div className="hero-ctas">
                <a className="btn primary" href="#start">Start your community</a>
                <a className="btn secondary" href="#demo">Request a demo</a>
              </div>
            </section>

            <section className="hero-visual" aria-hidden>
              <div className="globe-circle">
                <div style={{ color: "var(--muted)" }}>*interactive globe placeholder*</div>
              </div>
            </section>
          </div>
        </main>
      </div>

      <div className="container">
        <hr className="sep" />

        {/* FIRST content block (wider + taller) */}
        <section className="content-block">
          <div className="max-inner">
            <div style={{ flex: 1 }}>
              <h2>Powerful moderation & analytics</h2>
              <p className="muted">
                Auto moderation, role-based tools, and member analytics that help you make data-driven decisions.
              </p>
              <ul>
                <li>Auto-moderation rules and action logs</li>
                <li>Member segmentation with cohorts</li>
                <li>Exportable engagement reports</li>
              </ul>
            </div>

            <aside style={{ width: 420, marginLeft: 28 }}>
              <div style={{ borderRadius: 12, padding: 18, background: "var(--glass)" }}>
                <strong>Live snapshot</strong>
                <div style={{ marginTop: 10, color: "var(--muted)" }}>Active members: 1,248</div>
                <div style={{ marginTop: 8, color: "var(--muted)" }}>Avg messages / min: 6.2</div>
              </div>
            </aside>
          </div>
        </section>

        <hr className="sep" />

        {/* PLATFORMS ROW */}
        <section className="platforms">
          <div className="platform-copy">
            <div className="small-title">Community-Q with</div>
            <div className="platform-head">
              <span className={`platform-text default ${hoveredPlatform ? "hidden" : "visible"}`}>multiple platforms</span>
              <span className={`platform-text hovered ${hoveredPlatform ? "visible" : "hidden"}`}>{displayLabel}</span>
            </div>
          </div>

          <div className="platform-icons" role="list" aria-label="Integrations">
            {platforms.map((p) => (
              <button
                key={p.id}
                className="platform-btn"
                onMouseEnter={() => setHoveredPlatform(p.name)}
                onFocus={() => setHoveredPlatform(p.name)}
                onMouseLeave={() => setHoveredPlatform("")}
                onBlur={() => setHoveredPlatform("")}
                aria-label={p.name}
                title={p.name}
                type="button"
              >
                <span className="platform-svg" aria-hidden="true">{p.label}</span>
              </button>
            ))}
          </div>
        </section>

        <hr className="sep" />

        {/* SECOND content block (wider) */}
        <section className="content-block">
          <div className="max-inner">
            <div style={{ flex: 1 }}>
              <h2>Integrations & cross-platform support</h2>
              <p className="muted">
                Connect Community-Q to Twitch, YouTube, Telegram, Discord and more — centralize conversations across platforms.
              </p>

              <div className="platform-row-small" aria-hidden>
                {platforms.map((p) => (
                  <div key={p.id} className="small-pill"><strong>{p.label}</strong><span style={{ marginLeft: 6 }}>{p.name}</span></div>
                ))}
              </div>
            </div>

            <aside style={{ width: 420, marginLeft: 28 }}>
              <div style={{ borderRadius: 12, padding: 18, background: "var(--glass)" }}>
                <strong>Connectors</strong>
                <p style={{ marginTop: 8, color: "var(--muted)" }}>Quickly connect channels and authorize data flows with minimal setup.</p>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
}
