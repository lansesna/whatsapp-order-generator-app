# CHANGELOG

All notable changes for **WhatsApp Order Generator** will be documented in this file.

---

# Versioning Policy

- MAJOR: architectural or conceptual shifts
- MINOR: new capabilities
- PATCH: fixes, clarity, refactor

Uses `0.x.x` until a stable product baseline is reached.

---

## [v0.1.7] - Unreleased

### Changed
- repository snapshot commit prepared for backup/sync only (v0.1.7 remains unreleased)
- Internal codename introduced for development tracking: NT-C
- introduced user-facing product naming direction:
  - temporary: Order WhatsApp Generator
  - product name: Nak Tak
- repository is now being developed together with an agent execution/control layer
- current documentation updates include agent-layer governance/runtime docs for upcoming commits
- these agent-layer documentation updates are non-functional (no direct app behavior change)
- deployment-governance direction documented:
  - current version sticks to simple GitHub Pages-friendly publish layout (root `index.html`)
  - future phase may adopt `src -> docs/dist` build pipeline when needed
- deployment structure aligned with current governance choice:
  - moved `index.html` to repository root for GitHub Pages compatibility
  - updated asset/script references in root `index.html` to `src/css/*` and `src/js/*`
- TASK-020: improved label clarity for user understanding in src/ UI:
  - Order Form -> Isi Pesanan
  - (optional) -> (Tidak wajib) for phone and note labels
  - Item Pesanan -> Senarai Pesanan
  - dynamic item title Item n -> Pilihan n
  - Preview Mesej -> Pratonton Mesej
  - preview placeholder wording aligned to Pratonton
- no validation logic or field structure changes (wording-only update)

---

## [v0.1.6] — 2026-04-20

### Added
- feedback/report mechanism (external link to developer support channel)

### Changed
- preview now preserves last valid state during temporary invalid input
- improved empty and invalid state clarity
- improved mobile interaction for add/remove item flow
- improved item summary clarity in collapsed state
- added optional vendor instruction hint for post-order confirmation
- improved UI readability, spacing, and visual hierarchy

### Updated (Documentation)
- TASKS.md normalization and consistency improvements
- NOTES.md expanded with new observations and classified for future phases

---

## [0.1.5] - 2026-04-14

### Added

- TASK-016: optional, non-intrusive vendor instruction hint near preview/action flow.
- configurable hint text via `APP_CONFIG.settings.orderFlowHint`.
- release task definition for `v0.1.5`:
  - `docs/tasks/release-v0.1.5.md`

### Changed

- completed release scope tasks:
  - TASK-013: clearer empty vs invalid preview-state guidance
  - TASK-014: smoother mobile add/remove item flow (focus, visibility, layout stability)
  - TASK-015: clearer collapsed item summaries (product, qty, concise note context)
  - TASK-016: optional vendor guidance hint added (non-blocking)
- kept live-preview-first interaction model intact (no manual Generate Order step).
- updated static asset cache-busting query strings in `index.html` to `?v=0.1.5`.

### Documentation Updates (Non-Functional)

- wording and alignment updates in:
  - `README.md`
  - `docs/FLOW.md`
  - `docs/TASKS.md`
  - `docs/PRODUCT.md`
  - `docs/SETUP.md`
- governance/planning updates reflected in current release state:
  - `docs/RELEASE.md`
  - `AGENT.md`
  - `CONSTRAINTS.md`
  - `ROADMAP.md`
  - `NOTES.md`

### Notes

- application remains static-first, frontend-only, and single-vendor per deployment.
- TASK-010 and TASK-012 remain deferred and are not included in this release.

---

## [0.1.4] - 2026-04-14

### Added

- non-blocking inline action feedback for:
  - Open WhatsApp
  - Copy Message
  - Copy Link
- release task definition for `v0.1.4`:
  - `docs/tasks/release-v0.1.4.md`

### Changed

- completed release scope tasks:
  - TASK-005: stabilized vendor-oriented config model (`vendor`, `products`, `settings`)
  - TASK-006: refined vendor-first header/profile hierarchy
  - TASK-007: removed redundant Generate Order action from live-preview flow
  - TASK-008: improved item-card add/remove/collapse predictability and summary sync
  - TASK-009: replaced blocking action alerts with inline non-blocking feedback
  - TASK-011: aligned production deployment checklist and docs
