import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <div>
          <strong>ComIQ</strong>
          <small style={{ display: 'block', marginTop: 6 }}>AI community insights · Privacy-first</small>
        </div>

        <div className="cols">
          <div>
            <strong>Product</strong>
            <div><a href="#" onClick={(e)=>e.preventDefault()}>Features</a></div>
            <div><a href="#" onClick={(e)=>e.preventDefault()}>Pricing</a></div>
          </div>

          <div>
            <strong>Company</strong>
            <div><a href="#" onClick={(e)=>e.preventDefault()}>About</a></div>
            <div><a href="#" onClick={(e)=>e.preventDefault()}>Careers</a></div>
          </div>

          <div style={{ minWidth: 200 }}>
            <strong>Legal</strong>
            <div><a href="#" onClick={(e)=>e.preventDefault()}>Privacy</a></div>
            <div><a href="#" onClick={(e)=>e.preventDefault()}>Terms</a></div>
          </div>
        </div>

        <div style={{ marginLeft: 'auto', alignSelf: 'flex-end' }}>
          <small>© {year} ComIQ. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
