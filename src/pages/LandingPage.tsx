import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [qnaResp, setQnaResp] = useState<any>(null);

  const askSample = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/qna', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'Top feature requests last 90 days' })
      });
      const data = await res.json();
      setQnaResp(data);
    } catch (err) {
      alert('API error — is backend running on http://localhost:4000 ?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <Header />
      <main className="main-content">
        <section className="container hero" style={{ paddingTop: 18 }}>
          <div className="left">
            <h1>Know your community like a teammate</h1>
            <p>Aggregate Discord, Slack, forums and support into a single AI Q&A. Ask what members want, what they’re worried about, and act — fast.</p>

            <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
              <button className="btn btn-primary" onClick={() => alert('Sign up (TODO)')}>
                Start free trial
              </button>
              <button className="btn btn-ghost" onClick={() => alert('Login (TODO)')}>Login</button>
              <button className="btn btn-ghost" onClick={askSample}>{loading ? 'Thinking…' : 'Try sample Q&A'}</button>
            </div>

            <div className="features" style={{ marginTop: 28 }}>
              <div className="feature">
                <strong>AI Q&A</strong>
                <p style={{ color: 'var(--muted)' }}>Ask natural-language questions and get evidence-backed answers.</p>
              </div>
              <div className="feature">
                <strong>Multi-source</strong>
                <p style={{ color: 'var(--muted)' }}>Connect Discord, Slack, forums and support CSVs.</p>
              </div>
              <div className="feature">
                <strong>Action cards</strong>
                <p style={{ color: 'var(--muted)' }}>Turn insights into Jira/Slack actions with one click.</p>
              </div>
              <div className="feature">
                <strong>Privacy-first</strong>
                <p style={{ color: 'var(--muted)' }}>Configurable retention & PII redaction.</p>
              </div>
            </div>
          </div>

          <div className="right">
            <div className="card" style={{ width: 420 }}>
              <strong>Example insight</strong>
              <p style={{ color: 'var(--muted)', marginTop: 8 }}>Ask: Top feature requests</p>

              {qnaResp ? (
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontWeight: 700 }}>{qnaResp.answer}</div>
                  <div style={{ color: 'var(--muted)', marginTop: 12 }}>
                    Confidence: {(qnaResp.confidence * 100).toFixed(0)}%
                  </div>
                  <ul style={{ marginTop: 12 }}>
                    {qnaResp.evidence.map((e: any, i: number) => (
                      <li key={i} style={{ marginBottom: 8 }}>
                        <div style={{ fontWeight: 600 }}>{e.source} · {new Date(e.ts).toLocaleDateString()}</div>
                        <div style={{ color: 'var(--muted)' }}>{e.text}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div style={{ marginTop: 12, color: 'var(--muted)' }}>
                  Click “Try sample Q&A” to call the backend and see a canned response.
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="container cta-strip">
          <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <strong style={{ fontSize: 18 }}>Ready to understand your community better?</strong>
              <div style={{ color: 'var(--muted)', marginTop: 8 }}>Start a free trial and see actionable insights in days.</div>
            </div>
            <div>
              <button className="btn btn-primary" onClick={() => alert('Start free trial (TODO)')}>Start free trial</button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
