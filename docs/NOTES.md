# NOTES

Application Codename: NT-C

This document tracks:
- ideas
- risks
- observations
- rejected or deferred decisions

Rules:
- contents here are NOT automatically approved for implementation
- agent must treat NOTES.md as context only
- all actionable work must be moved to docs/TASKS.md
- implementation priority:
  AGENT.md → CONSTRAINTS.md → DECISIONS.md → ROADMAP.md → TASKS.md
- this is NOT a task list

---

## NOTE-001 — Browser cache may cause stale config

### Context
Observed during local development using python -m http.server.

### Observation
After updating APP_CONFIG.vendor.phone, browser may still use old cached values.

### Risk / Problem
- users may send orders to outdated phone number
- inconsistent behavior across devices
- difficult debugging

### Options Considered
- rely on browser refresh
- instruct users to hard refresh
- implement cache-busting

### Decision
Accepted

### Reason
- resolved via cache-busting strategy

### Future Trigger
- deployment to CDN or different hosting environment

### Related
- TASK-011

### Status
Completed

### Superseded By
TASK-011 (v0.1.4)

---

## NOTE-002 — Ambiguity in item representation in message

### Context
Observed during testing of generated WhatsApp message.

### Observation
Item structure may become unclear when:
- many items exist
- same product appears with different notes

### Risk / Problem
- misinterpretation by vendor
- incorrect fulfillment

### Options Considered
- keep flat structure
- improve formatting
- introduce grouping

### Decision
Deferred

### Reason
- current format sufficient for small orders
- needs real usage signal

### Future Trigger
- orders exceed 3–5 items frequently
- vendor confusion reported

### Related
- TASK-015

### Status
Partially addressed

### Superseded By
TASK-015

---

## NOTE-003 — Missing order identifier

### Context
Observed in order communication flow.

### Observation
No reference ID exists in generated message.

### Risk / Problem
- difficult to track orders
- unclear follow-up

### Options Considered
- no ID
- timestamp ID
- incremental ID

### Decision
Deferred

### Reason
- requires state → out of scope

### Future Trigger
- need for tracking
- multi-order handling

### Related
- NOTE-004

### Status
Deferred

---

## NOTE-004 — Duplicate or unconfirmed orders in WhatsApp flow

### Context
Observed in real-world messaging scenario.

### Observation
Users may send multiple or revised orders without clear confirmation.

### Risk / Problem
- vendor confusion
- duplicate processing
- unclear final order

### Options Considered
- rely on WhatsApp conversation
- introduce ID
- introduce confirmation

### Decision
Deferred

### Reason
- outside current app scope
- belongs to workflow, not message generation

### Future Trigger
- repeated confusion observed
- move toward order lifecycle system

### Related
- TASK-016
- NOTE-003

### Status
Partially addressed

### Superseded By
TASK-016

---

## NOTE-005 — Structured message per business type

### Context
Exploration for broader usage.

### Observation
Different industries require different message structures.

### Risk / Problem
- generic format may not scale

### Options Considered
- single format
- configurable templates

### Decision
Deferred

### Reason
- belongs to multi-vendor scope

### Future Trigger
- cross-industry usage

### Related
- v0.2 direction

### Status
Deferred

---

## NOTE-006 — Mobile interaction friction

### Context
Observed during mobile testing.

### Observation
- scroll issues
- focus inconsistency
- tap precision

### Risk / Problem
- slower input
- user frustration

### Options Considered
- keep current
- refine interaction

### Decision
Partially addressed

### Reason
- improved by TASK-008 and TASK-014

### Future Trigger
- real user feedback

### Related
- TASK-008
- TASK-014

### Status
Partially addressed

### Superseded By
TASK-008, TASK-014

---

## NOTE-007 — Action feedback UX consistency

### Context
Before and after replacing alert().

### Observation
Feedback moved to non-blocking UI.

### Risk / Problem
- feedback may be missed

### Options Considered
- inline
- toast
- persistent indicator

