# DECISION MEMORY

## Purpose

Store distilled, durable decisions that affect long-term behavior of this repository.

This file captures:

- stable architectural choices
- enforced conventions derived from decisions
- important constraints confirmed through experience

It does NOT store:

- raw decision history (see `agent/logs/decisions-log.md`)
- temporary or experimental decisions
- task-level decisions

---

## 1. Usage Rule

Only promote a decision here if:

- it will remain relevant across sessions
- it affects future execution behavior
- it is unlikely to change frequently

If unsure → keep it in decisions-log, not here.

---

## 2. Decision Format

Each entry must be concise and structured:

```text
<decision>
context: <where it applies>
reason: <short justification>
impact: <what it changes>
````

---

## 3. Decisions

### Example 1

Checkout validation remains server-side first.

context: src/checkout validation flow
reason: ensures consistency and avoids client divergence
impact: all validation logic must be implemented server-side before UI-level checks

---

### Example 2

Release preparation must exclude tasks not fully audited.

context: release workflow
reason: prevents incomplete or unstable releases
impact: prepare-release must validate task audit status strictly

---

### Example 3

Task scope must remain atomic even if implementation is related.

context: docs/TASKS.md
reason: improves traceability and audit clarity
impact: large tasks must be split before execution

---

## 4. Promotion Rules

Promote from `decisions-log` when:

* the same type of decision repeats
* the decision affects multiple tasks
* the decision influences system behavior

Do NOT promote:

* one-off fixes
* temporary workarounds
* uncertain decisions

---

## 5. Update Rules

When updating:

* prefer refining existing entries over adding duplicates
* keep wording stable and clear
* remove outdated decisions explicitly (do not overwrite silently)

---

## 6. Relationship to Other Memory Files

* `conventions.md` → general rules
* `decision-memory.md` → specific enforced decisions

If a decision becomes universal and stable:

→ move or merge into `conventions.md`

---

## 7. Anti-Patterns

Do NOT:

* copy full decisions-log entries
* write long explanations
* include timestamps
* include task IDs
* store speculative ideas
* duplicate conventions.md

---

## Objective

Provide a clean, stable set of decisions that guide future execution without re-evaluating the same choices repeatedly.

Minimal.
Durable.
Actionable.