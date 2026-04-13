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

Status: `to do`

Goal:
Make config more vendor-oriented and easier to evolve.

Why:
- prepare for local vendor config files later
- reduce hardcoded assumptions

Likely files:
- `js/config.js`
- `js/form.js`
- `js/app.js`
- `docs/SETUP.md`

Rules:
- keep static-first
- do not add routing yet
- do not add persistence

Definition of done:
- config clearly separates:
  - vendor/shop info
  - product list
  - app settings
- app still works without backend

---

## TASK-006 — Improve item interaction UX

Status: `todo`

Goal:
Refine add/remove/collapse interaction for item cards.

Why:
- multi-item flow is core to usability
- reduce friction on mobile

Likely files:
- `css/style.css`
- `js/form.js`
- `js/app.js`

Rules:
- preserve current data flow
- do not move logic into CSS
- keep item handling in form/app layers

Definition of done:
- add/remove remains smooth
- collapse/expand remains predictable
- item summaries stay accurate

---

## TASK-007 — Prepare vendor-specific static routing

Status: `deferred`

Goal:
Support vendor-specific page loading using static routing or query parameters.

Example:
```text
/?vendor=shop-a
````

Why:

* needed for true vendor-shareable pages
* supports early production hosting without backend

Likely files:

* `index.html`
* `js/config.js`
* `js/app.js`
* `docs/SETUP.md`
* `docs/FLOW.md`

Rules:

* static only
* no backend
* no authentication
* no persistence yet

Definition of done:

* vendor can be selected by static route or query param
* page loads matching vendor config
* current single-vendor flow still works as default

---

## TASK-008 — Add lightweight vendor config file format

Status: `deferred`

Goal:
Define a local data structure for vendor/shop configuration.

Why:

* needed before multi-vendor static routing becomes clean
* prepares later persistence work

Likely files:

* `js/config.js`
* optionally new config files
* `docs/STRUCTURE.md`
* `docs/SETUP.md`

Rules:

* keep plain JS or JSON
* no backend
* no remote fetching unless explicitly needed

Definition of done:

* vendor config structure is clear
* can represent:

  * vendor/shop info
  * vendor phone
  * product list

---

## TASK-009 — Improve copy/open action feedback

Status: `todo`

Goal:
Replace generic success/failure alerts for copy actions with clearer non-blocking UI feedback.

Why:

* improve production polish
* reduce disruptive interaction

Likely files:

* `index.html`
* `css/style.css`
* `js/whatsapp-url.js`
* `js/app.js`

Rules:

* do not change transport ownership
* do not duplicate copy logic
* keep feedback simple

Definition of done:

* copy/open actions provide visible feedback
* normal operation does not depend on `alert()`

---

## TASK-010 — Production deployment checklist alignment

Status: `todo`

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

## TASK-011 — Prepare extraction boundary for reusable WhatsApp transport

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

# Current Execution Order

Recommended near-term execution:

1. TASK-001 — inline validation
2. TASK-002 — preview state handling
3. TASK-003 — vendor/shop header
4. TASK-006 — item interaction UX
5. TASK-009 — action feedback
6. TASK-010 — deployment checklist alignment

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