### Decision
Accepted

### Reason
- aligns with modern UX

### Future Trigger
- feedback confusion observed

### Related
- TASK-009

### Status
Completed

### Superseded By
TASK-009

---

## NOTE-008 — Config structure limitations

### Context
After config stabilization.

### Observation
Flat product list without metadata.

### Risk / Problem
- limits scalability

### Options Considered
- keep flat
- add categories
- add metadata

### Decision
Deferred

### Reason
- no current need

### Future Trigger
- larger product sets

### Related
- TASK-005

### Status
Deferred

---

## NOTE-009 — Static deployment cache safety

### Context
Observed during deployment testing.

### Observation
Browser caching affects behavior.

### Risk / Problem
- outdated config usage

### Options Considered
- refresh
- cache-busting

### Decision
Accepted

### Reason
- resolved via versioned assets

### Future Trigger
- CDN deployment

### Related
- TASK-011

### Status
Completed

### Superseded By
TASK-011

---

## NOTE-010 — Localization strategy (EN / MY)

### Context
Observed mixed language usage.

### Observation
UI mixes English and Malay.

### Risk / Problem
- inconsistent UX
- scaling difficulty

### Options Considered
- single language
- dual language
- full localization system

### Decision
Deferred

### Reason
- prioritize stability first

### Future Trigger
- real users
- wider audience

### Related
- UI text
- message formatter

### Status
Deferred

---

## NOTE-011 — Product naming and branding

### Context
Temporary product identity.

### Observation
No final name or logo.

### Risk / Problem
- weak identity
- future layout changes needed

### Options Considered
- simple header
- full branding

### Decision
Deferred

### Reason
- branding not finalized

### Future Trigger
- pre-release phase

### Related
- TASK-006

### Status
Deferred

---

## NOTE-012 — No price and total calculation

### Context
Observed during usage simulation.

### Observation
No pricing in system.

### Risk / Problem
- manual calculation needed

### Options Considered
- no pricing
- add price
- calculate total

### Decision
Deferred

### Reason
- introduces transaction complexity

### Future Trigger
- vendor demand

### Related
- config structure
- formatter

### Status
Deferred

---

## NOTE-013 — No persistence (data lost on refresh)

### Context
Observed during testing.

### Observation
Inputs reset on reload.

### Risk / Problem
- loss of progress

### Options Considered
- no persistence
- localStorage

### Decision
Deferred

### Reason
- introduces state complexity

### Future Trigger
- user complaints

### Related
- js/app.js

### Status
Deferred

---

## NOTE-014 — No item duplication shortcut

### Context
Observed during multi-item input.

### Observation
Users must re-enter similar items.

### Risk / Problem
- slower input

### Options Considered
- manual
- duplicate button

### Decision
Deferred

### Reason
- adds UI complexity

### Future Trigger
- repeated patterns

### Related
- js/form.js

### Status
Deferred

---

## NOTE-015 — Limited validation for contact details

### Context
Observed during validation review.

### Observation
Minimal validation on phone.

### Risk / Problem
- invalid contact info

### Options Considered
- strict validation
- flexible validation

### Decision
Deferred

### Reason
- avoid blocking users

### Future Trigger
- real issues reported

### Related
- js/input-validator.js

### Status
Deferred

---

## NOTE-016 — Buyer-only perspective limitation

### Context
Observed after system evolution.

### Observation
System is buyer-focused only.

### Risk / Problem
- limits expansion

### Options Considered
- stay buyer-only
- expand to vendor flow

### Decision
Deferred

### Reason
- current scope intentional

### Future Trigger
- system expansion

### Related
- NOTE-003
- NOTE-004

### Status
Deferred

---

## NOTE-017 — No user history for buyer or vendor reuse

### Context
Observed during thinking about repeated usage scenarios.

### Observation
Current system:
- does not store any history
- user must re-enter data every time

A user may act as:
- buyer (placing orders)
- vendor (receiving orders)

