import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";

/* Minimal placeholders for the other routes so links work.
   You can replace these with your actual pages.
*/
const Placeholder: React.FC<{ title: string }> = ({ title }) => (
  <div style={{ padding: 40 }}>
    <h2>{title}</h2>
    <p style={{ color: "var(--muted)" }}>This is a placeholder page for {title}.</p>
  </div>
);

function App() {
  return (
    <div className="app-root">
      <BrowserRouter>
        <Header />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/how" element={<Placeholder title="How it works" />} />
            <Route path="/templates" element={<Placeholder title="Templates" />} />
            <Route path="/pricing" element={<Placeholder title="Pricing" />} />
            <Route path="/docs" element={<Placeholder title="Docs" />} />
            <Route path="/start" element={<Placeholder title="Start your community" />} />
            <Route path="/demo" element={<Placeholder title="Request a demo" />} />
            <Route path="/signin" element={<Placeholder title="Sign in" />} />
            <Route path="/privacy" element={<Placeholder title="Privacy" />} />
            <Route path="/terms" element={<Placeholder title="Terms" />} />
            <Route path="/contact" element={<Placeholder title="Contact" />} />
            {/* Add other routes here */}
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
