import React, { useState, type JSX } from "react";
import { Link } from "react-router-dom";

/**
 * Landing page content only (no header/footer)
 */
export default function LandingPage(): JSX.Element {
  const [hoveredPlatform, setHoveredPlatform] = useState<string>("");

  const platforms = [
    { id: "twitch", name: "Twitch", label: "TW" },
    { id: "youtube", name: "YouTube", label: "YT" },
    { id: "telegram", name: "Telegram", label: "TG" },
    { id: "discord", name: "Discord", label: "DC" },
    { id: "other", name: "Other", label: "..." },
  ];

  const displayLabel = hoveredPlatform || "multiple platforms";

  return (
    <div className="landing-page">
      <div className="container">
        <main className="hero app-main">
          <div className="hero-inner">
            <section className="hero-copy">
              <h1 className="hero-title">
                Community Intelligence, <span className="accent">Simplified</span>
              </h1>
              <p className="hero-blurb">
                Centralize chats, moderate at scale, and get actionable analytics — all in one place so your community
                can grow without friction.
              </p>

              <div className="hero-ctas">
                <Link className="btn primary" to="/start">Start your community</Link>
                <Link className="btn secondary" to="/demo">Request a demo</Link>
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

        <section className="content-block">
          <div className="max-inner">
            <div style={{ flex: 1 }}>
              <h2>Powerful Moderation & Analytics</h2>
              <p className="muted">
                Auto-moderation rules, role-based permissions, and real-time analytics to quantify community health.
              </p>
              <ul>
                <li>Auto-moderation + audit logs</li>
                <li>Member segmentation & cohort analysis</li>
                <li>Exportable reports & CSV snapshots</li>
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
                <span className="platform-svg" aria-hidden>{p.label}</span>
              </button>
            ))}
          </div>
        </section>

        <hr className="sep" />

        <section className="content-block">
          <div className="max-inner">
            <div style={{ flex: 1 }}>
              <h2>Integrations & Cross-Platform Support</h2>
              <p className="muted">
                Connect to Twitch, YouTube, Telegram, Discord and more — centralize conversations and insights.
              </p>

              <div className="platform-row-small" aria-hidden>
                {platforms.map((p) => (
                  <div key={p.id} className="small-pill"><strong>{p.label}</strong><span style={{ marginLeft: 8 }}>{p.name}</span></div>
                ))}
              </div>
            </div>

            <aside style={{ width: 420, marginLeft: 28 }}>
              <div style={{ borderRadius: 12, padding: 18, background: "var(--glass)" }}>
                <strong>Connectors</strong>
                <p style={{ marginTop: 8, color: "var(--muted)" }}>Quick connectors for channels and chat ingestion.</p>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
}