### Risk / Problem
- repeated input for frequent users
- slower workflow for returning users
- no continuity between sessions

### Options Considered
- no history (stateless)
- store recent inputs (localStorage)
- introduce user identity and persistent history

### Decision
Deferred

### Reason
- requires persistence and state management
- introduces identity model (buyer/vendor distinction)
- outside current stateless design

### Future Trigger
- frequent repeated usage observed
- demand for faster reuse of previous data
- move toward stateful system

### Related
- NOTE-013 (no persistence)
- potential v0.2+ direction

### Status
Deferred

---

## NOTE-018 — Multi-setup vendor configuration

### Context
Exploration of vendor usage beyond a single configuration.

### Observation
A vendor may require multiple setups:
- different menus
- different campaigns
- different phone numbers

### Risk / Problem
- single config limits flexibility
- cannot support multi-context usage

### Options Considered
- single config only
- multiple configs per vendor
- URL-based config selection

### Decision
Deferred

### Reason
- requires routing and config loading logic
- introduces system-level complexity
- belongs to multi-vendor architecture

### Future Trigger
- vendors require multiple setups
- move toward SaaS-like usage

### Related
- TASK-010 (routing, deferred)
- config system

### Status
Deferred

---

## NOTE-019 — Limit on number of vendor setups

### Context
Derived from idea of multi-setup vendor configuration.

### Observation
Unlimited setups may:
- complicate UI
- increase maintenance burden

### Risk / Problem
- uncontrolled growth of configurations
- difficult navigation for vendor

### Options Considered
- unlimited setups
- fixed limit (e.g., max 10)
- tiered limits

### Decision
Deferred

### Reason
- depends on multi-setup implementation
- premature without real usage data

### Future Trigger
- multi-setup feature implemented
- scaling concerns observed

### Related
- NOTE-018

### Status
Deferred

---

## NOTE-020 — Customizable message structure

### Context
Extension of structured message flexibility.

### Observation
Different vendors may want:
- different field ordering
- optional fields
- custom sections

### Risk / Problem
- fixed structure may not fit all use cases
- customization may break consistency

### Options Considered
- fixed structure (current)
- configurable templates
- modular message builder

### Decision
Deferred

### Reason
- high complexity
- overlaps with NOTE-005
- requires strong abstraction

### Future Trigger
- diverse vendor requirements
- real demand for customization

### Related
- NOTE-005
- message-formatter.js

### Status
Deferred

---

## NOTE-021 — No direct user feedback or bug reporting mechanism

### Context
Observed when preparing for real vendor usage.

### Observation
Current system has no built-in way for users to:
- report bugs
- send feedback
- contact developer

### Risk / Problem
- feedback loop is slow or external
- issues may go unnoticed
- harder to improve based on real usage

### Options Considered
- no reporting (manual communication)
- simple contact link (WhatsApp / email)
- in-app feedback form

### Decision
Accepted (simple version first)

### Reason
- low complexity
- high value for early-stage product
- does not affect core logic

### Future Trigger
- active user base
- need structured feedback collection

### Related
- TASK-018 (feedback / bug report)
- UI (index.html)

### Clarification
Feedback/report channel is intentionally separated from vendor contact.

### Status
Completed

### Superseded By
TASK-018

---

## NOTE-022 — Preview reset on temporary invalid state disrupts user flow

### Context
Observed during interaction testing when adding a new item after a valid order has already been composed.

### Observation
When:
- user has valid items (e.g., item 1 and item 2)
- user accidentally clicks “add item”

System behavior:
- new empty item is added
- entire form becomes invalid
- preview resets or becomes red

### Risk / Problem
- user loses visible context of previously valid order
- creates perception that existing input is lost or broken
- reduces confidence in system stability
- disrupts flow for multi-item orders

### Options Considered
- keep current strict behavior (invalidate everything)
- preserve last valid preview but disable actions
- allow partial preview and allow actions (ignore incomplete items)

