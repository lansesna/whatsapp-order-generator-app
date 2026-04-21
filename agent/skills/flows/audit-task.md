# AUDIT TASK

## Purpose

Independently verify whether a task is truly ready to be marked complete.

This skill exists to validate:

- task scope fulfillment
- success criteria satisfaction
- consistency between implementation and repo truth
- absence of unresolved contradictions

It prevents premature completion and protects downstream release quality.

---

## When to use

Use this skill when:

- implementation work for a task is believed to be finished
- `agent/state/current-task.md` is `in-review`
- task completion must be validated before finalizing status
- release preparation depends on task completion

Do NOT use this skill when:

- task work has not actually started
- task scope is still clearly incomplete
- release audit is the real next step
- task truth is missing or unclear

---

## Inputs

Required inputs:

- `docs/TASKS.md`
- `agent/state/current-task.md`
- relevant implementation files
- relevant tests or validation artifacts

Optional inputs:

- `docs/DECISIONS.md`
- `docs/CONSTRAINTS.md`
- `docs/NOTES.md`
- `agent/logs/task-run-log.md`
- repo-specific core docs

---

## Allowed reads

- `docs/SOURCE-OF-TRUTH.md`
- `docs/CONTROL-PLANE.md`
- `docs/TASKS.md`
- `agent/state/current-mode.md`
- `agent/state/current-task.md`
- `agent/state/current-release.md`
- repo-specific core docs
- relevant implementation files
- relevant tests
- `agent/logs/task-run-log.md` only as supporting evidence

Read only what is necessary to verify task truth.

---

## Allowed writes

- `docs/TASKS.md`
- `agent/state/current-mode.md`
- `agent/state/current-task.md`
- `agent/state/current-focus.md`
- `agent/logs/task-run-log.md`
- optional audit output doc if the repo defines one

Do NOT write to:

- `src/*`
- `tests/*`
- `scripts/*`
- `docs/RELEASE.md`
- `CHANGELOG.md`

This skill verifies work. It does not implement fixes or finalize release artifacts.

---

## Steps

### 1. Confirm audit is appropriate

Before starting, verify that:

- the task exists in `docs/TASKS.md`
- the task is the current audit target
- the task is in a state suitable for audit (`in-review` preferred, `active` allowed if explicitly requested)
- execution work is materially present

If any of these fail:

- stop
- report the issue
- do not perform audit

---

### 2. Resolve task truth first

Read `docs/TASKS.md` and `agent/state/current-task.md`.

Use `docs/TASKS.md` as task truth.

Confirm:

- task identity
- scope
- success criteria
- non-scope
- dependencies

If task truth is unclear or contradictory:

- stop
- report the ambiguity
- do not infer completion

---

### 3. Switch runtime state to audit

Set:

- `agent/state/current-mode.md` → `audit`
- `agent/state/current-focus.md` → short bounded audit focus
- `agent/state/current-task.md` remains aligned to the audited task

Example focus:

