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

Application baseline established:

- Defined as user-facing Application
- UI fully implemented (mobile-first)
- Multi-item order form
- Collapsible item sections
- Live preview
- Copy message / link
- WhatsApp integration
- Local storage (customer data)

Architecture:

- Message Composer (Small)
- Input Validator
- Message Formatter
- WhatsApp URL Encoder

## Changed

- Reset from legacy structure → Application model
- Simplified architecture (no Medium system)
- Clean separation of logic:
  - form
  - validation
  - composition
  - formatting
  - transport

## Notes

- This is the first stable product baseline
- Ready for deployment

---

# Legacy History

(Pre-Application Phase)

---

## [0.2.0] - 2026-03-29

- Multi-item support
- Collapsible items
- UI improvements

## [0.1.0] - 2026-03-17

- Initial prototype
- Basic message generation

---

# Current Status

Version: 0.1.0

Focus:
- stability
- usability
- deployment

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