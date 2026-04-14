# release-v0.1.6

## Version
v0.1.6

---

## Completed Tasks
- TASK-017
- TASK-018
- TASK-019

---

## Context

This release focuses on:

- improving real interaction stability
- enabling early-stage user feedback loop
- refining UI perception without changing system architecture

This version continues the transition from:
- internal usability → real usage readiness

---

## Scope Summary

### UX Stability
- preserve last valid preview during temporary invalid states
- avoid disruptive preview reset when user adds incomplete item

### Feedback Loop
- introduce simple, non-intrusive feedback/report mechanism
- allow users/vendors to report issues or contact developer

### UI Modernization (lightweight)
- improve typography and readability
- improve spacing and visual hierarchy
- improve interaction affordance (e.g., collapse icon clarity)
- improve overall modern feel without frameworks

---

## NOTES Impact

NOTES.md was expanded in this release with:

- NOTE-017 — No user history for buyer/vendor reuse
- NOTE-018 — Multi-setup vendor configuration
- NOTE-019 — Limit on number of vendor setups
- NOTE-020 — Customizable message structure
- NOTE-021 — No direct user feedback / bug reporting mechanism
- NOTE-022 — Preview reset on temporary invalid state disrupts user flow
- NOTE-023 — UI visual clarity and modern feel

Classification:

- v0.1.x relevant:
  - NOTE-021
  - NOTE-022
  - NOTE-023

- deferred to v0.2+:
  - NOTE-017
  - NOTE-018
  - NOTE-019
  - NOTE-020

---

## TASKS Alignment

TASKS.md updated to:

- normalize formatting (bullet style, structure, wording)
- enforce single Example section per task
- remove cross-layer NOTE update instructions
- fix Related NOTE mappings

New tasks introduced:

- TASK-017 — Preserve last valid preview during temporary invalid state
- TASK-018 — Add simple feedback / bug report mechanism
- TASK-019 — UI modernization (lightweight pass)

Execution order:

1. TASK-017 (highest impact, interaction stability)
2. TASK-018 (feedback loop)
3. TASK-019 (UI refinement)

---

## Implementation Notes

This release will be implemented using:

- VS Code (manual development)
- OpenAI Codex (guided execution via TASK definitions)

Constraints:

- static-first architecture must remain unchanged
- no backend, database, or routing system introduced
- no framework adoption (e.g., React, Tailwind)

---

## Expected Behavior Changes

### Preview Handling
- preview no longer resets immediately when a new empty item is added
- last valid preview remains visible
- inline guidance indicates invalid state
- actions remain disabled until validity is restored

### Feedback Access
- user can easily access a feedback/report action
- feedback goes to website owner/dev support channel
- no blocking UI or complex form introduced
- feedback/report destination is separate from vendor contact

### UI Improvements
- clearer collapse/expand interaction
- improved readability and spacing
- more modern visual presentation

---

## Non-Goals

This release does NOT include:

- vendor routing (TASK-010)
- reusable transport extraction (TASK-012)
- persistence (localStorage, backend)
- order ID or tracking system
- multi-vendor configuration
- customizable message templates

---

## Risks & Validation

### Risks
- preview may become misleading if not correctly synced with last valid state
- UI changes may unintentionally affect layout stability

### Required Manual Validation
- multi-item add/remove flow (mobile and desktop)
- preview correctness across valid → invalid → valid transitions
- collapse/expand behavior clarity
- feedback link accessibility and usability

---

## Audit Notes

The release-governor must verify that:

### 1. Constraint Compliance
- application remains static frontend only
- no backend, database, or framework introduced
- no routing or multi-vendor logic implemented
- respects `CONSTRAINTS.md`

### 2. Task Completion Integrity
- TASK-017 implemented correctly
- TASK-018 implemented correctly
- TASK-019 implemented correctly

### 3. Structure Integrity
- validation remains in `input-validator.js`
- message formatting remains in `message-formatter.js`
- WhatsApp transport remains in `whatsapp-url.js`
- no logic duplication introduced
- no cross-layer leakage

### 4. Flow Consistency
- system flow remains:
  input → validate → compose → format → preview → action
- preserved preview during temporary invalid state is clearly indicated
- action buttons remain disabled while current form state is invalid
- docs/FLOW.md reflects actual behavior

### 5. Documentation Consistency
- README.md reflects current product behavior and version
- ROADMAP.md reflects current phase correctly
- TASKS.md numbering and format are consistent
- NOTES.md is treated as context only, not execution source
- no outdated instructions remain

### 6. Documentation Update Coverage
- include documentation wording updates even when non-functional
- include TASKS.md normalization updates
- if NOTES.md lifecycle/status changes are reflected in docs or release notes, describe them accurately

### 7. Manual Validation Coverage
- multi-item add/remove flow validated
- preview correctness across valid → invalid → valid transitions validated
- collapse icon visibility validated
- typography readability and spacing validated
- feedback/report link visibility and behavior validated

---

## Instruction

Run release-governor for version v0.1.6.

Requirements:
- follow docs/agents/release-governor.md
- reflect actual repository state
- do not invent features
- include:
  - TASK-017, TASK-018, TASK-019 changes
  - NOTES.md additions (NOTE-017 → NOTE-023)
  - TASKS.md normalization updates
  - any additional modifications introduced during implementation

Also:
- include documentation wording updates even if non-functional
- clearly label documentation-only changes as UPDATE
- ensure CHANGELOG reflects:
  - UX changes
  - UI refinements
  - documentation updates

Produce:
- CHANGELOG update
- release commit message
- release tag message
- release notes