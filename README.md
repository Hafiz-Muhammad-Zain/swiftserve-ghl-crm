# SwiftServe Agency — Marketing Agency CRM

**Live system:** GHL sub-account with AI lead scoring, automated follow-up sequences, calendar booking, and missed call text back. Built entirely inside GoHighLevel + n8n.

**Funnel:** https://swiftserve.zainsverse.de

---

## What This Project Does

A production-grade marketing agency CRM built on GoHighLevel. Every new lead is automatically scored 0-100 by OpenAI, classified as Hot/Warm/Cold, and entered into the correct follow-up sequence — all without manual work.

**Full lead journey:**
1. Lead submits form at swiftserve.zainsverse.de
2. GHL creates contact → fires webhook to n8n
3. n8n sends lead data to OpenAI GPT-4o-mini
4. OpenAI scores lead based on budget + urgency + contact quality
5. Score + tier + recommendation written back to GHL contact via API
6. Hot lead (70+) → SMS follow-up workflow fires within 90 seconds
7. Warm lead (40-69) → 5-day email nurture sequence starts automatically
8. Cold lead (0-39) → tagged for long-term nurture

---

## System Components

### GHL Setup
- Sub-account: SwiftServe Agency (Marketing Agency snapshot)
- Location ID: CVwKtPqeecFe8Xwh6gHF
- Pipeline: Marketing Pipeline (12 stages)
- Custom fields: AI Score, AI Tier, AI Recommendation, Marketing Budget, Urgency
- Funnel: "CRM Software Offer" — 3 steps (Offer, Appointment, Thank You)
- Domain: swiftserve.zainsverse.de

### GHL Workflows (all Published)
1. **Contact AI Scoring** — Trigger: New Contact Created → fires webhook to n8n
2. **Hot Lead - 90 Second SMS** — Trigger: AI Tier = Hot → sends personalized SMS
3. **Warm Lead Nurture Sequence** — Trigger: AI Tier = Warm → 5-day email drip

### n8n AI Scoring Workflow
- Trigger: Webhook (POST) from GHL
- Node 2: OpenAI GPT-4o-mini — scores lead 0-100 based on budget + urgency
- Node 3: JavaScript — parses OpenAI response, extracts score/tier/recommendation
- Node 4: HTTP Request (PUT) — writes fields back to GHL contact via v2 API
- Node 5: Respond to Webhook

---

## AI Scoring Logic

OpenAI scores each lead based on:
- Marketing Budget: $5000+ = +30pts, $1000-5000 = +20pts, under $1000 = +5pts
- Urgency: mentions "now/urgent/immediately" = +30pts, "soon/month" = +15pts
- Valid phone = +20pts, Valid email = +10pts, Base = 10

Tiers: 70-100 = Hot, 40-69 = Warm, 0-39 = Cold

---

## n8n Code Node

```javascript
const data = $input.first().json;
const raw = data.output[0].content[0].text;
const clean = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
const parsed = JSON.parse(clean);
return {
  score: parsed.score,
  tier: parsed.tier,
  recommendation: parsed.recommendation,
  contact_id: $('Webhook').first().json.body.id
};
```

---

## GHL API Configuration

**Endpoint:** `https://services.leadconnectorhq.com/contacts/{contact_id}`
**Method:** PUT
**Headers:** Authorization: Bearer {pit- token}, Content-Type: application/json, Version: 2021-07-28, locationId: CVwKtPqeecFe8Xwh6gHF

**Body:**
```json
{
  "customFields": [
    {"key": "ai_score", "field_value": "{{ $json.score }}"},
    {"key": "ai_tier", "field_value": "{{ $json.tier }}"},
    {"key": "ai_recommendation", "field_value": "{{ $json.recommendation }}"}
  ]
}
```

---

## Stack

| Layer | Tool |
|---|---|
| CRM | GoHighLevel (30-day Pro plan) |
| Automation | n8n (self-hosted, Hetzner VPS via Coolify) |
| AI scoring | OpenAI API (GPT-4o-mini) |
| Lead capture | GHL Funnel Builder (native) |
| Messaging | GHL native SMS + email |
| Calendar | GHL native calendar |
| Domain | swiftserve.zainsverse.de (CNAME on Porkbun) |

---

## Upwork Portfolio Card

```
SwiftServe Agency — Marketing Agency CRM
AI-scored leads, personalized follow-up in 90 seconds, full pipeline automation.
[GitHub] [Live Funnel: swiftserve.zainsverse.de]
Stack: GoHighLevel · n8n · OpenAI API
Result: Every new lead scored and followed up automatically. Zero manual work.
```

---

## Key Technical Notes

- GHL v2 API requires sub-account pit- token (not agency API key)
- locationId must be passed as a header, not query parameter
- HTTP method is PUT (not PATCH) for contact updates
- OpenAI may return markdown code blocks — strip with regex before JSON.parse
