# RESOLVE CONFLICT

## Purpose

Identify, classify, and resolve conflicts between authoritative sources.

This skill ensures that:

- contradictions are surfaced clearly
- resolution follows truth hierarchy
- no silent overrides occur
- repo truth remains consistent and reliable

This skill does NOT perform implementation work.

---

## When to use

Use this skill when:

- strong sources contradict each other
- truth-consistency-check reports issues
- recover-state cannot produce a clean state
- task/release/changelog alignment is broken
- execution is blocked due to ambiguity

Do NOT use this skill when:

- no contradiction exists
- issue is purely implementation (use execute-task)
- issue is purely structural (use doc-audit)

---

## Inputs

Required inputs:

- `docs/TASKS.md`
- `docs/RELEASE.md` (if exists)
- `CHANGELOG.md` (if exists)

Optional inputs:

- `agent/state/*`
- `agent/logs/*`
- repo-specific docs

---

## Allowed reads

- `docs/SOURCE-OF-TRUTH.md`
- `docs/CONTROL-PLANE.md`
- `docs/TASKS.md`
- `docs/RELEASE.md`
- `CHANGELOG.md`
- `agent/state/*`
- `agent/logs/*` (supporting only)

---

## Allowed writes

- `agent/state/*`
- `agent/logs/decisions-log.md`
- optional: conflict report file

Do NOT modify authoritative sources automatically:

- `docs/TASKS.md`
- `docs/RELEASE.md`
- `CHANGELOG.md`

Unless explicitly instructed after resolution decision.

---

## Steps

### 1. Enter recovery mode

Set:

- `agent/state/current-mode.md` → `recovery`
- update focus:

```md
focus: resolve truth conflicts across repo
scope: TASKS + RELEASE + CHANGELOG
status: active
last_updated: <timestamp>
````

---

### 2. Detect conflicts

Scan for contradictions across:

#### A. TASKS vs implementation

* task marked complete but behavior/test fails

#### B. TASKS vs RELEASE

* release includes incomplete task

#### C. RELEASE vs CHANGELOG

* release ready but not in changelog
* changelog entry without valid release

#### D. TASKS vs CHANGELOG

* changelog includes incomplete task

#### E. STATE vs strong sources

* state contradicts TASKS/RELEASE/CHANGELOG

Record each conflict explicitly.

---

### 3. Classify conflict type

For each conflict:

#### A. Truth mismatch

* two strong sources disagree

#### B. Premature claim

* completion/release declared too early

#### C. Missing linkage

* tasks not properly connected to release/changelog

#### D. Structural inconsistency

* document definitions unclear or broken

---

### 4. Apply resolution hierarchy

Use strict precedence:

```text
CHANGELOG.md > RELEASE.md > TASKS.md > STATE > LOGS
```

Rules:

* higher authority overrides lower
* logs never override anything
* state is always corrected, never used as final truth

---

### 5. Determine resolution action

For each conflict, choose ONE:

#### A. Correct lower source

Example:

* TASK marked complete but incorrect → revert task status

#### B. Remove invalid linkage

Example:

* release includes invalid task → remove task from release

#### C. Reclassify status

Example:

* task should be `in-review` not `complete`

#### D. Escalate for manual decision

Use when:

* ambiguity cannot be resolved deterministically
* business intent unclear
* multiple valid interpretations exist

---

### 6. Validate resolution consistency

After proposing resolution:

Check:

* no new contradictions introduced
* execution chain remains valid:

```text
NOTES → TASK → RELEASE → CHANGELOG → VERSION
```

* all sources align after resolution

If not:

* refine resolution
* do not proceed

---

### 7. Apply resolution (if allowed)

Only apply changes if:

* resolution is deterministic
* authority hierarchy is clear
* no ambiguity remains

Allowed actions:

* update `agent/state/*`
* recommend changes to TASKS/RELEASE/CHANGELOG

If modifying authoritative docs:

* must be explicit
* must follow proper skill (e.g., audit-task, prepare-release)

---

### 8. Produce conflict report

Create structured output:

```text
Conflict Resolution Report

Conflicts Detected:

1. <type>: <description>
   - sources: <files>
   - resolution: <action>

Status:
- resolved | partially resolved | unresolved

Actions Required:
- <next steps>
```

---

### 9. Update state

Set:

* `agent/state/current-focus.md` → reflect resolution outcome
* adjust `current-task` or `current-release` if needed

---

### 10. Log decision

Append to `agent/logs/decisions-log.md`:

```md
- <timestamp> resolved conflict between TASKS and RELEASE for T-101; task reverted to active
```

---

## Stop conditions

Stop successfully when:

* all conflicts are identified
* deterministic conflicts are resolved
* remaining ambiguity is clearly reported
* repo truth is consistent OR clearly blocked

---

## Failure conditions

This skill fails if:

* authoritative sources are missing
* conflicts cannot be classified
* hierarchy cannot be applied
* ambiguity is too high to resolve safely

If failure occurs:

* stop
* report exact ambiguity
* require manual intervention

---

## Output artifacts

Primary output:

* conflict resolution report

Secondary outputs:

* updated `agent/state/*`
* appended `agent/logs/decisions-log.md`

---

## Quality rules

Conflict resolution must be:

* hierarchy-driven
* minimal in changes
* explicit in reasoning
* safe (no destructive assumptions)

---

## Anti-patterns

Do NOT:

* silently overwrite authoritative sources
* merge conflicting truths
* average multiple conflicting signals
* trust logs over structured docs
* resolve ambiguity by guessing
* skip classification step

---

## Relationship to system rules

This skill enforces:

```text
truth hierarchy and consistency
```

and ensures:

```text
no contradictory truth exists across repo
```

---

## Objective

Ensure repository truth is:

* consistent
* authoritative
* non-contradictory

No silent conflicts.
No ambiguous state.
No broken execution chain.