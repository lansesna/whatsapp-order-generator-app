# ROADMAP.md

## Purpose

This document defines the approved evolution path for the WhatsApp Order Generator Application.

It guides:
- feature development
- scope boundaries
- agent execution priorities

---

## Current Version

v0.1.7 (Unreleased) - Stable static application with refined UX, label clarity, and feedback loop

Status:
- static frontend
- buyer-side order flow stable
- live-preview-first interaction
- vendor-oriented config structure
- production-ready static deployment
- commit-ready snapshot state (not released)

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

The product follows staged evolution:

- v0.1.x → static application + UX stabilization (completed)
- v0.2.x → multi-vendor static support
- v0.3.x → configuration flexibility
- v0.4.x → routing and page structure
- later → persistence layer (only when justified)

Do NOT skip stages.

---

## Future Direction

### v0.2.x — Multi-Vendor Static Support

Goal:
Enable multiple vendors using static configuration.

Focus:
- vendor-specific configuration files
- simple routing (query param or path-based)
- dynamic loading of vendor config (still static)

Constraints:
- no backend
- no authentication
- no persistence

---

### v0.3.x — Config Flexibility & Structure

Goal:
Improve configurability without introducing backend.

Focus:
- structured config schema
- better separation of vendor / product / settings
- optional configuration extensions

---

### v0.4.x — Routing & Multi-Page Structure

Goal:
Support multiple vendor pages cleanly.

Focus:
- multi-page static routing
- vendor page isolation
- clean URL structure
- evaluate migration to a simple build pipeline (`src -> docs/dist`) if it improves maintainability

---

### Later Phase — Persistence Introduction

Goal:
Introduce data persistence safely.

Possible directions:
- local embedded storage
- lightweight backend
- evaluated hosted solution

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


