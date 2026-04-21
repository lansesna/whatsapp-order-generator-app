# REBUILD CONTEXT

## Purpose

Reconstruct a minimal, accurate working context for the current session.

This skill ensures that:

- the agent understands current task and release status
- execution can resume quickly without full repo scanning
- context is derived from authoritative sources
- no stale or assumed information is used

This skill is optimized for speed and correctness.

---

## When to use

Use this skill when:

- opening the repository in a new session
- switching focus after interruption
- starting work after a long gap
- context is unclear but state is not fully broken

Do NOT use this skill when:

- state is corrupted (use recover-state)
- conflicts exist (use resolve-conflict)
- deep audit is required

---

## Inputs

Required inputs:

- `docs/TASKS.md`
- `agent/state/*`

Optional inputs:

- `docs/RELEASE.md`
- `CHANGELOG.md`
- `docs/CONTROL-PLANE.md`
- `docs/SOURCE-OF-TRUTH.md`

---

## Allowed reads

- `agent/state/*` (primary fast path)
- `docs/TASKS.md`
- `docs/RELEASE.md` (if needed)
- `CHANGELOG.md` (if needed)
- minimal core docs only if required

Read must be:

- minimal
- targeted
- fast

---

## Allowed writes

- `agent/state/current-mode.md`
- `agent/state/current-focus.md`
- optional: `agent/logs/decisions-log.md`

Do NOT modify:

- `docs/TASKS.md`
- `docs/RELEASE.md`
- `CHANGELOG.md`
- implementation files

---

## Steps

### 1. Read existing state first

Read:

- `agent/state/current-mode.md`
- `agent/state/current-task.md`
- `agent/state/current-release.md`
- `agent/state/current-focus.md`

If state appears valid:

- use it as primary context
- do not rebuild unnecessarily

If state is missing or suspicious:

- proceed to rebuild from authoritative sources

---

### 2. Validate state against TASKS

Check:

- current task exists in `docs/TASKS.md`
- task status aligns with state
- no obvious contradiction

If mismatch:

- mark state as stale
- prepare to rebuild affected parts

---

### 3. Validate release context (if present)

If `current-release` exists:

Check:

- version exists in `docs/RELEASE.md` or `CHANGELOG.md`
- status aligns with release truth

If mismatch:

- mark release state as stale

---

### 4. Reconstruct minimal context (if needed)

Only rebuild missing or invalid parts:

#### A. Task context

From `docs/TASKS.md`:

- identify active or in-review task
- if none → set task to `none`

---

#### B. Release context

From `docs/RELEASE.md` and `CHANGELOG.md`:

- identify current release status
- if none → set to `none`

---

### 5. Determine working mode

Choose mode based on context:

Priority:

1. recovery (if major issue detected)
2. release-prep (if release active)
3. audit (if task in-review)
4. task-execution (if task active)
5. governance (if structural work implied)
6. orientation (default)

Do NOT assume execution mode without valid task.

---

### 6. Set minimal focus

Create a short focus statement:

Examples:

```md
focus: continue task T-101 checkout validation
scope: src/checkout + tests/checkout
status: active
````

or

```md
focus: prepare release validation
scope: docs/RELEASE.md
status: active
```

Rules:

* must be short
* must reflect next action
* must not include history

---

### 7. Validate final context

Ensure:

* task (if any) aligns with TASKS.md
* release (if any) aligns with RELEASE/CHANGELOG
* mode matches context
* no contradictions remain

If contradiction exists:

```text
STOP → recommend resolve-conflict
```

---

### 8. Update state (if changes occurred)

Overwrite only affected state files:

* `current-mode.md`
* `current-task.md`
* `current-release.md` (if needed)
* `current-focus.md`

Do NOT rewrite all files unnecessarily.

---

### 9. Output context summary

Provide a concise summary:

```text
Context Rebuilt

Mode: <mode>
Task: <task-id | none>
Release: <version | none>
Focus: <short focus>

Next Step:
- <recommended action>
```

Keep it minimal and actionable.

---

### 10. Optional log entry

Append to `agent/logs/decisions-log.md` if rebuild was significant:

```md
- <timestamp> rebuilt context from state and TASKS
```

---

## Stop conditions

Stop successfully when:

* context is clear and minimal
* state is aligned with authoritative sources
* next action is obvious

---

## Failure conditions

This skill fails if:

* TASKS.md is missing or unreadable
* state cannot be validated
* contradictions cannot be resolved
* required context cannot be determined

If failure occurs:

* stop
* recommend:

  * recover-state OR
  * resolve-conflict

---

## Output artifacts

Primary output:

* concise context summary (chat)

Secondary outputs:

* updated `agent/state/*` (if needed)
* optional log entry

---

## Quality rules

Context must be:

* minimal
* accurate
* derived from strong sources
* ready for execution

Avoid:

* over-reading
* over-explaining
* historical summaries

---

## Anti-patterns

Do NOT:

* scan entire repo
* reconstruct full history
* assume task from logs
* override TASKS with state
* jump into execution without validated context
* mix recovery with context rebuild

---

## Relationship to system rules

This skill ensures:

```text
fast and safe session startup
```

and supports:

```text
TASK → EXECUTION → AUDIT → RELEASE
```

without introducing drift.

---

## Objective

Provide a clean, minimal, and correct working context so execution can resume immediately.

No noise.
No drift.
No assumptions.