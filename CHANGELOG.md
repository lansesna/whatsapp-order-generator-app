# CHANGELOG

All notable changes for **WhatsApp Order Generator (PCB1-Q01)** will be documented here.

---

# Versioning Policy

- MAJOR: architectural or conceptual shifts
- MINOR: new capabilities
- PATCH: fixes, clarity, refactor

Uses `0.x.x` until stable product baseline is reached.

---

# [0.1.0] - 2026-04-04

## Added

Application baseline reset:

- Defined as user-facing Application (not module/system)
- Scope locked to order-intent generator
- Architecture simplified:
  - 1 Small module (Message Composer)
  - Very Small tools only
- Removed dependency on Medium systems

Core functionality:

- Order form (multi-item)
- Input validation
- Structured message generation
- WhatsApp URL generation
- Live preview
- Copy / Open WhatsApp actions

## Changed

- Repositioned from tool/module → product Application
- Simplified architecture for fast delivery
- Cleaned scope to avoid platform expansion
- Updated README to reflect product identity

## Notes

- This version is the new baseline for development
- Previous iterations are preserved under Legacy History

---

# Legacy History (Pre-Application Phase)

These versions were developed before the system was clearly defined as an Application.

---

## [0.2.0] - 2026-03-29

### Added

- Multi-item order support
- Dynamic add/remove item flow
- Collapsible order sections
- Multi-item message builder
- Live preview updates
- Optional phone field

### Changed

- Mobile-first form improvements
- UI clarity for repeated inputs
- Merged CONOPS into README

---

## [0.1.0] - 2026-03-17

### Added

Initial prototype:

- Order form
- Basic validation
- Message builder
- WhatsApp URL generator
- Live preview
- Responsive UI

---

# Current Status

Version: **0.1.0 (Application Baseline)**

Focus:
- stabilize UI
- ensure usability
- prepare for deployment

---

# Future Milestones (Indicative)

- v0.2 — UI refinement
- v0.3 — local persistence
- v0.4 — presets/templates
- v0.5 — optional integrations

---

# Scope Boundary Check

This project remains:

✔ Order message generation  
✘ Not an order management system  

---

End of CHANGELOG.

---