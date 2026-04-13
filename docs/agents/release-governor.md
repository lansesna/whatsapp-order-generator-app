# release-governor.md

## Task Type

Application release governance audit and release artifact preparation

---

## Assigned Agent

release-governor

---

## Objective

Audit whether the WhatsApp Order Generator Application is valid for the target release version, then prepare release artifacts.

Important:

- Release artifacts must describe the **actual repository state**
- Do NOT describe the audit process
- Do NOT write as "docs-only", "audit", or "meta" commit
- Output must reflect real product state

---

## Required Reads

1. README.md
2. CHANGELOG.md
3. AGENT.md
4. CONSTRAINTS.md
5. DECISIONS.md
6. ROADMAP.md
7. docs/PRODUCT.md
8. docs/FLOW.md
9. docs/STRUCTURE.md
10. docs/TASKS.md
11. implementation files (HTML/CSS/JS)

---

## Audit Requirements

### A. Scope Compliance

Verify Application remains within allowed scope:

- static HTML/CSS/JS
- no backend
- no persistence layer
- no framework introduced
- no violation of CONSTRAINTS.md

---

### B. Architecture Integrity

Verify:

- file responsibilities follow STRUCTURE.md
- no logic duplication
- message formatting remains single source of truth
- transport logic remains isolated

---

### C. Task Integrity

Verify:

- completed tasks in TASKS.md are actually implemented
- no partial or broken implementations
- no untracked feature additions outside TASKS.md

---

### D. Documentation Alignment

Verify:

- README reflects current product state
- PRODUCT.md matches actual functionality
- FLOW.md matches implementation
- SETUP.md matches actual run/deploy flow
- CHANGELOG reflects real changes

---

### E. UI / UX Consistency

Verify:

- vendor identity is correctly displayed
- preview behavior is consistent
- validation behavior matches expected UX
- no broken flows

---

### F. Release Readiness

Determine:

- PASS or FAIL for target version

---

## Required Output

Return in this exact order:

---

### 1. Governance Audit Result

PASS or FAIL

---

### 2. Audit Summary

Concise explanation of system state

---

### 3. Blocking Issues

List ONLY if FAIL  
Otherwise:

```
None
````

---

### 4. Approval Statement (if PASS)

Example:

```
Approved for release vX.X.X as a valid Application baseline under current governance constraints.
```

---

### 5. CHANGELOG Update (for new version)

Requirements:

* follow existing CHANGELOG format
* include only actual changes
* reflect completed tasks
* do NOT include audit process

---

### 6. Release Commit Message

Requirements:

* describe actual shipped state
* include implemented features/tasks
* use appropriate conventional commit type
* NOT "docs only"

---

### 7. Release Tag Message

Requirements:

* describe significance of version
* summarize shipped scope
* concise and product-focused

---

### 8. Release Notes

Requirements:

* describe what is included
* describe current constraints (static-first, no backend, etc.)
* describe real limitations only
* NOT an audit report

---

## Constraints

* do not invent features
* do not expand scope
* do not modify files unless instructed
* do not describe audit process in release artifacts
* follow AGENT.md, CONSTRAINTS.md, DECISIONS.md strictly

---
