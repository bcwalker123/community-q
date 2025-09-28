import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header" role="banner">
      <div className="header-inner" role="navigation" aria-label="Main">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="brand" aria-hidden>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="2" y="6" width="8" height="12" rx="2" fill="var(--primary)"></rect>
              <rect x="14" y="6" width="8" height="8" rx="2" fill="var(--primary)"></rect>
            </svg>
            <span>ComIQ</span>
          </div>

          <nav className="nav" aria-label="Top navigation">
            <a href="#product">Product</a>
            <a href="#integrations">Integrations</a>
            <a href="#usecases">Use cases</a>
            <a href="#pricing">Pricing</a>
          </nav>
        </div>

        <div className="actions" role="group" aria-label="Header actions">
          <button
            className="btn btn-outline"
            onClick={() => {
              window.location.hash = '#contact';
            }}
            aria-label="Contact Sales"
          >
            Contact
          </button>

          <button
            className="btn btn-outline"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>

          <button
            className="btn btn-primary"
            onClick={() => {
              window.location.hash = '#signup';
            }}
            aria-label="Get started"
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
