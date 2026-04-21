# CURRENT TASK

## Purpose

Define the currently active task pointer for this repository.

This file points to task truth in `docs/TASKS.md`.

It does NOT define task truth by itself.

---

## Schema

task_id: none
title: no pending task in current sequence
status: none
source_path: docs/TASKS.md
last_updated: 2026-04-20 16:20

---

## Status Meaning

- `none`
  - no active task pointer exists

- `active`
  - task is currently being executed

- `in-review`
  - implementation work is done enough to require audit
  - task is NOT yet complete

- `blocked`
  - task cannot proceed safely or correctly

- `complete`
  - task completion has been validated and task truth is aligned

---

## Rules

- overwrite only
- must align with `docs/TASKS.md`
- if conflict exists, `docs/TASKS.md` wins
- `in-review` must not be treated as `complete`
- `complete` should normally be reached only after audit validation

---

## Example (bootstrap)

```md
task_id: none
title: none
status: none
source_path: docs/TASKS.md
last_updated: 2026-04-19 09:00
