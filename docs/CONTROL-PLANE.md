# CONTROL PLANE — LOCAL REPOSITORY

## Purpose

Define the runtime execution flow for this repository.

This document governs:

- startup sequence
- mode transitions
- validation gates
- execution flow
- verification flow
- output flow

It defines how work is performed, not just what is true.

---

## 1. Scope

This is a single-repo execution environment.

Default assumptions:

- active repo = this repository
- read scope = this repository
- write scope = this repository
- cross-repo actions are out of normal scope

---

## 2. Execution Pipeline

All work MUST follow this pipeline:

```text
INITIALIZE → RESOLVE → READ → VALIDATE → EXECUTE → VERIFY → OUTPUT → PERSIST
````

No stage may be skipped.

---

## 3. Stage Definitions

### 3.1 INITIALIZE

Load control-layer documents in this order:

1. `docs/SOURCE-OF-TRUTH.md`
2. `docs/CONTROL-PLANE.md`
3. `AGENT.md`
4. `CODEX.md`

Purpose:

* establish authority
* establish execution rules
* establish behavioral constraints

---

### 3.2 RESOLVE

Load runtime state:

* `agent/state/current-mode.md`
* `agent/state/current-task.md`
* `agent/state/current-release.md`
* `agent/state/current-focus.md` if present

Resolve:

* current mode
* current role
* current task pointer
* current release pointer
* current focus

If required state is missing or invalid:

* stop
* enter recovery path or require fix

---

### 3.3 READ

Read only the minimum task/release context required.

Operational priority:

1. `docs/TASKS.md`
2. `docs/RELEASE.md`
3. core repo docs if needed
4. `CHANGELOG.md` if release context is relevant
5. `agent/logs/*` only if supporting evidence is needed

Rules:

* minimal read only
* no full-repo scan by default
* no reliance on logs before strong sources

---

### 3.4 VALIDATE

Before execution, validate:

* mode is correct
* role matches mode
* task exists if implementation work is requested
* release state is valid if release work is requested
* current scope is local and permitted
* execution chain is intact

If any validation fails:

* block action
* report exact reason

---

### 3.5 EXECUTE

Execute only work permitted by current mode.

* Governance / Doc Mode → structure and documentation refinement
* Task Execution Mode → implementation from valid task
* Audit Mode → independent verification
* Release Prep Mode → release candidate preparation
* Recovery Mode → state/context repair only

Rules:

* no mixed modes
* no scope expansion by convenience
* no release finalization during execution mode

---

### 3.6 VERIFY

After execution, verify consistency against authoritative sources.

Check:

* implementation aligns with task scope
* task status is still valid
* release scope is still valid
* no contradiction exists across task, release, changelog, and state

If mismatch exists:

* do not finalize
* downgrade result or block next step

---

### 3.7 OUTPUT

Produce only valid outputs for the current stage.

Examples:

* task truth updates in `docs/TASKS.md`
* release candidate updates in `docs/RELEASE.md`
* summary outputs if explicitly requested

Rules:

* outputs are snapshots
* overwrite output artifacts
* display output in chat
* do not write `CHANGELOG.md` except through valid changelog skill

---

### 3.8 PERSIST

Persist runtime artifacts according to layer rules:

* state → overwrite
* logs → append
* memory → selective update

Rules:

* state must remain current and minimal
* logs must remain factual and chronological
* memory must only store durable understanding

---

## 4. Mode Control

Exactly one mode must be active:

* Orientation Mode
* Governance / Doc Mode
* Task Execution Mode
* Audit Mode
* Release Prep Mode
* Recovery Mode

Default startup mode:

```text
Orientation Mode
```

---

## 5. Mode Transitions

### Orientation → Governance / Doc

When:

* refining docs
* clarifying structure
* preparing rules

### Governance / Doc → Task Execution

When:

* a valid task exists and execution is intended

### Task Execution → Audit

When:

* implementation block is complete and verification is required

### Audit → Release Prep

When:

* task completion is validated and release work is appropriate

### Release Prep → Orientation

When:

* release candidate is either finalized for next stage or deferred

### Any → Recovery

When:

* state is missing
* contradictions exist
* context is broken

---

## 6. Role Alignment

| Mode             | Role           |
| ---------------- | -------------- |
| Orientation      | Mamat governor |
| Governance / Doc | Mamat governor |
| Task Execution   | Mamat engineer |
| Audit            | Mamat auditor  |
| Release Prep     | Mamat governor |
| Recovery         | Mamat governor |

Rules:

* exactly one active role
* role must match mode
* mismatch blocks action

---

## 7. Execution Chain Enforcement

This repository strictly follows:

```text
NOTES → TASK → EXECUTION → AUDIT → RELEASE → CHANGELOG → VERSION
```

Enforcement rules:

* no execution from NOTES
* no audit skipping
* no release prep from incomplete tasks
* no changelog update without valid release readiness
* no version claim without changelog-backed release

---

## 8. Truth Reconciliation

Use:

```text
CHANGELOG > RELEASE > TASKS > STATE > LOGS
```

Additional rule:

```text
core repo docs > TASKS when domain intent conflicts
```

Meaning:

* logs never win
* state never becomes truth
* changelog defines actual release

---

## 9. Failure Handling

If any of these occur:

* missing required truth source
* invalid mode/role
* broken execution chain
* unresolved contradiction
* unclear scope

Then:

```text
STOP → REPORT → DO NOT PROCEED
```

No silent workaround.

---

## 10. Output Discipline

All outputs follow:

```text
state  → overwrite
output → overwrite
logs   → append
memory → selective update
```

Outputs MUST:

* be deterministic
* reflect current truth only
* not mix historical state

---

## 11. Minimal Loop

All operations follow:

```text
read → validate → decide → execute → verify → output
```

This loop must never be skipped.

---

## 10. Objective

Ensure all operations in this repository are:

* structured
* deterministic
* auditable
* bounded
* safe

No uncontrolled execution.
No truth drift.
No broken chain.