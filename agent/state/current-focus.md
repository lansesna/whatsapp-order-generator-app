# CURRENT FOCUS

## Purpose

Define the current execution focus for this repository.

This file exists to support:

- fast session resume
- bounded execution awareness
- minimal context rebuild

This file is NOT a task definition, log, or plan document.

---

## Schema

focus: <short focus statement>
scope: <bounded operational scope>
status: <active | paused | blocked | complete>
last_updated: <YYYY-MM-DD HH:MM>

---

## Status Meaning

- `active`
  - current focus is the live working focus

- `paused`
  - focus remains relevant but is not being worked right now

- `blocked`
  - focus cannot proceed safely

- `complete`
  - focus is finished and no longer active

---

## Rules

- overwrite only
- keep under 1–2 short lines of real content
- must be operational, not narrative
- must not duplicate `current-task.md`
- must not contain future plans or reasoning dumps

---

## Good Example

```md
focus: audit checkout validation completion
scope: docs/TASKS.md + src/checkout + tests/checkout
status: active
last_updated: 2026-04-19 16:05