# CONVENTIONS

## Purpose

Store stable, reusable conventions that define how this repository operates.

These conventions:

- guide execution behavior
- reduce ambiguity in tasks and releases
- provide continuity across sessions
- improve consistency between runs

This file contains durable patterns, not temporary decisions.

---

## Scope

Applies to:

- task creation and execution
- audit behavior
- release preparation
- changelog updates
- documentation structure
- agent interaction patterns

---

## 1. Execution Chain

This repository strictly follows:

NOTES → TASK → EXECUTION → AUDIT → RELEASE → CHANGELOG → VERSION

Rules:

- execution MUST start from TASK, not NOTES
- audit MUST occur before release preparation
- release MUST be prepared before changelog update
- CHANGELOG defines released truth

---

## 2. Task Conventions

- tasks must be atomic and bounded
- each task represents one clear responsibility
- task completion is defined ONLY in `docs/TASKS.md`
- task completion must be verified via audit
- tasks must include explicit success criteria

Avoid:

- vague tasks (e.g. “improve system”)
- multi-scope tasks
- mixing execution and release work

---

## 3. Execution Conventions

- execute strictly within task scope
- do not expand scope without explicit task update
- prefer minimal changes over broad refactors
- read only necessary files (minimal read rule)
- do not use logs as truth

---

## 4. Audit Conventions

- audit is independent from execution
- audit verifies success criteria, not effort
- audit failure must not be downgraded
- incomplete work must remain `active` or `blocked`

---

## 5. Release Conventions

- release includes only audited, complete tasks
- release scope must be explicit in `docs/RELEASE.md`
- release preparation must validate cross-task consistency
- release readiness must not be assumed

---

## 6. Changelog Conventions

- CHANGELOG contains released truth only
- no speculative or incomplete entries allowed
- each version must map to a valid release
- entries must be concise and factual

---

## 7. State Conventions

- state is a pointer, not a source of truth
- state must always align with TASKS / RELEASE / CHANGELOG
- state is overwrite-only
- state must remain minimal and current-only

---

## 8. Logging Conventions

- logs are append-only
- logs record actions, not truth
- logs must be concise and timestamped
- logs must not contain reasoning or conclusions

---

## 9. Decision Conventions

- decisions must be recorded in `decisions-log`
- only stable decisions should move into memory
- decisions must be concise and scoped

---

## 10. Documentation Conventions

- policy files define constraints only
- skills define procedures only
- docs define system structure only
- no duplication across layers
- avoid ambiguous wording

---

## 11. Output Conventions

- outputs are snapshots (overwrite-only)
- outputs must be fully displayed in chat
- outputs must be deterministic
- no partial or incremental output files

---

## 12. Conflict Handling

- follow truth hierarchy:

CHANGELOG > RELEASE > TASKS > STATE > LOGS

- do not merge conflicting truths
- resolve using `resolve-conflict` skill
- do not guess

---

## 13. Recovery Conventions

- state must be rebuilt from authoritative sources
- do not reuse stale state blindly
- prefer recovery over assumption
- use `recover-state` when uncertain

---

## 14. Interaction Conventions

- prefer explicit commands over vague instructions
- validate before execution
- stop on ambiguity
- explain minimal necessary context

---

## 15. Quality Principles

All work in this repo must be:

- deterministic
- minimal
- auditable
- consistent
- aligned with system rules

---

## 16. Anti-Patterns

Avoid:

- executing without a task
- marking completion without audit
- releasing without changelog update
- using logs as truth
- expanding scope silently
- mixing multiple concerns in one step

---

## Objective

Provide a stable behavioral baseline for consistent execution, audit, and release processes.

These conventions reduce friction, prevent ambiguity, and ensure long-term maintainability.