### Decision
Deferred

### Reason
- requires refinement of preview-state model
- must balance UX clarity with validation integrity
- risk of misleading user if preview does not match current state

### Future Trigger
- repeated user confusion or hesitation observed
- multi-item usage becomes common
- need to improve transition handling between valid ↔ invalid states

### Related
- TASK-013 (empty/invalid clarity)
- TASK-014 (mobile interaction flow)
- TASK-015 (item summary clarity)
- TASK-017 (last valid preview)

### Status
Partially addressed

### Superseded By
TASK-017

---

## NOTE-023 — UI visual clarity and modern feel

### Context
Observed from external feedback during UI review.

### Observation
Current UI has several issues:
- collapse arrow ("⌄") is too small and not clearly interactive
- typography feels outdated or “robotic”
- insufficient visual hierarchy (font size/weight similar across elements)
- spacing and layout feel dense
- overall perception does not reflect modern UI expectations (2026 standard)

### Risk / Problem
- reduces perceived product quality
- lowers user trust (especially for first-time users)
- makes interaction less intuitive (e.g., collapse affordance unclear)
- may impact adoption when shared with vendors

### Options Considered
- keep current minimal UI
- apply lightweight visual improvements (typography, spacing, icons)
- introduce full UI framework (e.g., Tailwind, component system)

### Decision
Accepted (lightweight improvement approach)

### Reason
- high UX impact with low technical cost
- does not require architectural change
- aligns with current static-first approach
- avoids overengineering

### Future Trigger
- real vendor feedback confirms UI perception issues
- preparing for wider sharing or public release

### Related
- TASK-019 (UI modernization pass)

### Status
Completed

### Superseded By
TASK-019

---

## NOTE-024 — Need for distribution/entry layer (landing page)

### Context
Identified while considering how the application will be shared with multiple vendors and users.

### Observation
Current system is:
- a single-entry tool (direct link to order generator)

Future scaling may require:
- a central entry point
- vendor selection
- product explanation
- structured feedback channel

### Risk / Problem
- direct app sharing may not scale
- lack of branding or onboarding
- feedback and contact handling becomes fragmented

### Options Considered
- keep direct app access only
- introduce a simple landing page
- introduce full product website

### Decision
Deferred

### Reason
- current phase is focused on validating core tool usability
- no real usage signal yet requiring distribution layer

### Future Trigger
- multiple vendors require separate entry points
- need for branding and onboarding
- public sharing beyond controlled testing

### Related
- NOTE-018 (multi-setup vendor configuration)
- v0.2+ direction

### Status
Deferred

---

## NOTE-025 — Separation between product layer and tool layer

### Context
Derived from discussion on landing page vs application responsibilities.

### Observation
Two distinct layers are emerging:

1. Product/Distribution Layer:
   - landing page
   - vendor selection
   - branding
   - public contact

2. Tool Layer:
   - order generator
   - validation
   - preview
   - WhatsApp sending

### Risk / Problem
- mixing both layers may:
  - increase complexity
  - reduce clarity
  - slow down iteration

### Options Considered
- keep everything in one app
- separate layers clearly

### Decision
Deferred (conceptual alignment only)

### Reason
- current application is still single-purpose tool
- separation becomes relevant only when scaling

### Future Trigger
- introduction of multi-vendor routing
- need for structured entry point
- expansion beyond single-use tool

### Related
- NOTE-024
- NOTE-018

### Status
Deferred

---

## NOTE-026 — Vendor requests optional product pricing in order flow

### Context

Observed from vendor feedback during early real-world usage discussion.

### Observation

Some vendors want each product to carry a unit price so the order flow can show:

* unit price
* per-item subtotal
* grand total

before the message is sent.

### Why It Matters

This can reduce price clarification after the message is received and improve buyer confidence before sending the order.

### Boundary

This should remain lightweight.

Included direction:

* optional unit price per product
* subtotal per line
* grand total

Explicitly excluded for initial scope:

