# CURRENT MODE

## Purpose

Define the currently active runtime mode for this repository.

This file is a runtime pointer only.

It does NOT define truth and must remain minimal.

---

## Schema

mode: audit
last_updated: 2026-04-21 15:22
note: changelog update for v0.1.7 unreleased

---

## Rules

- exactly one mode must be active
- overwrite only
- no history
- no narrative explanation
- note must remain short and operational

---

## Allowed Values

- `orientation`
- `governance`
- `task-execution`
- `audit`
- `release-prep`
- `recovery`

---

## Example

```md
mode: task-execution
last_updated: 2026-04-19 14:20
note: implementing active task