```md
focus: audit checkout flow implementation against task success criteria
scope: docs/TASKS.md + src/checkout + tests/checkout
status: active
last_updated: 2026-04-19 16:10
````

State updates must remain minimal and current-only.

---

### 4. Read the minimum verification surface

Read only what is required to verify the task:

1. task definition in `docs/TASKS.md`
2. relevant implementation files
3. relevant tests or validation artifacts
4. repo-specific docs if needed for behavioral interpretation
5. logs only if helpful for traceability

Do NOT:

* scan unrelated features
* expand into release audit
* treat logs as completion proof

---

### 5. Check scope fulfillment

Verify that implementation actually matches the task scope.

Confirm:

* required work exists
* no mandatory part of scope is missing
* the task did not drift into unrelated areas
* non-scope boundaries were respected

If scope is partially fulfilled:

* do not mark complete
* keep task as `active` or `blocked`
* report what remains

---

### 6. Check success criteria

Verify task success criteria explicitly.

Use:

* tests
* observable behavior
* code/doc alignment
* defined outcomes from the task

A task may be marked complete only if success criteria are satisfied.

If success criteria are vague or untestable:

* fail the audit
* report that the task definition needs correction
* do not finalize completion

---

### 7. Check contradictions and unresolved failures

Look for any unresolved contradiction such as:

* task says complete but behavior still fails
* state suggests completion but tests do not support it
* logs claim done but scope is incomplete
* edge cases remain broken
* dependencies are unmet

If unresolved failure exists:

* task is NOT complete
* prefer `blocked` if the failure prevents safe continuation
* prefer `active` if more implementation work is clearly required

Do not downgrade a real defect into a note.

---

### 8. Decide audit result

Choose exactly one result:

#### A. Pass

Use only if:

* scope fulfilled
* success criteria satisfied
* no unresolved contradiction exists

Recommended follow-up:

* mark task `complete` in `docs/TASKS.md`
* update `agent/state/current-task.md` to `complete`

#### B. Pass with notes

Use only if:

* task is complete
* minor non-blocking observations exist
* observations do not invalidate success criteria

Recommended follow-up:

* mark task `complete`
* record notes separately if needed

#### C. Fail

Use if:

* scope incomplete
* success criteria unsatisfied
* contradiction exists
* blocking defect remains

Recommended follow-up:

* keep task `active` or set `blocked`
* return to execution instead of release prep

---

### 9. Update task truth and runtime state

If audit passes:

* update `docs/TASKS.md` to reflect `complete`
* update `agent/state/current-task.md` to `complete`
* update `agent/state/current-focus.md` to complete or next logical focus

If audit fails:

* do NOT mark complete
* set `agent/state/current-task.md` to `active` or `blocked`
* update focus accordingly

Recommended default if audit fails due to implementation gap:

* `active`

Recommended default if audit fails due to external blocker or unresolved dependency:

* `blocked`

---

### 10. Append a short audit log entry

Append a factual entry to `agent/logs/task-run-log.md`.

Examples:

```md
- 2026-04-19 16:30 audited T-101 → pass
- 2026-04-19 16:35 audited T-101 → fail; nested null case still unresolved
```

Keep log entries factual.
Do not use logs as the only place audit truth exists.

---

## Stop conditions

Stop successfully when one of these is true:

* task audit passes and task truth is updated
* task audit passes with notes and task truth is updated
* task audit fails and task remains active or blocked
* audit cannot proceed because required truth is missing and this is clearly reported

---

## Failure conditions

This skill fails if:

* task is missing
* task truth is unclear
* success criteria are not auditable
* required implementation context is missing
* contradiction cannot be resolved
* audit would require implementation changes instead of verification

If failure occurs:

* do not mark task complete
* report the exact reason
* recommend the minimum corrective action

---

## Output artifacts

Primary outputs:

* updated `docs/TASKS.md`
* updated `agent/state/current-task.md`

Secondary outputs:

* updated `agent/state/current-mode.md`
* updated `agent/state/current-focus.md`
* appended `agent/logs/task-run-log.md`

Optional outputs:

* short audit summary in a repo-defined audit note file if such a file exists

---

## Quality rules

Task audit performed by this skill must be:

* independent of implementation enthusiasm
* evidence-based
* aligned with task truth
* honest about unresolved defects
* strict about completion claims

This skill must NOT:

* implement fixes
* rewrite scope to fit existing implementation
* mark completion from logs alone
* begin release prep
* update `CHANGELOG.md`

---

## Anti-patterns

Do NOT:

* treat “looks done” as completion
* accept log statements as completion proof
* ignore broken edge cases because the main path works
* mark complete just because code changed
* silently reinterpret vague success criteria
* collapse `in-review` into `complete`

---

## Relationship to system rules

This skill enforces:

```text
NOTES → TASK → RELEASE → CHANGELOG → VERSION
```

and protects the boundary between:

```text
execution completion ≠ task completion
task completion ≠ release readiness
```

Task completion must be independently validated before downstream release work proceeds.
