# PRODUCT — WhatsApp Order Generator

## What it is

WhatsApp Order Generator is a lightweight application that allows vendors to create a simple shareable order page so buyers can submit structured orders via WhatsApp.

---

## Why it exists

Manual WhatsApp ordering is inefficient:

- customers send incomplete messages
- sellers must ask repeatedly for missing details
- order formats are inconsistent
- mistakes are common

This application fixes that by enforcing a structured order flow before the message is sent.

---

## Who it is for

### Vendors
- small business sellers using WhatsApp
- Instagram / TikTok / Facebook sellers
- dropship agents

### Buyers
- customers placing orders through a shared vendor link

---

## Core Idea

Replace unstructured chat-based ordering with a simple structured order page.

Instead of:

> “nak 2 sambal”

The buyer uses a guided form and sends:

```

ORDER BARU

Nama: Ali
Telefon: 60123456789

Item Pesanan

Item 1
Produk: Sambal Pedas
Kuantiti: 2
Catatan: -

```

---

## How it works

### Vendor Flow

```

Vendor sets up shop profile and product list
→ system provides a shareable page URL
→ vendor shares link to customers

```

---

### Buyer Flow

```

Buyer opens vendor page
→ selects products
→ enters order details
→ clicks "Send"
→ WhatsApp opens with structured order

```

---

## What the product does

- provides a structured order form
- enforces required order information
- generates a consistent order message
- opens WhatsApp with the message pre-filled
- allows copy message / copy link

---

## What the product does NOT do

This is intentionally not:

- an e-commerce platform
- an order management system
- a payment system
- an inventory system
- a CRM
- a chatbot or automation system

---

## Current Implementation (v0.1)

- static frontend application
- single vendor configuration (via config)
- multi-item order form
- structured message generation
- WhatsApp integration
- mobile-first UI

Limitations:
- no vendor registration
- no database
- no unique vendor URLs yet
- no persistent product storage

---

## Target v1.0 Capability

The product should enable:

- vendor-defined shop profile
- vendor-defined product list
- unique vendor page URL
- buyer-driven ordering via that page
- structured WhatsApp order delivery

---

## Value

For vendors:
- faster order intake
- fewer mistakes
- cleaner communication
- no need for complex systems

For buyers:
- easier ordering
- clear product selection
- no confusion

---

## Product Principles

- simple > powerful
- fast > complete
- structured > flexible
- usable > abstract

---

## Scope Boundary

### In Scope
- order input
- structured message generation
- WhatsApp delivery
- mobile-friendly ordering UI

### Out of Scope
- payment processing
- inventory tracking
- order dashboard
- analytics
- multi-user systems
- automation workflows

---

## Evolution Path

```

v0.1 → static order page (current)
v0.2 → improved UX and validation
v0.3 → vendor-configurable data
v0.4 → unique shop routing
later → persistence layer (local or hosted)

```

---

## Conceptual Identity

This product is:

→ a vendor-configured WhatsApp order page

It is NOT:

→ an e-commerce platform  
→ a marketplace  
→ a backend system  

---

## Summary

A minimal product that turns messy WhatsApp ordering into a structured, reliable, and fast ordering flow.

Deliver value first. Expand only when necessary.

---