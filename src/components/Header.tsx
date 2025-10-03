import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header" role="banner" aria-roledescription="site header">
      <div className="header-inner" role="navigation" aria-label="Main navigation">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="/" className="brand" aria-label="Community-Q home" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'inherit' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
              <rect x="2" y="6" width="8" height="12" rx="2" fill="var(--primary)"></rect>
              <rect x="14" y="6" width="8" height="8" rx="2" fill="var(--primary)"></rect>
            </svg>
            <span style={{ fontWeight: 700, fontSize: 18 }}>Community-Q</span>
          </a>

          <nav className="nav" aria-label="Top navigation" style={{ display: 'flex', gap: 16 }}>
            <a href="#how-it-works">How it works</a>
            <a href="#templates">Templates</a>
            <a href="/pricing">Pricing</a>
            <a href="/docs">Docs</a>
          </nav>
        </div>

        <div className="actions" role="group" aria-label="Header actions" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <a className="btn btn-link" href="/login" aria-label="Log in">Log in</a>

          <button
            className="btn btn-outline"
            onClick={toggleTheme}
            aria-pressed={theme === 'dark'}
            aria-label="Toggle theme"
            title="Toggle theme"
            style={{ minWidth: 96 }}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>

          <a
            className="btn btn-primary"
            href="/signup"
            role="button"
            aria-label="Get started"
            style={{ textDecoration: 'none' }}
          >
            Get started
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
