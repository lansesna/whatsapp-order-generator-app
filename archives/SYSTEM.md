# SYSTEM

**PCB1-Q01 — WhatsApp Order Generator**

**Module:** Progressive Capability Building (PCB1)
**Category:** Sales Tool / Order Intent Generator
**Date revised:** 19-03-2026
**Document version:** 0.1.1

---

# 1. Purpose

Provide a simple tool that automatically generates WhatsApp order messages from customer form input.

The purpose is to structure orders so that:

* order information is complete,
* messages are consistent,
* orders can be easily sent via WhatsApp.

This tool **does not manage orders**, but only **generates orders**.

It acts as a **bridge between the order form and WhatsApp chat**.

---

# 2. Problem Being Solved

In many manual WhatsApp sales:

* customers do not follow order format
* important information is missing
* sellers need to ask for details again
* messages are inconsistent
* difficult to track order sources

Example of a typical customer message:

> want 2 sambal

Follow-up questions required:

* which sambal?
* address?
* name?
* correct quantity?

The WhatsApp Order Generator solves this by **enforcing a structured order format before the message is sent**.

---

# 3. Core Concept

Basic system flow:

```

Customer Input
↓
Order Form
↓
Order Message Generator
↓
WhatsApp Link Encoder
↓
Open WhatsApp Chat

```

This tool ensures that only **complete and well-structured** order messages are sent to WhatsApp.

---

# 4. Scope (Within PCB1-Q01)

Functions included in this module.

### 4.1 Order Form UI

A simple form that collects:

* customer name
* product
* quantity
* optional note

UI must be:

* mobile friendly
* fast to use
* no login required

---

### 4.2 Order Message Generator

Transforms form input into an order message.

Example template:

```

ORDER BARU

Nama: {{customer_name}}
Produk: {{product}}
Kuantiti: {{qty}}

Catatan: {{note}}

```

or if multiple items

```

ORDER BARU

Nama: {{customer_name}}
Produk: {{product}}
Kuantiti: {{qty}}

Catatan: {{note}}

Produk: {{product}}
Kuantiti: {{qty}}

Catatan: {{note}}

```

Template can be:

* static initially
* later configurable via Google Sheets.

---

### 4.3 WhatsApp Link Encoding

The system generates a link:

```

[https://wa.me/](https://wa.me/)<phone>?text=<encoded_message>

```

This is the official **WhatsApp click-to-chat mechanism**.

---

### 4.4 WhatsApp Launch

After the link is generated:

User can:

* click **Open WhatsApp**
  or
* **Copy link**

---

### 4.5 Mobile Optimisation

The tool must work well on:

* phone
* tablet
* desktop

Since the majority of WhatsApp users are mobile.

---

### 4.6 Deployment

The tool must be usable live via:

* GitHub Pages
  or
* Netlify
  or
* Vercel

Without hosting cost.

---

# 5. Optional Scope (Still within PCB1-Q01)

These are still Q01 but not mandatory for MVP.

### 5.1 Product List from Google Sheets

Products can be fetched from:

```

Google Sheets

```

via Apps Script API.

Purpose:

* sellers can update products without editing code.

---

### 5.2 Message Template from Google Sheets

Message templates can be managed via Sheets.

Example:

```

ORDER BARU

Nama: {{name}}
Produk: {{product}}
Qty: {{qty}}

```

---

### 5.3 Order Request Logging

Before WhatsApp is opened:

the system can log:

* timestamp
* product
* qty
* name
* source

to Google Sheets.

This is not **order management**, only **order request logging**.

---

# 6. Out of Scope (Not PCB1-Q01)

This is critical to maintain scope.

The following functions are **not included** in Q01:

### Not Q01

❌ WhatsApp chatbot  
❌ auto reply system  
❌ customer support automation  
❌ order tracking system  
❌ inventory deduction  
❌ payment gateway  
❌ shipping integration  
❌ WhatsApp API automation  
❌ team inbox  
❌ CRM customer management  

If these features are built, the project becomes an **e-commerce platform**, not a generator.

---

# 7. Boundary with PCB1-Q02

Difference between the two modules.

## PCB1-Q01

Focus: **Order Creation**

answers the question:

> What does the customer want to buy?

Example output:

```

ORDER BARU

Nama: Ali
Produk: Sambal Pedas
Qty: 2

```

---

## PCB1-Q02

Focus: **Reply Communication**

answers the question:

> What should the seller reply?

Example output:

```

Thank you for your order.

Total payment: RM20
Please make payment to...

```

---

### Simple rule

If the tool:

produces an **order message**

→ Q01

If the tool:

produces a **reply message**

→ Q02

---

# 8. Completion Criteria (Definition of Done)

PCB1-Q01 is considered complete when:

1. user can fill in the order form
2. system generates a consistently formatted order message
3. system encodes the message into a WhatsApp link
4. link opens correctly
5. WhatsApp opens with the message pre-filled
6. tool is usable via static hosting

---

# 9. MVP Feature Set

The first version only needs:

```

Order Form
Message Generator
WhatsApp Link Encoder
Open WhatsApp
Mobile Layout
Static Hosting

```

No backend required.

---

# 10. Future Evolution (Still Q01)

To add capability without leaving scope:

can add:

* multiple product
* quantity selector
* product dropdown
* template variants
* source tracking
* logging to Google Sheets

But still remains:

> a tool to generate WhatsApp orders.

---

# 11. Conceptual Identity

If represented as a system:

```

WhatsApp Order Generator

Input Layer
↓
Message Builder
↓
WhatsApp Link Encoder
↓
Chat Launch

```

It is not:

```

Ecommerce System

```

It is simply:

```

Order Message Engine

```

---

# Conclusion

PCB1-Q01 is actually a small project but **highly strategic**.

It builds the foundation for:

* WhatsApp commerce
* order flow standardisation
* data capture
* future automation

However, if scope is not controlled, it will quickly evolve into:

> an Orderla / EasyStore clone

which requires a large backend.

With this scope, the project can be completed using:

* HTML
* CSS
* JavaScript
* Google Sheets
* Apps Script

with zero infrastructure cost.

---
