# UPDATE CHANGELOG

## Purpose

Convert a validated release candidate into released truth in `CHANGELOG.md`.

This skill ensures that:

- only fully prepared and validated releases are recorded
- changelog entries are accurate, complete, and consistent
- release becomes publicly visible and final

This skill is the ONLY place where a release is considered complete.

---

## When to use

Use this skill when:

- `docs/RELEASE.md` status is `ready`
- all included tasks are complete and audited
- release scope is finalized
- no unresolved contradictions exist

Do NOT use this skill when:

- release status is `preparing`, `audit`, or `blocked`
- tasks are still incomplete or uncertain
- release scope is unclear
- release validation has not passed

---

## Inputs

Required inputs:

- `docs/RELEASE.md`
- `docs/TASKS.md`
- `CHANGELOG.md`

Optional inputs:

- `agent/state/current-release.md`
- `agent/logs/release-log.md`
- repo-specific docs

---

## Allowed reads

- `docs/SOURCE-OF-TRUTH.md`
- `docs/CONTROL-PLANE.md`
- `docs/RELEASE.md`
- `docs/TASKS.md`
- `CHANGELOG.md`
- `agent/state/current-release.md`

Read only what is required to finalize the release.

---

## Allowed writes

- `CHANGELOG.md`
- `agent/state/current-release.md`
- `agent/state/current-mode.md`
- `agent/state/current-focus.md`
- `agent/logs/release-log.md`

Do NOT write to:

- `docs/RELEASE.md` (except status update if needed)
- `src/*`
- `tests/*`
- cross-repo files

---

## Steps

### 1. Confirm release is eligible

Verify:

- `docs/RELEASE.md` exists
- release status is `ready`
- all tasks in release scope are marked `complete`
- no contradictions exist between:
  - TASKS
  - RELEASE
  - implementation
- release scope is clearly defined

If any check fails:

```text
STOP → REPORT → DO NOT UPDATE CHANGELOG
````

---

### 2. Resolve release data

Extract from `docs/RELEASE.md`:

* version
* task list
* summary

Confirm:

* version is not already in `CHANGELOG.md`
* tasks are not already released

If duplication exists:

* stop
* report duplication
* do not write

---

### 3. Build changelog entry

Create a new entry in `CHANGELOG.md`:

```md
## <version>

### Added
- <task-id>: <short description>

### Changed
- <task-id>: <short description>

### Fixed
- <task-id>: <short description>
```

Rules:

* categorize entries appropriately
* keep descriptions concise and factual
* do not include internal notes or reasoning
* do not include future work

---

### 4. Validate changelog entry

Before writing, verify:

* entries match release scope exactly
* no missing tasks
* no extra tasks
* no vague descriptions
* no duplication with previous versions

If mismatch exists:

* stop
* report inconsistency
* do not write

---

### 5. Write changelog

Update `CHANGELOG.md`:

* insert new version entry at top (or according to repo convention)
* overwrite file content (snapshot behavior)
* maintain formatting consistency

---

### 6. Finalize release state

Update:

* `agent/state/current-release.md`:

  * status → `released`

* optionally update `docs/RELEASE.md`:

  * status → `released` (if repo tracks it)

Rules:

* release is considered complete ONLY after changelog update
* state alone does not define release completion

---

### 7. Update runtime mode and focus

Set:

* `agent/state/current-mode.md` → `orientation`
* update `agent/state/current-focus.md` to reflect completion or next step

Example:

```md
focus: release v0.2.0 completed
scope: CHANGELOG.md updated
status: complete
last_updated: 2026-04-19 18:10
```

---

### 8. Append release log entry

Append to `agent/logs/release-log.md`:

```md
- 2026-04-19 18:10 released v0.2.0 with tasks T-101, T-102
```

Keep factual.

---

## Stop conditions

Stop successfully when:

* `CHANGELOG.md` is updated
* release entry is correct and complete
* release state is marked `released`
* runtime state reflects completion

---

## Failure conditions

This skill fails if:

* release is not `ready`
* task completion is inconsistent
* version already exists in changelog
* release scope is ambiguous
* changelog entry cannot be validated
* required inputs are missing

If failure occurs:

* do not write to `CHANGELOG.md`
* report exact issue
* recommend corrective action

---

## Output artifacts

Primary output:

* updated `CHANGELOG.md`

Secondary outputs:

* updated `agent/state/current-release.md`
* updated `agent/state/current-mode.md`
* updated `agent/state/current-focus.md`
* appended `agent/logs/release-log.md`

---

## Quality rules

Changelog updates must be:

* accurate
* complete
* consistent with release scope
* concise and readable
* free from internal reasoning

This skill must NOT:

* include incomplete work
* include speculative entries
* rely on logs for truth
* skip release validation
* rewrite previous release history

---

## Anti-patterns

Do NOT:

* update changelog before release is ready
* include tasks still in-review
* mix multiple releases into one entry
* write vague descriptions
* silently fix release scope during changelog writing
* treat state as release truth

---

## Relationship to system rules

This skill enforces:

```text
NOTES → TASK → RELEASE → CHANGELOG → VERSION
```

and defines:

```text
CHANGELOG = released truth
```

Release is complete ONLY after this step.
