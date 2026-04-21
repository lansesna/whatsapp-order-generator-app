# WRITE POLICY

## Purpose

Define strict rules for how files may be modified in this repository.

This policy ensures:
- deterministic behavior
- no unintended data corruption
- correct separation of truth layers

---

## Scope

Applies to ALL write operations performed by the agent.

Includes:

- code changes
- documentation updates
- state updates
- memory updates
- log writes
- generated outputs

---

## 1. Default Rule

```text
read-local, write-local
````

* only this repository may be modified
* no cross-repo writes unless explicitly instructed

---

## 2. File Behavior Rules

### A. State files

Path:

```text
agent/state/*
```

Rule:

```text
overwrite-only
```

Constraints:

* must contain current truth only
* must remain short and structured
* must not contain history or explanation

---

### B. Output artifacts

Examples:

* generated summaries
* audit outputs
* release summaries
* task summaries

Rule:

```text
overwrite-only (snapshot)
```

Constraints:

* recompute fully on each generation
* no partial updates
* no append behavior

---

### C. Log files

Path:

```text
agent/logs/*
```

Rule:

```text
append-only
```

Constraints:

* never rewrite or delete previous entries
* logs are chronological evidence only
* logs must not contain authoritative truth claims

---

### D. Memory files

Path:

```text
agent/memory/*
```

Rule:

```text
selective-update
```

Constraints:

* update only when durable knowledge changes
* do not rewrite entire file unless required
* do not duplicate TASKS / RELEASE / CHANGELOG content

---

## 3. Writable Zones

### Allowed by default

* `src/*`
* `tests/*`
* `scripts/*`
* `docs/*`
* `agent/state/*`
* `agent/memory/*`
* `agent/logs/*`

---

## 4. Restricted Zones

Require:

* correct mode
* correct role
* explicit intent

Restricted files:

* `docs/CONTROL-PLANE.md`
* `docs/SOURCE-OF-TRUTH.md`
* `AGENT.md`
* `CODEX.md`
* `.github/agents/primary.agent.md`
* `.github/copilot-instructions.md`

---

## 5. Forbidden Writes

The following are NOT allowed:

### A. Cross-repo writes

* modifying any other repository without explicit instruction

---

### B. Execution without task

* modifying `src/*` or `tests/*` without a valid task in `docs/TASKS.md`

---

### C. Changelog misuse

* updating `CHANGELOG.md` without valid release context

---

### D. Release misuse

* marking release complete without:

  * validated tasks
  * aligned `RELEASE.md`
  * updated `CHANGELOG.md`

---

### E. Truth override

* modifying authoritative docs based on:

  * logs
  * assumptions
  * partial context

---

## 6. Preconditions for Write

Before ANY write, the agent MUST validate:

1. mode is defined and valid
2. role matches mode
3. target file is within allowed scope
4. execution chain is respected
5. task exists (if implementation write)

If any check fails:

```text
BLOCK → REPORT → DO NOT WRITE
```

---

## 7. State Update Rules

State updates must be:

* intentional
* minimal
* aligned with TASKS / RELEASE

Rules:

* do not update state on every action
* do not infer state from logs
* do not silently correct state

---

## 8. Output Rules

When generating outputs:

### A. Write behavior

* overwrite target file

### B. Display behavior

* display full output in chat
* do not require manual file opening

### C. Update behavior

If output exists:

* recompute fully
* overwrite
* include delta summary:

  * what changed
  * what completed
  * what remains

---

## 9. Safety Enforcement

Before writing:

* validate scope
* validate authority
* validate execution chain
* validate mode + role

If uncertainty exists:

```text
STOP → ASK → DO NOT WRITE
```

---

## 10. Failure Behavior

If write conditions are violated:

* block the operation
* explain the violation
* suggest corrective action

Never proceed with partial confidence.

---

## 11. Objective

Ensure all writes in this repository are:

* controlled
* minimal
* traceable
* consistent with system rules

No uncontrolled mutation.
No implicit assumptions.
No broken execution chain.
