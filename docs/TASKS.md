# TASKS.md

## Purpose

This document defines executable tasks for the WhatsApp Order Generator Application.

It converts approved roadmap items into concrete work units for development and agent execution.

---

## Usage Rule

Agent must:

- follow `AGENT.md`
- obey `CONSTRAINTS.md`
- respect `DECISIONS.md`
- use `ROADMAP.md` for direction
- treat `NOTES.md` as context only

Do NOT implement directly from `NOTES.md` unless explicitly instructed.

---

## Status Labels

- `todo` → approved but not started
- `doing` → currently in progress
- `done` → completed
- `deferred` → approved later, not for now

---

## Current Priority

Current focus:
- governance alignment
- production-safe static deployment
- UX refinement
- vendor-configurable static path preparation

---

# TASK LIST

---

## TASK-001 — Replace alert-based validation with inline feedback

Status: `done`

Goal:
Remove disruptive `alert()` usage and show validation errors inside the UI.

Why:
- better user experience
- better production readiness
- cleaner mobile interaction

Likely files:
- `index.html`
- `css/style.css`
- `js/app.js`
- `js/input-validator.js`

Rules:
- do not move validation ownership out of `input-validator.js`
- do not duplicate validation logic
- UI only displays returned validation result

Definition of done:
- validation errors appear inline
- no `alert()` used for normal validation flow
- preview/actions remain blocked when invalid

---

## TASK-002 — Improve preview state handling

Status: `done`

Goal:
Make preview state clearer for empty, invalid, and valid conditions.

Why:
- reduce confusion
- improve readability
- support production use

Likely files:
- `index.html`
- `css/style.css`
- `js/app.js`
- `js/config.js`

Rules:
- final message still comes only from `message-formatter.js`
- do not build preview text separately

Definition of done:
- empty state is clear
- invalid state is clear
- valid state matches final message exactly

---

## TASK-003 — Add vendor/shop header from config

Status: `done`

Goal:
Display vendor/shop identity in the UI using config-driven data.

Why:
- align product with vendor-facing use case
- prepare for multi-vendor/static routing later

Likely files:
- `index.html`
- `js/config.js`
- `js/app.js`

Rules:
- keep config-driven
- no backend
- no auth
- no database

Definition of done:
- shop name is visible in UI
- values come from config
- current single-vendor static deployment still works

---

## TASK-004 — Refine header hierarchy and reserve vendor profile section

Status: `done`

Goal:
Make the vendor identity the main visual focus in the header and prepare a dedicated header/profile area for future vendor profile expansion.

Why:

- vendor name should be the primary identity on the page
- current header hierarchy gives too much emphasis to the generic app name
- prepares a stable UI area for future vendor profile fields without redesigning the layout later

Current issue:

- `WhatsApp Order Generator` appears more prominent than vendor identity
- supporting text may compete with or overshadow vendor branding

Desired direction:

- vendor/shop name should be larger and more prominent
- `WhatsApp Order Generator` should become secondary/supporting text
- supporting tagline should be reviewed:

  - keep only if it supports clarity
  - reduce or remove if it competes with vendor identity
- reserve a clear header/profile section for future vendor information

Future-ready profile area may later support:

- vendor/shop name
- short description
- contact info
- shop note
- logo/image placeholder

Likely files:

- `index.html`
- `css/style.css`
- `js/app.js`
- optionally `js/config.js` if profile fields need placeholder structure

Rules:

- keep static-first
- no backend
- no auth
- no database
- no routing changes
- do not overbuild a full profile system yet
- focus on hierarchy and reserved structure only

Definition of done:

- vendor/shop name is visually dominant in header
- app name is secondary
- header tagline is either reduced, rewritten, or removed based on clarity
- a dedicated vendor profile/header section exists in the layout
- current single-vendor static deployment still works
- layout remains mobile-first and clean

Suggested note:
This task is about **visual hierarchy and layout reservation**, not full vendor profile functionality.

---

## TASK-005 — Restructure vendor config for future growth

Status: `done`

Goal:
Stabilize the vendor-oriented config structure so it is clean, explicit, and ready for later static vendor routing.

Why:
- current implementation already separates core config areas
- structure should now be locked and documented before routing work
- reduces future refactor churn

Current status:
- completed:
  - vendor/shop info, products, and app settings are explicit in `APP_CONFIG`
  - consuming files are aligned to the same structure
  - setup and product docs reflect the stabilized baseline

Likely files:
- `js/config.js`
- `js/form.js`
- `js/app.js`
- `docs/SETUP.md`
- `README.md`
- `ROADMAP.md`

Rules:
- keep static-first
- do not add routing yet
- do not add persistence
- do not over-design config schema

Definition of done:
- config clearly separates:
  - vendor/shop info
  - product list
  - app settings
