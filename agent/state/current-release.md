# CURRENT RELEASE

## Purpose

Define the currently active release pointer for this repository.

This file points to release truth in `docs/RELEASE.md` and released truth in `CHANGELOG.md`.

It does NOT define released truth by itself.

---

## Schema

focus: bootstrap local repo runtime layer
scope: repository initialization
status: active
last_updated: 2026-04-20 00:00

---

## Status Meaning

- `none`
  - no active release context exists

- `preparing`
  - release candidate is being assembled or validated

- `audit`
  - release candidate is under final verification

- `ready`
  - release candidate is valid and ready for changelog finalization
  - NOT yet released

- `released`
  - corresponding changelog entry exists
  - released truth must be backed by `CHANGELOG.md`

- `blocked`
  - release cannot proceed safely

---

## Rules

- overwrite only
- must align with `docs/RELEASE.md`
- `released` must never be used unless `CHANGELOG.md` confirms released truth
- if `CHANGELOG.md` does not contain the version, release is NOT complete
- state must not define release completion independently

---

## Example (bootstrap)

```md
version: none
status: none
related_tasks: []
last_updated: 2026-04-19 09:00