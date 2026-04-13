# WhatsApp Order Generator

## Overview

WhatsApp Order Generator is a lightweight web application that allows vendors to create a simple shareable order page so buyers can submit structured orders via WhatsApp.

This project is intentionally designed as a **minimal order-intent system**, not a full order management platform.

---

## Product Position

This is a **user-facing Application** under BUSINESS K-01.

It consumes reusable nodes (Very Small tools and optionally Small modules) and combines them with UI and flow logic to deliver a usable product.

---

## Current Status

Version: **v0.1.3**

- Static frontend implementation
- Buyer-side order flow fully functional
- Config-driven vendor identity and product setup
- Improved inline validation and preview-state UX
- Ready for static hosting deployment
- No backend or persistence yet

---

## Purpose

Enable vendors to receive **complete, structured WhatsApp orders** from buyers with minimal friction.

Goals:
- eliminate incomplete order messages
- standardize order format
- reduce manual clarification
- provide a fast, mobile-friendly ordering experience

---

## Target Users

### Vendors
- small business sellers using WhatsApp
- Instagram / TikTok / Facebook sellers
- dropship agents

### Buyers
- customers placing orders through shared vendor links

---

## v1.0 Product Scope (Target)

The intended product flow:

```

Vendor setup
→ vendor defines shop profile and products
→ system provides unique shareable URL
→ vendor shares URL

Buyer flow
→ buyer opens vendor page
→ selects products
→ fills order details
→ clicks send
→ WhatsApp opens with structured order message

```

---

## Current Implementation Scope

The current build supports:

- buyer-facing order form
- multi-item product selection
- input validation
- structured message generation
- WhatsApp link generation
- message preview
- copy / open WhatsApp actions
- local storage (customer draft)

Limitations:
- single vendor (config-based)
- no vendor registration
- no persistent database
- no unique URL routing

---

## Core Flow

```

Order Form
↓
Input Validator
↓
Message Composer
↓
Message Formatter
↓
WhatsApp Message Generator (Very Small Tool)
↓
Preview / Copy / Open WhatsApp

````

---

## Features

### Order Input
- customer name (required)
- optional phone number
- multi-item order support
- product selection (config-driven)
- quantity and notes

### Output
- structured WhatsApp message
- encoded WhatsApp link
- live preview
- copy message
- copy link
- open WhatsApp

### UI
- mobile-first layout
- collapsible item sections
- responsive design
- instant preview updates

---

## System Composition

This Application consumes reusable nodes:

### Very Small
- WhatsApp Message Generator (transport / link generation)

### Local Application Logic
- Input Validator
- Message Composer
- Message Formatter

Notes:
- Some logic is currently implemented locally for speed
- These may later be extracted into reusable nodes when justified

---

## Scope Boundary

### In Scope
- order input
- structured message generation
- WhatsApp delivery
- preview and user actions

### Out of Scope
- payment processing
- inventory management
- order tracking
- CRM / customer database
- automation / chatbot
- multi-vendor dashboard
- marketplace features

---

## Deployment

Current deployment model:

- static hosting (Netlify / Vercel / GitHub Pages)
- no backend required

---

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript

No frameworks. No build step.

---

## Project Structure

```
index.html
css/style.css
js/config.js
js/form.js
js/input-validator.js
js/message-composer.js
js/message-formatter.js
js/whatsapp-url.js
js/app.js
docs/
  agents/    → agent definitions (e.g., release-governor)
  tasks/     → execution runs (e.g., release-v0.1.3)
````

---

## Edge Cases

* empty customer name → blocked
* no valid item → blocked
* invalid quantity → normalized to minimum 1
* special characters → URL encoded
* long message → limited by WhatsApp

---

## Persistence Strategy

Current:

* static frontend only
* local storage for draft data

Planned evolution:

1. static application (current)
2. local/embedded persistence
3. hosted backend (only after cost and usage are understood)

---

## Future Direction

* improve item interaction UX
* vendor-specific static routing
* lightweight vendor config file format
* lightweight persistence layer

Reusable nodes may be extracted when patterns stabilize.

---

## Conceptual Identity

This system is:

→ a vendor-configured WhatsApp order page

Not:

→ an e-commerce platform
→ an order management system
→ a marketplace

---

## Node Reusability Principle

A reusable node may originate from a specific system lineage, but is not restricted to that lineage.

This Application consumes reusable nodes (such as the WhatsApp Message Generator) without redefining their responsibilities.

---

## Conclusion

A minimal, fast, and practical way to turn unstructured WhatsApp orders into structured, ready-to-send messages.

Focus:

* usability
* speed
* correctness

Expand only when necessary.


---
