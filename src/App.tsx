import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Product from './pages/Product';
import Integrations from './pages/Integrations';
import UseCases from './pages/UseCases';
import Pricing from './pages/Pricing';
import Header from './components/Header';
import Footer from './components/Footer';

const NavBar: React.FC = () => (
  <div style={{ width: '100%', background: 'transparent', borderBottom: '1px solid rgba(0,0,0,0.02)' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '8px 16px', display: 'flex', gap: 12, alignItems: 'center' }}>
      <Link to="/" style={{ fontWeight: 700 }}>Home</Link>
      <Link to="/product">Product</Link>
      <Link to="/integrations">Integrations</Link>
      <Link to="/use-cases">Use Cases</Link>
      <Link to="/pricing">Pricing</Link>
      <div style={{ marginLeft: 'auto', color: 'var(--muted)', fontSize: 14 }}>Preview</div>
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
