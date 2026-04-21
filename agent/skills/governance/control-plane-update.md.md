# CONTROL PLANE UPDATE

## Purpose

Safely update core governance documents that define repository behavior.

This skill is used to modify:

- `docs/CONTROL-PLANE.md`
- `docs/SOURCE-OF-TRUTH.md`
- (optionally) `AGENT.md`
- (optionally) `CODEX.md`

It ensures:

- no accidental rule drift
- no contradiction with existing system laws
- updates are intentional, minimal, and validated

---

## When to use

Use this skill when:

- execution flow needs refinement
- mode transitions need correction
- truth hierarchy needs adjustment
- governance rules are incomplete or inconsistent
- system-level improvements are required

Do NOT use this skill when:

- implementing features
- executing tasks
- preparing releases
- making ad-hoc or temporary changes

---

## Inputs

Required inputs:

- target document (`CONTROL-PLANE.md` or `SOURCE-OF-TRUTH.md`)
- explicit reason for change

Optional inputs:

- `docs/TASKS.md`
- `docs/RELEASE.md`
- `agent/memory/*`
- prior governance decisions

---

## Allowed reads

- `docs/SOURCE-OF-TRUTH.md`
- `docs/CONTROL-PLANE.md`
- `AGENT.md`
- `CODEX.md`
- relevant policy files
- relevant skills (for consistency)

Read only what is needed to ensure consistency.

---

## Allowed writes

- `docs/CONTROL-PLANE.md`
- `docs/SOURCE-OF-TRUTH.md`
- `AGENT.md` (optional)
- `CODEX.md` (optional)
- `agent/state/current-mode.md`
- `agent/state/current-focus.md`
- `agent/logs/decisions-log.md`

Do NOT write to:

- `src/*`
- `tests/*`
- `docs/TASKS.md`
- `docs/RELEASE.md`
- `CHANGELOG.md`

---

## Steps

### 1. Confirm governance context

Verify:

- current mode should be `governance`
- update is intentional and explicitly requested
- change is structural, not operational

If not:

```text
STOP → REQUIRE GOVERNANCE CONTEXT
````

---

### 2. Identify exact change scope

Define precisely:

* which file is being updated
* which section is affected
* what behavior is changing

Do NOT proceed with vague changes.

---

### 3. Validate necessity

Confirm that the change:

* solves a real issue
* improves clarity, safety, or consistency
* does not duplicate existing rules
* is not already covered elsewhere

If not necessary:

* stop
* reject change

---

### 4. Check for conflicts

Before modifying, verify that the change does NOT:

* contradict `SOURCE-OF-TRUTH.md`
* contradict `CONTROL-PLANE.md`
* contradict `CODEX.md`
* violate policy files
* break execution chain

If conflict exists:

* stop
* report conflict
* do not modify

---

### 5. Apply minimal modification

Make the smallest possible change to achieve the goal.

Rules:

* do not rewrite entire document unnecessarily
* preserve existing structure
* preserve formatting consistency
* avoid introducing new ambiguity

---

### 6. Validate updated document

After modification, verify:

* document is internally consistent
* no duplicated rules introduced
* no contradiction with other governance files
* execution flow remains valid

If validation fails:

* revert change
* report issue

---

### 7. Update runtime state

Set:

* `agent/state/current-mode.md` → `governance`
* update `agent/state/current-focus.md` to reflect governance update

Example:

```md
focus: refine control-plane mode transition rules
scope: docs/CONTROL-PLANE.md
status: active
last_updated: 2026-04-19 19:10
```

---

### 8. Log decision

Append to `agent/logs/decisions-log.md`:

```md
- 2026-04-19 updated CONTROL-PLANE.md to clarify mode transition from audit to release-prep
```

Log must be:

* factual
* concise
* non-redundant

---

## Stop conditions

Stop successfully when:

* target document is updated
* change is minimal and precise
* no inconsistencies remain
* decision is logged

---

## Failure conditions

This skill fails if:

* change is unclear or unjustified
* change conflicts with existing governance rules
* change introduces ambiguity
* required documents are missing
* validation cannot be completed

If failure occurs:

* do not modify documents
* report exact issue
* suggest corrected approach

---

## Output artifacts

Primary output:

* updated governance document (`CONTROL-PLANE.md` or `SOURCE-OF-TRUTH.md`)

Secondary outputs:

* updated `agent/state/current-mode.md`
* updated `agent/state/current-focus.md`
* appended `agent/logs/decisions-log.md`

---

## Quality rules

Governance updates must be:

* minimal
* precise
* justified
* reversible in intent
* consistent with system laws

This skill must NOT:

* introduce new execution flow without validation
* rewrite documents broadly without need
* duplicate rules across files
* override truth hierarchy
* change behavior silently

---

## Anti-patterns

Do NOT:

* casually rewrite control-plane logic
* mix governance updates with task execution
* introduce conflicting definitions
* expand scope beyond the stated change
* create multiple behavioral changes at once without clear separation

---

## Relationship to system rules

This skill governs:

```text
execution flow and truth hierarchy
```

It must preserve:

```text
NOTES → TASK → RELEASE → CHANGELOG → VERSION
```

and ensure all system behavior remains consistent and safe.

---

## Objective

Ensure governance changes are:

* controlled
* minimal
* consistent
* auditable

No accidental rule drift.
No silent behavior changes.
No contradiction across system layers.