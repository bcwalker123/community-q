// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/ping', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Sample Q&A endpoint (canned response for the demo)
app.post('/api/qna', (req, res) => {
  const { query } = req.body || {};
  const sample = {
    query,
    answer:
      'Top 3 feature requests: 1) Multi-account switching (42 mentions); 2) CSV export (17 mentions); 3) Dark mode (12 mentions).',
    confidence: 0.88,
    evidence: [
      {
        text: 'I need a multi-account switcher to manage corp and personal',
        source: 'Discord #product',
        ts: '2025-06-14T12:34:00Z'
      },
      {
        text: 'Please add CSV export for reporting',
        source: 'Support ticket #1245',
        ts: '2025-08-03T08:12:00Z'
      }
    ]
  };
  res.json(sample);
});

/*
  Production serving:
  After you run `npm run build` (Vite), uncomment the static-serving block below
  to serve the built client from Express.
*/
/*
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
*/

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
