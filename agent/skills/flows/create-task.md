# CREATE TASK

## Purpose

Create one valid, bounded, executable task in `docs/TASKS.md`.

This skill exists to convert validated understanding into an execution-ready unit of work.

It ensures that execution begins only from a clear task, not from vague intent, raw notes, or assumptions.

---

## When to use

Use this skill when:

- a new implementation unit needs to be defined
- notes or decisions are clear enough to become executable
- existing work must be split into smaller atomic tasks
- a release candidate requires missing task formalization

Do NOT use this skill when:

- the input is still conceptual
- the input is still exploratory
- the work is not yet bounded
- the request is only to discuss, analyze, or brainstorm

---

## Inputs

Required inputs:

- `docs/NOTES.md`
- `docs/TASKS.md`

Optional inputs:

- `docs/DECISIONS.md`
- `docs/CONSTRAINTS.md`
- repo-specific core docs
- validated user instruction

---

## Allowed reads

- `docs/SOURCE-OF-TRUTH.md`
- `docs/CONTROL-PLANE.md`
- `docs/NOTES.md`
- `docs/TASKS.md`
- `docs/DECISIONS.md`
- `docs/CONSTRAINTS.md`
- repo-specific core docs

Read only what is necessary to define the task correctly.

---

## Allowed writes

- `docs/TASKS.md`
- `agent/state/current-mode.md`
- `agent/state/current-task.md`
- `agent/logs/task-run-log.md` (optional, short entry only)

Do NOT write to:

- `src/*`
- `tests/*`
- `scripts/*`
- `docs/RELEASE.md`
- `CHANGELOG.md`

This skill defines work only. It does not execute work.

---

## Steps

### 1. Confirm task creation is appropriate

Check that the input is suitable for task creation.

A task may be created only if the intended work is:

- executable
- bounded
- atomic
- verifiable

If the input is still vague or exploratory:

- stop
- request clarification or additional notes
- do not create the task

---

### 2. Read the minimum required context

Read:

- `docs/NOTES.md`
- `docs/TASKS.md`

Then read additional context only if needed:

- `docs/DECISIONS.md`
- `docs/CONSTRAINTS.md`
- repo-specific docs

Do not over-read the repo.

---

### 3. Identify the smallest valid execution unit

Define exactly one task.

The task must represent:

- one responsibility
- one coherent change unit
- one verifiable outcome

Reject tasks that mix multiple unrelated actions.

Heuristic:
- if the title or scope naturally contains multiple separate deliverables, split it

---

### 4. Validate atomicity and scope

Before writing the task, confirm:

- it can be completed without hidden sub-projects
- it does not mix implementation and release work
- it does not mix unrelated code and documentation goals
- it has clear non-scope boundaries

If atomicity fails:

- split into smaller tasks
- create only one task at a time unless explicitly instructed otherwise

---

### 5. Define the task using mandatory structure

Write the task in `docs/TASKS.md` using this structure:

```md
## TASK-ID: <TASK-ID>

### Title
<short, precise action>

### Scope
<exact boundary of this task>

### Input
<what this task receives>

### Process
<what must be done>

### Output
<what must be produced>

### Success Criteria
<how to verify completion>

### Non-Scope
<what is explicitly excluded>

### Dependencies
<required prior tasks or conditions>
````

Do not omit sections.

Do not write vague tasks.

---

### 6. Ensure task language is execution-safe

The task text must be:

* precise
* non-ambiguous
* implementation-relevant
* verifiable

Avoid:

* “improve”
* “optimize”
* “clean up”
* “fix things”
* “support future work”

unless strictly bounded and measurable.

---

### 7. Check for task duplication or conflict

Before finalizing, verify that the new task does not:

* duplicate an active task
* conflict with an existing task
* contradict repo constraints or core docs

If duplication or conflict exists:

* stop
* report it
* do not write overlapping task definitions

---

### 8. Update runtime state

After writing the task:

* set `agent/state/current-mode.md` to `governance` or `orientation` if task creation only
* optionally set `agent/state/current-task.md` to the new task if it is intended to become the active next task

Do NOT switch to execution automatically unless explicitly instructed.

---

### 9. Optionally append a short log entry

If logging is used:

Append a short entry to `agent/logs/task-run-log.md`, for example:

```md
- 2026-04-19 14:20 created task T-101 for checkout flow implementation
```

This is optional and must stay factual.

---

## Stop conditions

Stop successfully when:

* one valid task is written into `docs/TASKS.md`
* task structure is complete
* task is atomic, bounded, and verifiable
* runtime state is aligned

---

## Failure conditions

This skill fails if any of the following are true:

* input is too vague
* work is still conceptual
* scope is too broad
* task duplicates existing work
* task contradicts core repo docs
* required source context is missing
* task cannot be made verifiable

If failure occurs:

* do not create the task
* report the reason clearly
* recommend the minimum clarification needed

---

## Output artifacts

Primary output:

* updated `docs/TASKS.md`

Secondary outputs:

* updated `agent/state/current-task.md` (optional if intentionally set active)
* updated `agent/state/current-mode.md`
* appended `agent/logs/task-run-log.md` entry (optional)

---

## Quality rules

A valid task created by this skill must be:

* atomic
* executable
* verifiable
* bounded
* aligned with repo truth

The task must NOT:

* act as a release unit
* act as a concept note
* act as a changelog entry
* embed multiple unrelated deliverables

---

## Anti-patterns

Do NOT create tasks like:

* “improve checkout flow”
* “refactor validation and update release docs”
* “build full dashboard”
* “investigate architecture”
* “prepare future extensibility”

These are vague, mixed-scope, or non-executable.

---

## Relationship to system rules

This skill enforces:

```text
NOTES → TASK → RELEASE → CHANGELOG → VERSION
```

It exists to protect the TASK boundary.

No implementation may begin from NOTES alone.