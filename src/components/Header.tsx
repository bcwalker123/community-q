import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="brand">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="2" y="6" width="8" height="12" rx="2" fill="var(--primary)"></rect>
          <rect x="14" y="6" width="8" height="8" rx="2" fill="var(--primary)"></rect>
        </svg>
        <span>ComIQ</span>
      </div>

      <div className="actions">
        <button className="btn btn-ghost" onClick={() => alert('Features (TODO)')}>Features</button>
        <button className="btn btn-ghost" onClick={() => alert('Pricing (TODO)')}>Pricing</button>

        <button aria-label="Toggle theme" title="Toggle theme" onClick={toggleTheme} className="btn btn-ghost">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <button className="btn btn-primary" onClick={() => alert('Get started (TODO)')}>Get started</button>
      </div>
    </header>
  );
};

export default Header;
