# SCREENS.md

# Community-Q — Screens & Full Screen Specs (single-file)

A single Markdown reference documenting every screen/page for Community-Q. Use this as the canonical spec to hand to designers & engineers. Each screen includes:

- **Purpose** — why the screen exists
- **What to display** — explicit UI elements & layout blocks
- **Features / interactions** — what users can do
- **Why this matters** — the user problem solved by the screen
- **Microcopy examples** — exact short text you can paste into the UI
- **Implementation notes** — integration, privacy, and dev hints
- **Acceptance criteria** — what “done for MVP” looks like
- **Metrics to track** — signals to instrument
- **Step-by-step build checklist** — ordered tasks for engineers

---

## Top-level UX & Conventions

- **Responsive first** — Desktop ≥1200px, Tablet 768–1199px, Mobile <768px.  
  Grid: 12-column with container widths — Desktop 1200px, Tablet 960px, Mobile fluid.
- **Accessibility** — semantic landmarks, keyboard nav (Tab order), visible focus states, ARIA roles/labels, color contrast >= 4.5:1 for body text.
- **Provenance always visible** — platform, anonymized author (unless admin reveals), timestamp, retrieval method.
- **Default anonymization** — show `@anon123` or `Anonymous` unless workspace-admin sets reveal.
- **Role-based UI** — Admin / Analyst / Reader; front-end checks role and shows/hides actions.
- **Microcopy convention** — Primary button label: _Primary CTA_ (e.g., `Get started` / `Run query`); Secondary button: _Secondary CTA_ (e.g., `Book demo` / `Save`).
- **Telemetry** — standard events: `page_view`, `cta_click`, `lead_submitted`, `connector_connected`, `query_run`, `insight_actioned`.

---

## Header & Footer Links (exact links)

### Landing page (public)

**Header (left → right):**

- Logo → `/`
- How it works → `/#how-it-works`
- Templates → `/#templates`
- Pricing → `/pricing`
- Docs → `/docs`
- Log in → `/login`
- Primary CTA button: **Get started** → `/signup`

**Footer (columns):**

- Product: About → `/about`, Features → `/#features`, Roadmap → `/roadmap`
- Resources: Docs → `/docs`, Blog → `/blog`, Sample report → `/sample-report` (gated)
- Company: Careers → `/careers`, Contact → `/contact`, Privacy → `/privacy`, Terms → `/terms`
- Integrations: Slack → `/integrations/slack`, Discord → `/integrations/discord`, Jira → `/integrations/jira`
- Newsletter capture & social icons

### Authenticated app (dashboard)

**Header (left → right):**

- Logo → `/app/dashboard`
- Quick Query search bar (placeholder: `e.g., Top feature requests last 90 days`)
- Notifications (bell) → `/app/alerts`
- Templates → `/app/templates`
- Insights → `/app/insights`
- Reports → `/app/reports`
- +Create (dropdown: Insight, Report, Rule)
- User avatar → Profile → `/app/settings/profile`, Workspace settings → `/app/settings`, Logout

**Footer (app):**

- Help → `/app/help`, API → `/app/api`, Release notes → `/app/releases`
- Privacy → `/privacy`, Terms → `/terms`
- Version indicator (e.g., `v0.9.0 · staging`)

---

# MVP Priorities (first 90 days)

1. Landing & lead capture
2. Sign up / onboarding & Quickstart (Slack/Discord)
3. Ingest pipeline + local vector index + RAG endpoint
4. Query Builder + Insight Detail + one-click Jira/Notion export
5. Pilot flows & sample report generation

---

# Screens (detailed)

> Each screen contains: Purpose, What to display, Microcopy (exact), Features, Step-by-step build checklist, Implementation notes, Acceptance criteria, Metrics.

---

## 1) Landing / Marketing Page

**Purpose**  
Convert visitors into signups, demo requests, or pilot applicants by communicating core value and offering an immediate sample.