* discounts
* tax
* shipping fee
* promo code
* dynamic pricing
* inventory logic

### Product Impact

This changes the product from:

```text
structured WhatsApp order formatter
```

toward:

```text
structured WhatsApp order formatter with lightweight pricing summary
```

### Decision

Deferred to future scoped work.

### Recommended Release Placement

v0.2.0+

### Status

Deferred

---

## NOTE-027 — Pricing support must remain optional and backward-compatible

### Context

Derived from discussion on vendor pricing support.

### Observation

Not all vendors need or want price-based ordering. Some only need structured item capture without visible totals.

### Why It Matters

If pricing becomes mandatory:

* current simple vendor use case becomes heavier
* existing deployments/configs may become harder to maintain
* product simplicity may be reduced unnecessarily

### Constraint

Pricing support should behave as:

* if price exists → show unit price, subtotal, and total
* if price does not exist → preserve current behavior

### Product Impact

This keeps the current single-purpose order flow valid while allowing gradual capability expansion.

### Decision

Deferred to future scoped work.

### Recommended Release Placement

v0.2.0+

### Status

Deferred

---

## NOTE-028 — Pricing summary should appear in both preview and sent message

### Context

Derived from discussion on how optional pricing should behave.

### Observation

If pricing is supported, showing totals only in UI preview is insufficient. Vendor and buyer benefit most when the same pricing summary is preserved in the outgoing WhatsApp message.

### Why It Matters

Mismatch between preview and final message would create confusion and reduce trust.

### Constraint

If pricing support is introduced, the pricing structure should be reflected consistently in:

* preview
* final WhatsApp message

### Product Impact

This increases message completeness without requiring extra vendor clarification.

### Decision

Deferred to future scoped work.

### Recommended Release Placement

v0.2.0+

### Status

Deferred

---

## NOTE-029 — Pricing support implies product-config evolution

### Context

Derived from discussion on adding unit price to products.

### Observation

Optional pricing is not only a UI change. It also changes vendor configuration shape because product entries may need to evolve from label-only structure into product metadata with optional price.

### Why It Matters

This affects:

* vendor configuration format
* preview rendering
* message formatting
* future compatibility

### Constraint

Any pricing expansion should be planned as config evolution, not handled as ad hoc UI-only logic.

### Product Impact

This is one reason pricing support fits better as capability expansion than as a patch correction.

### Decision

Deferred to future scoped work.

### Recommended Release Placement

v0.2.0+

### Status

Deferred

---

## NOTE-031 — Timestamp reference for WhatsApp order message

### Context
Observed during early usage consideration where vendors may receive multiple orders from the same customer within a short time frame.

### Observation
In a static system without backend or order storage:

- WhatsApp chat becomes the primary source of truth
- vendors have difficulty identifying which order is being referenced later
- especially when customers refer to past orders (e.g. “2 days ago”)

### Core Idea
Include a timestamp in the order message as a lightweight reference:

```text
time → message → chat history
````

### Proposed Behavior (Conceptual)

* timestamp is generated at action-time
* timestamp is displayed in message header
* format remains human-readable and simple

Example:

```text
Masa Order: 21/04/2026 22:14
```

### Why It Matters

For vendors:

* easier lookup in chat history
* easier differentiation between multiple orders from the same customer
* improves clarity during correction or dispute handling

For system:

* improves traceability without backend complexity
* aligns with static-first design

### Constraints

* depends on buyer device time
* no timezone normalization
* no persistence
* must remain readable and lightweight

### Risks

* buyer device time may be inaccurate
* timestamp may be interpreted as authoritative system record
* message may become cluttered if badly placed
* inconsistent behavior if only some actions include it

### Open Questions

* should timestamp apply only to “Buka WhatsApp” or also to copy actions
* exact placement relative to message title
* fixed format vs future configurability

### Decision

Accepted as valid direction for near-term improvement.

### Recommended Release Placement

v0.1.7

### Status

Active