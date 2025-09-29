import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Product from './pages/Product';
import Integrations from './pages/Integrations';
import UseCases from './pages/UseCases';
import Pricing from './pages/Pricing';
import Header from './components/Header';
import Footer from './components/Footer';

/**
 * App router. Header and Footer are included once here (not inside pages).
 * NavBar is a lightweight route helper for previewing pages.
 */

const NavBar: React.FC = () => (
  <div style={{ width: '100%', borderBottom: '1px solid rgba(0,0,0,0.02)', background: 'transparent' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 18px', width: '100%' }}>

    </div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <NavBar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/product" element={<Product />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/use-cases" element={<UseCases />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