**What to display**

- Header (public)
- Hero: left text block, right demo visual (GIF/mp4)
- Pilot/trust logos banner
- 3 value cards (icons + lines)
- How-it-works (3 step cards)
- Sample report teaser (gated)
- Pricing teaser with link to `/pricing`
- Footer (public)

**Microcopy (paste-ready)**

### Hero copy (paste-ready; use exactly as shown — this is proper markdown inside the file)

# Ask your community. Get answers — fast.

Turn conversations into prioritized, evidence-backed tickets, polls, and decisions.

**Email placeholder:** `Your work email`  
**Primary CTA:** `Get sample report`  
**Secondary CTA:** `Book a demo`

---

Value cards:

- **Find signal, fast** — Auto-surface top requests, bugs, and sentiment shifts from Slack & Discord.
- **Evidence-first** — Every insight includes direct excerpts, timestamps, and permalinks.
- **Action in one click** — Create Jira/Notion tickets prefilled with evidence and context.

How-it-works:

1. **Connect Slack or Discord** — Least-privilege, read-only connector.
2. **Ask plain-English questions** — e.g., "Top feature requests last 30 days."
3. **Convert to work** — Create tickets or polls with evidence attached.

Sample report button:

- **Download anonymized sample report**

**Features / interactions**

- Email capture posts to `/api/leads`
- Calendly modal on `Book a demo`
- Lightbox for demo visual
- Gated sample report: capture email or require signup

**Step-by-step build checklist**

1. Add responsive Hero component.
2. Implement email capture form with client validation and POST to `/api/leads`.
3. Add Calendly lazy-embed.
4. Create lightbox component for demo visual.
5. Add telemetry events: `landing_view`, `lead_submitted`, `demo_click`.
6. Unit tests for form validation and CTA click flows.
7. Accessibility checks (keyboard focus, ARIA labels).

**Implementation notes**

- Optimize media (webp/mp4); lazy-load below-the-fold.
- Respect cookie consent before firing analytics.
- Store leads with UTM and consent flag.

**Acceptance criteria**

- Email leads saved, demo modal opens, hero media playable, basic accessibility passed.

**Metrics**

- Visits, email_captures, demo_clicks, bounce_rate.

---

## 2) Auth: Sign up / Login / SSO

**Purpose**  
Secure account creation, SSO, and fast workspace creation.

**What to display**

- Tabbed UI: Sign up / Log in
- SSO buttons: Google, SAML enterprise
- Email/password form, workspace name
- TOS checkbox, forgot password link

**Microcopy**

**Sign up**

- Title: `Create your workspace`
- Subhead: `Get started in minutes. Invite teammates later.`
- Placeholders: `Full name`, `Work email`, `Workspace name`
- CTA: `Create workspace`
- TOS: `By continuing you agree to our Terms of Service and Privacy Policy.`

**Login**

- Title: `Welcome back`
- Subhead: `Sign in to access your workspace`
- Placeholders: `Work email`, `Password`
- CTA: `Log in`
- Link: `Forgot password?`

**SSO**

- Buttons: `Continue with Google` | `Continue with SSO (Enterprise)`

**Features**

- Email verification sent to `/api/auth/email/send`
- OAuth redirect flows to `/api/auth/oauth/start`
- On first login, create `workspace` via `POST /api/workspaces`

**Step-by-step build checklist**

1. Build tabbed Auth component with accessible inputs and labels.
2. Add OAuth button components (redirect to backend).
3. Implement backend endpoints: signup, login, verify email, reset password.
4. On successful signup, create workspace and redirect to `/app/onboarding`.
5. Telemetry: `signup_started`, `signup_completed`, `sso_used`.
6. Tests for email verification and SSO redirect handling.

**Implementation notes**

- Use secure HttpOnly cookies for sessions.
- Rate-limit signups by IP/email.
- Tokens expire (verify tokens 24h).

**Acceptance criteria**

