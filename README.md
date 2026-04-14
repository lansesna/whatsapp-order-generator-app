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

Version: **v0.1.6**

- static frontend application
- single vendor config-driven setup
- live-preview-first message generation
- no Generate Order button
- non-blocking inline action feedback for open/copy actions
- ready for static hosting deployment

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
- non-blocking inline action feedback (open/copy status)

### UI
- mobile-first layout
- collapsible item sections
- responsive design
- instant preview updates
- mobile add/remove flow keeps new item visible with stable focus and scroll context
- clearer item-card summaries (product, qty, concise note snippet when useful)
- safer multi-item remove behavior (single-item floor maintained)
- clearer preview-state guidance (empty vs invalid)
- last valid preview is preserved during temporary invalid edits (actions stay disabled until fixed)
- subtle post-send hint reminds buyer to confirm details with vendor in WhatsApp
- lightweight feedback/report link is available in footer (external contact path)
- modernized visual pass: clearer hierarchy, improved spacing rhythm, and stronger collapse affordance

### Live Preview

Order message is generated automatically as user input becomes valid.

No manual "Generate Order" step is required.

Primary interaction flow:
- fill form fields
- preview updates automatically
- use Open WhatsApp / Copy actions when valid

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

Deployment note:
- static assets use version query strings (`?v=0.1.6`) to reduce stale browser-cache issues after release updates

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

## Config Baseline

The application uses a single structured config object in `js/config.js`:

```js
const APP_CONFIG = {
  vendor: {
    name: "Kedai Sambal",
    phone: "60123456789"
  },
  products: ["Sambal Pedas", "Sambal Original", "Sambal Extra Pedas"],
  settings: {
    previewPlaceholder: "Preview mesej akan muncul di sini apabila maklumat wajib diisi.",
    orderFlowHint: "Selepas hantar, terus sahkan pesanan anda dengan vendor di WhatsApp.",
    previewStateText: {
      empty: "Isi maklumat pelanggan dan pilih item untuk lihat preview mesej.",
      invalid: "Preview belum tersedia. Sila betulkan maklumat pesanan."
    },
    localStorageKeys: {
      customerName: "wag_lastCustomerName",
      customerPhone: "wag_lastCustomerPhone"
    }
  }
};
```

Usage boundary:
- `vendor` -> shop identity and WhatsApp destination
- `products` -> order item selection list
- `settings` -> UI text and local draft storage keys

Header profile support under `vendor`:
- `name` (required visual anchor)
- `description` (optional)
- `contactLabel` (optional)
- `note` (optional)
- `hasLogoPlaceholder` (optional reserved layout slot)

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
