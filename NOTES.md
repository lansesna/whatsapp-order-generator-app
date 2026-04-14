# NOTES.md

This file contains raw ideas, planning notes, experiments, and possible directions.

This document tracks:
- ideas
- risks
- observations
- rejected or deferred decisions

Rules:
- contents here are NOT automatically approved for implementation
- agent must treat NOTES.md as context only
- all actionable work must be moved to docs/TASKS.md.
- implementation priority must follow:
  AGENT.md → CONSTRAINTS.md → DECISIONS.md → ROADMAP.md → TASKS.md
- it is NOT a task list. If an item appears only in NOTES.md and not in TASKS.md or ROADMAP.md, do not implement it by default

---

## NOTE-001 — Browser cache may cause stale config

### Context
Observed during local development using python -m http.server.

### Observation
After updating APP_CONFIG.vendor.phone, desktop browser still used old phone number.

### Risk / Problem
- users may send order to outdated phone number
- inconsistent behavior across devices
- difficult debugging during development

### Options Considered
- rely on browser refresh
- instruct users to hard refresh
- implement cache-busting for static assets

### Decision
Deferred

### Reason
- not critical during current development stage
- better handled during deployment/readiness phase

### Future Trigger
- before production deployment
- when vendor config becomes business-critical

### Related
- TASK-011 (deployment readiness)
- index.html (asset loading)

---

## NOTE-002 — Ambiguity in item numbering and quantity in WhatsApp message

### Context

Observed during manual testing of generated WhatsApp message.

### Observation

Message format shows:

* Item 1, Item 2
* Produk + Kuantiti

But readability may degrade when:

* many items are added
* same product repeated with different notes

### Risk / Problem

* user/vendor may misread order details
* ambiguity in distinguishing items
* increased risk of incorrect fulfillment

### Options Considered

* keep current format (simple, flat list)
* improve formatting (grouping, spacing, separators)
* introduce structured grouping (e.g., by product/category)

### Decision

Deferred

### Reason

* current format is still usable for small orders
* improvement depends on real usage patterns
* premature formatting complexity should be avoided

### Future Trigger

* when real orders frequently exceed 3–5 items
* when vendors report confusion or mistakes

### Related

* `js/message-formatter.js`
* future UX improvement (v0.1.x)
* potential TASK candidate

---

## NOTE-003 — Missing order identifier (order ID)

### Context

Observed while reviewing order communication flow.

### Observation

Generated message does not include any order identifier.

### Risk / Problem

* vendor cannot easily reference specific orders
* difficult to track multiple simultaneous orders
* no simple way to confirm or follow up

### Options Considered

* no order ID (keep simple)
* simple incremental ID (frontend-generated)
* timestamp-based ID
* vendor-defined ID prefix

### Decision

Deferred

### Reason

* current app is single-message generation tool, not order system
* adding ID introduces pseudo-state without persistence → requires state → violates current scope
* risk of misleading “system-like” behavior

### Future Trigger

* when vendors handle multiple concurrent orders
* when order tracking becomes necessary
* when persistence or backend is introduced

### Related

* future v0.2+ consideration
* potential interaction with order state concept

---

## NOTE-004 — Risk of duplicate or unconfirmed orders in WhatsApp flow

### Context
Observed while thinking about real-world usage after message is sent via WhatsApp.

### Observation
Users may:
- send the same order multiple times
- modify and resend slightly different orders
- send incomplete orders and follow up later

Vendor receives:
- multiple similar messages
- no clear indication which order is final or confirmed

### Risk / Problem
- vendor confusion on which order to process
- duplicate order processing
- increased manual clarification via chat
- poor transaction clarity between buyer and vendor

### Options Considered
- keep current behavior (WhatsApp handles conversation)
- introduce order identifier (ID) in message
- introduce confirmation step inside app
- rely on WhatsApp-level workflow (manual confirmation, reply, etc.)

### Decision
Deferred (out of current application scope)

### Reason
- current app is a message generator, not an order management system
- confirmation and conversation flow naturally happen inside WhatsApp
- adding lifecycle logic would introduce system-level complexity (state, tracking)

### Future Trigger
- vendors report frequent duplicate or unclear orders
- move toward order tracking or state management (v0.2+)
- need for lightweight confirmation mechanism without backend

### Related
- NOTE-003 (order identifier idea)
- future order state / workflow concept
- WhatsApp conversation flow (external to app)

### Status
Partially addressed

### Superseded By
TASK-015

---

## NOTE-005 — Structured message per business type

### Context

Idea for extending usability across different vendor types.

### Observation

Current message format is generic:

* suitable for simple product orders

Different businesses may require:

* food (notes like “less spicy”)
* clothing (size, color)
* services (date, time)

### Risk / Problem

* one format may not fit all vendor types
* message may become inefficient or unclear

### Options Considered

* keep single generic format
* allow configurable message template
* introduce category-based formatting

### Decision

Deferred

### Reason

* current scope is single-vendor, simple order → belongs to v0.2 (multi-config / multi-vendor)
* introducing template system increases complexity
* requires clear abstraction boundary

### Future Trigger

* multi-vendor support (v0.2+)
* real usage across different industries

### Related

* `js/message-formatter.js`
* v0.2 direction (multi-config support)

---

## NOTE-006 — Mobile interaction friction for item management

