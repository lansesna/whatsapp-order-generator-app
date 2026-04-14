# NOTES.md

This file contains raw ideas, planning notes, experiments, and possible directions.

This document tracks:
- ideas
- risks
- observations
- rejected or deferred decisions

Rules:
- contents here are NOT automatically approved for implementation
- agent must treat NOTES.md as context only
- all actionable work must be moved to docs/TASKS.md.
- implementation priority must follow:
  AGENT.md → CONSTRAINTS.md → DECISIONS.md → ROADMAP.md → TASKS.md
- it is NOT a task list. If an item appears only in NOTES.md and not in TASKS.md or ROADMAP.md, do not implement it by default

---

## NOTE-001 — Browser cache may cause stale config

### Context
Observed during local development using python -m http.server.

### Observation
After updating APP_CONFIG.vendor.phone, desktop browser still used old phone number.

### Risk / Problem
- users may send order to outdated phone number
- inconsistent behavior across devices
- difficult debugging during development

### Options Considered
- rely on browser refresh
- instruct users to hard refresh
- implement cache-busting for static assets

### Decision
Deferred

### Reason
- not critical during current development stage
- better handled during deployment/readiness phase

### Future Trigger
- before production deployment
- when vendor config becomes business-critical

### Related
- TASK-011 (deployment readiness)
- index.html (asset loading)

---

Item numbering and Quantity ambiguos inside whatsapp
Order id number?
Approved order?
structured whatsapp by categories? in the future? for example kedai makan, tempahan baju etc


---

## Structure template:

```
## [NOTE-ID] Title

### Context
Where this idea/issue came from.

### Observation
What you noticed.

### Risk / Problem
Why it matters.

### Options Considered
- Option A
- Option B
- Option C

### Decision
- accepted / deferred / rejected

### Reason
Why you made that decision.

### Future Trigger
When this should be revisited.

### Related
- TASK-xxx
- file/module
- release version

```

---

## Handling outdated notes

Do NOT delete.

Instead:

```
### Status
Outdated

### Superseded By
TASK-008 or v0.1.4 changes
```