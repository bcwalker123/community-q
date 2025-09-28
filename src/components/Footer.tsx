import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="cols">
          <div>
            <strong>ComIQ</strong>
            <small>AI community insights · Privacy-first</small>
          </div>
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
        </div>

        <div style={{ marginTop: 18, borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 12 }}>
          <small>© {year} ComIQ. All rights reserved. · <a href="#" onClick={(e)=>e.preventDefault()}>Privacy</a> · <a href="#" onClick={(e)=>e.preventDefault()}>Terms</a></small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
