# Community-Q — Community Intelligence, Simplified

**One-liner**  
Ask your community plain-language questions and get prioritized, evidence-backed answers that you can immediately convert into tickets, polls, or outreach — plus lightweight on-platform chat, polls, forums, and cross-platform analytics.

---

## Table of contents

- [What is Community-Q?](#what-is-community-q)
- [Why build Community-Q (MVP thesis)](#why-build-community-q-mvp-thesis)
- [Problems Community-Q solves](#problems-community-q-solves)
- [What data & features are shown](#what-data--features-are-shown)
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
- [Appendix: Example responses (JSON)](#appendix-example-responses-json)

---

# What is Community-Q?

Community-Q ingests your public and private community signals (Discord, Slack, forums, support exports, YouTube/Twitch comments, CSVs) and answers plain-English questions with evidence-first insights.  
New additions: on-site Polls (shareable/embed), a lightweight in-app Chat channel (a separate chat inside Community-Q for members to discuss insights — **note:** this is a new, internal chat and does _not_ automatically import all external chats), simple Forums, additional analytics dashboards for social metrics, and optional age-verification for gated communities.

Each insight contains:

- a short synthesized answer
- a confidence score
- ranked evidence snippets (excerpt + author + platform + timestamp + permalink)
- mention counts and trend graphs
- one-click actions (create ticket, post poll, message advocate)
- associated poll(s) and chat threads (if created from the insight)

Product goal: make community signals actionable in minutes, not days.

---

# Why build Community-Q (MVP thesis)

Start narrow and prove value quickly:

- **Target**: community managers + product managers at mid-market SaaS and active gaming communities.
- **Key value**: convert community chatter into prioritized tickets with evidence attached — saves PMs hours/week and shortens decision loops.
- **MVP bet**: a Slack/Discord connector + one-click export to Jira/Notion + a sample RAG answer + **on-site polls + lightweight platform chat** is enough to win paid pilots.

---

# Problems Community-Q solves

- **Scattered feedback** across many platforms.
- **Slow manual analysis** (time lost to searching and copy/paste).
- **Action gaps**: insight → ticket → tracked work in one flow.
- **Fragmented reporting** across channels (we centralize collected metrics).
- **Lack of simple, central polling** for multi-channel feedback (we provide shareable polls and embeds).
- **No light discussion space inside an insights tool** — now solved with a minimal on-platform chat and forums.

---

# What data & features are shown

- Top topics & mention counts (time-window & platform filters).
- Evidence snippets with permalinks and metadata.
- Sentiment and trend charts (topic-level).
- Top contributors with influence / at-risk scoring.
- Alerts (keyword spikes, negative sentiment runs).
- Action history (tickets/polls/messages generated).
- Poll results and response breakdown (per-poll & aggregate).
- In-app Chat: messages, threads, simple presence, notifications (note: not a cross-platform sync — a platform chat inside Community-Q for members).
- Forums: threaded discussions, moderation tools, pin/close/archive.
- Social tracking metrics: views, watch time, comments, rewatch %, likes, mentions (where APIs allow).
- Exports and downloadable reports (PDF/CSV).

---

# Core features & scope (MVP-first)

**MVP (highest-impact, smallest build):**

1. Slack + Discord connectors (read-only, bot or token).
2. Basic ingestion pipeline (normalize, dedupe, store).
3. Local vector index (FAISS or in-process Qdrant mock) + embeddings (OpenAI or local model).
4. Q&A endpoint (`POST /api/query`) that returns a structured insight: `answer`, `confidence`, `top_items`, `evidence_snippets`.
5. UI: Query bar, Insight Detail (evidence + create-ticket modal).
6. One-click export to Jira and Notion (prefilled ticket).
7. **Polls**: on-site poll builder (single-choice, multi-choice, open text). Shareable link + embed code. Results stored and shown in the insight context.
8. **On-platform Chat (lightweight)**: public/private chat rooms inside Community-Q where users can discuss an insight or general topics. **Important:** this chat is a new, internal channel — it does not aggregate/replace other platform chats.
9. Pilot flows: manual-run sample reports for prospects.

**Phase-1 / Nice-to-have (post-MVP):**

- Zendesk/Intercom import, Discourse connector.
- Poll cross-posting to platform-native polls (Discord/YouTube) — optional and only after stable polling product.
- Analytics dashboard (aggregated social metrics, watch time, rewatch, retention curves).
- Age verification & gating flows for exclusive forums/rooms (via third-party provider or KYC-lite).
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
6. User creates a poll from the insight: “Which feature matters most?” → publishes a site link + embed code.
7. Team uses the **in-platform Chat** to discuss the insight and action items, records decisions.
8. Action recorded in workspace audit logs.

## Example specialized flows

- **Moderator gating**: create a private forum thread, require age verification on join.
- **Social tracking**: ingest YouTube/Discord/Twitter metrics, display watch time and comment trends next to insights.
- **Quick poll + public analysis**: post a public poll link to your site and embed it in a YouTube description; results flow back into the insight.

---

# Technical architecture & stack

## High level components

- **Connectors (ingest):** fetch posts, normalize schema, redact (optional), queue for embedding.
- **Embedding & Indexing:** compute vectors, store them in vector DB (or local FAISS).
- **RAG pipeline:** retrieve top-K, filter rules, LLM synthesize with evidence citations.
- **API / Backend:** Node.js + TypeScript (Fastify or Express), job queue (BullMQ).
- **Frontend:** React + TypeScript + Vite.
- **Storage:** PostgreSQL for metadata; S3 for raw exports/attachments.
- **Realtime:** WebSocket or server-sent events for on-platform Chat and poll updates.
- **Integrations:** Jira, Notion, Slack actions, webhooks, social platform APIs.
- **Optional third parties:** Age verification provider, social analytics aggregator.

## Suggested vendors & libs

- Vector DB: Qdrant / Pinecone (prod) — FAISS for local.
- Embeddings: OpenAI embeddings or local open models.
- Auth: OAuth for connectors; JWT / SSO for app auth.
- Queue: Redis + BullMQ.
- Realtime: socket.io or Pusher.

---

# Minimal data model (Prisma example)

Save as `prisma/schema.prisma`. This expands the original model to include polls, chat, forums, social stats, and age verification fields.

````prisma
generator client {
  provider = "prisma-client-js"
}
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Workspace {
  id         String    @id @default(cuid())
  name       String
  createdAt  DateTime  @default(now())
  users      User[]
  sources    Source[]
  polls      Poll[]
  chatRooms  ChatRoom[]
  forums     ForumThread[]
  insights   Insight[]
}

model User {
  id          String   @id @default(cuid())
  workspace   Workspace @relation(fields: [workspaceId], references: [id])
  workspaceId String
  name        String?
  email       String   @unique
  role        String
  createdAt   DateTime @default(now())
  // optional verification state
  ageVerified Boolean  @default(false)
}

model Source {
  id         String   @id @default(cuid())
  workspace  Workspace @relation(fields: [workspaceId], references: [id])
  workspaceId String
  platform   String
  config     Json
  lastFetched DateTime?
  posts      Post[]
}

model Post {
  id         String   @id @default(cuid())
  source     Source   @relation(fields: [sourceId], references: [id])
  sourceId   String
  author     String?
  text       String   @db.Text
  url        String?
  createdAt  DateTime @default(now())
  metadata   Json?
  // vector id or index reference stored elsewhere
}

model Insight {
  id          String   @id @default(cuid())
  workspace   Workspace @relation(fields: [workspaceId], references: [id])
  workspaceId String
  query       String
  answer      String   @db.Text
  confidence  Int
  topItems    Json
  evidence    Json
  polls       Poll[]   @relation("InsightPolls")
  createdAt   DateTime @default(now())
}

model Action {
  id         String   @id @default(cuid())
  insight    Insight  @relation(fields: [insightId], references: [id])
  insightId  String
  type       String
  externalId String?
  status     String
  createdAt  DateTime @default(now())
}

model Poll {
  id          String   @id @default(cuid())
  workspace   Workspace @relation(fields: [workspaceId], references: [id])
  workspaceId String
  insight     Insight? @relation("InsightPolls", fields: [insightId], references: [id])
  insightId   String?
  title       String
  description String?
  options     Json     // [{id,label,meta}]
  responses   PollResponse[]
  visibility  String   // public | workspace | private
  createdBy   String?
  createdAt   DateTime @default(now())
  closedAt    DateTime?
}

model PollResponse {
  id       String @id @default(cuid())
  poll     Poll   @relation(fields: [pollId], references: [id])
  pollId   String
  userId   String?
  answer   Json   // option id(s) or open text
  createdAt DateTime @default(now())
}

model ChatRoom {
  id          String   @id @default(cuid())
  workspace   Workspace @relation(fields: [workspaceId], references: [id])
  workspaceId String
  name        String
  isPrivate   Boolean  @default(false)
  members     Json     // list of userIds (or a relation table in future)
  messages    ChatMessage[]
  createdAt   DateTime @default(now())
}

model ChatMessage {
  id        String   @id @default(cuid())
  room      ChatRoom @relation(fields: [roomId], references: [id])
  roomId    String
  senderId  String?
  text      String   @db.Text
  metadata  Json?
  createdAt DateTime @default(now())
}

model ForumThread {
  id          String @id @default(cuid())
  workspace   Workspace @relation(fields: [workspaceId], references: [id])
  workspaceId String
  title       String
  createdBy   String?
  posts       ForumPost[]
  createdAt   DateTime @default(now())
  isClosed    Boolean @default(false)
}

model ForumPost {
  id        String @id @default(cuid())
  thread    ForumThread @relation(fields: [threadId], references: [id])
  threadId  String
  authorId  String?
  text      String @db.Text
  createdAt DateTime @default(now())
}

model SocialStat {
  id         String   @id @default(cuid())
  workspace  Workspace @relation(fields: [workspaceId], references: [id])
  workspaceId String
  platform   String
  metricDate DateTime
  metrics    Json     // {views:123, watchTime: 456, comments: 12, rewatch: 0.12}
}
# Community-Q — Security, Roadmap, API Reference & Examples

## Security, privacy & compliance

- Redact PII at ingestion (configurable rules).
- Workspace isolation & role-based access control.
- Audit logs for connector activity and action creation.
- Retention policies and deletion flows for GDPR/CCPA.
- Minimum connector permissions; secure secret storage.
- Option: self-host for sensitive orgs.
- For age-verified rooms, store only verification status (avoid storing raw identity unless mandated).

---

## Roadmap & milestones (90-day launch plan)

### Week 0–2: Core MVP
- Slack + Discord connector (read-only).
- Ingest → embed → query pipeline.
- Frontend: Query bar, Insight Detail, Create Ticket modal (Jira/Notion mock).
- Ship Polls (on-site): builder + public link + embed code.
- Ship On-platform Chat (lightweight): create rooms, messages, simple notifications.
  > **Note:** This chat is a new channel inside Community-Q — it does **not** auto-import all external chats.

### Week 3–6: Pilot & iterate
- Run 5 paid/discounted pilots (concierge onboarding).
- Add templated questions (SaaS, gaming).
- Instrument ROI metrics; convert at least 2 pilots to paid.
- Add basic analytics dashboard (social metrics ingest & simple charts).
- Implement PII redaction and workspace tenancy.

### Week 7–12: Scale & integrations
- Production vector DB, queuing, retry logic.
- Add Zendesk export, Discourse connector.
- Poll cross-posting integrations (optional).
- Alerts & scheduled reports.
- Age verification gating for rooms & threads (optional third-party).
- Onboarding UX and billing.

---

## Testing & QA
- Unit tests for ingestion, dedupe, retrieval.
- Integration tests for connectors using recorded fixtures.
- End-to-end UI tests (Playwright/Cypress).
- Load testing for retrieval and embedding pipeline.
- Security scanning for injected content in chat/poll inputs.

---

## Contributing & developer workflow
- Fork → feature branch `feat/...` → open PR.
- Follow TypeScript linting (ESLint) and formatting (Prettier).
- Add tests for core logic.
- Small PRs with clear descriptions and screenshots.

---

## API reference (essential endpoints)

### Insights
- `POST /api/query`
  - Request: `{ query, timeWindow, topK }`
  - Response: `insight` `{ id, answer, confidence, topItems, evidenceSnippets }`

- `GET /api/insights` — list insights (filters, since, workspace)
- `GET /api/evidence/:id` — fetch full evidence item

### Actions
- `POST /api/actions` — create action (ticket/poll/message)
  - Body: `{ insightId, type: "jira|notion|poll|chat", payload }`

### Connectors
- `POST /api/connectors/:platform/test` — validate connector credentials
- `POST /api/connectors/:platform/sync` — manual sync trigger

### Polls
- `POST /api/polls` — create poll (body contains options, visibility, optional insightId)
- `GET /api/polls/:id` — fetch poll + results
- `POST /api/polls/:id/respond` — submit response
- `GET /api/polls/:id/embed` — return embed HTML snippet

### Chat (on-platform)
- `POST /api/chat/rooms` — create room
- `GET /api/chat/rooms/:id/messages` — fetch messages (pagination)
- `POST /api/chat/rooms/:id/messages` — post message (WebSocket used for realtime)

### Forums
- `POST /api/forums/threads` — create thread
- `GET /api/forums/threads/:id` — fetch thread + posts
- `POST /api/forums/threads/:id/posts` — add post

### Social metrics
- `POST /api/socials/sync` — trigger social metrics pull (platform-specific)
- `GET /api/socials/:workspaceId/overview` — aggregated metrics

### Curl Example query
```bash
curl -X POST http://localhost:4000/api/query \
 -H "Authorization: Bearer <token>" \
 -H "Content-Type: application/json" \
 -d '{"query":"Top feature requests last 30 days","timeWindow":"30d","topK":5}'
````

# Implementation tips & tradeoffs

- **Use retrieval-first RAG** and require evidence to reduce hallucinations.
- **Cache embeddings**; re-embed only changed posts.
- **Start with a managed vector DB** for production speed; use FAISS locally for development.
- **Normalization:** lemmatization + alias maps to group mentions.
- **Prioritization:** tunable, explainable weights (frequency, recency, author influence).
- **Privacy:** default anonymized quotes; workspace admin can opt to reveal handles.
- **On-platform Chat:** start simple (no message edits, no advanced presence) — add features later if pilots need them.

---

# FAQ

**Q: Will the platform chat import my Discord/Slack conversations?**  
**A:** No. The on-platform chat is a **separate** chat room inside Community-Q where workspace members can discuss insights and actions. It does not automatically mirror or replace external platform chat. Cross-posting or connectors that send messages into Community-Q can be implemented later but are not part of the initial MVP to avoid scope creep.

**Q: Can insights auto-create tickets?**  
**A:** Yes — Action cards prefill ticket fields; users confirm before pushing.

**Q: How are duplicates/spam handled?**  
**A:** Dedupe heuristics, near-duplicate detection, platform spam filters, and optional admin review.

---

# License

MIT — see `LICENSE`.

---

# Appendix: Example responses (JSON)

## Insight

```json
{
  "id": "ins_abc123",
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
  ],
  "relatedPolls": [{ "id": "poll_01", "title": "Which feature matters most?" }],
  "relatedChatRoom": { "id": "room_123", "name": "feature-requests-discussion" }
}
```

# Examples

## Poll (example)

````json
{
  "id": "poll_01",
  "title": "Which feature matters most?",
  "options": [
    {"id": "o1", "label": "Multi-account switching"},
    {"id": "o2", "label": "Dark mode"},
    {"id": "o3", "label": "Faster uploads"}
  ],
  "visibility": "public",
  "results": {"o1": 42, "o2": 28, "o3": 10}
}
# Chat message (example)

```json
{
  "id": "msg_001",
  "roomId": "room_123",
  "senderId": "user_333",
  "text": "I can volunteer to prototype the ticket description for multi-account.",
  "createdAt": "2025-09-10T15:12:00Z"
}
````
