# CHANGELOG

All notable changes for **WhatsApp Order Generator** will be documented in this file.

---

# Versioning Policy

- MAJOR: architectural or conceptual shifts
- MINOR: new capabilities
- PATCH: fixes, clarity, refactor

Uses `0.x.x` until a stable product baseline is reached.

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

---

# Current Status

Version: **0.1.1**

Current focus:

- documentation governance cleanup
- production-safe static deployment
- vendor/buyer product alignment
- agent-ready repository guidance

---

# Future Milestones (Indicative)

- v0.2 — UX refinement and inline validation feedback
- v0.3 — vendor-configurable local data
- v0.4 — unique shop/page routing
- later — persistence layer evaluation

---

# Scope Boundary Check

This project remains:

✔ a lightweight vendor-facing / buyer-facing WhatsApp order Application  
✘ not an order management system  
✘ not an e-commerce platform  
✘ not a marketplace  

---

End of CHANGELOG.

---