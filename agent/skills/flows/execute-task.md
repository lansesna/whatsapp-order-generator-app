# EXECUTE TASK

## Purpose

Execute one valid task from `docs/TASKS.md` inside this repository.

This skill exists to perform bounded engineering work safely and deterministically.

It ensures that implementation:

- starts from a valid task
- stays within scope
- respects repo truth
- updates runtime state correctly
- does not claim completion prematurely

---

## When to use

Use this skill when:

- a valid task already exists in `docs/TASKS.md`
- implementation work is ready to begin
- the current session should move into active execution

Do NOT use this skill when:

- no valid task exists
- the work is still conceptual
- the work is only documentation/governance refinement
- release preparation is the real next step
- current state or task truth is unclear

---

## Inputs

Required inputs:

- `docs/TASKS.md`
- `agent/state/current-task.md`
- repo-specific core docs
- relevant implementation files

Optional inputs:

- `docs/DECISIONS.md`
- `docs/CONSTRAINTS.md`
- `docs/NOTES.md`
- existing tests related to the task

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
- `docs/DECISIONS.md` and `docs/CONSTRAINTS.md` if needed

Read only what is necessary for the task.

---

## Allowed writes

- `src/*`
- `tests/*`
- `scripts/*`
- task-relevant repo docs
- `agent/state/current-mode.md`
- `agent/state/current-task.md`
- `agent/state/current-focus.md`
- `agent/logs/task-run-log.md`

Do NOT write to:

- `docs/RELEASE.md`
- `CHANGELOG.md`
- cross-repo files
- restricted governance files unless explicitly part of task scope

---

## Steps

### 1. Confirm execution is allowed

Before any implementation work, verify:

- the task exists in `docs/TASKS.md`
- task status is valid for execution
- task scope is clear
- task does not conflict with core repo docs
- current repo is the correct local execution environment

If any of these fail:

- stop
- report the issue
- do not execute

---

### 2. Resolve the active task

Read `docs/TASKS.md` and `agent/state/current-task.md`.

Confirm that the task to execute is:

- explicitly defined
- bounded
- aligned with repo truth

If `agent/state/current-task.md` is stale or contradictory:

- use `docs/TASKS.md` as task truth
- update state only after truth is resolved

---

### 3. Switch runtime state to execution

Set:

- `agent/state/current-mode.md` → `task-execution`
- `agent/state/current-task.md` → active task
- `agent/state/current-focus.md` → short bounded focus for this execution block

Example focus:

```md
focus: implement checkout validation path
scope: src/checkout + tests/checkout
status: active
last_updated: 2026-04-19 14:20
````

State updates must be minimal and current-only.

---

### 4. Read minimum implementation context

Read only the files necessary to perform the task safely.

Priority:

1. task definition
2. relevant repo docs
3. relevant implementation files
4. relevant tests

Do NOT:

* scan the whole repo
* read unrelated features
* expand scope “for convenience”

---

### 5. Execute strictly within task scope

Implement only what the task requires.

Allowed work includes:

* code changes directly tied to task scope
* test updates directly tied to task scope
* small supporting doc changes if needed for correctness

Do NOT:

* broaden scope
* add unrelated cleanup
* merge hidden refactors into the task
* start release work

If a genuine out-of-scope issue is discovered:

* stop execution expansion
* note it separately
* do not absorb it silently into current task

---

### 6. Verify changes against task success criteria

Check that the implemented work satisfies the task’s defined success criteria.

Use:

* task definition
* tests
* observable behavior
* repo truth docs if relevant

If success criteria are not clearly satisfied:

* do not claim completion
* keep task in active or blocked state
* report the gap

---

### 7. Update task-facing runtime state

After execution block:

* keep task `active` if more work remains
* set task to `in-review` if implementation is complete and audit should begin
* set task to `blocked` if execution cannot proceed safely

Do NOT set `complete` here unless your repo process explicitly allows execution skill to finalize post-verification. Recommended default:

```text
implementation complete → in-review
```

and let audit determine completion.

---

### 8. Update focus state

If execution continues later:

* keep `current-focus.md` active and current

If execution block ended:

* update focus to paused, blocked, or complete depending on actual state

Focus must remain short and operational.

---

### 9. Append a short execution log entry

Append a factual entry to `agent/logs/task-run-log.md`.

Example:

```md
- 2026-04-19 15:10 executed T-101 checkout validation path in src/checkout and tests/checkout
```

Keep logs factual.
Do not write authority claims such as “task complete” unless separately validated and aligned with task truth.

---

## Stop conditions

Stop successfully when one of these is true:

* the current execution block is complete and task remains active
* implementation is complete and task is ready for audit
* execution is blocked and state reflects that
* task scope cannot proceed without clarification

---

## Failure conditions

This skill fails if:

* task is missing
* task scope is unclear
* task contradicts repo truth
* execution requires forbidden scope expansion
* state cannot be reconciled with task truth
* required files are missing
* implementation cannot be verified against success criteria

If failure occurs:

* do not continue implementation
* report the reason clearly
* recommend the minimum corrective action

---

## Output artifacts

Primary outputs:

* implementation changes in `src/*`, `tests/*`, or `scripts/*`

Secondary outputs:

* updated `agent/state/current-mode.md`
* updated `agent/state/current-task.md`
* updated `agent/state/current-focus.md`
* appended `agent/logs/task-run-log.md`

Optional outputs:

* small task-relevant doc updates if directly required by the task

---

## Quality rules

Execution performed by this skill must be:

* task-bounded
* local-only
* verifiable
* minimal in read scope
* honest about completion state

This skill must NOT:

* create new tasks implicitly
* trigger release implicitly
* update changelog
* treat logs as completion truth
* broaden scope without explicit approval

---

## Anti-patterns

Do NOT:

* execute from NOTES alone
* fix “nearby” unrelated issues casually
* refactor unrelated areas while implementing
* mark task complete from code changes alone
* start release prep just because implementation finished
* update `CHANGELOG.md` from execution mode

---

## Relationship to system rules

This skill enforces:

```text
NOTES → TASK → RELEASE → CHANGELOG → VERSION
```

It exists to protect the execution boundary.

Execution may begin only from a valid task.
Execution completion does not automatically equal release readiness.