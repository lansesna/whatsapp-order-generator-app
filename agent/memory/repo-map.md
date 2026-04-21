# REPO MAP

## Purpose

Provide a concise structural map of the repository.

This map helps:

- locate key components quickly
- reduce unnecessary file reads
- guide task execution and audit
- support fast context rebuild

This file is not a full file tree.
It highlights only important, stable areas.

---

## Scope

Includes:

- core directories
- key functional areas
- important documents
- high-value entry points

Excludes:

- temporary files
- low-level implementation details
- full file listings

---

## 1. Root Structure

Key areas:

- `src/` → main implementation
- `tests/` → validation and verification
- `docs/` → system truth and definitions
- `agent/` → local agent OS (state, memory, logs, skills, policy)

---

## 2. Source Code (`src/`)

Describe major functional zones.

Example:

- `src/checkout/` → checkout flow (validation, submission)
- `src/api/` → API handlers and request processing
- `src/shared/` → reusable utilities and helpers

Rules:

- map by responsibility, not file count
- include only stable structure

---

## 3. Tests (`tests/`)

- `tests/checkout/` → checkout-related tests
- `tests/api/` → API-level validation

Purpose:

- validate task success criteria
- support audit verification

---

## 4. Documentation (`docs/`)

Core documents:

- `docs/TASKS.md` → task truth
- `docs/RELEASE.md` → release definition
- `docs/CONTROL-PLANE.md` → execution flow
- `docs/SOURCE-OF-TRUTH.md` → authority hierarchy

Optional:

- domain-specific docs (flows, architecture, constraints)

---

## 5. Agent Layer (`agent/`)

### State

- `agent/state/*` → current runtime pointer (mode, task, release, focus)

### Logs

- `agent/logs/task-run-log.md` → task execution trace
- `agent/logs/release-log.md` → release lifecycle trace
- `agent/logs/decisions-log.md` → key decisions
- `agent/logs/session-log.md` → session boundaries

### Memory

- `agent/memory/conventions.md` → repo behavior rules
- `agent/memory/repo-map.md` → this file
- `agent/memory/identity-core.md` → repo identity
- `agent/memory/project-context.md` → project-level context
- `agent/memory/decision-memory.md` → durable decisions

### Skills

- `agent/skills/flows/` → execution workflows
- `agent/skills/governance/` → governance procedures
- `agent/skills/recovery/` → recovery procedures

### Policy

- `agent/policy/*` → constraints and boundaries

---

## 6. Key Entry Points

Primary execution flow:

- `docs/TASKS.md` → start execution
- `agent/state/*` → determine current context
- `agent/skills/*` → follow procedures

Release flow:

- `docs/RELEASE.md` → define release
- `CHANGELOG.md` → finalize release

---

## 7. Navigation Rules

- always start from TASKS for execution
- read state first for context
- read only necessary files (minimal read)
- use this map to avoid full repo scans

---

## 8. Update Rules

Update this file when:

- new major module is added
- structure changes significantly
- responsibilities shift between folders

Do NOT update for:

- minor file additions
- temporary changes
- task-level edits

---

## 9. Anti-Patterns

Do NOT:

- list every file
- duplicate README content
- include temporary structure
- describe implementation details deeply
- include task-specific context

---

## Objective

Provide a stable, high-level map of the repository to support fast and correct navigation.

Minimal.
Accurate.
Stable.