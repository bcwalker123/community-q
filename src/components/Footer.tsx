import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";

const Footer: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("site-theme") as "light" | "dark") || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("site-theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <img src={logo} alt="Community-Q" className="footer-logo" />
          <div className="footer-copy">
            © {new Date().getFullYear()} Community-Q — All rights reserved.
          </div>
        </div>

        <div className="footer-right">
          <div className="theme-toggle-wrap">
            <label className="theme-toggle">
              <input
                aria-label="Toggle light/dark"
                type="checkbox"
                onChange={toggle}
                checked={theme === "light"}
              />
              <span className="toggle-label">
                {theme === "dark" ? "Dark" : "Light"}
              </span>
            </label>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