- consuming files use the structure consistently
- docs reflect the stabilized config model
- app still works without backend

---

## TASK-006 — Refine vendor header hierarchy and reserved profile area

Status: `done`

Goal:
Improve the vendor-focused header so shop identity is clearer, more trustworthy, and better prepared for future vendor profile expansion.

Why:
- vendor identity is now config-driven, but the reserved profile/header area is still minimal
- the header should better support future vendor-facing static page evolution
- improves first impression without changing system architecture

Likely files:
- `index.html`
- `css/style.css`
- `js/app.js`
- optionally `js/config.js`

Rules:
- keep static-first
- no backend
- no auth
- no routing changes
- no full profile system yet
- focus on hierarchy, spacing, clarity, and reserved structure

Definition of done:
- vendor/shop identity is the primary visual anchor
- app identity remains secondary and supportive
- header/profile area is cleaner and more explicit
- future profile expansion can fit without redesigning page structure
- current single-vendor static deployment still works

---

## TASK-007 — Remove redundant Generate Order action from live-preview flow

Status: `done`

Goal:
Remove the redundant `Generate Order` button so the form interaction matches the actual live-preview behavior.

Why:
- preview is already generated automatically
- current button no longer owns a real state transition
- keeping it creates confusion and makes the UI feel broken or misleading

Likely files:
- `index.html`
- `css/style.css`
- `js/app.js`
- `README.md`
- `docs/FLOW.md`
- `docs/TASKS.md`

Rules:
- keep live preview as the primary generation model
- do not reintroduce manual generation flow
- do not change message pipeline ownership
- do not add fake confirmation logic

Definition of done:
- `Generate Order` button is removed from UI
- live preview remains the primary message generation behavior
- action flow remains clear:
  - fill form
  - preview updates
  - user uses WhatsApp / copy actions
- docs reflect the updated interaction model

---

## TASK-008 — Improve item interaction UX

Status: `done`

Goal:
Refine add/remove/collapse interaction for item cards so multi-item ordering feels more predictable and smooth on mobile.

Why:
- multi-item flow is the core buyer interaction
- current interaction works, but still has usability friction
- better item behavior improves order accuracy and speed

Likely files:
- `css/style.css`
- `js/form.js`
- `js/app.js`

Rules:
- preserve current data flow
- do not move logic into CSS
- keep item handling in form/app layers
- do not redesign message pipeline

Definition of done:
- add/remove remains smooth
- collapse/expand remains predictable
- item summaries stay accurate
- single-item and many-item flows both feel stable

---

## TASK-009 — Improve copy/open action feedback

Status: `done`

Goal:
Replace disruptive alert-based action feedback with simple non-blocking UI feedback for copy/open actions.

Why:
- improve production polish
- reduce disruptive interaction
- align action UX with improved validation UX

Likely files:
- `index.html`
- `css/style.css`
- `js/whatsapp-url.js`
- `js/app.js`

Rules:
- do not change transport ownership
- do not duplicate copy logic
- keep feedback simple
- do not introduce frameworks or external libraries

Definition of done:
- copy/open actions provide visible non-blocking feedback
- normal operation does not depend on `alert()`
- current transport flow still works

---

## TASK-010 — Prepare vendor-specific static routing

Status: `deferred`

Goal:
Support vendor-specific page loading using static routing or query parameters.

Example:
`/?vendor=shop-a`

Why:
- needed for true vendor-shareable pages
- should only happen after config shape is stable

Likely files:
- `index.html`
- `js/config.js`
- `js/app.js`
- `docs/SETUP.md`
- `docs/FLOW.md`

Rules:
- static only
- no backend
- no authentication
- no persistence yet

Definition of done:
- vendor can be selected by static route or query param
- page loads matching vendor config
- current single-vendor flow still works as default

---

## TASK-011 — Production deployment checklist alignment

Status: `done`

Goal:
Make repo ready for safe static hosting deployment.

Why:

* v1.0 aims for production hosting
* deployment path must be clean and documented

Likely files:

* `README.md`
* `docs/SETUP.md`
* `ROADMAP.md`

Rules:

* no backend assumptions
* static hosting remains primary path

Definition of done:

* setup docs match actual deployment flow
* config expectations are documented
* production-safe static baseline is clear

---

## TASK-012 — Prepare extraction boundary for reusable WhatsApp transport

Status: `deferred`

Goal:
Document and prepare a clean boundary for later extraction of transport logic into reusable Very Small node usage.

Why:

* align with K-01 reusable node governance
* avoid future confusion

Likely files:

* `AGENT.md`
* `DECISIONS.md`
* `docs/STRUCTURE.md`
* optional code adapter later

Rules:

* do not force extraction now
* keep current local implementation working
* document conceptual ownership clearly

Definition of done:

* extraction boundary is documented
* no current functionality broken
* future extraction path is clear

