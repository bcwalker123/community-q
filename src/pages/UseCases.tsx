import React from 'react';

export default function UseCases() {
  const PLAYBOOKS = [
    {
      title: 'Bug triage',
      description: 'Detect spikes and quickly create high-priority tickets with evidence.',
      steps: ['Alert on spike', 'Gather evidence', 'Create ticket', 'Notify channel'],
    },
    {
      title: 'Feature discovery',
      description: 'Cluster requests and validate demand with polls and follow-up surveys.',
      steps: ['Collect requests', 'Cluster topics', 'Run poll', 'Create roadmap item'],
    },
    {
      title: 'Churn outreach',
      description: 'Identify at-risk users and run personalized outreach to re-engage them.',
      steps: ['Run churn model', 'Compile list', 'Send DM', 'Track response'],
    }
  ];

  const runPlaybook = (title: string) => {
    alert(`Playbook "${title}" started (mock).`);
  };

  // inline PlaybookCard
  const PlaybookCard: React.FC<{ title: string; description: string; steps: string[]; onRun: () => void }> = ({ title, description, steps, onRun }) => (
    <div className="feature-card" style={{ minWidth: 280 }}>
      <div style={{ fontWeight: 800 }}>{title}</div>
      <div style={{ marginTop: 8, color: 'var(--muted)' }}>{description}</div>

      <div style={{ marginTop: 12 }}>
        <div style={{ fontWeight: 700, fontSize: 13 }}>Steps</div>
        <ol style={{ marginTop: 8, color: 'var(--muted)' }}>
          {steps.map((s, i) => (
            <li key={i} style={{ marginBottom: 6 }}>{s}</li>
          ))}
        </ol>
      </div>

      <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between' }}>
        <button className="btn btn-primary" onClick={onRun}>Run playbook</button>
        <button className="btn btn-outline" onClick={() => alert('Edit playbook (TODO)')}>Edit</button>
      </div>
    </div>
  );

  return (
    <div className="container" style={{ paddingTop: 28 }}>
      <div className="kicker">Playbooks</div>
      <h1 style={{ marginTop: 6 }}>Pre-built playbooks & use cases</h1>
      <p className="lead" style={{ marginTop: 8 }}>Reusable flows that convert insights into action with templates and integrations.</p>

      <div style={{ marginTop: 18, display: 'flex', gap: 12, overflowX: 'auto' }}>
        {PLAYBOOKS.map(p => (
          <PlaybookCard key={p.title} title={p.title} description={p.description} steps={p.steps} onRun={() => runPlaybook(p.title)} />
        ))}
      </div>

      <section style={{ marginTop: 28 }}>
        <h3>How teams use playbooks</h3>
        <div style={{ marginTop: 10, color: 'var(--muted)' }}>
          Playbooks speed operations. Example: an urgent bug playbook can trim triage time from hours to minutes by automating evidence collection and ticket creation.
        </div>
      </section>
    </div>
  );
}
