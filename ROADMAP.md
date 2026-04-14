# ROADMAP.md

## Purpose

This document defines the approved evolution path for the WhatsApp Order Generator Application.

It guides:
- feature development
- scope boundaries
- agent execution priorities

---

## Current Version

v0.1.6 - UX Stability, Feedback Loop, and Lightweight UI Modernization Baseline

Status:
- static frontend
- buyer-side order flow working
- WhatsApp message generation functional
- vendor-oriented config baseline stabilized (`vendor`, `products`, `settings`)
- ready for static hosting

Current focus:

- maintain live-preview-first UX clarity
- preserve last-valid preview context during temporary invalid transitions
- keep vendor-oriented static configuration stable
- preserve mobile-first interaction quality
- keep feedback channel developer-facing (separate from vendor contact)
- ensure production-safe static deployment behavior

Not in current scope:

- routing
- backend
- persistence

---

## Next Phase (v0.2 direction)

- vendor-specific routing (static)
- multi-config support
- stronger config separation

Not part of v0.1.x:
- backend
- persistence

---

## Development Strategy

The product follows a staged evolution:

1. static application (current)
2. improved UX and configurability
3. vendor-configurable data (local)
4. multi-page / vendor routing
5. persistence layer (later)

Do NOT skip stages.

---

## Version Roadmap

---

### v0.2 — UX Refinement

Goal:
Improve usability and remove friction.

Focus:
- replace alert-based validation with inline feedback
- improve error visibility near inputs
- refine mobile layout spacing and interaction
- improve item add/remove UX
- ensure preview clarity and readability

Do NOT add:
- backend
- database
- vendor system

---

### v0.3 — Vendor Config (Local)

Goal:
Support vendor-specific configuration without backend.

Focus:
- move product list into structured config
- support vendor shop name display
- support vendor phone from config
- clean separation of config vs UI logic

Outcome:
- different vendors can use different configs
- still static deployment

---

### v0.4 — Vendor Page Routing (Static)

Goal:
Enable vendor-specific pages.

Focus:
- support multiple vendor configs
- simple routing (e.g. query param or path-based)
- load vendor config dynamically (static files)

Example:
```

/?vendor=shop-a

```

Still:
- no backend
- no authentication

---

### v0.5 — Advanced UX / Structure

Goal:
Stabilize product experience before persistence.

Focus:
- preset product groups
- improved UI clarity
- optional order summary enhancements
- better mobile interaction

---

### Later Phase — Persistence Introduction

Goal:
Introduce data persistence safely.

Possible directions:
- local embedded database
- lightweight backend
- evaluated hosted solution (only after cost understanding)

Rules:
- must follow cost control strategy
- must not introduce uncontrolled billing
- must be explicitly approved

---

## Out of Scope (All Versions)

The following are NOT part of this roadmap:

- payment gateway
- inventory tracking
- order management dashboard
- CRM system
- chatbot / automation
- multi-vendor marketplace

---

## Extraction Opportunities (Future)

Reusable nodes may be extracted when patterns stabilize:

- message composer (Small)
- message formatter (Very Small or Small depending on reuse)
- WhatsApp transport tool (Very Small)

Extraction is NOT required early.

---

## Planning Flow

Development must follow:

NOTES.md → ideas  
ROADMAP.md → approved direction  
TASKS.md → executable work  

Agent must implement only:
- tasks defined in TASKS.md
- or explicitly instructed work

---

## Decision Alignment

All roadmap items must respect:

- CONSTRAINTS.md
- DECISIONS.md
- AGENT.md

---

## Summary

This roadmap ensures:

- controlled growth
- minimal complexity
- cost-safe evolution
- correct K-01 layering

Focus on delivering value first.

Expand only when necessary.

---