---

## TASK-013 — Improve empty and invalid state clarity

Status: `done`

Goal:
Make it immediately clear to users:

* why preview is empty
* what is missing
* what action is required

Example

* “Isi nama pelanggan untuk lihat preview”
* “Pilih sekurang-kurangnya satu produk”
* disable WhatsApp button with visible reason

Why:

* reduces confusion during first-time use
* improves conversion from input → action
* aligns with live-preview-first model

Likely files:

* `js/app.js`
* `css/style.css`
* `README.md`
* `docs/FLOW.md`

Rules:

* do not add blocking UI (no modal)
* keep messaging simple and inline
* do not change validation logic ownership
* empty and invalid states must be clearly distinguished:
  - empty → onboarding guidance (what to fill)
  - invalid → correction guidance (what to fix)
* valid preview must remain the exact output from message-formatter.js (no modification)

Definition of done:

* empty state clearly explains what is missing
* invalid state clearly indicates issue
* user can understand next step without guessing
* no change to message pipeline
* empty and invalid states are visually and textually distinguishable
* valid state remains unchanged from current behavior

Related NOTE from NOTES.md:

→ **NOTE-007 (Action feedback UX consistency)**
Update NOTE-007:

```markdown
### Status
Partially addressed

### Superseded By
TASK-009, TASK-012
```

---

## TASK-014 — Improve mobile flow after adding/removing item

Status: `done`

Goal:
Make item interaction smoother on mobile:

* correct scroll behavior
* intuitive focus
* stable interaction after add/remove

Example:

* after “Tambah Item”, auto-scroll to new item
* focus on product dropdown
* after remove, no jumpy layout

Why:

* mobile is primary usage context
* current behavior is functional but not optimized
* improves speed of real order entry

Likely files:

* `js/form.js`
* `js/app.js`
* `css/style.css`

Rules:

* do not change data structure
* do not introduce heavy animation
* keep logic simple and predictable

Definition of done:

* new item is visible immediately
* focus behavior is correct
* remove action does not disrupt layout
* interaction feels stable on repeated use

Related NOTE from NOTES.md:

→ **NOTE-006 (Mobile interaction friction)**
Update NOTE-006:

```markdown
### Status
Partially addressed

### Superseded By
TASK-008, TASK-013
```

---

## TASK-015 — Improve item summary clarity in collapsed state

Status: `done`

Goal:
Ensure item summary always clearly represents:

* product
* quantity
* important note (if any)

Example:

Instead of:

```
Sambal Original x1
```

Better:

```
Sambal Original x2 — kurang pedas
```

Why:

* prevents misreading before sending
* important when multiple items exist
* reduces cognitive load

Likely files:

* `js/form.js`
* `css/style.css`

Rules:

* do not duplicate message formatting logic
* summary is UI-only, not message logic
* keep text short and readable

Definition of done:

* summary updates immediately after changes
* summary reflects key info clearly
* works for multiple items
* no layout break

Related NOTE from NOTES.md:

→ **NOTE-002 (Item ambiguity)**
Update NOTE-002:

```markdown
### Status
Partially addressed

### Superseded By
TASK-015
```

---

## TASK-016 — Add optional vendor instruction hint (non-intrusive)

Status: `done`

Goal:
Provide a small, optional hint to guide user behavior after sending order.

Example:

Below preview or action area:

```
Sila sahkan pesanan dengan vendor selepas hantar
```

Why:

* reduces confusion in WhatsApp conversation
* helps mitigate duplicate/unconfirmed order issue
* no system-level complexity required

Likely files:

* `index.html`
* `js/config.js` (optional text config)
* `css/style.css`
* `README.md`

Rules:

* must be non-blocking
* must be optional or subtle
* do not simulate order confirmation system

Definition of done:

* hint is visible but not intrusive
* improves clarity of next step
* no behavior change required

Related NOTE from NOTES.md:

→ **NOTE-004 (Duplicate/unconfirmed orders)**
Update NOTE-004:

```markdown
### Status
Partially addressed

### Superseded By
TASK-015
```

---

# Current Execution Order

Recommended near-term execution:

1. No pending task in current sequence.

---

# Agent Prompt Pattern

Recommended prompt format:

```
Implement TASK-001 from docs/TASKS.md.
Follow AGENT.md, CONSTRAINTS.md, DECISIONS.md, and docs/STRUCTURE.md.
Do not introduce frameworks, backend logic, or new architecture.
```

---

# Notes

* Tasks may be updated as roadmap evolves
* Only approved work should be added here
* Keep tasks small enough for safe execution

---

## Summary

This file defines the executable backlog for the Application.

Use:

* `ROADMAP.md` for approved direction
* `TASKS.md` for actual implementation work
* `NOTES.md` for raw thinking only

---









