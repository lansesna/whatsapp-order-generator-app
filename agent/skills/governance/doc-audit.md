# DOCUMENT AUDIT

## Purpose

Audit repository documentation for structural quality, consistency, and governance integrity.

This skill validates that:

- documents are clear, non-duplicated, and correctly scoped
- rules are placed in the correct layer (policy vs skills vs docs)
- no ambiguity or contradiction exists within documentation
- repo documentation remains maintainable over time

This skill does NOT validate task or release truth (handled by truth-consistency-check).

---

## When to use

Use this skill when:

- after adding or modifying governance documents
- after creating new skills or policies
- before major refactoring of docs
- periodically to prevent documentation drift

Do NOT use this skill when:

- executing tasks
- preparing releases
- verifying task completion

---

## Inputs

Required inputs:

- `docs/*`
- `agent/policy/*`
- `agent/skills/*`
- `AGENT.md`
- `CODEX.md`

Optional inputs:

- `agent/memory/*`
- `agent/logs/*` (for context only)

---

## Allowed reads

- all documentation files:
  - `docs/*`
  - `agent/policy/*`
  - `agent/skills/*`
  - `AGENT.md`
  - `CODEX.md`
- `agent/state/*` (context only)

Read only what is necessary to evaluate structure and consistency.

---

## Allowed writes

- `agent/state/current-mode.md`
- `agent/state/current-focus.md`
- optional: audit report file
- `agent/logs/decisions-log.md`

Do NOT modify:

- `docs/*`
- `agent/policy/*`
- `agent/skills/*`
- implementation files

This skill detects issues. It does not fix them automatically.

---

## Steps

### 1. Enter governance mode

Set:

- `agent/state/current-mode.md` → `governance`
- update `agent/state/current-focus.md`

Example:

```md
focus: audit documentation structure and consistency
scope: docs + policy + skills
status: active
last_updated: 2026-04-19 19:30
````

---

### 2. Validate document structure

Check that required documents exist and are logically organized:

* `docs/SOURCE-OF-TRUTH.md`
* `docs/CONTROL-PLANE.md`
* `AGENT.md`
* `CODEX.md`
* `agent/policy/*`
* `agent/skills/*`

Flag:

* missing core documents
* unclear folder structure
* misplaced files

---

### 3. Check layer separation

Validate correct separation between:

#### A. Policy

* contains constraints only
* no workflow steps
* no task-specific logic

#### B. Skills

* contains procedures only
* no policy rules embedded
* no repo-specific truth

#### C. Docs

* contain system-level definitions
* no execution procedures duplicated from skills

Flag:

* policy files describing workflows
* skills redefining policy rules
* docs duplicating policy or skills content

---

### 4. Detect duplication

Check for duplicated content across:

* `docs/*`
* `agent/policy/*`
* `agent/skills/*`
* `AGENT.md`
* `CODEX.md`

Examples:

* same rule repeated in multiple places
* same definition written differently
* overlapping responsibilities

Flag:

* duplication
* conflicting definitions

---

### 5. Check clarity and precision

For each document:

Verify:

* titles are clear
* sections are well-structured
* language is precise and non-ambiguous
* no vague wording such as:

  * “handle appropriately”
  * “as needed”
  * “improve”
  * “optimize”

Flag:

* ambiguity
* unclear instructions
* missing definitions

---

### 6. Validate consistency with system model

Ensure all docs align with:

```text
NOTES → TASK → RELEASE → CHANGELOG → VERSION
```

Check that:

* no document bypasses this chain
* no document introduces alternative flow
* execution boundaries are respected

Flag:

* any document suggesting execution from NOTES
* any document mixing release and execution
* any document bypassing audit

---

### 7. Validate naming and terminology

Ensure consistent usage of:

* mode names (orientation, governance, task-execution, audit, release-prep, recovery)
* role names (Mamat governor, engineer, auditor)
* task/release terminology

Flag:

* inconsistent naming
* mixed terminology
* conflicting definitions

---

### 8. Check document size and bloat

Evaluate:

* excessively long documents
* unnecessary repetition
* overly verbose explanations

Flag:

* documents that should be split
* sections that should be removed or simplified

---

### 9. Classify findings

Group findings into:

#### A. Critical

* conflicting rules
* broken execution flow
* incorrect layer separation

#### B. Major

* duplication
* unclear structure
* inconsistent terminology

#### C. Minor

* formatting issues
* verbosity
* naming improvements

---

### 10. Produce audit report

Create structured report:

```text
Document Audit Result

Status: pass | minor issues | major issues | critical issues

Critical:
- <issue>

Major:
- <issue>

Minor:
- <issue>

Recommendations:
- <action>
```

Do NOT fix issues automatically.

---

### 11. Update state and logs

* update `agent/state/current-focus.md` to reflect completion
* optionally append to `agent/logs/decisions-log.md`

Example:

```md
- 2026-04-19 performed doc audit → minor duplication found in policy vs skills
```

---

## Stop conditions

Stop successfully when:

* audit report is produced
* all issues are clearly classified
* no documents are modified

---

## Failure conditions

This skill fails if:

* required documents are missing
* structure is too inconsistent to evaluate
* scope is unclear

If failure occurs:

* stop
* report issue
* recommend minimal corrective action

---

## Output artifacts

Primary output:

* document audit report (chat or file)

Secondary outputs:

* updated `agent/state/current-mode.md`
* updated `agent/state/current-focus.md`
* optional log entry

---

## Quality rules

Audit must be:

* objective
* precise
* minimal in wording
* strict on structure
* clear in classification

---

## Anti-patterns

Do NOT:

* fix issues silently
* rewrite documents
* merge audit with execution
* ignore duplication
* downgrade critical issues
* over-analyze trivial formatting

---

## Relationship to system rules

This skill validates:

```text
correct separation of:
- policy
- skills
- docs
```

and ensures documentation supports:

```text
safe, deterministic execution
```

without ambiguity or drift.

---

## Objective

Ensure repository documentation is:

* clean
* non-duplicated
* well-structured
* aligned with system architecture

No ambiguity.
No overlap.
No structural decay.
