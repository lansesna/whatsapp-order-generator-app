# AGENT.md

## Project Identity

This repository is an **Application** under:

/60-applications/whatsapp-order-generator/

It is a user-facing product built on top of reusable nodes defined in BUSINESS K-01.

---

## Product Definition

WhatsApp Order Generator is a lightweight application that allows vendors to share a simple order page so buyers can submit structured orders via WhatsApp.

---

## Architecture Overview

Flow:

form → validation → composition → formatting → WhatsApp transport → UI output

### Files and Responsibilities

- index.html → UI structure
- css/style.css → styling only

- js/app.js → UI orchestration and event handling
- js/form.js → extract and normalize input data
- js/input-validator.js → validate order data
- js/message-composer.js → prepare structured message data
- js/message-formatter.js → generate final message string (SOURCE OF TRUTH)
- js/whatsapp-url.js → WhatsApp transport (link generation, open, copy)

---

## Node Usage (K-01 Governance)

This Application consumes reusable nodes.

### Very Small

- WhatsApp Message Generator (transport-level logic)

Note:
- Current implementation includes local transport logic (`whatsapp-url.js`)
- This logic is conceptually owned by the Very Small node
- It may be extracted or replaced with an external reusable tool later

---

## Core Rules (CRITICAL)

### 1. Single Source of Truth

Final message must be generated ONLY by:

js/message-formatter.js

DO NOT:
- duplicate formatting logic
- build message in multiple places

---

### 2. Separation of Concerns

Each file has a strict responsibility:

- form.js → input only
- input-validator.js → validation only
- message-composer.js → structure only
- message-formatter.js → formatting only
- whatsapp-url.js → transport only
- app.js → orchestration only

DO NOT mix responsibilities.

---

### 3. No Hidden Logic

All transformations must be explicit.

DO NOT:
- mutate data silently
- embed logic inside UI handlers
- mix formatting into validation or UI

---

### 4. Validation Before Output

Always run:

validateOrderData()

If invalid:
- DO NOT generate message
- DO NOT generate WhatsApp link

---

### 5. Deterministic Output

Same input must always produce:

same message → same WhatsApp link

No randomness allowed.

---

### 6. WhatsApp Transport Boundary

WhatsApp URL generation belongs to transport logic.

Rules:
- always use encodeURIComponent
- do not manually build URL in other files
- do not duplicate encoding logic

---

## Modification Guidelines

### Adding a new field

1. Update HTML input
2. Extract in form.js
3. Validate in input-validator.js (if required)
4. Add to message-composer.js
5. Format in message-formatter.js

---

### Changing message format

ONLY modify:

message-formatter.js

---

### Changing validation rules

ONLY modify:

input-validator.js

---

### Changing UI behavior

Modify:
- app.js
- HTML / CSS

---

### Changing WhatsApp behavior

Modify ONLY:
- whatsapp-url.js

---

## What NOT to Do

- Do not introduce frameworks (React, Vue, etc.)
- Do not add backend logic in this repo (unless explicitly requested)
- Do not duplicate message formatting logic
- Do not mix UI and business logic
- Do not convert this into a full system or platform
- Do not introduce unnecessary abstractions

---

## Performance Expectations

- preview update < 100ms
- smooth with ~20 items
- minimal DOM updates

---

## Output Integrity Rule

The same message string must be used for:

- preview display
- copy message
- WhatsApp link

No divergence allowed.

---

## Current Constraints

- static frontend only
- no backend
- no persistent vendor system yet
- config-driven product list
- single vendor (current implementation)

---

## Future Direction (Do Not Implement Unless Asked)

- vendor registration
- database / persistence layer
- multi-vendor routing
- hosted backend (e.g., Supabase)

These must NOT be introduced unless explicitly required.

---

## K-01 Governance Principle

A reusable node may originate from a specific system lineage, but is not restricted to that lineage.

This Application may consume reusable nodes (Very Small, Small) without redefining them.

---

## Decision Priority

When unsure, prefer:

- simpler solution
- fewer files
- explicit logic
- minimal abstraction

---

## Agent Behavior Rule

Do not optimize for architecture.

Optimize for:
- correctness
- clarity
- maintainability
- user flow integrity

---

## Agent and Task Structure

Agent definitions are stored in:

docs/agents/

Task execution files are stored in:

docs/tasks/

Rules:

- docs/agents/ contains reusable agent protocols (e.g., release-governor)
- docs/tasks/ contains execution instances (e.g., release-v0.1.3)
- docs/TASKS.md remains the single source of truth for backlog

Execution priority:

AGENT.md → CONSTRAINTS.md → DECISIONS.md → ROADMAP.md → docs/TASKS.md → docs/tasks/* → NOTES.md

Do not treat docs/tasks/ as backlog.
Do not implement tasks unless defined in docs/TASKS.md or explicitly instructed.

---

## Planning File Priority

Use planning documents in this order:

1. AGENT.md
2. CONSTRAINTS.md
3. DECISIONS.md
4. ROADMAP.md
5. docs/TASKS.md
6. NOTES.md

Rules:
- ROADMAP.md defines approved direction
- TASKS.md defines executable work
- NOTES.md contains raw ideas and unapproved planning
- do not implement items from NOTES.md unless they are also reflected in TASKS.md or explicitly requested

---

## Summary

This is a **small, focused Application**, not a platform.

Goal:

→ fast, reliable structured WhatsApp ordering

NOT:

→ system architecture expansion