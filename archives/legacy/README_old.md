# WhatsApp Order Generator

## Overview
A lightweight tool to generate structured WhatsApp order messages from a simple form input.

This project is intentionally scoped as an **order-intent generator**, not an order management system.

---

## Current Status
Functional Prototype v0.2 (Multi-item)

---

## Purpose

Provide a simple tool that automatically generates WhatsApp order messages from structured input.

The goal is to ensure:
- order information is complete
- messages are consistent
- orders can be sent directly via WhatsApp

This tool:
- does NOT manage orders
- only generates order messages

It acts as a **bridge between order form and WhatsApp chat**.

---

## Problem Being Solved

In manual WhatsApp selling:
- customers send unstructured messages
- important details are missing
- sellers must ask repeatedly
- messages are inconsistent
- hard to standardize order intake

Example:

> want 2 sambal

Missing:
- product type
- quantity confirmation
- name
- notes

This tool enforces a **structured order format before sending**.

---

## Core Flow

```

Customer Input
↓
Order Form
↓
Message Builder
↓
WhatsApp Link Encoder
↓
Open WhatsApp

```

---

## Features

### Core Features
- Order form (customer + items)
- Multi-item order support
- Basic validation (input integrity)
- Message builder (structured template)
- WhatsApp URL generator
- Live preview
- Open WhatsApp / Copy Message / Copy Link
- Responsive mobile-first UI
- Lightweight static architecture

### Input Fields
- Customer name
- Optional phone number
- Product selection
- Quantity
- Optional note

---

## Mobile Wireframe (utama)

This is the basic layout for mobile.

```
--------------------------------
WhatsApp Order Generator
--------------------------------

Nama Pelanggan
[________________________]

▼ --- collapsible item ---
Produk
[ Sambal Pedas  ▼ ]

Kuantiti
[ 1 ]

Catatan (optional)
[________________________]
[________________________]

--- end collapsible item --- 

▼ --- collapsible item ---
Produk
[ Sambal Pedas  ▼ ]

Kuantiti
[ 1 ]

Catatan (optional)
[________________________]
[________________________]

--- end collapsible item --- 

▼ --- collapsible item ---
Produk
[ Sambal Pedas  ▼ ]

Kuantiti
[ 1 ]

Catatan (optional)
[________________________]
[________________________]

--- end collapsible item --- 

[icon button +]

[ Generate Order ]

--------------------------------
Message Preview
--------------------------------
ORDER BARU

Nama: Ali
Produk: Sambal Pedas
Kuantiti: 1

Catatan: -

Produk: Sambal Pedas XL
Kuantiti: 2

Catatan: -
--------------------------------

[ Open WhatsApp ]

[ Copy Message ]
[ Copy Link ]
```

---

## Desktop Layout

For desktop, we can use a two-column layout.

```
-------------------------------------------------------
WhatsApp Order Generator
-------------------------------------------------------
                             
Order Form                    Message Preview
-------------------------------------------------------
                             
Nama Pelanggan                ORDER BARU
[___________]  
                              Nama: Ali

▼ --- collapsible item ---    Produk: Sambal Pedas
Produk                        Kuantiti: 2
[Dropdown ▼]
                              Catatan: -
Kuantiti  
[1]                           Produk: Sambal Pedas
                              Kuantiti: 2
Catatan
[____________]                Catatan: -
                             
--- end collapsible item --- 
                             
▼ --- collapsible item ---
Produk                        
[Dropdown ▼]                  
                             
Kuantiti                      
[1]
                             
Catatan
[____________]
 
[icon button +]
 
--- end collapsible item --- 
                             
------------------------------------------------------
[ Generate Order ] 

------------------------------------------------------                              
                              [ Open WhatsApp ]

[ Copy Message ]              [ Copy Link ]
```

---

## HTML Layout Blueprint

Recommended basic HTML structure:

```
body
 ├── header
 │
 ├── main
 │    ├── section.order-form
 │    │      ├── input.customerName
 │    │      ├── select.product
 │    │      ├── input.qty
 │    │      ├── textarea.note
 │    │      └── button.generate
 │    │
 │    ├── section.message-preview
 │    │      └── pre.message-box
 │    │
 │    └── section.actions
 │           ├── button.open-whatsapp
 │           ├── button.copy-message
 │           └── button.copy-link
 │
 └── footer
```

This makes the HTML structure very clear.

---

## CSS Layout Strategy

Use the following approach:

```
mobile first
```

Suggested technique:

```
flexbox
```

for arrangement.

Example concept:

```
.order-form
display: flex
flex-direction: column
gap: 12px
```

Desktop can use:

```
grid
```

for two columns.

---

## UI Behaviour

Some important behaviors:

### before generate

Empty preview or:

```
Message preview will appear here
```

---

### after generate

Preview is displayed.

---

### if validation fails

Example error:

```
Sila masukkan nama pelanggan
```

---

### after Open WhatsApp

No need to redirect the page.

Use:

```
window.open()
```

---

## Scope Boundary

PCB1-Q01 is strictly:

> an order-intent generator

### In Scope
- structured order input
- order message formatting
- WhatsApp link generation
- message preview
- mobile-friendly UI

### Out of Scope
- inventory deduction
- price calculation
- order tracking
- payment gateway
- shipping integration
- chatbot / auto-reply
- CRM / customer database
- team inbox / workflow system

If these are added, the system becomes an e-commerce platform.

---

## Boundary with PCB1-Q02

### PCB1-Q01
Focus: **Order Creation**

> What does the customer want to buy?

Output:
```

ORDER BARU
Nama: Ali
Produk: Sambal
Qty: 2

```

---

### PCB1-Q02
Focus: **Reply Communication**

> What should the seller reply?

Output:
```

Thank you for your order.
Please proceed with payment...

```

---

## Completion Criteria (Definition of Done)

The system is complete when:
1. user fills the form
2. system generates structured order message
3. message is encoded into WhatsApp link
4. link opens correctly
5. WhatsApp opens with pre-filled message
6. usable via static hosting

---

## Tech Stack

- HTML
- CSS
- JavaScript (vanilla)

No framework. No backend.

---

## Project Structure

```

index.html
css/style.css
js/config.js
js/form.js
js/message-builder.js
js/whatsapp.js
js/app.js
docs/

```

---

## Limitations

- No backend
- No database
- No persistent storage (except browser)
- No analytics
- No order lifecycle
- No inventory or pricing logic

---

## Optional Extensions (Still within Q01)

- Load product list from Google Sheets
- Load message template from Google Sheets
- Log order request to Google Sheets

These remain:
> order generation support, not order management

---

## Future Direction

Possible controlled evolution:

- v0.3 — improved local persistence
- v0.4 — configurable product presets
- v0.5 — export/share order summary

---

## Conceptual Identity

This system is:

```

Order Message Engine

```

Not:

```

E-commerce System

```

---

## Conclusion

PCB1-Q01 is a small but strategic component:
- standardizes WhatsApp order intake
- improves message consistency
- prepares foundation for future automation

Its strength comes from **strict scope control**.

If expanded beyond scope, it becomes a full commerce system,
which is intentionally avoided at this stage.

---