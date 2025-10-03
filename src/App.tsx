import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
// import other pages...
// import "./styles/landing.css"; // optional: already imported by components

function App() {
  return (
    <BrowserRouter>
      {/* Header rendered once at top */}
      <Header />

      {/* App routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* add your other routes here, e.g.
            <Route path="/dashboard" element={<Dashboard/>} />
        */}
      </Routes>

      {/* Footer rendered once at bottom */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
