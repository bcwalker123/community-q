import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <div style={{ minWidth: 220 }}>
          <strong style={{ fontSize: 16 }}>ComIQ</strong>
          <div style={{ marginTop: 8, color: 'var(--muted)' }}>AI community insights · Privacy-first</div>
        </div>

        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          <div className="footer-col">
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Product</div>
            <div className="small"><a href="#product" onClick={(e)=>e.preventDefault()}>Features</a></div>
            <div className="small"><a href="#pricing" onClick={(e)=>e.preventDefault()}>Pricing</a></div>
          </div>

          <div className="footer-col">
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Company</div>
            <div className="small"><a href="#about" onClick={(e)=>e.preventDefault()}>About</a></div>
            <div className="small"><a href="#careers" onClick={(e)=>e.preventDefault()}>Careers</a></div>
          </div>

          <div className="footer-col">
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Legal</div>
            <div className="small"><a href="#privacy" onClick={(e)=>e.preventDefault()}>Privacy</a></div>
            <div className="small"><a href="#terms" onClick={(e)=>e.preventDefault()}>Terms</a></div>
          </div>
        </div>

        <div style={{ marginLeft: 'auto', alignSelf: 'flex-end' }}>
          <small style={{ color: 'var(--muted)' }}>© {year} ComIQ. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
