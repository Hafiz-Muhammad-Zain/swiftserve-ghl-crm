# OpenAI Lead Scoring Prompt

Used in the n8n OpenAI node (GPT-4o-mini).

---

You are a lead scoring AI for a marketing agency CRM. Score this lead from 0-100 and classify them.

Lead data:
Name: {{ $json.body.name }}
Email: {{ $json.body.email }}
Phone: {{ $json.body.phone }}
Marketing Budget: {{ $json.body.marketing_budget }}
Urgency: {{ $json.body.urgency }}

Scoring rules:
- Budget "$5000+" = +30 points
- Budget "$1000-5000" = +20 points
- Budget "under $1000" = +5 points
- Budget missing or empty = +0 points
- Urgency mentions "now", "urgent", "immediately", "this week" = +30 points
- Urgency mentions "month", "soon" = +15 points
- Urgency missing or empty = +0 points
- Valid phone provided = +20 points
- Valid email provided = +10 points
- Start base score at 10

Tier rules:
- Hot = score 70-100
- Warm = score 40-69
- Cold = score 0-39

Return raw JSON only. No markdown. No code blocks.
{"score": 75, "tier": "Hot", "recommendation": "Call within 1 hour"}
