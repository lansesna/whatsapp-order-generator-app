# SOURCE OF TRUTH — LOCAL REPOSITORY

## Purpose

Define the authority model for all information in this repository.

This document determines:

- which sources are authoritative
- how truth is interpreted
- how conflicts are resolved
- how completion and release are validated

This file is the highest authority for truth resolution in this repository.

---

## 1. Scope

This applies to this repository only.

It governs:

- execution truth
- release truth
- released truth
- runtime state interpretation
- log interpretation

---

## 2. Authority Hierarchy

Use this hierarchy when resolving conflicts between sources:

1. `docs/SOURCE-OF-TRUTH.md`
2. `docs/CONTROL-PLANE.md`
3. core repo docs
4. `docs/TASKS.md`
5. `docs/RELEASE.md`
6. `CHANGELOG.md`
7. `agent/state/*`
8. `agent/memory/*`
9. `agent/logs/*`

Rules:

- higher authority overrides lower authority
- lower authority may support interpretation but must not redefine stronger truth
- logs never override structured documents

---

## 3. Core Repo Docs

Core repo docs define structural and domain truth.

Examples by repo type:

- application:
  - `PRODUCT.md`
  - `FLOW.md`
  - `DATA_MODEL.md`
- large:
  - `SYSTEM.md`
  - `ARCHITECTURE.md`
- medium:
  - `ARCHITECTURE.md`
  - `MODULES.md`
- small / very-small:
  - `MODULE.md`
  - `TOOL.md`

Rules:

- these define intended system behavior and boundaries
- task execution must align with them
- if a task contradicts core repo docs, the task must be corrected

---

## 4. Execution Truth

Primary source:

```text
docs/TASKS.md
````

Defines:

* task scope
* task status
* success criteria

Rules:

* `docs/TASKS.md` is the only source of task completion truth
* logs cannot mark tasks complete
* state cannot override task truth
* execution must originate from a defined task

---

## 5. Release Truth

Primary source:

```text
docs/RELEASE.md
```

Defines:

* release candidate scope
* included tasks
* release readiness

Rules:

* release must reference valid completed tasks
* release preparation does NOT equal release completion
* release readiness must not be inferred from logs or state

---

## 6. Released Truth

Primary source:

```text
CHANGELOG.md
```

Defines:

* actual released versions
* released changes

Rules:

* `CHANGELOG.md` is the ONLY source of released truth
* absence from changelog = not released
* `docs/RELEASE.md` alone cannot define a completed release

---

## 7. Runtime State

Primary source:

```text
agent/state/*
```

Defines:

* current mode
* current task pointer
* current release pointer
* current focus

Rules:

* state is a pointer, not truth
* state may be stale
* state must be validated against stronger sources
* state cannot override TASKS, RELEASE, or CHANGELOG

---

## 8. Memory

Primary source:

```text
agent/memory/*
```

Defines:

* durable understanding
* conventions
* stable decisions
* structural awareness

Rules:

* memory supports execution
* memory must not redefine authoritative truth
* memory must not duplicate TASKS / RELEASE / CHANGELOG unnecessarily

---

## 9. Logs

Primary source:

```text
agent/logs/*
```

Defines:

* chronological activity
* execution trace
* decision trace

Rules:

* logs are evidence only
* logs cannot define completion
* logs cannot define release
* logs cannot override stronger sources

---

## 10. Conflict Resolution Rules

### A. Task conflicts

```text
docs/TASKS.md > agent/state/* > agent/logs/*
```

---

### B. Release conflicts

```text
docs/RELEASE.md > agent/state/* > agent/logs/*
```

---

### C. Released truth conflicts

```text
CHANGELOG.md > docs/RELEASE.md > agent/state/* > agent/logs/*
```

---

### D. Domain intent conflicts

```text
core repo docs > docs/TASKS.md
```

Meaning:

* tasks must conform to system intent
* do not reinterpret system design to fit a bad task

---

## 11. Weak vs Strong Signals

### Strong signals

* `docs/SOURCE-OF-TRUTH.md`
* core repo docs
* `docs/TASKS.md`
* `docs/RELEASE.md`
* `CHANGELOG.md`

### Weak signals

* `agent/state/*`
* `agent/logs/*`
* partial notes
* inferred context

Rules:

* strong signals override weak signals
* weak signals may guide investigation but cannot define truth
* multiple weak signals do NOT equal a strong signal

---

## 12. Completion Rules

A task is complete ONLY if:

* `docs/TASKS.md` marks it complete
* success criteria are satisfied
* no contradiction exists

A release is complete ONLY if:

* `docs/RELEASE.md` defines a valid release candidate
* `CHANGELOG.md` contains the version entry
* no conflict exists across sources

---

## 13. Missing Data Rule

If required truth is missing:

* do NOT assume
* do NOT infer completion or release
* do NOT invent state

Instead:

```text
STOP → REPORT → REQUEST CLARIFICATION
```

---

## 14. Invalid State Handling

If:

* state contradicts `docs/TASKS.md`
* logs contradict `docs/TASKS.md`
* release contradicts changelog

Then:

* ignore the weaker source
* follow authority hierarchy
* downgrade confidence if needed
* do NOT silently correct truth without explicit recovery flow

---

## 15. Objective

Ensure truth in this repository is:

* explicit
* hierarchical
* non-contradictory
* resistant to weak-signal corruption
* deterministic and auditable

No false completion.
No false release.
No truth from logs.
No silent assumptions.