- Email signup and SSO work; workspace created and user redirected to onboarding.

**Metrics**

- Sign-up conversion, SSO share, verification completion.

---

## 3) Onboarding / Quickstart Checklist

**Purpose**  
Guide users to first meaningful insight quickly.

**What to display**

- Progress bar and checklist with items: Connect source, Run sample, Pick template, Invite team
- Each step with CTA (Connect, Run sample, Browse templates, Invite)
- Skip / Remind me later controls

**Microcopy**

- Title: `Get your first insight`
- Checklist items:
  1. `Connect Slack or Discord` — CTA: `Connect` (We only need read access to selected channels.)
  2. `Run sample query` — CTA: `Run sample` (See how insights look with your community data.)
  3. `Pick a template` — CTA: `Browse templates`
  4. `Invite teammates` — CTA: `Invite`
- Success: `You're all set — your first insight is ready.`

**Features**

- One-click connector flows (open connector modal)
- Run sample invokes `POST /api/query` with demo/sample params
- Invite flow sends invite emails

**Step-by-step build checklist**

1. Create Onboarding page and checklist component state.
2. Wire connector quick-flow to open OAuth/modal.
3. Implement Run sample button to call `/api/query` (use lightweight sample to limit cost).
4. Save onboarding completion flag in workspace metadata.
5. Add telemetry: `onboarding_step_completed`.
6. Add tests: end-to-end run sample.

**Implementation notes**

- Allow skipping while recording telemetry.
- Use a mock dataset if connectors not yet linked to show sample.

**Acceptance criteria**

- Users can complete onboarding and produce a sample insight within UI.

**Metrics**

- Time-to-first-insight, completion rate, skip rate.

---

## 4) Connector Setup (Slack / Discord / CSV / Zendesk)

**Purpose**  
Add/configure data sources safely & transparently.

**What to display**

- Connector catalog (cards for Slack, Discord, CSV, Zendesk)
- Connected sources table: name, platform, status, lastFetched, actions (test, edit, remove)
- Connector modal: OAuth/token steps, requested scopes, channel selectors, retention and PII redaction toggles, Test & Fetch, Sample preview

**Microcopy**

- Title: `Connect a source`
- Slack blurb: `Read-only bot. Select channels to ingest.`
- Discord blurb: `Server bot or token — choose channels.`
- Token helper: `Paste a bot token or follow OAuth. Tokens are stored encrypted.`
- Connector modal heading: `Configure Slack connector`
- CTA: `Save & Test`
- Test success: `Connection successful — sample posts found.`

**Features**

- OAuth/token flows
- Channel scoping and sample message preview
- Redaction toggles (email/phone/SSNs) and retention controls
- Test & Fetch runs sample ingestion

**Step-by-step build checklist**

1. Build connector catalog UI and connected-sources table.
2. Implement connector modal with scope display and channel selector component.
3. Hook OAuth redirection to `/api/connectors/:platform/oauth/start` and callback handling.
4. Implement `/api/connectors/:platform/test` endpoint to validate credentials and return sample posts.
5. Save connector configs encrypted; run initial fetch job.
6. Telemetry: `connector_added`, `connector_tested`.
7. Tests for connector flows using fixtures.

**Implementation notes**

- Use least-privilege OAuth scopes.
- Encrypt tokens at rest via secrets manager.
- Provide clear instructions for required scopes and a list of data fields ingested.

**Acceptance criteria**

- Slack & Discord connectors can be added and return sample posts.

**Metrics**

- Connector adoption, fetch success rate, connector error rate.

---

## 5) Ingestion Monitor / Jobs (Ops)

**Purpose**  
Operational visibility into ingestion jobs, errors, throughput.

**What to display**

- Summary KPIs: queued jobs, failures, throughput
- Job list with status, started_at, duration
- Job detail modal: logs, error messages, retry button
- Retention/purge controls (workspace-level)

**Microcopy**

