import React from "react";
import logo from "../assets/logo.png";
import "../styles/landing.css";

/**
 * Header component — sticky, semi-transparent background, subtle divider.
 * Meant to be rendered once (e.g. at App.tsx level).
 */
const Header: React.FC = () => {
  return (
    <header className="hq-header" role="banner" aria-label="Main header">
      <div className="hq-header-inner">
        <div className="hq-brand" title="Community-Q home">
          <img src={logo} alt="Community-Q logo" className="hq-logo" />
          <span className="hq-brand-name">Community-Q</span>
        </div>

        <nav className="hq-nav" aria-label="Main navigation">
          <a className="hq-nav-link" href="#how">How it works</a>
          <a className="hq-nav-link" href="#templates">Templates</a>
          <a className="hq-nav-link" href="#pricing">Pricing</a>
          <a className="hq-nav-link" href="#docs">Docs</a>
        </nav>

        <div className="hq-actions">
          <a className="hq-signin" href="#signin">Sign In</a>
          <a className="hq-cta" href="#start">Start your community</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
