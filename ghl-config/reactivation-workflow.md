# Database Reactivation Workflow — SwiftServe Agency CRM

**Trigger:** Contact has not had any activity in 60+ days
**Goal:** Re-engage dormant leads with a 3-touch SMS + email sequence over 7 days
**Niche:** Marketing Agency

---

## What This Does

Contacts who submitted a form but never booked a call, or went cold after initial contact, are automatically re-engaged. No manual work. The workflow checks for inactivity, sends a warm re-engagement sequence, and branches based on reply.

---

## GHL Workflow Setup — Step by Step

### Step 1 — Create the Workflow

1. Go to **Automation → Workflows → + New Workflow**
2. Name it: `Database Reactivation — 60 Day Dormant`
3. Set to **Trigger-based**

---

### Step 2 — Set the Trigger

**Trigger:** Contact Tag Added
**Tag:** `reactivation-candidate`

> You will run a manual bulk-action every 2 weeks:
> Go to Contacts → Filter: Last Activity > 60 days ago → Select All → Add Tag: `reactivation-candidate`
> The workflow fires automatically from that tag.

---

### Step 3 — Add Workflow Filter (Safety Check)

Add a condition at the top:
- **AI Tier** is NOT equal to `Hot`
- **DND** is `false`

This prevents re-engaging leads already in an active sequence or who opted out.

---

### Step 4 — Touch 1 (Day 0) — SMS

**Action:** Send SMS
**Wait:** 0 (fires immediately)
**Message:**
```
Hey {{contact.first_name}}, it's been a while! We've helped several agencies since we last spoke — wanted to check if you're still looking to automate your lead follow-up. Worth a quick 15-min chat? Reply YES and I'll send a link.
```

---

### Step 5 — Wait + Reply Detection

**Action:** Wait — 2 days
**Then add If/Else branch:**
- **Condition:** Last Inbound Message exists (contact replied)
  - YES branch → **Remove Tag:** `reactivation-candidate` → **Add Tag:** `reactivation-replied` → **End workflow**
  - NO branch → continue to Touch 2

---

### Step 6 — Touch 2 (Day 3) — Email

**Action:** Send Email
**Subject:** `Still on your radar, {{contact.first_name}}?`
**Body:**
```
Hi {{contact.first_name}},

I know timing isn't always right — wanted to follow up one more time.

Since we last connected, we've helped agencies like yours:
- Cut lead response time from hours to 90 seconds
- Reactivate cold databases and book calls on autopilot
- Set up full GHL systems in under 2 weeks

If any of that sounds useful, I'd love to show you how it works for your agency specifically.

→ Book a free 15-min strategy call: [your calendar link]

If the timing still isn't right, no worries at all — just reply STOP and I'll leave you alone.

— Zain
zainsverse.de
```

---

### Step 7 — Wait + Reply Detection

**Action:** Wait — 2 days
**If/Else branch:**
- Replied → Remove tag → Add tag `reactivation-replied` → End
- No reply → continue to Touch 3

---

### Step 8 — Touch 3 (Day 7) — SMS (Final)

**Action:** Send SMS
**Message:**
```
Last one, {{contact.first_name}} — promise. If you ever need a GHL system built fast and done right, I'm one message away. Reply STOP to opt out. — Zain, zainsverse.de
```

**Action after SMS:** Add Tag: `reactivation-complete`
**Action:** Remove Tag: `reactivation-candidate`
**Action:** Move pipeline stage to `Long-Term Nurture`

---

## Pipeline Stage Map

| Outcome | Tag Added | Pipeline Stage |
|---|---|---|
| Replied to any touch | `reactivation-replied` | Move to `Initial Contact` |
| Completed all 3 touches, no reply | `reactivation-complete` | Move to `Long-Term Nurture` |
| Opted out (replied STOP) | `dnd` | DND enabled, remove from pipeline |

---

## How to Run the Reactivation Campaign

Every 2 weeks:
1. Go to **Contacts**
2. Filter: **Last Activity** → **more than 60 days ago**
3. Also filter: Tag does NOT contain `reactivation-complete`
4. Select All → **Bulk Action → Add Tag → `reactivation-candidate`**
5. Workflow fires automatically

---

## Result

Dormant leads that would otherwise be lost are re-engaged on autopilot. Any reply routes them back into the active pipeline. This is one of the most requested features in marketing agency GHL builds — clients want their dead database monetized without hiring a sales rep.
