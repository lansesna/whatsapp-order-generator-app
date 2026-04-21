# TRUTH POLICY

## Purpose

Define how truth must be interpreted and applied during execution.

This policy ensures:

- correct use of authoritative sources
- proper handling of weak vs strong signals
- no invalid completion or release claims
- no truth corruption from logs or assumptions

---

## Scope

Applies to all operations involving:

- task execution
- audit
- release preparation
- completion claims
- output generation

---

## 1. Core Principle

```text
strong signals define truth
weak signals guide context only
````

---

## 2. Signal Classification

### A. Strong signals (authoritative)

* `docs/TASKS.md`
* `docs/RELEASE.md`
* `CHANGELOG.md`
* core repo docs (PRODUCT / SYSTEM / ARCHITECTURE / MODULE)
* `docs/SOURCE-OF-TRUTH.md`

These define:

* execution truth
* release truth
* system intent

---

### B. Weak signals (supporting)

* `agent/state/*`
* `agent/logs/*`
* partial notes
* IDE/editor context
* inferred information

These may:

* guide investigation
* help reconstruct context

These MUST NOT:

* define completion
* define release
* override strong sources

---

## 3. Task Truth Rules

Primary source:

```text
docs/TASKS.md
```

Rules:

* task completion MUST be defined here
* logs cannot mark tasks complete
* state cannot override task status
* execution MUST align with task definition

---

## 4. Release Truth Rules

Primary source:

```text
docs/RELEASE.md
```

Rules:

* release must reference completed tasks
* release must pass validation/audit
* release state must not be assumed from state or logs

---

## 5. Released Truth Rules

Primary source:

```text
CHANGELOG.md
```

Rules:

* only finalized releases appear here
* changelog implies release completion
* absence from changelog = not released

---

## 6. State Usage Rules

Source:

```text
agent/state/*
```

Rules:

* state is a pointer only
* state reflects current position
* state may be stale or incorrect
* state MUST NOT override TASKS or RELEASE

---

## 7. Log Usage Rules

Source:

```text
agent/logs/*
```

Rules:

* logs are evidence only
* logs describe what happened, not what is true
* logs MUST NOT:

  * mark tasks complete
  * define release status
  * override structured docs

---

## 8. Conflict Resolution

Apply the following rules:

### A. Task conflicts

```text
TASKS.md > state > logs
```

---

### B. Release conflicts

```text
RELEASE.md > state > logs
```

---

### C. Release vs changelog

```text
CHANGELOG.md > RELEASE.md
```

Meaning:

* release-ready ≠ released
* changelog defines release completion

---

### D. Architecture vs task

```text
Core Docs > TASKS.md
```

Meaning:

* invalid tasks must be corrected
* implementation must follow system design

---

## 9. Completion Rules

A task is complete ONLY if:

* marked complete in `docs/TASKS.md`
* no contradictions exist
* validation is satisfied

---

A release is complete ONLY if:

* `docs/RELEASE.md` finalized
* `CHANGELOG.md` updated
* no conflicting signals remain

---

## 10. Forbidden Truth Usage

The agent MUST NOT:

* treat logs as completion truth
* treat state as authoritative truth
* infer completion without TASKS update
* infer release without CHANGELOG update
* override strong sources with weak signals
* combine multiple weak signals to form truth

---

## 11. Uncertainty Handling

If truth cannot be determined:

```text
STOP → REPORT → DO NOT ASSUME
```

The agent MUST:

* downgrade confidence
* explicitly state uncertainty
* request clarification when needed

---

## 12. Truth Integrity Rule

At all times:

```text
truth must be consistent across:
- TASKS
- RELEASE
- CHANGELOG
- state (pointer)
```

If inconsistency exists:

* do not resolve silently
* escalate or enter recovery

---

## 13. Objective

Ensure all decisions are:

* based on authoritative sources
* consistent across repo artifacts
* resistant to weak-signal corruption

No false completion.
No false release.
No inferred truth from logs or state.