# GHL Custom Fields

All fields on Contact object in SwiftServe Agency sub-account.

| Field Name | Key | Type | Purpose |
|---|---|---|---|
| AI Score | ai_score | Number | Lead score 0-100 from OpenAI |
| AI Tier | ai_tier | Single line | Hot / Warm / Cold |
| AI Recommendation | ai_recommendation | Single line | Action recommendation from OpenAI |
| Marketing Budget | marketing_budget | Single line | Budget from form submission |
| Urgency | urgency | Single line | Urgency from form submission |

## Workflow Triggers

- **Contact AI Scoring** — triggers on New Contact Created, fires webhook to n8n
- **Hot Lead - 90 Second SMS** — triggers when AI Tier field = "Hot"
- **Warm Lead Nurture Sequence** — triggers when AI Tier field changes to "Warm"
