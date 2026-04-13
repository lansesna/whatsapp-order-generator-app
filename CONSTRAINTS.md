# CONSTRAINTS.md

## Purpose

This document defines hard constraints for the WhatsApp Order Generator Application.

These constraints must NOT be violated unless explicitly overridden.

---

## 1. Architecture Constraints

### Application Scope

This repository is an **Application** under:

/60-applications/

It must NOT:

- redefine reusable node responsibilities
- behave like a system layer (Medium / Small / Very Small)
- introduce platform-level abstractions

---

## 2. Technology Constraints

### Current Stack (LOCKED)

- HTML
- CSS
- Vanilla JavaScript

Rules:
- No frameworks (React, Vue, Angular, etc.)
- No build tools (Webpack, Vite, etc.)
- No TypeScript
- No component frameworks

---

## 3. Backend Constraints

### Current Phase: Static-First

The application must remain:

- frontend-only
- static deployable
- no required backend

Do NOT introduce:

- Node.js backend
- server-side rendering
- APIs
- cloud functions
- authentication systems

---

## 4. Database Constraints

### Current Phase

No persistent database is allowed.

Do NOT introduce:

- Supabase
- Firebase
- MongoDB
- PostgreSQL
- any hosted database

Allowed:
- browser localStorage (limited use only)

---

## 5. Cost Control Constraint

Avoid any implementation that introduces:

- unpredictable billing
- usage-based cost without control
- external service dependency

Reason:
- maintain cost predictability during early product stages

---

## 6. Node Usage Constraint (K-01 Governance)

This Application may consume reusable nodes.

Rules:

- Do NOT redefine Very Small tool logic inside the Application
- Do NOT duplicate reusable node responsibilities unnecessarily
- Respect boundaries between:
  - Application
  - Small modules
  - Very Small tools

---

## 7. WhatsApp Transport Constraint

WhatsApp transport logic must:

- be isolated (currently in whatsapp-url.js)
- use encodeURIComponent
- not be duplicated across files

This logic is conceptually owned by a Very Small node.

---

## 8. Complexity Constraint

The system must remain:

- simple
- understandable
- low abstraction

Avoid:

- deep abstraction layers
- over-modularization
- premature generalization
- "future-proofing" without real need

---

## 9. Performance Constraint

- preview generation must be near-instant (<100ms)
- UI must remain responsive
- DOM updates must be minimal

---

## 10. UI Constraint

- mobile-first design
- simple layout
- no complex UI frameworks

---

## 11. Planning Constraint

Planning documents must be used correctly:

Priority order:

1. AGENT.md
2. CONSTRAINTS.md
3. DECISIONS.md
4. ROADMAP.md
5. docs/TASKS.md
6. NOTES.md

Rules:

- NOTES.md is context only
- do NOT implement features from NOTES.md directly
- only implement tasks defined in TASKS.md or explicitly instructed

---

## 12. Feature Scope Constraint

This product must remain:

→ a vendor-configured WhatsApp order page

It must NOT become:

- e-commerce platform
- order management system
- CRM
- chatbot system
- marketplace

---

## 13. Evolution Constraint

Allowed evolution path:

1. static frontend
2. local/embedded persistence
3. hosted backend (only after evaluation)

Do NOT skip steps.

---

## 14. Modification Constraint

When making changes:

- modify only the correct file for the responsibility
- do not move logic across layers unnecessarily
- do not introduce new architecture without justification

---

## 15. Default Decision Rule

If uncertain, choose:

- simpler solution
- fewer files
- explicit logic
- no external dependency

---

## 16. Agent Structure Constraint

The following structure must be respected:

- docs/agents/ → reusable agent definitions
- docs/tasks/ → execution instances
- docs/TASKS.md → canonical backlog

Rules:

- do NOT duplicate tasks across TASKS.md and docs/tasks/
- do NOT treat docs/tasks/ as backlog
- do NOT modify agent definitions for single execution

---

## Summary

These constraints ensure:

- controlled complexity
- cost safety
- correct K-01 layering
- predictable agent behavior

All changes must respect these constraints.