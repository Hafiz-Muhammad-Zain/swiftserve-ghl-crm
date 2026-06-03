# Sub-account Setup Guide — SwiftServe Agency CRM

This documents how to onboard a new marketing agency client into the SwiftServe GHL system. Full setup takes under 1 hour using the snapshot.

---

## What a Sub-account Is

In GHL, each client gets their own isolated sub-account — their own contacts, pipelines, workflows, funnels, and branding — all managed under your agency account. Clients cannot see each other's data.

SwiftServe Agency is the master sub-account. New clients get a fresh sub-account cloned from the SwiftServe snapshot.

---

## Step 1 — Create the Sub-account (5 min)

1. Go to **Agency View** (top left dropdown)
2. Left sidebar: **Sub-accounts → + New Sub-account**
3. Fill in client business name, email, phone, address, timezone
4. Under **Snapshot**: select `SwiftServe Agency CRM v1`
5. Click **Create**

GHL creates the sub-account and imports all pipelines, workflows, funnels, fields.

---

## Step 2 — Add Client as User (2 min)

1. Inside the new sub-account: **Settings > Team**
2. Click **+ Add User**
3. Enter client email
4. Role: **Admin** (full access) or **User** (limited)
5. Send invite

---

## Step 3 — White-label Branding (10 min)

1. **Settings > Business Profile** — upload client logo, update business name
2. **Settings > Email Services** — update From Name to client business name
3. **Sites > Funnels** — update all SwiftServe references to client name, connect client domain

---

## Step 4 — Connect n8n (10 min)

1. Duplicate the SwiftServe Lead Intake Pipeline workflow in n8n
2. Update Authorization header with new sub-account GHL API key
3. Update locationId and pipelineId to new sub-account values
4. Activate and copy the new webhook URL
5. In GHL: Automation > AI Scoring workflow > update webhook trigger URL

---

## Step 5 — Test (5 min)

1. Submit a test lead via the client funnel
2. Verify contact appears in GHL within 5 seconds
3. Verify AI Score, AI Tier, AI Recommendation are populated
4. Verify SMS fires for hot leads

---

## Sub-account Checklist

- [ ] Sub-account created with SwiftServe snapshot
- [ ] Client added as user
- [ ] Logo and business name updated
- [ ] Funnel text updated with client branding
- [ ] Client domain connected to funnel
- [ ] n8n workflow duplicated and updated with new API key + location ID
- [ ] Webhook URL updated in GHL AI Scoring workflow
- [ ] Test lead submitted and scored correctly
- [ ] Client onboarding workflow active

---

## What This Proves on Upwork

Most GHL freelancers build one system for one client. This snapshot + sub-account approach shows you can deliver a new client system in under 1 hour, maintain multiple clients under one agency account, and scale without rebuilding from scratch every time.
