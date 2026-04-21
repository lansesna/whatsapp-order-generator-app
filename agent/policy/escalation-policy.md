# ESCALATION POLICY

## Purpose

Define when the agent must:

- stop execution
- report issues
- request clarification
- enter recovery mode

This prevents:

- unsafe assumptions
- silent errors
- corrupted repo state
- invalid task or release execution

---

## Scope

Applies to all operations:

- governance
- task execution
- audit
- release preparation
- recovery

---

## 1. Core Rule

```text
when uncertain → STOP, do not guess
````

The agent MUST NOT continue with partial or assumed context.

---

## 2. Escalation Triggers

The agent MUST escalate when ANY of the following occur:

---

### A. Missing Required State

* `agent/state/*` missing or incomplete
* cannot determine:

  * mode
  * task
  * release

Action:

```text
STOP → REPORT MISSING STATE → REQUEST FIX
```

---

### B. Unclear Mode or Role

* mode not defined
* role does not match mode
* conflicting signals

Action:

```text
STOP → REQUEST MODE/ROLE CLARIFICATION
```

---

### C. Missing Task for Execution

* user requests implementation
* no valid task in `docs/TASKS.md`

Action:

```text
BLOCK EXECUTION → REQUEST TASK DEFINITION
```

---

### D. Conflicting Truth Sources

Examples:

* TASKS.md ≠ state
* RELEASE.md ≠ CHANGELOG.md
* logs contradict structured docs

Action:

```text
FOLLOW AUTHORITY HIERARCHY → REPORT CONFLICT → DO NOT OVERWRITE
```

---

### E. Invalid Execution Chain

Violation of:

```text
NOTES → TASK → RELEASE → CHANGELOG → VERSION
```

Examples:

* executing from NOTES
* updating CHANGELOG without release
* declaring release without audit

Action:

```text
BLOCK → EXPLAIN CHAIN VIOLATION
```

---

### F. Restricted File Modification

Attempt to modify:

* CONTROL-PLANE.md
* SOURCE-OF-TRUTH.md
* AGENT.md
* CODEX.md
* primary.agent.md

Without proper mode/intent

Action:

```text
STOP → CONFIRM INTENT → REQUIRE GOVERNANCE CONTEXT
```

---

### G. Cross-Repo Operation

* writing outside current repo
* unclear target repo

Action:

```text
STOP → REQUIRE EXPLICIT TARGET + SCOPE
```

---

### H. Insufficient Evidence

* attempting to mark:

  * task complete
  * release complete

Without sufficient proof

Action:

```text
DOWNGRADE CONFIDENCE → DO NOT FINALIZE → REQUEST VALIDATION
```

---

### I. Ambiguous Instructions

User request is:

* vague
* incomplete
* multi-interpretation

Action:

```text
STOP → ASK CLARIFYING QUESTIONS
```

---

### J. Output Generation Failure

* cannot produce full output
* missing required inputs
* partial computation

Action:

```text
STOP → REPORT FAILURE → DO NOT WRITE OUTPUT
```

---

## 3. Escalation Actions

When escalation is triggered, agent must choose ONE:

### A. STOP + REPORT

Use when:

* missing required data
* invalid state
* blocked execution

---

### B. STOP + ASK

Use when:

* ambiguity exists
* clarification is possible

---

### C. BLOCK OPERATION

Use when:

* rule violation detected
* unsafe write attempt

---

### D. ENTER RECOVERY MODE

Use when:

* system state is inconsistent
* multiple conflicts exist
* execution context is broken

---

## 4. Recovery Mode Entry Conditions

Enter Recovery Mode when:

* state contradicts TASKS.md
* release contradicts CHANGELOG.md
* multiple escalation triggers occur
* repo context is unclear

Recovery Mode MUST:

* read authoritative sources
* rebuild consistent state
* avoid writing until resolved

---

## 5. Confidence Handling

When certainty is low:

* do NOT assume correctness
* do NOT finalize outputs
* clearly label uncertainty

Example:

```text
status: uncertain
reason: conflicting task and state signals
```

---

## 6. Forbidden Behavior

The agent MUST NOT:

* guess missing data
* silently resolve conflicts
* proceed with unclear scope
* assume task or release completion
* override higher authority sources
* continue after escalation without resolution

---

## 7. Escalation Output Format

When escalating, agent MUST provide:

* issue type
* detected condition
* affected files/scope
* recommended next action

Example:

```text
Escalation: Missing Task

- condition: execution requested without valid task
- required: define task in docs/TASKS.md
- action: blocking execution
```

---

## 8. Interaction Rule

Escalation is NOT failure.

It is:

```text
controlled pause for correctness
```

The agent should:

* be precise
* be minimal
* avoid unnecessary verbosity

---

## 9. Relationship to Other Policies

* `write-policy.md`
  → blocks unsafe writes

* `tool-policy.md`
  → defines access scope

* `output-policy.md`
  → controls output behavior

This policy defines:

```text
when execution must stop
```

---

## 10. Objective

Ensure all operations are:

* safe
* validated
* unambiguous

No guessing.
No silent correction.
No unsafe continuation.