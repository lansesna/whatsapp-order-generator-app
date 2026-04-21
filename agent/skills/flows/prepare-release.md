# PREPARE RELEASE

## Purpose

Prepare and validate a release candidate based on completed tasks.

This skill ensures that:

- only valid completed tasks are included
- release scope is clear and consistent
- no unresolved contradictions exist
- release readiness is determined safely

It does NOT finalize the release and does NOT update `CHANGELOG.md`.

---

## When to use

Use this skill when:

- one or more tasks are marked complete in `docs/TASKS.md`
- a release candidate is needed
- release readiness must be evaluated
- preparing for changelog update

Do NOT use this skill when:

- tasks are still active or in-review
- audit has not been performed
- release scope is unclear
- work is still being implemented

---

## Inputs

Required inputs:

- `docs/TASKS.md`
- `docs/RELEASE.md`
- `agent/state/current-release.md`

Optional inputs:

- `CHANGELOG.md`
- `agent/logs/task-run-log.md`
- repo-specific docs

---

## Allowed reads

- `docs/SOURCE-OF-TRUTH.md`
- `docs/CONTROL-PLANE.md`
- `docs/TASKS.md`
- `docs/RELEASE.md`
- `agent/state/current-release.md`
- `agent/state/current-task.md`
- `CHANGELOG.md` (for comparison only)
- `agent/logs/*` (supporting evidence only)

Read only what is required to determine release readiness.

---

## Allowed writes

- `docs/RELEASE.md`
- `agent/state/current-mode.md`
- `agent/state/current-release.md`
- `agent/state/current-focus.md`
- `agent/logs/release-log.md`

Do NOT write to:

- `CHANGELOG.md`
- `src/*`
- `tests/*`
- cross-repo files

---

## Steps

### 1. Confirm release preparation is appropriate

Verify:

- at least one task is marked `complete` in `docs/TASKS.md`
- tasks intended for release have passed audit
- no critical tasks remain in `active`, `blocked`, or `in-review` that must be part of this release

If conditions are not met:

- stop
- report missing prerequisites
- do not proceed

---

### 2. Determine release scope

Identify which tasks are part of this release.

Rules:

- include only tasks marked `complete`
- exclude tasks that:
  - are not validated
  - are incomplete
  - belong to future scope

If scope is unclear:

- stop
- request clarification
- do not guess inclusion

---

### 3. Validate task completeness integrity

For each task in scope:

Confirm:

- marked complete in `docs/TASKS.md`
- no contradictions exist with:
  - implementation
  - tests
  - known issues
- no dependency is missing

If any task fails validation:

- remove it from release scope OR
- fail release preparation

Do not include uncertain tasks.

---

### 4. Check cross-task consistency

Ensure:

- tasks do not conflict with each other
- no overlapping scope causes regression
- combined changes are logically consistent

If conflict exists:

- stop
- report inconsistency
- do not proceed

---

### 5. Check release vs changelog alignment

Read `CHANGELOG.md` (if exists):

- ensure tasks are not already released
- ensure no duplication of previously released changes

Rules:

- CHANGELOG defines released truth
- absence from changelog = not released

---

### 6. Define release candidate

Prepare `docs/RELEASE.md` with:

```md
## Version
<version identifier>

## Scope
- <task-id>: <title>
- <task-id>: <title>

## Summary
<concise description of release>

## Validation
- tasks audited
- no contradictions detected

## Status
preparing | audit | ready | blocked
````

---

### 7. Determine release status

Set release status based on validation:

#### A. preparing

* initial draft
* not fully validated

#### B. audit

* undergoing final verification

#### C. ready

* all checks passed
* safe to move to changelog

#### D. blocked

* unresolved issue exists

Rules:

* do not mark `ready` unless all checks pass
* do not mark `released` here

---

### 8. Update runtime state

Set:

* `agent/state/current-mode.md` → `release-prep`
* `agent/state/current-release.md` with:

  * version
  * status
  * related_tasks
* update `agent/state/current-focus.md`

Example:

```md
focus: prepare release v0.2.0 validation
scope: docs/RELEASE.md + TASKS.md
status: active
last_updated: 2026-04-19 17:30
```

---

### 9. Append release log entry

Append to `agent/logs/release-log.md`:

```md
- 2026-04-19 17:40 prepared release v0.2.0 with tasks T-101, T-102
```

Keep factual.

---

## Stop conditions

Stop successfully when:

* `docs/RELEASE.md` is updated
* release scope is clearly defined
* release status is correctly assigned
* runtime state reflects release preparation

---

## Failure conditions

This skill fails if:

* no valid completed tasks exist
* task completion is inconsistent
* task audit was skipped or invalid
* release scope is ambiguous
* cross-task conflicts exist
* changelog conflict exists
* required inputs are missing

If failure occurs:

* do not update release as ready
* set release state to `blocked` if applicable
* report exact issue and required fix

---

## Output artifacts

Primary outputs:

* updated `docs/RELEASE.md`

Secondary outputs:

* updated `agent/state/current-release.md`
* updated `agent/state/current-mode.md`
* updated `agent/state/current-focus.md`
* appended `agent/logs/release-log.md`

---

## Quality rules

Release preparation must be:

* task-driven
* audit-backed
* conflict-free
* explicitly scoped
* honest about readiness

This skill must NOT:

* assume completion from logs
* include incomplete tasks
* skip audit validation
* update `CHANGELOG.md`
* declare release final

---

## Anti-patterns

Do NOT:

* include tasks still in-review
* merge unrelated tasks casually
* mark release ready “because it looks fine”
* skip cross-task validation
* treat release-prep as release completion
* update changelog from this skill

---

## Relationship to system rules

This skill enforces:

```text
NOTES → TASK → RELEASE → CHANGELOG → VERSION
```

and protects:

```text
task completion ≠ release readiness
release readiness ≠ release completion
```

Release must pass this stage before any changelog update.