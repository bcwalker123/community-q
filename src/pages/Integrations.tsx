import React, { useState } from 'react';

type ConnectorStatus = 'connected' | 'not_connected' | 'syncing' | 'error';

export default function Integrations() {
  const CONNECTORS = [
    { id: 'discord', name: 'Discord', description: 'Channels, threads, reactions' },
    { id: 'slack', name: 'Slack', description: 'Workspaces & threads' },
    { id: 'discourse', name: 'Discourse', description: 'Forums & categories' },
    { id: 'zendesk', name: 'Zendesk', description: 'Support tickets import' },
    { id: 'csv', name: 'CSV Upload', description: 'Support export CSV' },
  ];

  // local state mock
  const initial = Object.fromEntries(CONNECTORS.map(c => [c.id, 'not_connected' as ConnectorStatus]));
  const [states, setStates] = useState<Record<string, ConnectorStatus>>(initial);

  const toggleConnect = (id: string) => {
    setStates(s => ({ ...s, [id]: 'syncing' }));
    setTimeout(() => setStates(s => ({ ...s, [id]: 'connected' })), 1000 + Math.random() * 1000);
  };

  const startBackfill = (id: string) => {
    alert(`Backfill started for ${id} (mock).`);
  };

  // local connector card (inline)
  const ConnectorCard: React.FC<{
    name: string;
    description?: string;
    status: ConnectorStatus;
    onConnect: () => void;
    onBackfill: () => void;
  }> = ({ name, description, status, onConnect, onBackfill }) => {
    const colorByStatus = {
      connected: 'var(--primary)',
      not_connected: 'var(--muted)',
      syncing: '#f59e0b',
      error: '#ef4444',
    } as const;

    return (
      <div className="feature-card" style={{ minWidth: 300 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 800 }}>{name}</div>
          <div style={{ color: colorByStatus[status], fontWeight: 700, fontSize: 13 }}>
            {status.replace('_', ' ')}
          </div>
        </div>

        <div style={{ marginTop: 10, color: 'var(--muted)' }}>{description}</div>

        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <button className="btn" style={{ border: '1px solid var(--card-border)' }} onClick={onConnect}>
            {status === 'connected' ? 'Manage' : status === 'syncing' ? 'View' : 'Connect'}
          </button>

          <button className="btn btn-outline" onClick={onBackfill} aria-disabled={status !== 'connected'} title={status !== 'connected' ? 'Connect first to backfill' : 'Backfill history'}>
            Backfill
          </button>
        </div>

        <div style={{ marginTop: 12, color: 'var(--muted)', fontSize: 13 }}>
          Last sync: {status === 'connected' ? '2 minutes ago' : '—'}
        </div>
      </div>
    );
  };

  return (
    <div className="container" style={{ paddingTop: 28 }}>
      <div className="kicker">Integrations</div>
      <h1 style={{ marginTop: 6 }}>Connect your community sources</h1>
      <p className="lead" style={{ marginTop: 8 }}>Manage connectors, configure channel sync, and backfill historical data.</p>

      <div style={{ marginTop: 22 }}>
        <div className="features-scroll" role="list">
          {CONNECTORS.map(c => (
            <ConnectorCard
              key={c.id}
              name={c.name}
              description={c.description}
              status={states[c.id]}
              onConnect={() => toggleConnect(c.id)}
              onBackfill={() => startBackfill(c.id)}
            />
          ))}
        </div>
      </div>

      <section style={{ marginTop: 28 }}>
        <h3>Activity & recent syncs</h3>
        <div style={{ marginTop: 10, color: 'var(--muted)' }}>
          This table is a mock view. Replace with API data to show real syncs and ingestion stats.
        </div>

        <div style={{ marginTop: 12 }}>
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 10, padding: 12 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>Discord #product</div>
                <div style={{ color: 'var(--muted)' }}>synced 2 minutes ago. 12 new messages processed.</div>
              </div>
              <div style={{ color: 'var(--muted)' }}>Status: Healthy</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