- Title: `Ingestion Monitor`
- KPIs: Queue length, Failures (24h), Avg duration
- Job actions: `Retry | View logs | Download logs`

**Features**

- Retry failed jobs
- Download logs
- Adjust retention policy
- Filtering by source and date

**Step-by-step build checklist**

1. Build monitor dashboard component and job list API (`/api/jobs`).
2. Add job detail modal with logs and retry affordance.
3. Implement backend job management (BullMQ + Redis) with APIs for retry and logs.
4. Telemetry: `job_retried`, `job_failed`.
5. Tests for retry and log retrieval.

**Implementation notes**

- Limit access to Ops/Admin roles.
- Redact sensitive content from logs in UI.

**Acceptance criteria**

- Jobs visible, retry works, logs downloadable.

**Metrics**

- Job failure rate, MTTR, ingestion throughput.

---

## 6) Workspace Dashboard / Overview

**Purpose**  
At-a-glance workspace health, trending topics, quick actions.

**What to display**

- KPI cards: total insights, open actions, active connectors
- Quick query input (prominently)
- Trending topics list (clickable)
- Recent insights & alerts
- Quick actions (Run query, Create report)

**Microcopy**

- Title: `Workspace overview`
- Quick query placeholder: `e.g., Top feature requests last 90 days`
- KPI labels: `Insights (30d), Actions (open), Connectors`

**Features**

- Click-to-filter topics
- Quick-run query from input
- Drilldown to Insight Detail

**Step-by-step build checklist**

1. Design dashboard layout with KPI cards and quick query.
2. Implement backend endpoints for trending topics and KPIs.
3. Hook quick query input to `/api/query` with saved templates.
4. Tests for dashboard KPI accuracy.

**Implementation notes**

- Cache KPIs for performance, refresh on-demand.
- Ensure metrics are workspace-scoped.

**Acceptance criteria**

- Dashboard shows live data and links to detail pages.

**Metrics**

- Dashboard interactions, quick query conversions.

---

## 7) Query Builder / Q&A (Core Flow)

**Purpose**  
Primary plain-English Q&A interface with RAG retrieval controls.

**What to display**

- Natural language input (large)
- Templates dropdown and saved queries
- Filters: time window, platforms, authors, tags
- Advanced options: TopK, min evidence, rerank toggle
- Run button and spinner + textual progress
- Query history & saved queries list

**Microcopy**

- Placeholder: `e.g., Top 5 feature requests last 90 days`
- Run button: `Run query`
- No data text: `No matching evidence found — try a wider time range.`

**Features**

- Run/save/schedule queries
- Pin monitors (saved queries that run regularly)
- Show partial progress & estimated results count

**Step-by-step build checklist**

1. Implement Query Builder UI and templates dropdown.
2. Wire `POST /api/query` with params: { query, timeWindow, topK, filters }.
3. Show progress state: `retrieving evidence`, `synthesizing answer`, `done`.
4. Save queries endpoint: `POST /api/queries`.
5. Add query history and ability to rerun/schedule.
6. Tests for common query types and edge cases.

**Implementation notes**

- Validate and sanitize query input server-side.
- Limit expensive queries (rate limit per workspace).
- Provide useful no-data suggestions.

**Acceptance criteria**

- Queries return structured `insight` JSON and populate Insight Detail.

**Metrics**

- Queries per user, avg time per query, success rate.

---

## 8) Insight List

**Purpose**  
Browse, filter, and manage generated insights.

**What to display**

- Cards with: answer snippet, confidence badge, top_items tags, mention counts, created_at
- Filters bar (time, platform, confidence)
- Bulk actions: archive, export, add to collection
- Pagination or infinite scroll

**Microcopy**

- No insights: `No insights yet — run a query or connect a source.`
- Card action: `View detail | Create ticket | Archive`

**Features**

- Open detail view
- Bulk actions and exports (CSV)
- Sorting (newest, highest confidence, most mentions)

