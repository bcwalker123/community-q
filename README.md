# Community-Q — Community Intelligence, Simplified

**One-liner**  
Ask your community plain-language questions and get prioritized, evidence-backed answers that you can immediately convert into tickets, polls, or outreach.

---

## Table of contents

- [What is Community-Q?](#what-is-community-q)
- [Why build Community-Q (MVP thesis)](#why-build-community-q-mvp-thesis)
- [Problems Community-Q solves](#problems-community-q-solves)
- [What data is shown](#what-data-is-shown)
- [Core features & scope (MVP-first)](#core-features--scope-mvp-first)
- [User flows & examples](#user-flows--examples)
- [Technical architecture & stack](#technical-architecture--stack)
- [Minimal data model (Prisma example)](#minimal-data-model-prisma-example)
- [Quickstarter: runnable demo (local)](#quickstarter-runnable-demo-local)
- [Environment variables (recommended)](#environment-variables-recommended)
- [Security, privacy & compliance](#security-privacy--compliance)
- [Roadmap & milestones (90-day launch plan)](#roadmap--milestones-90-day-launch-plan)
- [Testing & QA](#testing--qa)
- [Contributing & developer workflow](#contributing--developer-workflow)
- [API reference (essential endpoints)](#api-reference-essential-endpoints)
- [Implementation tips & tradeoffs](#implementation-tips--tradeoffs)
- [FAQ](#faq)
- [License](#license)
- [Appendix: Example insight response (JSON)](#appendix-example-insight-response-json)

---

# What is Community-Q?

Community-Q ingests your public and private community signals (Discord, Slack, forums, support exports, YouTube/Twitch comments, CSVs) and answers plain-English questions with evidence-first insights. Each insight contains:

- a short synthesized answer
- a confidence score
- ranked evidence snippets (excerpt + author + platform + timestamp + permalink)
- mention counts and trend graphs
- one-click actions (create ticket, post poll, message advocate)

Product goal: make community signals actionable in minutes, not days.

---

# Why build Community-Q (MVP thesis)

Start narrow and prove value quickly:

- **Target**: community managers + product managers at mid-market SaaS and active gaming communities.
- **Key value**: convert community chatter into prioritized tickets with evidence attached — saves PMs hours/week and shortens decision loops.
- **MVP bet**: a Slack/Discord connector + one-click export to Jira/Notion + a sample RAG answer is enough to win paid pilots.

---

# Problems Community-Q solves

- **Scattered feedback** across many platforms.
- **Slow manual analysis** (time lost to searching and copy/paste).
- **Signal vs noise**: normalize wording and attach evidence to claims.
- **Action gaps**: insight → ticket → tracked work in one flow.
- **Late detection** of spikes or churn signals.
- **Fragmented reporting** across channels.

---

# What data is shown

- Top topics & mention counts (time-window & platform filters).
- Evidence snippets with permalinks and metadata.
- Sentiment and trend charts (topic-level).
- Top contributors with influence / at-risk scoring.
- Alerts (keyword spikes, negative sentiment runs).
- Action history (tickets/polls/messages generated).
- Exports and downloadable reports (PDF/CSV).

---

# Core features & scope (MVP-first)

**MVP (highest-impact, smallest build):**

1. Slack + Discord connectors (read-only, bot or token).
2. Basic ingestion pipeline (normalize, dedupe, store).
3. Local vector index (FAISS or in-process Qdrant mock) + embeddings (OpenAI or local model).
4. Q&A endpoint (`POST /api/query`) that returns a structured insight:
   - `answer`, `confidence`, `top_items`, `evidence_snippets`.
5. UI: Query bar, Insight Detail (evidence + create-ticket modal).
6. One-click export to Jira and Notion (prefilled ticket).
7. Pilot flows: manual-run sample reports for prospects.

**Phase-1 / Nice-to-have (post-MVP):**

- Zendesk/Intercom import, Discourse connector.
- Templates by vertical (SaaS, gaming, developer).
- Alerts & scheduled reports.
- Role-based access and workspace isolation.

---

# User flows & examples

## Typical (MVP) flow

1. Admin connects Slack/Discord.
2. Team member asks: “Top feature requests last 30 days”.
3. Backend retrieves posts, returns structured `insight`.
4. UI shows answer + 3 evidence snippets + confidence.
5. User clicks “Create Jira ticket” → modal with suggested title, description, evidence links → push.
6. Action recorded in workspace audit logs.

## Example queries

- “Top 5 feature requests in the last 90 days”
- “Has sentiment around ‘dark mode’ worsened in the last month?”
- “List Android crash reports mentioning ‘upload’ in the last 14 days”

---

# Technical architecture & stack

## High level components

- **Connectors (ingest):** fetch posts, normalize schema, redact (optional), queue for embedding.
- **Embedding & Indexing:** compute vectors, store them in vector DB (or local FAISS).
- **RAG pipeline:** retrieve top-K, filter rules, LLM synthesize with evidence citations.
- **API / Backend:** Node.js + TypeScript (Fastify or Express), job queue (BullMQ).
- **Frontend:** React + TypeScript + Vite.
- **Storage:** PostgreSQL for metadata; S3 for raw exports/attachments.
- **Integrations:** Jira, Notion, Slack actions, webhooks.

## Suggested vendors & libs

- Vector DB: Qdrant / Pinecone (prod) — FAISS for local.
- Embeddings: OpenAI embeddings or local open models.
- Auth: OAuth for connectors; JWT / SSO for app auth.
- Queue: Redis + BullMQ.
- Optional infra: Kubernetes or serverless.

---

# Minimal data model (Prisma example)

Save as `prisma/schema.prisma` (minimal — expand as needed):

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Workspace {
  id        String   @id @default(cuid())
  name      String
  createdAt DateTime @default(now())
  users     User[]
  sources   Source[]
}

model User {
  id          String   @id @default(cuid())
  workspace   Workspace @relation(fields: [workspaceId], references: [id])
  workspaceId String
  name        String
  email       String   @unique
  role        String
  createdAt   DateTime @default(now())
}

model Source {
  id           String   @id @default(cuid())
  workspace    Workspace @relation(fields: [workspaceId], references: [id])
  workspaceId  String
  platform     String
  config       Json
  lastFetched  DateTime?
  posts        Post[]
}

model Post {
  id         String   @id @default(cuid())
  source     Source   @relation(fields: [sourceId], references: [id])
  sourceId   String
  author     String?
  text       String
  url        String?
  createdAt  DateTime @default(now())
  metadata   Json?
}

model Insight {
  id          String   @id @default(cuid())
  workspaceId String
  query       String
  answer      String      @db.Text
  confidence  Int
  topItems    Json
  evidence    Json
  createdAt   DateTime @default(now())
}

model Action {
  id         String   @id @default(cuid())
  insightId  String
  type       String
  externalId String?
  status     String
  createdAt  DateTime @default(now())
}
```

---

# Quickstarter: runnable demo (local)

1. Clone repo.
2. Install dependencies (root, frontend, backend):
   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```
3. Create `.env.local` with required keys (see Environment variables below). For demo, set `LOCAL_VECTOR=true`.
4. Start local Postgres (or use SQLite):
   ```bash
   docker run --name communityq-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15
   ```
5. Run migrations (Prisma example):
   ```bash
   npx prisma migrate dev --name init
   ```
6. Start backend and frontend:

   ```bash
   # backend
   cd backend && npm run dev

   # frontend (separate terminal)
   cd ../frontend && npm run dev
   ```

7. Open `http://localhost:5173` and use demo credentials.

---

# Environment variables (recommended)

Create `.env.local` and replace placeholders:

```text
# App
PORT=4000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/communityq
REDIS_URL=redis://localhost:6379
JWT_SECRET=replace_with_secure_value

# Vector / Embeddings
VECTOR_DB_TYPE=local      # local | pinecone | qdrant
VECTOR_DB_URL=
OPENAI_API_KEY=sk-...

# Connectors
DISCORD_BOT_TOKEN=
SLACK_BOT_TOKEN=

# Integrations
JIRA_BASE_URL=
JIRA_API_TOKEN=

# Feature flags
LOCAL_VECTOR=true
PI.
```

---

# Security, privacy & compliance

- Redact PII at ingestion (configurable rules).
- Workspace isolation & role-based access control.
- Audit logs for connector activity and action creation.
- Retention policies and deletion flows for GDPR/CCPA.
- Minimum connector permissions; secure secret storage.
- Option: self-host for sensitive orgs.

---

# Roadmap & milestones (90-day launch plan)

**Week 0–2: Core MVP**

- Slack + Discord connector (read-only).
- Ingest → embed → query pipeline.
- Frontend: Query bar, Insight Detail, Create Ticket modal (Jira/Notion mock).
- Pilot workflow (manual-run sample report).

**Week 3–6: Pilot & iterate**

- Run 5 paid/discounted pilots.
- Add templated questions (SaaS, gaming).
- Instrument ROI metrics; convert at least 2 pilots to paid.

**Week 7–12: Scale & integrations**

- Production vector DB, queuing, retry logic.
- Add Zendesk export, Discourse connector.
- Alerts & scheduled reports.
- Onboarding UX and billing.

---

# Testing & QA

- Unit tests for ingestion, dedupe, retrieval.
- Integration tests for connectors using recorded fixtures.
- End-to-end UI tests (Playwright/Cypress).
- Load testing for retrieval and embedding pipeline.

---

# Contributing & developer workflow

- Fork → feature branch `feat/...` → open PR.
- Follow TypeScript linting (ESLint) and formatting (Prettier).
- Add tests for core logic.
- Small PRs with clear descriptions and screenshots.

---

# API reference (essential endpoints)

- `POST /api/query`  
  Request: `{ query, timeWindow, topK }`  
  Response: `insight` `{ id, answer, confidence, topItems, evidenceSnippets }`

- `GET /api/insights` — list insights (filters, since, workspace)
- `GET /api/evidence/:id` — fetch full evidence item
- `POST /api/connectors/:platform/test` — validate connector credentials
- `POST /api/actions` — create action (ticket/poll/message)

**Curl example**

```bash
curl -X POST http://localhost:4000/api/query \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"query":"Top feature requests last 30 days","timeWindow":"30d","topK":5}'
```

---

# Implementation tips & tradeoffs

- Use retrieval-first RAG and enforce evidence citation to reduce hallucinations.
- Cache embeddings; re-embed only changed posts.
- Start with managed vector DB for production speed.
- Normalization: lemmatization + alias maps to group mentions.
- Prioritization: tunable, explainable weights (frequency, recency, author influence).
- Privacy: default anonymized quotes; workspace admin can opt to reveal handles.

---

# FAQ

**Q: How do we avoid hallucinations?**  
A: Use retrieval-first RAG, require minimum evidence per claim, and show permalinks to the original messages.

**Q: Can insights auto-create tickets?**  
A: Yes — Action cards prefill ticket fields; users confirm before pushing.

**Q: How are duplicates/spam handled?**  
A: Dedupe heuristics, near-duplicate detection, platform spam filters, and optional admin review.

---

# License

MIT — see `LICENSE`.

---

# Appendix: Example insight response (JSON)

```json
{
  "answer": "Top feature requests: 1) multi-account switching, 2) dark mode, 3) faster uploads.",
  "confidence": 86,
  "top_items": [
    { "text": "multi-account switching", "count": 42 },
    { "text": "dark mode", "count": 28 }
  ],
  "evidence": [
    {
      "excerpt": "I need to switch between accounts so I can manage client servers faster.",
      "source": "discord",
      "url": "https://discordapp.com/...",
      "timestamp": "2025-09-08T13:12:00Z"
    }
  ]
}
```
