# TRUTH CONSISTENCY CHECK

## Purpose

Validate that all authoritative sources in this repository are consistent.

This skill checks alignment across:

- `docs/TASKS.md`
- `docs/RELEASE.md`
- `CHANGELOG.md`
- `agent/state/*`

It detects:

- false completion
- false release
- scope mismatch
- stale or contradictory state

---

## When to use

Use this skill when:

- before `prepare-release`
- before `update-changelog`
- after multiple task executions
- after reopening the repo
- when inconsistencies are suspected

Do NOT use this skill when:

- the repo is in early bootstrap with no tasks/releases
- only one trivial task exists and no release context is present

---

## Inputs

Required inputs:

- `docs/TASKS.md`
- `docs/RELEASE.md` (if exists)
- `CHANGELOG.md` (if exists)
- `agent/state/*`

Optional inputs:

- `agent/logs/*` (supporting evidence only)
- repo-specific core docs

---

## Allowed reads

- `docs/SOURCE-OF-TRUTH.md`
- `docs/CONTROL-PLANE.md`
- `docs/TASKS.md`
- `docs/RELEASE.md`
- `CHANGELOG.md`
- `agent/state/*`
- `agent/logs/*` (supporting only)

Read only what is necessary to verify consistency.

---

## Allowed writes

- `agent/state/current-mode.md`
- `agent/state/current-focus.md`
- optional: a dedicated audit output file (if repo defines one)
- `agent/logs/decisions-log.md` (optional short entry)

Do NOT modify:

- `docs/TASKS.md`
- `docs/RELEASE.md`
- `CHANGELOG.md`
- implementation files

This skill detects inconsistencies. It does not fix them automatically.

---

## Steps

### 1. Enter governance mode

Set:

- `agent/state/current-mode.md` → `governance`
- update `agent/state/current-focus.md` to reflect consistency check

Example:

```md
focus: validate cross-document truth consistency
scope: TASKS + RELEASE + CHANGELOG + state
status: active
last_updated: 2026-04-19 18:30
````

---

### 2. Validate task truth integrity

Check `docs/TASKS.md`:

* all tasks have clear status
* no task marked complete without clear success criteria fulfillment
* no duplicate task IDs
* no conflicting definitions

Flag issues such as:

* task marked complete but clearly incomplete
* multiple tasks overlapping same scope without coordination

---

### 3. Validate release integrity

If `docs/RELEASE.md` exists:

Check:

* release scope references valid tasks
* all referenced tasks are `complete`
* release status aligns with actual readiness
* no incomplete or unverified task included

Flag issues such as:

* release includes `active` or `blocked` tasks
* release marked ready but tasks incomplete

---

### 4. Validate changelog integrity

If `CHANGELOG.md` exists:

Check:

* each version maps to a valid release
* no duplicate versions
* no missing tasks that were marked released
* no tasks listed that are not actually complete

Flag issues such as:

* changelog entry without matching release
* tasks in changelog not present in release
* version duplication

---

### 5. Cross-check TASKS ↔ RELEASE

Ensure:

* all tasks in release are present in TASKS
* all release tasks are `complete`
* no missing dependencies

Flag:

* release scope mismatch
* missing or invalid task references

---

### 6. Cross-check RELEASE ↔ CHANGELOG

Ensure:

* every changelog version corresponds to a release
* release marked `ready` or `released` aligns with changelog presence
* no “released” state without changelog entry

Flag:

* release ready but not in changelog
* changelog entry without valid release backing

---

### 7. Cross-check TASKS ↔ CHANGELOG

Ensure:

* tasks listed in changelog are complete in TASKS
* no incomplete task appears in changelog

Flag:

* premature changelog entries
* missing tasks that should have been released

---

### 8. Validate runtime state

Check `agent/state/*`:

* `current-task` aligns with TASKS.md
* `current-release` aligns with RELEASE.md
* mode is valid for current situation

Flag:

* state contradicts TASKS
* state claims completion not reflected in TASKS
* release state inconsistent with RELEASE.md or CHANGELOG

---

### 9. Classify findings

Group findings into:

#### A. Critical

* false release
* false completion
* contradiction across authoritative sources

#### B. Major

* scope mismatch
* missing task linkage
* inconsistent release definition

#### C. Minor

* formatting inconsistency
* non-critical naming mismatch
* minor duplication risk

---

### 10. Produce consistency report

Create a structured report:

```text
Consistency Check Result

Status: pass | minor issues | major issues | critical issues

Findings:

Critical:
- <issue>

Major:
- <issue>

Minor:
- <issue>

Recommended Actions:
- <action>
```

Do NOT silently fix issues.

---

### 11. Update state and logs

* update `agent/state/current-focus.md` to reflect completion of check
* optionally append short entry to `agent/logs/decisions-log.md`

Example:

```md
- 2026-04-19 18:45 performed truth consistency check → major issues found in release scope
```

---

## Stop conditions

Stop successfully when:

* consistency report is produced
* all inconsistencies are clearly identified
* no automatic modifications are made to authoritative sources

---

## Failure conditions

This skill fails if:

* required documents are missing
* documents are too inconsistent to analyze
* task/release structure is fundamentally broken
* state cannot be reconciled

If failure occurs:

* stop
* report the structural issue
* recommend minimal recovery steps

---

## Output artifacts

Primary output:

* consistency report (displayed in chat or written to optional audit file)

Secondary outputs:

* updated `agent/state/current-mode.md`
* updated `agent/state/current-focus.md`
* optional log entry

---

## Quality rules

This skill must be:

* neutral (not biased toward previous assumptions)
* strict about contradictions
* clear in classification
* minimal in verbosity
* precise in recommendations

---

## Anti-patterns

Do NOT:

* fix inconsistencies silently
* downgrade critical issues
* treat logs as authoritative
* infer release from state alone
* ignore missing changelog entries
* merge issues into vague summaries

---

## Relationship to system rules

This skill enforces:

```text
TASKS → RELEASE → CHANGELOG
```

and validates:

```text
truth consistency across all layers
```

It acts as a safeguard before release finalization and after major execution phases.