**Step-by-step build checklist**

1. Create Insight List UI with responsive cards.
2. API: `GET /api/insights` with filters and pagination.
3. Implement bulk action endpoints.
4. Tests for filtering and bulk actions.

**Implementation notes**

- Support cursor-based pagination for large lists.
- Show anonymized evidence in cards; expand to detail for full evidence.

**Acceptance criteria**

- Filtering and bulk actions functional, performance acceptable.

**Metrics**

- Insights viewed, bulk action usage.

---

## 9) Insight Detail (Evidence + Actions)

**Purpose**  
Inspect answers, review evidence, view trends, convert to actions.

**What to display**

- Header: query, run timestamp, owner
- Synthesized answer + confidence badge + confidence rationale
- Top items list (counts & sparklines)
- Evidence pane: 3–7 snippets with excerpt, anonymized author, platform, timestamp, permalink, reactions
- Charts: mention trend & sentiment trend
- Action cards: Create Ticket, Post Poll, Message Contributor
- Audit trail & internal notes

**Microcopy**

- Answer heading: `Synthesized answer`
- Confidence label: `Confidence: 86% (explain: 3 sources within TopK matched)`
- Evidence header: `Evidence (showing 3 of 12)`
- Action CTA: `Create Jira ticket`
- Notes placeholder: `Add internal note...`

**Features**

- Mark evidence as noise
- Open original message (permalink) — handle auth required cases
- Create ticket modal prefilled (title, description, selected evidence)
- Post poll to Slack/Discord
- Add internal note to insight (audit trail)

**Step-by-step build checklist**

1. Implement Insight Detail page with header and answer block.
2. Build Evidence pane with per-snippet metadata and actions (open, copy link, mark noise).
3. Add charts (time-series) with simple sparkline component for top items.
4. Implement Create Action flow: modal to map fields and push to integration.
5. Add audit trail for actions and notes (`GET /api/insights/:id/audit`).
6. Tests: evidence link behavior, create ticket flow.

**Implementation notes**

- Evidence permalinks may require connector auth — show clear reason when inaccessible.
- Audit trail must be append-only and show who/when.
- Idempotency keys for external pushes.

**Acceptance criteria**

- Evidence links open originals (if accessible), create-ticket modal prefills correctly.

**Metrics**

- Insight → action conversion, evidence click-through-rate.

---

## 10) Create Action / Ticket Modal (Jira/Notion/GH)

**Purpose**  
Convert insight into tracked work with one confirmation.

**What to display**

- Prefilled Title & Description (editable)
- Evidence attachments list with checkboxes
- Integration selector (Jira, Notion)
- Assignee, priority, labels, preview pane
- Confirm button, success confirmation with link

**Microcopy**

- Title placeholder: `Suggested title (editable)`
- Description: `Prefilled with synthesized summary and evidence links`
- CTA: `Create ticket`
- Success toast: `Ticket created — View in Jira`

**Features**

- Edit fields, save draft, send now
- Map local fields to external integration fields
- Show external link in success response

**Step-by-step build checklist**

1. Create CreateAction modal component with form fields.
2. Backend endpoint `POST /api/actions` to persist action and call integration adapters.
3. Implement integration adapters for Jira & Notion with idempotency keys.
4. Show external link after success and log action in audit trail.
5. Tests for mapping fields and duplicate prevention.

**Implementation notes**

- Store external IDs and status; retry logic for transient errors.
- Map workspace roles to assignee IDs in external system.

**Acceptance criteria**

- Tickets created and external link returned; action logged.

**Metrics**

- Tickets per insight, time from insight to ticket.

---

## 11) Templates Library

**Purpose**  
Reusable question & action templates to speed adoption.

**What to display**

- Template categories, cards with examples, import button
- Create / Edit template modal
- Popular & My templates tabs

**Microcopy**

