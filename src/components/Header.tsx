import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Header hides on scroll down and reappears on scroll up.
 * Simple threshold-based implementation without heavy throttling
 * for clarity. Works in modern browsers.
 */

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef<number>(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY || 0;

    const handleScroll = () => {
      const currentY = window.scrollY || 0;
      const delta = currentY - lastY.current;

      // small threshold to avoid flicker
      const threshold = 10;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          if (Math.abs(delta) > threshold) {
            // Scrolling down -> hide (if past 80px)
            if (delta > 0 && currentY > 80) {
              setHidden(true);
            } else {
              // Scrolling up -> show
              setHidden(false);
            }
            lastY.current = currentY;
          }
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${hidden ? 'header--hidden' : ''}`}>
      <div className="brand" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