### Context

Observed during manual interaction testing on mobile.

### Observation

Potential friction areas:

* tapping remove vs collapse
* adding item scroll position
* focus behavior after adding item

### Risk / Problem

* slower order input
* accidental actions
* reduced usability for real users

### Options Considered

* keep current behavior
* refine interaction (spacing, tap zones)
* improve focus and scroll behavior

### Decision

Partially addressed

### Reason

* TASK-008 already improved interaction UX
* further refinement depends on real usage feedback

### Future Trigger

* real user testing
* observed friction during repeated usage

### Related

* TASK-008 (item interaction UX)
* css/style.css
* js/form.js

---

## NOTE-007 — Action feedback UX consistency

### Context

Before and after replacing alert() with non-blocking feedback.

### Observation

Action feedback moved from:

* blocking alert()
  → non-blocking UI feedback

### Risk / Problem

* inconsistent feedback timing or visibility
* user may miss feedback message
* unclear success/failure states

### Options Considered

* simple inline message
* toast-style feedback
* persistent status indicator

### Decision

Accepted (non-blocking feedback)

### Reason

* aligns with modern UX
* reduces disruption
* consistent with live-preview model

### Future Trigger

* if users miss feedback messages
* if feedback becomes unclear in real usage

### Related

* TASK-009 (action feedback)
* js/app.js
* js/whatsapp-url.js

---

## NOTE-008 — Config-driven product list limitations

### Context

After stabilizing vendor-oriented config structure.

### Observation

Products are currently:

* flat list
* no grouping
* no metadata

### Risk / Problem

* difficult to scale for larger product sets
* limited flexibility for future UI improvements

### Options Considered

* keep flat list
* introduce categories
* introduce product metadata (price, tags, etc.)

### Decision

Deferred

### Reason

* current use case is simple
* adding structure increases complexity
* no immediate need without real vendor usage

### Future Trigger

* vendors with large product catalogs
* need for filtering/grouping

### Related

* TASK-005 (config stabilization)
* js/config.js
* v0.2 direction

---

## NOTE-009 — Static deployment cache safety

### Context

Observed cache issue during development and resolved in TASK-011.

### Observation

Browser may cache JS files, causing outdated config or behavior.

### Risk / Problem

* users may use outdated version
* incorrect vendor phone or product list

### Options Considered

* no mitigation
* manual refresh
* cache-busting via versioned assets

### Decision

Accepted (cache-busting applied)

### Reason

* simple and effective
* no backend required
* suitable for static deployment

### Future Trigger

* when deploying to CDN or production hosting
* when versioning strategy changes

### Related

* TASK-011 (deployment readiness)
* index.html (asset versioning)

### Status
Completed

### Superseded By
TASK-011 (v0.1.4)

---

## NOTE-010 — Mixed language usage and future localization strategy

### Context
Observed during development and testing of UI and message output.

### Observation
The application currently mixes:
- English (UI labels, system text)
- Malay (example content, message text)

This creates inconsistency in user experience.

### Risk / Problem
- inconsistent language reduces perceived product quality
- may confuse users if mixed within same flow
- difficult to scale when adding more UI text or features

### Options Considered
- keep mixed language (flexible but inconsistent)
- standardize on one language (EN or MY)
- introduce language selection (EN / MY)
- implement full localization (translation layer)

### Decision
Deferred (standardize to one language first)

### Reason
- current focus is feature and UX stability
- introducing localization adds complexity (state, text management)
- better to stabilize base language before translation

### Future Trigger
- preparing for real user distribution
- need to support both English and Malay users
- introducing product branding and wider audience

### Related
- UI text in `index.html`, `js/app.js`
- message content in `message-formatter.js`
- future localization system (v0.2+ or pre-v1.0)

---

## NOTE-011 — Product naming, branding, and header extensibility

### Context
Current application uses a temporary product name and minimal header branding.

### Observation
- "WhatsApp Order Generator" is a temporary name
- no logo or visual identity yet
- header currently displays vendor name and basic app identity
- tagline is already defined: "Generate structured WhatsApp order messages."

### Risk / Problem
- temporary naming reduces perceived product identity
- future branding changes may require layout adjustment
- lack of reserved space for logo or brand elements

### Options Considered
- keep current simple header
- introduce placeholder branding structure
- fully implement branding system (logo, theme, identity)

### Decision
Deferred (prepare structure, not full branding)

### Reason
- current focus is functionality and usability
- branding decisions are not finalized
- premature branding implementation may require rework

### Future Trigger
- product name finalized
- logo and visual identity available
- preparing for public release (alpha/beta/v1.0)

### Related
- TASK-006 (header hierarchy and reserved profile area)
- `index.html`
- `css/style.css`
- future UI/branding enhancement

---

## Structure template:

```
## [NOTE-ID] Title

### Context
Where this idea/issue came from.

### Observation
What you noticed.

### Risk / Problem
Why it matters.

### Options Considered
- Option A
- Option B
- Option C

### Decision
- accepted / deferred / rejected

### Reason
Why you made that decision.

### Future Trigger
When this should be revisited.

### Related
- TASK-xxx
- file/module
- release version

```

---

## Handling outdated notes

Do NOT delete.

Instead:

```
### Status
Outdated

### Superseded By
TASK-008 or v0.1.4 changes
```