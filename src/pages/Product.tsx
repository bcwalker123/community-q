import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FeatureModule: React.FC<{ title: string; body: string; children?: React.ReactNode }> = ({ title, body, children }) => (
  <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', marginTop: 22 }}>
    <div style={{ width: 12, height: 12, borderRadius: 4, background: 'var(--primary)', marginTop: 6 }} />
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 800, fontSize: 18 }}>{title}</div>
      <div style={{ marginTop: 8, color: 'var(--muted)' }}>{body}</div>
      {children && <div style={{ marginTop: 12 }}>{children}</div>}
    </div>
  </div>
);

export default function Product() {
  return (
    <div className="container" style={{ paddingTop: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
        <div style={{ maxWidth: 720 }}>
          <div className="kicker">Product</div>
          <h1 style={{ marginTop: 6 }}>Community insights that drive product decisions</h1>
          <p className="lead" style={{ marginTop: 10 }}>
            ComIQ synthesizes conversation across platforms into prioritized, evidence-backed insights — then turns those insights into action.
          </p>

          <FeatureModule
            title="AI Q&A (RAG-ready)"
            body="Ask plain-language questions. We retrieve supporting evidence and synthesize a concise answer with a confidence score."
          >
            <div style={{ marginTop: 10 }}>
              <div style={{ background: 'rgba(2,6,23,0.03)', padding: 12, borderRadius: 8 }}>
                <strong>Example</strong>
                <div style={{ color: 'var(--muted)', marginTop: 6 }}>
                  Q: "Top feature requests in #product last 30 days?"
                </div>
              </div>
            </div>
          </FeatureModule>

          <FeatureModule
            title="Topic detection & trends"
            body="Automatic clustering and trending topics help you prioritize what matters most."
          >
            <div style={{ marginTop: 10 }}>
              <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                <div style={{ background: 'var(--primary)', color: '#fff', padding: 8, borderRadius: 8 }}>multi-account</div>
                <div style={{ background: '#E5E7EB', padding: 8, borderRadius: 8 }}>csv export</div>
                <div style={{ background: '#E5E7EB', padding: 8, borderRadius: 8 }}>dark mode</div>
              </div>
            </div>
          </FeatureModule>

          <FeatureModule
            title="Evidence & provenance"
            body="Every AI claim is supported by exact post excerpts, timestamps and links to origin so you can verify quickly."
          />

          <FeatureModule
            title="Action cards & integrations"
            body="Create tickets, run polls, and notify channels directly from insights."
          />
        </div>

        <aside style={{ width: 340 }}>
          <div className="visual-card" style={{ padding: 18 }}>
            <div style={{ fontWeight: 900 }}>How it works (quick)</div>
            <ol style={{ marginTop: 10, color: 'var(--muted)' }}>
              <li>Connect sources (Discord, Slack, CSV)</li>
              <li>Ingest & index (vector store)</li>
              <li>Ask questions → get evidence + actions</li>
            </ol>

            <div style={{ marginTop: 14 }}>
              <button className="btn btn-primary" onClick={() => (window.location.hash = '#signup')}>Start free trial</button>
            </div>
          </div>

          <div style={{ height: 18 }} />

          <div className="visual-card" style={{ padding: 14 }}>
            <div style={{ fontWeight: 800 }}>Quick statistics</div>
            <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
              <div style={{ background: 'rgba(2,6,23,0.02)', padding: 10, borderRadius: 8 }}>
                <div style={{ fontWeight: 900 }}>42k</div>
                <div className="small">posts processed</div>
              </div>
              <div style={{ background: 'rgba(2,6,23,0.02)', padding: 10, borderRadius: 8 }}>
                <div style={{ fontWeight: 900 }}>3k</div>
                <div className="small">queries this month</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
