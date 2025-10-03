import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

/**
 * Header component — sticky, translucent, nav on left, actions on right.
 * Renders once at the app root (App.tsx).
 */
const Header: React.FC = () => {
  return (
    <header className="hq-header" role="banner">
      <div className="container">
        <div className="hq-left">
          <Link to="/" className="hq-brand" title="Community-Q — Home">
            <img src={logo} alt="Community-Q logo" className="hq-logo" />
            <span className="hq-brand-name">Community-Q</span>
          </Link>

          <nav className="hq-nav" aria-label="Main navigation">
            <Link className="hq-nav-link" to="/how">How it works</Link>
            <Link className="hq-nav-link" to="/templates">Templates</Link>
            <Link className="hq-nav-link" to="/pricing">Pricing</Link>
            <Link className="hq-nav-link" to="/docs">Docs</Link>
          </nav>
        </div>

        <div className="hq-actions">
          <Link className="hq-signin" to="/signin">Sign In</Link>
          <Link className="hq-cta" to="/start">Start your community</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