- removed redundant manual generate action and confirmed live-preview-first interaction
- improved item interaction predictability (add/remove/collapse/summary stability)
- aligned deployment docs for static production readiness
- added asset cache-busting query strings in `index.html` (`?v=0.1.4`)
- aligned `README.md`, `docs/FLOW.md`, `docs/SETUP.md`, and `docs/TASKS.md` with current behavior

### Notes

- application remains static-first, frontend-only, and single-vendor per deployment
- no backend, routing, persistence layer, or framework introduced

---

## [0.1.3] - 2026-04-13

### Added

Core UX and configuration updates completed:

- TASK-001: inline validation feedback area in UI (non-alert validation flow)
- TASK-002: explicit preview states for empty, invalid, and valid conditions
- TASK-003: config-driven vendor/shop name display in header
- TASK-004: refined header hierarchy with vendor identity as primary focus

Repository execution structure introduced:

- added `docs/agents/release-governor.md`
- added `docs/tasks/release-v0.1.3.md`
- added `docs/RELEASE.md`

### Changed

- restructured application config into `vendor`, `products`, and `settings` sections
- aligned runtime config reads across `app.js`, `form.js`, and `whatsapp-url.js`
- updated `docs/SETUP.md` to match current config structure
- updated `docs/TASKS.md` to include TASK-004 insertion and consistent subsequent numbering

### Notes

- Application remains static-first (HTML/CSS/Vanilla JS), frontend-only, and single-vendor per deployment
- No backend, database, framework, or routing architecture introduced in this release

---

## [0.1.2] - 2026-04-13

### Added

Agent-governance documentation baseline:

- added `AGENT.md`
- added `CONSTRAINTS.md`
- added `DECISIONS.md`
- added `ROADMAP.md`
- added `docs/STRUCTURE.md`
- added `docs/TASKS.md`

### Changed

- rewrote `README.md` to align with Application identity and vendor → buyer product model
- rewrote `docs/PRODUCT.md` to reflect vendor-configured WhatsApp order page scope
- rewrote `docs/FLOW.md` to include vendor flow, buyer flow, system flow, and node interaction flow
- refined `docs/SETUP.md` for static-first production deployment and config-driven setup
- corrected governance wording to separate the Application from PCB1-Q01 identity
- clarified reusable node consumption at Application level

### Notes

- This release establishes the first Codex-ready governance baseline for the repository
- Functional behavior remains largely unchanged
- Main impact is repository clarity, execution safety, and development discipline

---

## [0.1.1] - 2026-04-13

### Changed

- corrected Application identity by removing PCB1-Q01 linkage
- aligned README, PRODUCT, and FLOW with vendor → buyer WhatsApp order flow
- clarified reusable node consumption at Application level
- improved governance clarity for agent-assisted development

### Notes

- This version refines the initial v0.1.0 baseline after governance cleanup
- No major functional change introduced

---

## [0.1.0] - 2026-04-04

### Added

Application baseline established:

- Defined as a user-facing Application under `/60-applications/`
- Buyer-side order flow implemented
- Multi-item order form
- Collapsible item sections
- Live preview
- Copy message / copy link actions
- WhatsApp open/send flow
- Local draft storage for customer data
- Mobile-first responsive UI

Current application logic includes:

- input validation
- message composition
- message formatting
- WhatsApp transport integration

### Changed

- Repositioned from earlier tool-like framing to Application-level product framing
- Removed incorrect identity coupling between the Application and PCB1-Q01
- Clarified that reusable nodes may be consumed by the Application without being redefined by it
- Locked static-first deployment path for early production versions
- Aligned documentation with vendor → buyer → WhatsApp order flow

### Notes

- This is the first stable Application baseline
- Current implementation is static-first and ready for online hosting
- Vendor registration, persistent vendor data, and unique vendor routing remain future work

---

# Legacy History

These entries are preserved for development traceability from the earlier pre-Application framing stage.

---

## [0.2.0] - 2026-03-29

### Added

- Multi-item order support
- Dynamic add/remove item flow
- Collapsible item sections
- Multi-item message generation
- Live preview updates
- Optional customer phone field

### Changed

- Improved mobile-first form usability
- Improved repeated item input clarity
- Consolidated earlier concept documentation into README

### Notes

- This version represented the functional prototype stage before Application governance was clarified

---

## [0.1.0] - 2026-03-17

### Added

Initial prototype:

- Order form
- Basic validation
- Message generation
- WhatsApp URL generation
- Live preview
- Responsive UI

### Notes

- This version represented the earliest working prototype baseline



