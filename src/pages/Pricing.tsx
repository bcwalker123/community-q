import React, { useMemo, useState } from 'react';

export default function Pricing() {
  const TIERS = [
    { tier: 'Free', price: '$0', bullets: ['1 connector', '50 queries / month', '7 day retention'] },
    { tier: 'Starter', price: '$29 / seat', bullets: ['3 connectors', '1,000 queries / month', '30 day retention'] },
    { tier: 'Pro', price: '$99 / seat', bullets: ['Unlimited connectors', '10,000 queries / month', '90 day retention'], popular: true },
    { tier: 'Enterprise', price: 'Custom', bullets: ['SAML/SCIM', 'VPC / Dedicated', 'Custom SLAs'] },
  ];

  const [seats, setSeats] = useState(3);
  const [tier, setTier] = useState('Starter');

  const priceEstimate = useMemo(() => {
    if (tier === 'Free') return 0;
    if (tier === 'Starter') return seats * 29;
    if (tier === 'Pro') return seats * 99;
    return 5000; // placeholder for Enterprise
  }, [tier, seats]);

  // inline PricingCard
  const PricingCard: React.FC<{ tier: string; price: string; bullets: string[]; popular?: boolean; onChoose: () => void }> = ({ tier, price, bullets, popular, onChoose }) => (
    <div className="feature-card" style={{ minWidth: 260, borderRadius: 12 }}>
      {popular && <div style={{ fontSize: 12, padding: 6, background: 'var(--primary)', color: '#fff', borderRadius: 8, display: 'inline-block', marginBottom: 8 }}>Most popular</div>}
      <div style={{ fontWeight: 900, fontSize: 20 }}>{tier}</div>
      <div style={{ marginTop: 8, fontSize: 20, fontWeight: 800 }}>{price}</div>

      <ul style={{ marginTop: 12, color: 'var(--muted)' }}>
        {bullets.map((b, i) => <li key={i} style={{ marginBottom: 8 }}>{b}</li>)}
      </ul>

      <div style={{ marginTop: 12 }}>
        <button className="btn btn-primary" onClick={onChoose}>Choose {tier}</button>
      </div>
    </div>
  );

  return (
    <div className="container" style={{ paddingTop: 28 }}>
      <div className="kicker">Pricing</div>
      <h1 style={{ marginTop: 6 }}>Simple predictable pricing</h1>
      <p className="lead" style={{ marginTop: 8 }}>Pay for seats and predictable query quotas. Upgrade as you grow. Enterprise plans include SSO, extended retention and SLAs.</p>

      <div style={{ marginTop: 18, display: 'flex', gap: 12, overflowX: 'auto' }}>
        {TIERS.map(t => (
          <PricingCard key={t.tier} tier={t.tier} price={t.price} bullets={t.bullets} popular={t.popular} onChoose={() => setTier(t.tier)} />
        ))}
      </div>

      <div style={{ marginTop: 26, display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ minWidth: 220 }}>
          <div style={{ fontWeight: 700 }}>Seats</div>
          <input type="range" min={1} max={200} value={seats} onChange={(e) => setSeats(Number(e.target.value))} />
          <div style={{ marginTop: 8 }}>{seats} seats</div>
        </div>

        <div style={{ minWidth: 220 }}>
          <div style={{ fontWeight: 700 }}>Estimate</div>
          <div style={{ fontSize: 22, fontWeight: 900 }}>${priceEstimate.toLocaleString()}</div>
          <div style={{ color: 'var(--muted)' }}>Monthly estimate — excludes overage or custom services</div>
        </div>

        <div style={{ marginLeft: 'auto' }}>
          <button className="btn btn-primary" onClick={() => alert('Start free trial or Contact sales (TODO)')}>Start free trial</button>
        </div>
      </div>

      <section style={{ marginTop: 28 }}>
        <h3>Billing FAQ</h3>
        <div style={{ marginTop: 8, color: 'var(--muted)' }}>
          <div style={{ marginTop: 8 }}>
            <strong>How are LLM calls billed?</strong>
            <div style={{ color: 'var(--muted)' }}>We surface quotas per plan and you can add more capacity as needed. Exact LLM provider charges may apply depending on usage.</div>
          </div>
        </div>
      </section>
    </div>
  );
}
