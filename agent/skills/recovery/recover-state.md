# RECOVER STATE

## Purpose

Reconstruct a correct and consistent runtime state (`agent/state/*`) from authoritative sources.

This skill ensures that:

- state aligns with actual repo truth
- no false task or release status persists
- execution can resume safely after interruption or inconsistency

This skill does NOT modify:

- `docs/TASKS.md`
- `docs/RELEASE.md`
- `CHANGELOG.md`

It rebuilds state only.

---

## When to use

Use this skill when:

- `agent/state/*` is missing, stale, or corrupted
- state contradicts TASKS, RELEASE, or CHANGELOG
- repo is reopened after interruption
- execution context is unclear
- escalation requires state repair

Do NOT use this skill when:

- state is already valid and consistent
- task execution is ongoing without issues

---

## Inputs

Required inputs:

- `docs/TASKS.md`
- `docs/RELEASE.md` (if exists)
- `CHANGELOG.md` (if exists)

Optional inputs:

- `agent/state/*` (for comparison only)
- `agent/logs/*` (supporting evidence only)

---

## Allowed reads

- `docs/SOURCE-OF-TRUTH.md`
- `docs/CONTROL-PLANE.md`
- `docs/TASKS.md`
- `docs/RELEASE.md`
- `CHANGELOG.md`
- existing `agent/state/*`
- `agent/logs/*` (supporting only)

---

## Allowed writes

- `agent/state/current-mode.md`
- `agent/state/current-task.md`
- `agent/state/current-release.md`
- `agent/state/current-focus.md`
- `agent/logs/decisions-log.md`

Do NOT modify:

- any authoritative docs
- implementation files

---

## Steps

### 1. Enter recovery mode

Set:

- `agent/state/current-mode.md` → `recovery`

Set focus:

```md
focus: rebuild runtime state from authoritative sources
scope: TASKS + RELEASE + CHANGELOG
status: active
last_updated: <timestamp>
````

---

### 2. Validate authoritative sources

Confirm availability and integrity of:

* `docs/TASKS.md`
* `docs/RELEASE.md` (if exists)
* `CHANGELOG.md` (if exists)

If any are missing or severely inconsistent:

```text
STOP → REPORT → REQUIRE MANUAL FIX
```

Do NOT reconstruct from incomplete truth.

---

### 3. Reconstruct current task state

From `docs/TASKS.md`:

Determine:

* if a task is currently active
* if a task is in-review
* if all tasks are complete

Rules:

* prefer tasks marked `active` or `in-review`
* if multiple candidates exist → ambiguity → escalate
* if none active → set `none`

Write:

```md
task_id: <id | none>
title: <title | none>
status: <active | in-review | blocked | none>
source_path: docs/TASKS.md
last_updated: <timestamp>
```

---

### 4. Reconstruct release state

From `docs/RELEASE.md` and `CHANGELOG.md`:

Determine:

* if a release is in preparation
* if a release is ready
* if a release has been completed (via changelog)

Rules:

* `CHANGELOG.md` defines released truth
* if version exists in changelog → `released`
* if in RELEASE.md but not in changelog → use RELEASE status
* if no release context → `none`

Write:

```md
version: <version | none>
status: <preparing | audit | ready | released | none>
related_tasks:
  - <task-id>
last_updated: <timestamp>
```

---

### 5. Reconstruct mode

Determine mode from reconstructed state:

#### Priority:

1. recovery (current step)
2. release-prep (if release is active and not released)
3. audit (if task is in-review)
4. task-execution (if task is active)
5. governance (if structural work likely)
6. orientation (default fallback)

Rules:

* choose the safest non-destructive mode
* do NOT jump directly into execution unless clearly appropriate

Write:

```md
mode: <resolved-mode>
last_updated: <timestamp>
note: recovered from authoritative sources
```

---

### 6. Reconstruct focus

Create a short operational focus:

Examples:

```md
focus: continue task T-101 execution
scope: src/checkout + tests/checkout
status: active
```

or

```md
focus: prepare release validation
scope: docs/RELEASE.md + TASKS.md
status: active
```

Rules:

* must be short
* must reflect real next step
* must not be narrative

---

### 7. Validate reconstructed state

Check:

* task aligns with TASKS.md
* release aligns with RELEASE.md / CHANGELOG.md
* mode is consistent with task/release state
* no contradictions remain

If inconsistency remains:

* do NOT finalize
* escalate

---

### 8. Write reconstructed state

Overwrite all state files:

* `current-mode.md`
* `current-task.md`
* `current-release.md`
* `current-focus.md`

State must be:

* minimal
* consistent
* current-only

---

### 9. Log recovery action

Append to `agent/logs/decisions-log.md`:

```md
- <timestamp> recovered runtime state from TASKS, RELEASE, and CHANGELOG
```

---

## Stop conditions

Stop successfully when:

* all state files are reconstructed
* state aligns with authoritative sources
* no contradictions remain
* execution can safely resume

---

## Failure conditions

This skill fails if:

* authoritative sources are missing
* multiple conflicting truths exist
* task state cannot be resolved
* release state cannot be determined

If failure occurs:

* stop
* report exact ambiguity
* recommend minimal manual fix

---

## Output artifacts

Primary outputs:

* updated `agent/state/*`

Secondary outputs:

* appended `agent/logs/decisions-log.md`

---

## Quality rules

Recovered state must be:

* derived only from strong sources
* minimal and clean
* free of assumptions
* consistent across all files

This skill must NOT:

* invent tasks
* infer completion from logs
* assume release status
* preserve stale or conflicting state
* skip validation

---

## Anti-patterns

Do NOT:

* reuse old state blindly
* trust logs over TASKS
* assume most recent action defines state
* guess active task from partial evidence
* reconstruct state from memory files

---

## Relationship to system rules

This skill enforces:

```text
TASKS → RELEASE → CHANGELOG → STATE
```

and ensures:

```text
state is always derived from truth
```

State must never become an independent truth source.

---

## Objective

Restore a safe, consistent runtime state that allows execution to continue without:

* ambiguity
* contradiction
* stale context

No guessing.
No drift.
No corrupted state.
