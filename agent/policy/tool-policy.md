# TOOL POLICY

## Purpose

Define strict access boundaries for repository operations.

This policy controls:

- what may be read
- what may be written
- what scope is considered valid
- when the agent must stop instead of guessing

It exists to prevent:

- cross-repo corruption
- unnecessary repo scanning
- misuse of weak signals
- unsafe execution outside current scope

---

## Scope

Applies to all repository operations performed by the agent.

Includes:

- file reads
- file writes
- repo scanning
- state access
- log access
- doc access
- task/release inspection

---

## 1. Default Access Model

```text
read-local, write-local
````

Meaning:

* this repository is the default read scope
* this repository is the only default write scope
* no cross-repo access is assumed

---

## 2. Read Rules

### Allowed by default

The agent MAY read:

* `docs/*`
* `agent/state/*`
* `agent/memory/*`
* `agent/logs/*`
* `src/*`
* `tests/*`
* `scripts/*`
* root repo files (`README.md`, `CHANGELOG.md`, `AGENT.md`, `CODEX.md`)

Only when relevant to current mode, role, or task.

---

### Required read priority

Read in this order where applicable:

1. `docs/SOURCE-OF-TRUTH.md`
2. `docs/CONTROL-PLANE.md`
3. `AGENT.md`
4. `CODEX.md`
5. `agent/state/*`
6. `docs/TASKS.md`
7. `docs/RELEASE.md`
8. core repo docs
9. `CHANGELOG.md`
10. `agent/logs/*` only if needed

---

### Minimal read rule

The agent MUST:

* read only what is necessary
* stop reading when enough information is available
* avoid full-repo scans unless explicitly justified

The agent MUST NOT:

* scan the whole repo by default
* read unrelated areas “just in case”
* rely on broad file search before reading structured truth sources

---

## 3. Write Rules

### Allowed by default

The agent MAY write only inside this repository and only when current mode and role permit it.

See `write-policy.md` for detailed write behavior.

---

### Forbidden by default

The agent MUST NOT:

* write outside this repository
* modify sibling repos
* modify parent workspace repos
* perform hidden cross-repo edits

Cross-repo write requires:

1. explicit instruction
2. explicit target repo
3. explicit scope
4. valid local mode/role alignment

---

## 4. Restricted Paths

These paths are restricted and must be treated carefully:

* `docs/CONTROL-PLANE.md`
* `docs/SOURCE-OF-TRUTH.md`
* `AGENT.md`
* `CODEX.md`
* `.github/agents/primary.agent.md`
* `.github/copilot-instructions.md`

Rules:

* do not edit casually
* do not edit during normal task execution
* edit only in valid governance context

---

## 5. Sensitive / Non-Operational Paths

The agent MUST treat these as non-normal targets:

* `.git/*`
* environment/secret files
* credential files
* deployment secrets
* machine-specific config unrelated to current task

Rules:

* do not read unless required
* do not modify unless explicitly instructed
* do not expose sensitive values in outputs

---

## 6. Truth Access Rules

The agent MUST distinguish strong vs weak signals.

### Strong sources

* `docs/TASKS.md`
* `docs/RELEASE.md`
* `CHANGELOG.md`
* core repo docs
* `docs/SOURCE-OF-TRUTH.md`

### Weak sources

* `agent/state/*`
* `agent/logs/*`
* partial notes
* open IDE tabs
* inferred context

Rules:

* strong sources override weak sources
* weak sources may guide reading, but not define final truth
* logs are evidence only
* state is pointer only

---

## 7. IDE / Workspace Signal Rules

The agent MUST treat IDE behavior as weak hints only.

Examples of weak hints:

* open tabs
* active editor file
* recently viewed files

Rules:

* do not switch task from tabs alone
* do not switch mode from tabs alone
* do not infer repo truth from editor context alone

Authoritative repo truth must come from structured files.

---

## 8. Task Access Rules

Before execution work, the agent MUST read:

* `docs/TASKS.md`
* relevant state files

The agent MUST NOT:

* implement from NOTES alone
* execute based on vague instruction without task grounding
* invent task scope

If task truth is unclear:

```text
STOP → REPORT → REQUEST CLARIFICATION
```

---

## 9. Release Access Rules

Before release-related work, the agent MUST read:

* `docs/RELEASE.md`
* `CHANGELOG.md`
* relevant task truth

The agent MUST NOT:

* claim release from state alone
* claim release from logs alone
* update changelog without release context

---

## 10. Cross-Repo Rules

Default local repo posture:

```text
this repo only
```

If another repo is mentioned:

* treat it as external context
* do not assume access is allowed
* do not write there by default

If multi-repo action is requested:

* confirm explicit scope
* treat current repo as primary unless instructed otherwise
* do not propagate changes automatically

---

## 11. Recovery Access Rules

In Recovery Mode, the agent MAY read:

* state
* task docs
* release docs
* logs

Only to restore clarity.

Recovery Mode does NOT allow:

* speculative fixes
* broad rewrites
* cross-repo exploration by default

---

## 12. Failure Behavior

If any of the following occur:

* scope unclear
* repo target unclear
* truth conflict unresolved
* required source missing
* restricted path touched without justification

Then:

```text
STOP → REPORT → DO NOT PROCEED
```

No silent workaround.

---

## 13. Objective

Ensure all repository access is:

* bounded
* intentional
* minimal
* safe
* aligned with source-of-truth rules

No uncontrolled reads.
No hidden cross-repo writes.
No reliance on weak signals as truth.