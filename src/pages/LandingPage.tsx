import React, { useState } from 'react';

const FEATURES = [
  { title: 'AI Q&A', body: 'Ask natural-language questions and get concise, evidence-backed answers with sources.' },
  { title: 'Multi-source', body: 'Aggregate Discord, Slack, Discourse, and support exports into one index.' },
  { title: 'Action cards', body: 'Turn insights into Jira/GH/Asana tickets and polls with one click.' },
  { title: 'Privacy & governance', body: 'Configurable retention, PII redaction, and audit logs.' },
  { title: 'Realtime alerts', body: 'Spike detection and watchlists surface urgent issues.' },
  { title: 'Member profiles', body: 'Unified member view with engagement and churn signals.' }
];

export default function LandingPage() {
  const [qna, setQna] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const trySample = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/qna', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'Top feature requests last 90 days' })
      });
      const data = await res.json();
      setQna(data);
    } catch (e) {
      alert('Could not reach API — ensure backend is running.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main" role="main">
      <div className="container">
        {/* HERO */}
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-left">
            <div className="kicker">Community Intelligence</div>
            <h1 id="hero-heading">Ask your community. Get evidence-backed answers.</h1>
            <p className="lead">Aggregate Discord, Slack, forums, and support into a single AI-driven view. Ask what members want, find top issues, and turn insights into action.</p>

            <div className="hero-ctas">
              <button className="btn btn-primary" onClick={() => (window.location.hash = '#signup')}>Start free trial</button>
              <button className="btn btn-outline" onClick={trySample}>{loading ? 'Thinking…' : 'Try sample Q&A'}</button>
              <a className="btn" href="#integrations" style={{ border: '1px solid var(--card-border)', borderRadius: 10, padding: '10px 14px' }}>View integrations</a>
            </div>

            <div className="trust" style={{ marginTop: 22 }}>
              <span className="small">Trusted by community teams at</span>
              <div style={{ display: 'flex', gap: 12, marginLeft: 12 }}>
                <div style={{ width: 84, height: 28, background: 'rgba(2,6,23,0.06)', borderRadius: 6 }} />
                <div style={{ width: 84, height: 28, background: 'rgba(2,6,23,0.04)', borderRadius: 6 }} />
                <div style={{ width: 84, height: 28, background: 'rgba(2,6,23,0.03)', borderRadius: 6 }} />
              </div>
            </div>
          </div>

          <aside className="hero-right" aria-hidden>
            <div className="visual-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 800 }}>Example insight</div>
                <div className="small">Confidence: 88%</div>
              </div>

              <div style={{ marginTop: 10, fontSize: 16, fontWeight: 700 }}>
                Top 3 feature requests
              </div>
              <div style={{ marginTop: 8, color: 'var(--muted)' }}>
                Multi-account switching, CSV export, dark mode.
              </div>

              <div style={{ marginTop: 12 }}>
                <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
                  <div style={{ padding: 10, borderRadius: 8, background: 'rgba(2,6,23,0.02)', color: 'var(--muted)' }}>
                    Discord #product · 2025-06-14 — "I need a multi-account switcher..."
                  </div>
                  <div style={{ padding: 10, borderRadius: 8, background: 'rgba(2,6,23,0.02)', color: 'var(--muted)' }}>
                    Support ticket #1245 · 2025-08-03 — "Please add CSV export..."
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
                <button className="btn btn-primary" onClick={() => (window.location.hash = '#signup')}>Start free trial</button>
                <button className="btn btn-outline" onClick={() => alert('Save insight (TODO)')}>Save insight</button>
              </div>
            </div>

            <div style={{ height: 18 }} />
            <div className="visual-card" style={{ padding: 14 }}>
              <div style={{ fontWeight:700 }}>Quick metrics</div>
              <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                <div style={{ background: 'rgba(2,6,23,0.02)', padding: 10, borderRadius: 8 }}>
                  <div style={{ fontWeight: 800 }}>42K</div>
                  <div className="small" style={{ marginTop: 4 }}>posts processed</div>
                </div>
                <div style={{ background: 'rgba(2,6,23,0.02)', padding: 10, borderRadius: 8 }}>
                  <div style={{ fontWeight: 800 }}>120+</div>
                  <div className="small" style={{ marginTop: 4 }}>active communities</div>
                </div>
              </div>
            </div>
          </aside>
        </section>

        {/* FEATURES HORIZONTAL SCROLL */}
        <section aria-labelledby="features-heading" style={{ marginTop: 8 }}>
          <h2 id="features-heading" style={{ margin: '6px 0 0 0' }}>What ComIQ does</h2>
          <p className="small" style={{ marginTop: 6 }}>Fast discovery, prioritized insights, and actions that lead to impact.</p>

          <div className="features-scroll" role="list" aria-label="Feature cards">
            {FEATURES.map((f) => (
              <div className="feature-card" role="listitem" key={f.title}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ fontWeight: 800 }}>{f.title}</div>
                  <div style={{ color: 'var(--muted)', fontSize: 12 }}>MVP</div>
                </div>
                <div style={{ marginTop: 10, color: 'var(--muted)' }}>{f.body}</div>
                <div style={{ marginTop: 12 }}>
                  <button className="btn btn-outline" onClick={() => alert(`${f.title} docs (TODO)`)}>Learn more</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Live demo */}
        <section style={{ marginTop: 28 }}>
          <div className="demo-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 800 }}>Live demo</div>
              <div style={{ color: 'var(--muted)' }}>Canned data</div>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: 700 }}>{qna ? qna.answer : 'Run a sample AI Q&A to see how ComIQ synthesizes community signals.'}</div>
              <div style={{ marginTop: 10 }}>
                {qna ? (
                  qna.evidence?.map((e: any, i: number) => (
                    <div key={i} style={{ padding: 10, borderRadius: 8, background: 'rgba(2,6,23,0.02)', marginTop: 8 }}>
                      <div style={{ fontWeight: 700 }}>{e.source} · {new Date(e.ts).toLocaleDateString()}</div>
                      <div style={{ color: 'var(--muted)' }}>{e.text}</div>
                    </div>
                  ))
                ) : (
                  <div style={{ color: 'var(--muted)' }}>No demo run yet.</div>
                )}
              </div>

              <div style={{ marginTop: 12, display: 'flex', gap: 10 }}>
                <button className="btn btn-primary" onClick={() => { navigator.clipboard?.writeText('Top feature requests last 90 days'); alert('Prompt copied'); }}>
                  Copy prompt
                </button>
                <button className="btn btn-outline" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>Contact sales</button>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-strip">
          <div className="cta-inner">
            <div>
              <div style={{ fontSize: 18, fontWeight: 800 }}>Ready to understand your community better?</div>
              <div className="small" style={{ marginTop: 6 }}>Start a free trial or request a demo for an onboarding walkthrough.</div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary" onClick={() => (window.location.hash = '#signup')}>Start free trial</button>
              <button className="btn btn-outline" onClick={() => (window.location.hash = '#request-demo')}>Request demo</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
