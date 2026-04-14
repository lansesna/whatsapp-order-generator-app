# RELEASE.md

## Purpose

This document defines how releases are created, validated, and published for the WhatsApp Order Generator Application.

It ensures:

- consistent versioning
- correct release scope
- alignment between code, docs, and behavior
- safe agent-assisted release execution

---

## Release Principles

- releases must reflect actual repository state
- no release without completed tasks
- no release without governance audit
- no silent behavior change
- documentation must match implementation

---

## Release Trigger

A new version is created when:

- one or more tasks in `docs/TASKS.md` are completed
- implementation is stable and testable
- documentation is aligned with behavior
- a release task file is created in `docs/tasks/`

---

## Versioning Rules

### PATCH (0.1.x)

Used for:

- UX improvements
- small features
- bug fixes
- task completion
- documentation alignment
- production readiness improvements

Examples:

- remove redundant UI element
- improve interaction flow
- fix incorrect behavior
- improve feedback or usability

---

### MINOR (0.2.0)

Used for:

- new capabilities
- new flows
- structural feature additions

Examples:

- vendor routing
- multi-vendor support
- new interaction mode

---

### MAJOR (1.0.0)

Used for:

- stable production-ready system
- complete feature baseline
- validated real-world usage

---

## Release Flow

### Step 1 — Complete Tasks

Ensure tasks are marked done in:

```text
docs/TASKS.md
````

---

### Step 2 — Create Release Task File

Create:

```text
docs/tasks/release-vX.X.X.md
```

Include:

* version
* completed tasks
* additional scope
* audit notes

---

### Step 3 — Run Release Governor

Run:

```text
release-governor
```

Using:

```text
docs/agents/release-governor.md
```

Purpose:

* validate scope compliance
* validate architecture integrity
* validate task completion
* validate documentation alignment
* determine PASS / FAIL

---

### Step 4 — Update CHANGELOG

Update:

```text
CHANGELOG.md
```

Requirements:

* reflect actual changes only
* include completed tasks
* include relevant UX / behavior changes
* do NOT describe audit process

---

### Step 5 — Prepare Release Artifacts

Generate:

* release commit message
* release tag message
* release notes

Requirements:

* describe shipped product state
* not the audit process
* not phrased as docs-only work

---

### Step 6 — Commit

Example:

```bash
git add .
git commit -m "feat: finalize vX.X.X release with completed tasks and UX improvements"
```

---

### Step 7 — Tag

```bash
git tag -a vX.X.X -m "vX.X.X: <short release description>"
```

---

### Step 8 — Push

```bash
git push origin main
git push origin vX.X.X
```

---

## Release Validation Checklist

Before tagging, verify:

* application works after fresh load
* no console errors
* no broken UI interactions
* no outdated config values
* no dependency on dev-only behavior
* asset caching issues mitigated (if applicable)
* docs match actual behavior:

  * README.md
  * docs/FLOW.md
  * docs/SETUP.md
* TASKS.md reflects actual status

---

## Documentation Alignment Rules

The following must always be aligned:

| Area         | Must Match                  |
| ------------ | --------------------------- |
| README.md    | actual product behavior     |
| FLOW.md      | real interaction flow       |
| SETUP.md     | real deployment/setup       |
| TASKS.md     | actual implementation state |
| CHANGELOG.md | actual changes              |

---

## Task → Release Mapping

```text
TASK → IMPLEMENTATION → RELEASE TASK → GOVERNOR → CHANGELOG → TAG
```

No task should reach release without:

* being defined in TASKS.md
* being implemented
* being validated

---

## Release Scope Rules

A release must NOT:

* include unfinished tasks
* include untracked features
* include behavior not reflected in docs
* violate CONSTRAINTS.md
* introduce architecture changes outside scope

---

## Agent Usage Rules

Agents must:

* follow `AGENT.md`
* respect `CONSTRAINTS.md`
* follow `DECISIONS.md`
* use `docs/TASKS.md` as source of truth
* use `docs/tasks/` for execution context

Agents must NOT:

* invent features
* expand scope
* bypass release-governor
* modify unrelated files

---

## Notes on Static Deployment

This application is:

* static-first
* config-driven
* deployed as static files

Release must ensure:

* no backend dependency
* no routing dependency (unless explicitly added)
* no hidden runtime assumptions
* cache safety for static assets (if applicable)

---

## Summary

This release system ensures:

* predictable versioning
* controlled scope
* aligned documentation
* safe agent-assisted development
* production-ready output

All releases must follow this process.

---
