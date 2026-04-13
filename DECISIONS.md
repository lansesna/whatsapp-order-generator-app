# DECISIONS.md

## Purpose

This document records key architectural and product decisions for the WhatsApp Order Generator Application.

These decisions are considered **locked** unless explicitly revised.

---

## 1. Application Identity

Decision:

This repository is a **user-facing Application** under:

/60-applications/whatsapp-order-generator/

It is NOT:

- a Very Small tool
- a Small module
- a Medium system
- a platform layer

---

## 2. Product Model

Decision:

The product is defined as:

→ a vendor-configured WhatsApp order page

Core flow:

Vendor → shares page → Buyer submits order → WhatsApp message sent

---

## 3. Static-First Strategy

Decision:

The application will follow a **static-first delivery approach**.

Reason:
- fastest iteration
- lowest cost risk
- simplest deployment
- suitable for early validation

---

## 4. Persistence Evolution Path

Decision:

Persistence will be introduced gradually:

1. static frontend (current)
2. local/embedded persistence
3. hosted backend (only after evaluation)

Reason:
- avoid premature backend complexity
- avoid unpredictable cloud costs
- understand real usage before scaling

---

## 5. Technology Stack Decision

Decision:

The application uses:

- HTML
- CSS
- Vanilla JavaScript

Reason:
- minimal complexity
- no build step
- easy deployment
- fast iteration

---

## 6. Node Consumption Model (K-01)

Decision:

Applications may directly consume reusable nodes.

This Application consumes:

- Very Small tools (e.g., WhatsApp Message Generator)

Rules:

- nodes remain reusable
- nodes are NOT redefined inside the Application
- Application composes nodes, not rebuilds them

---

## 7. Very Small Tool Independence

Decision:

Reusable nodes (Very Small tools) are independent of their original lineage.

Example:

- WhatsApp Message Generator may be derived from a larger system
- but remains reusable across multiple Applications

---

## 8. Message Formatting Ownership

Decision:

Final message generation is owned by:

js/message-formatter.js

Rules:

- this is the single source of truth
- no duplicate message formatting logic is allowed

---

## 9. Transport Responsibility

Decision:

WhatsApp transport logic is conceptually owned by a Very Small tool.

Current state:

- implemented locally in whatsapp-url.js

Future:

- may be extracted or replaced by external reusable node

---

## 10. Separation of Concerns

Decision:

Strict responsibility separation is enforced:

- form.js → input extraction
- input-validator.js → validation
- message-composer.js → data structure
- message-formatter.js → message output
- whatsapp-url.js → transport
- app.js → orchestration

---

## 11. Application Simplicity Principle

Decision:

The application prioritizes:

- simplicity
- clarity
- speed of delivery

Over:

- abstraction
- extensibility
- system-level design

---

## 12. Feature Scope Decision

Decision:

The application is limited to:

→ structured WhatsApp order generation and delivery

It will NOT expand into:

- order management system
- payment platform
- CRM
- marketplace

---

## 13. Vendor-Buyer Model

Decision:

The product uses a two-role model:

Vendor:
- defines shop and products
- shares page

Buyer:
- fills order
- sends WhatsApp message

---

## 14. Local Implementation Trade-off

Decision:

Some logic may remain locally implemented even if conceptually reusable.

Reason:
- faster development
- reduced complexity in early stage

Extraction to reusable nodes happens only when justified.

---

## 15. Cost Control Strategy

Decision:

Avoid early dependency on:

- paid services
- usage-based billing systems

Reason:
- maintain cost predictability
- prevent unexpected charges

---

## 16. Agent Governance Model

Decision:

Agent behavior must follow:

AGENT.md → CONSTRAINTS.md → DECISIONS.md → ROADMAP.md → TASKS.md → NOTES.md

Reason:
- ensure controlled and predictable development
- prevent scope drift

---

## 17. Default Decision Rule

Decision:

When unsure:

- choose simpler implementation
- avoid adding dependencies
- avoid introducing new layers
- prefer explicit over abstract

---

## Summary

These decisions define:

- what the product is
- how it evolves
- how it is built
- how reusable nodes are used

They must be respected across all development.