import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const columns = [
    {
      title: 'Product',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Features', href: '/#features' },
        { label: 'Roadmap', href: '/roadmap' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Docs', href: '/docs' },
        { label: 'Blog', href: '/blog' },
        { label: 'Sample report', href: '/sample-report' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
        { label: 'Integrations', href: '/integrations' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
      ],
    },
  ];

  return (
    <footer className="site-footer" role="contentinfo" aria-label="Site footer">
      <div className="footer-inner" style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ minWidth: 220 }}>
          <a href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'inline-flex', gap: 12, alignItems: 'center' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
              <rect x="2" y="6" width="8" height="12" rx="2" fill="var(--primary)"></rect>
              <rect x="14" y="6" width="8" height="8" rx="2" fill="var(--primary)"></rect>
            </svg>
            <strong style={{ fontSize: 16 }}>Community-Q</strong>
          </a>

          <div style={{ marginTop: 8, color: 'var(--muted)', maxWidth: 260 }}>
            AI-driven community insights · Privacy-first · Anonymize by default
          </div>
        </div>

        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          {columns.map((col) => (
            <div key={col.title} className="footer-col" aria-labelledby={`footer-${col.title.toLowerCase()}`}>
              <div id={`footer-${col.title.toLowerCase()}`} style={{ fontWeight: 700, marginBottom: 8 }}>
                {col.title}
              </div>
              {col.links.map((l) => (
                <div key={l.href} className="small" style={{ marginBottom: 6 }}>
                  <a href={l.href}>{l.label}</a>
                </div>
              ))}
            </div>
          ))}

          <div className="footer-col" style={{ minWidth: 220 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Integrations</div>
            <div className="small"><a href="/integrations/slack">Slack</a></div>
            <div className="small"><a href="/integrations/discord">Discord</a></div>
            <div className="small"><a href="/integrations/jira">Jira</a></div>

            <div style={{ marginTop: 12 }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const data = new FormData(form);
                  const email = String(data.get('email') || '').trim();
                  if (!email) return;
                  // lightweight client-side tracking hook; backend should store leads via /api/leads
                  window.fetch('/api/leads', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                  });
                  form.reset();
                  // Ideally show a toast — omitted here for brevity
                }}
                aria-label="Subscribe to newsletter"
              >
                <label htmlFor="footer-newsletter" style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>Newsletter</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input id="footer-newsletter" name="email" type="email" placeholder="Your work email" aria-label="Your work email" style={{ padding: '6px 8px', minWidth: 160 }} />
                  <button type="submit" className="btn btn-primary" aria-label="Subscribe">Subscribe</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div style={{ marginLeft: 'auto', alignSelf: 'flex-end' }}>
          <small style={{ color: 'var(--muted)' }}>© {year} Community-Q. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
