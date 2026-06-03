# Client Onboarding Automation — SwiftServe Agency CRM

**Trigger:** Opportunity moves to stage `Onboarding & Implementation`
**Goal:** Automatically welcome new agency clients, collect onboarding info, and kick off their setup sequence
**Niche:** Marketing Agency

---

## What This Does

The moment a deal is won and moved to Onboarding, this workflow fires. The new client receives a welcome SMS + email, is asked to fill an onboarding questionnaire, gets a Loom walkthrough link, and receives a 3-day check-in sequence. Zero manual follow-up from you.

---

## GHL Workflow Setup — Step by Step

### Step 1 — Create the Workflow

1. Go to **Automation → Workflows → + New Workflow**
2. Name it: `Client Onboarding — New Agency Client`
3. Set to **Trigger-based**

---

### Step 2 — Set the Trigger

**Trigger:** Pipeline Stage Changed
**Pipeline:** Marketing Pipeline
**Stage:** Onboarding & Implementation

---

### Step 3 — Touch 1 (Immediate) — Welcome SMS

**Action:** Send SMS
**Message:**
```
Hey {{contact.first_name}}! It's Zain — welcome aboard. So excited to build this for you. I'll send you a short onboarding form in the next few minutes. Should take under 5 min to fill. Let's get this system live!
```

---

### Step 4 — Wait 2 Minutes

**Action:** Wait — 2 minutes

---

### Step 5 — Touch 2 — Welcome Email with Onboarding Form

**Action:** Send Email
**Subject:** `Welcome to SwiftServe — let's get your system built`
**Body:**
```
Hi {{contact.first_name}},

Welcome — I'm genuinely excited to build this for you.

Before I start, I need about 5 minutes of your time to fill in your onboarding details. This tells me everything I need to build your system exactly the way you want it.

→ Fill your onboarding form here: [GHL Form Link — Onboarding Questionnaire]

What the form covers:
- Your current lead sources
- Which automations you need first
- Your GHL login details (encrypted form)
- Your branding (logo, colors, domain)
- Your calendar link

Once I receive it, I'll map your system and send you a build plan within 24 hours.

Your timeline: 14 days from form submission to live system.

Talk soon,
Zain
zainsverse.de
```

---

### Step 6 — Add Tags

**Action:** Add Tag: `onboarding-started`
**Action:** Add Tag: `new-client`

---

### Step 7 — Wait 24 Hours — Check if Form Submitted

**Action:** Wait — 1 day
**If/Else branch:**
- **Condition:** Tag contains `onboarding-form-submitted`
  - YES → continue to Step 8 (Build Kickoff)
  - NO → send reminder SMS

**Form Reminder SMS (if not submitted):**
```
Hey {{contact.first_name}}, just checking — did you get my onboarding form? Takes 5 min and unlocks your build. Here's the link again: [Form Link]
```

Wait 24 more hours → If still no form → Email reminder → assign internal task to follow up manually.

---

### Step 8 — Build Kickoff Email (fires after form submitted)

**Trigger for this step:** Tag Added = `onboarding-form-submitted`

**Action:** Send Email
**Subject:** `Your build plan is ready — here's what happens next`
**Body:**
```
Hi {{contact.first_name}},

Got your form — thank you. Here's your build plan:

Week 1:
- GHL sub-account configured with your branding
- Pipeline stages set up
- Lead capture form live
- AI scoring workflow connected

Week 2:
- SMS + email sequences written and tested
- All lead sources connected
- Calendar booking live
- Full system walkthrough recorded (Loom)

You'll get a Loom video of your complete system before I hand it over. You'll know exactly what was built and how to run it.

I'll check in with you on Day 3, Day 7, and at delivery.

Let's build.

— Zain
```

---

### Step 9 — Day 3 Check-in SMS

**Action:** Wait — 3 days (from kickoff)
**Send SMS:**
```
Hey {{contact.first_name}}, Day 3 update — your pipeline and custom fields are live in GHL. AI scoring workflow is connected. On track for delivery in 11 days. Any questions so far?
```

---

### Step 10 — Day 7 Check-in Email

**Action:** Wait — 4 days
**Subject:** `Day 7 — halfway there`
**Body:**
```
Hi {{contact.first_name}},

Halfway through your build. Here's where we are:

Done:
- Pipeline + stages
- Custom fields (AI Score, AI Tier, Urgency, Budget)
- AI lead scoring workflow
- SMS sequences written

In progress:
- Email sequences
- Lead source connections
- Calendar booking

On track for delivery Day 14. I'll send your Loom walkthrough with the final handover.

— Zain
```

---

### Step 11 — Day 14 Delivery SMS

**Action:** Wait — 7 days
**Send SMS:**
```
{{contact.first_name}} — your system is live. I've recorded a full Loom walkthrough — check your email. You have 7 days of support included. Any questions, just reply here.
```

**Action:** Move pipeline stage to `Customer Support & Success Management`
**Action:** Add Tag: `onboarding-complete`
**Action:** Remove Tag: `onboarding-started`

---

## Custom Fields Required

| Field Name | Type | Purpose |
|---|---|---|
| Onboarding Form URL | Text | Link sent to client |
| Build Start Date | Date | Day 0 of the build |
| Loom Walkthrough URL | Text | Final delivery video |
| Client Domain | Text | For sub-account setup |
| Client Logo URL | Text | For branding |

---

## Onboarding Form — Fields to Include

1. Business name
2. Website URL
3. Logo upload
4. Brand colors (hex)
5. Current lead sources (checkbox: Facebook Ads / Google Ads / Website / Referral / Cold Outreach / Other)
6. GHL login email
7. Calendar link
8. Top 3 automations needed (text)
9. Any existing GHL setup to migrate? (yes/no)
10. Anything else I should know?

**On form submit:** Add Tag `onboarding-form-submitted` → triggers Step 8 automatically.

---

## Result

Every new client goes through a consistent, professional onboarding experience on autopilot. You never forget a check-in. The client feels taken care of. This is exactly what agency clients hiring on Upwork want — a freelancer who has a system, not just skills.
