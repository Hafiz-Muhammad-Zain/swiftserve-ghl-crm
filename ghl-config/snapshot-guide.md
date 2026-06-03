# GHL Snapshot Guide — SwiftServe Agency CRM

A GHL snapshot packages everything built in this sub-account into a reusable template. Import it into any new sub-account and the full system is ready in under 5 minutes.

---

## What the SwiftServe Snapshot Includes

| Item | Details |
|---|---|
| Pipeline | Marketing Pipeline — 12 stages |
| Custom Fields | AI Score, AI Tier, AI Recommendation, Marketing Budget, Urgency |
| Workflows | AI Scoring trigger, Hot Lead SMS, Warm Nurture email sequence |
| Funnel | CRM Software Offer — 3 pages (Offer, Appointment, Thank You) |
| Calendar | Appointment booking setup |
| Email Templates | Warm nurture 5-day sequence |
| SMS Templates | Hot lead follow-up copy |
| Tags | facebook-lead, new-lead, reactivation-candidate, onboarding-started, whatsapp-sent |

**Not included:** Contacts, conversations, API keys, n8n workflows (those are separate)

---

## How to Export the Snapshot

1. Go to **GHL Agency View** (top left — switch from sub-account to agency)
2. Left sidebar: **Snapshots**
3. Click **+ Create Snapshot**
4. Select **SwiftServe Agency** as the source sub-account
5. Name it: `SwiftServe Agency CRM v1`
6. Select all items (pipeline, workflows, funnels, forms, calendars, custom fields)
7. Click **Create**
8. Once created, click the 3 dots next to it and **Copy Share Link**

---

## How to Import into a New Client Sub-account

1. Go to **Agency View → Sub-accounts → + New Sub-account**
2. Fill in client business name, email, phone, address
3. Under **Snapshot**, select `SwiftServe Agency CRM v1`
4. Click **Create**
5. GHL imports all pipelines, workflows, funnels, and fields automatically

The new sub-account is ready in 60 seconds.

---

## Post-Import Customisation (15 minutes)

After importing, update these for the client:

| Item | Where | What to change |
|---|---|---|
| Business name | Settings > Business Profile | Client company name |
| Logo | Settings > Business Profile | Client logo |
| Calendar | Calendars > Settings | Client availability, timezone |
| SMS sender name | Settings > Phone Numbers | Client business name |
| Email from name | Settings > Email Services | Client name |
| Funnel domain | Sites > Funnels > Domain | Client domain |
| n8n webhook | GHL Workflow > AI Scoring trigger | Point to client n8n instance |

---

## Then Import the n8n Workflows

The GHL snapshot does not include n8n. After importing:

1. Go to your n8n instance
2. Import [ai-scoring-workflow.json](../n8n-workflow/ai-scoring-workflow.json)
3. Update the GHL API key and location ID to the new sub-account
4. Activate the workflow
5. Copy the webhook URL into the GHL AI Scoring workflow trigger

Full system running in under 1 hour from a blank sub-account.