- Title: `Templates`
- CTA: `Use template | Edit | Share`
- Create: `Create new template`

**Features**

- Import into Query Builder
- Share across workspace
- Track usage counts

**Step-by-step build checklist**

1. Implement Templates page and card UI.
2. API: `GET/POST/PUT /api/templates`.
3. Integrate "Use template" to prefill Query Builder.
4. Telemetry: `template_used`.

**Implementation notes**

- Templates are workspace-scoped; permissions applied.

**Acceptance criteria**

- Import and run templates; share across workspace.

**Metrics**

- Template usage rate, share count.

---

## 12) Alerts & Rules (Monitoring)

**Purpose**  
Automated monitoring & notifications for spikes/sentiment shifts.

**What to display**

- Rules list (name, condition, status, destinations)
- Create/edit rule modal (condition builder, destinations, frequency)
- Recent alert history with links to insights

**Microcopy**

- Title: `Alerts & Rules`
- CTA: `Create rule`
- Rule builder helper: `e.g., when mentions of "outage" increase by 3x over 24h`

**Features**

- Enable/disable rules, mute, view details
- Create insight from alert

**Step-by-step build checklist**

1. Create Rules UI and storage model.
2. Background worker evaluates rules and triggers alerts.
3. Destinations: Slack, Email, Webhook.
4. Telemetry: `alert_triggered`, `alert_acknowledged`.

**Implementation notes**

- Rate-limit and backoff for noisy rules.
- Include permalinks and context in alert payloads.

**Acceptance criteria**

- Rules trigger notifications and link to insights.

**Metrics**

- Alerts triggered, alert → action conversion.

---

## 13) Analytics & Reports

**Purpose**  
Deeper analysis and exportable reports for PMs and community leads.

**What to display**

- Topic trend charts, contributor cohorts, platform breakdown
- Export controls (PDF/CSV), scheduled reports UI
- Pilot ROI cards

**Microcopy**

- Title: `Analytics`
- Export CTA: `Export report (PDF)`
- Schedule: `Schedule report`

**Features**

- Time range & cohort filters
- Scheduled automated reports (daily/weekly/monthly)
- Downloadable PDFs (anonymized by default)

**Step-by-step build checklist**

1. Implement Analytics page with chart components.
2. Backend jobs to precompute heavy analytics; store in `analytics` table.
3. Export generator to create PDF/CSV (respect anonymization).
4. Schedule reports endpoint.

**Implementation notes**

- Precompute expensive aggregations in background jobs.
- Anonymize exports by default; add workspace toggle.

**Acceptance criteria**

- Reports accurate and exportable.

**Metrics**

- Report downloads, scheduled jobs success.

---

## 14) Workspace Settings / Team Management

**Purpose**  
Admin interface to manage users, permissions, billing, privacy.

**What to display**

- Team list (role, email, last active), invite flow, roles editor
- Billing & pilot status, retention & PII settings, SSO config

**Microcopy**

- Title: `Workspace settings`
- Invite CTA: `Invite teammate`
- Retention helper: `Set default data retention (30/90/365 days)`
- PII settings: `Enable automatic PII redaction`

**Features**

- Invite/remove/change role
- Configure retention & redaction
- View audit logs of admin changes

**Step-by-step build checklist**

1. Build Settings UI pages (Users, Billing, Security).
2. API: `POST /api/workspaces/:id/invite`, `PUT /api/workspaces/:id/settings`.
3. Audit logs for changes.
4. Tests: RBAC enforcement.

**Implementation notes**

- Require admin role for settings; changes appended to audit.

**Acceptance criteria**

- Admins manage workspace settings; changes auditable.

**Metrics**

- Active users, invites accepted.

---

## 15) Integrations / API Keys

**Purpose**  
Manage external integrations, webhooks, and API access.

**What to display**

- Connected integrations list with status & last-used
- API keys UI: create, revoke, last used
- Webhook endpoints with test button

**Microcopy**

