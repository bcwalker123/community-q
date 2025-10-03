import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import logo from "../assets/logo.png";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-root">
      <Header />

      <main className="hero">
        <div className="hero-inner">
          <section className="hero-copy">
            <h1 className="hero-title">
              Community Intelligence, <span className="accent">Simplified</span>
            </h1>

            <p className="hero-blurb">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit amet
              consectetur adipisicing elit quisque faucibus ex. Adipiscing elit
              quisque faucibus ex sapien vitae pellentesque.
            </p>

            <div className="hero-ctas">
              <a className="btn primary" href="#start">Start your community</a>
              <a className="btn secondary" href="#demo">Request A Demo</a>
            </div>
          </section>

          <section className="hero-visual" aria-hidden="true">
            <div className="globe-circle">
              <div className="globe-label">*moving interactive globe*</div>
            </div>
          </section>
        </div>

        <hr className="sep" />

        <section className="other-section">
          <div className="center-thing">*Other things*</div>
        </section>

        <hr className="sep" />

        <section className="platforms">
          <div className="platform-copy">
            <div className="small-title">Community-Q with</div>
            <div className="platform-head">multiple platform</div>
          </div>

          <div className="platform-icons">
            <div className="icon-box">Twitch</div>
            <div className="icon-box">YouTube</div>
            <div className="icon-box">Telegram</div>
            <div className="icon-box">*ect*</div>
          </div>
        </section>

        <hr className="sep" />

        <section className="other-section">
          <div className="center-thing">*Other things*</div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
