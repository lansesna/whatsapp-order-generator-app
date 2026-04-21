# PROJECT CONTEXT

## Repository Identity

Repository name: whatsapp-order-generator
Repository type: application
Scope: single-repo execution  

---

## Purpose

Provide high-level context about this repository, including:

- why it exists
- what problem it solves
- current development phase
- near-term direction

This file supports:

- faster context rebuild
- better decision alignment
- consistent execution across sessions

This is not a task log or full history.

---

## 1. Problem Context

Describe the real-world problem this repo addresses.

Guidelines:

- one short paragraph
- user/business perspective
- avoid technical implementation detail

Example:

This repository handles order intake and checkout validation to ensure correct data is captured before submission to downstream systems.

---

## 2. System Context

Where this repo sits in the larger system.

Example:

- upstream: user input / UI layer
- this repo: validation + submission orchestration
- downstream: payment gateway / fulfillment system

Keep it simple and stable.

---

## 3. Current Phase

```text
phase: <exploration | build | stabilization | release-prep | maintenance>
````

Example:

```text
phase: build
```

Guidelines:

* choose one dominant phase
* update only when phase meaningfully changes

---

## 4. Current Focus Areas

List 2–5 active areas of work.

Examples:

* checkout validation correctness
* submission reliability
* error handling consistency

Rules:

* high-level only
* no task IDs
* no implementation details

---

## 5. Recent Direction (Short)

Optional but useful.

Summarize recent direction shifts or priorities.

Example:

Focus has shifted from broad feature development to tightening validation logic and preparing first stable release.

Keep to 1–3 lines max.

---

## 6. Constraints

List known constraints that affect decisions.

Examples:

* must remain simple and maintainable
* no external service dependency for validation
* performance is secondary to correctness (current phase)

Rules:

* only stable constraints
* not temporary blockers

---

## 7. Non-Goals (Important)

Explicitly state what is NOT being targeted.

Examples:

* not building full analytics system
* not optimizing for scale yet
* not implementing advanced UI features

This prevents scope creep during execution.

---

## 8. Near-Term Direction

Where the repo is heading next (high-level).

Examples:

* finalize validation logic
* complete audit for core tasks
* prepare first release candidate

Rules:

* do not list tasks
* do not include dates
* keep directional only

---

## 9. Stability Notes

Optional — useful if repo is evolving.

Example:

Structure is stabilizing; major changes expected only in validation logic, not in overall flow.

---

## 10. Update Rules

Update this file when:

* phase changes
* focus areas shift significantly
* constraints change
* system direction changes

Do NOT update for:

* task-level progress
* minor changes
* daily activity

---

## 11. Anti-Patterns

Do NOT:

* include task logs
* include detailed history
* include code-level detail
* include release-specific data
* duplicate identity-core.md
* duplicate TASKS or RELEASE content

---

## Objective

Provide a clear, stable understanding of the project’s purpose, current phase, and direction.

Concise.
Contextual.
Action-guiding.