- Title: `Integrations`
- Create key CTA: `Create API key`
- Revoke CTA: `Revoke`
- Webhook test: `Send test payload`

**Features**

- Create/revoke keys, test webhooks, map fields

**Step-by-step build checklist**

1. Implement integrations page and API key management UI.
2. Backend endpoints for key creation (store hashed), revoke.
3. Webhook test endpoint with sample payload.
4. Require reason for key creation in enterprise mode.

**Implementation notes**

- Keys stored hashed; show last-used timestamp.
- Enforce least-privilege.

**Acceptance criteria**

- Keys can be created/revoked; webhooks tested.

**Metrics**

- API key usage, webhook failure rate.

---

## 16) Pilot Management Dashboard

**Purpose**  
Track pilots, deliverables, conversion for Sales & Success.

**What to display**

- Active pilot list: customer, start/end, deliverables, status
- Pilot metrics: insights delivered, tickets suggested, acceptance rate
- CTA to convert to paid

**Microcopy**

- Title: `Pilots`
- CTA: `Convert to paid`
- Upload helper: `Upload deliverables or reports`

**Features**

- Update pilot status, upload deliverables, automated pilot reports

**Step-by-step build checklist**

1. Build Pilot dashboard UI and pilot model.
2. Integrate with CRM exports (optional).
3. Reports: `GET /api/pilots/:id/report`.
4. Tests for pilot lifecycle.

**Implementation notes**

- Access restricted to Sales & Success roles.

**Acceptance criteria**

- Pilots trackable and convertible.

**Metrics**

- Pilot-to-paid conversion.

---

## 17) Admin / Monitoring (SRE)

**Purpose**  
Operations screen for system health & resource monitoring.

**What to display**

- System health: Vector DB, queue lengths, ingestion lag
- Job metrics: failures, runtimes
- Logs & restart/maintenance controls
- Storage usage

**Microcopy**

- Title: `System status`
- Health indicators: `Vector DB | Queue | Ingestion`
- Actions: `Restart jobs | Toggle maintenance`

**Features**

- Restart jobs, flush queues, download logs, toggle maintenance

**Step-by-step build checklist**

1. Build SRE dashboard and health-check endpoints.
2. Implement restart/flush controls (RBAC-protected).
3. Tests and audit trail for actions.

**Implementation notes**

- RBAC restricted; keep controls auditable.

**Acceptance criteria**

- Ops view metrics and can run remediation.

**Metrics**

- Uptime, MTTR, job failure rate.

---

## 18) Help / Docs / Sample Report

**Purpose**  
Support hub and sales collateral; downloadable sample reports.

**What to display**

- Product docs, API reference, FAQ
- Downloadable sample report (gated), pilot application, contact/demo booking

**Microcopy**

- Docs search placeholder: `Search docs or examples...`
- Sample report CTA: `Download anonymized sample report`

**Features**

- Download sample report (gated by email/signup)
- Support contact & troubleshoot flows

**Step-by-step build checklist**

1. Create Docs site pages (searchable).
2. Add gated sample-report download endpoint.
3. Implement support contact form.

**Implementation notes**

- Version docs; anonymize real data in sample reports.

**Acceptance criteria**

- Docs accessible; sample report downloadable.

**Metrics**

- Docs views, sample report downloads, demo requests.

---

# Cross-cutting Implementation Notes & Tradeoffs

- **Retrieval-first RAG** — always attach evidence to reduce hallucination.
- **Embeddings** — cache embeddings; re-embed only when post updates.
- **Vector DB** — Qdrant/Pinecone for prod; FAISS/local for dev.
- **Privacy** — default anonymization, PII redaction configurable at ingestion.
- **Security** — encrypted tokens, least-privilege OAuth scopes, audit logging.
- **Scaling** — background workers for embeddings and analytics; use Redis + BullMQ.
- **Cost control** — sample queries for onboarding; throttle expensive scheduled runs.
