# WhatsApp Order Generator

## Overview

A lightweight application to generate structured WhatsApp order messages from a simple form input.

This project is intentionally scoped as an **order-intent generator**, not an order management system.

---

## Product Position

WhatsApp Order Generator is a user-facing Application under BUSINESS K-01.

It helps sellers quickly create structured WhatsApp order messages without needing a full ordering system.

---

## Current Status

v0.1 — Application Baseline (UI implemented)

---

## Purpose

Provide a simple tool that generates WhatsApp order messages from structured input.

Goals:
- ensure order completeness
- standardize message format
- reduce manual clarification

---

## Target Users

- WhatsApp-based sellers
- Instagram / TikTok sellers
- Dropship agents
- Small businesses without e-commerce systems

---

## User Flow

1. Open app
2. Fill customer details
3. Add items
4. Click "Generate Order"
5. Review preview
6. Open WhatsApp / Copy

---

## Core Flow

```

Order Form
↓
Message Composer
├─ Input Validator
├─ Message Formatter
└─ WhatsApp URL Encoder
↓
Preview / Copy / Open WhatsApp

````

---

## Features

- Multi-item order form
- Collapsible item sections
- Live message preview
- WhatsApp link generation
- Copy message / link
- Local storage (name + phone)
- Mobile-first UI
- Static deployment

---

## System Composition (v0.1)

Small:
- Message Composer

Very Small:
- Input Validator
- Message Formatter
- WhatsApp URL Encoder

No Medium systems used.

---

## Scope Boundary

### In Scope
- order input
- message generation
- WhatsApp link
- preview & actions

### Out of Scope
- order management
- payments
- inventory
- CRM
- automation

---

## Deployment

- Static hosting (Netlify / Vercel / GitHub Pages)
- No backend required

---

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript

---

## Project Structure

```text
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
````

---

## Edge Cases

* Empty form → blocked
* Invalid quantity → corrected to minimum 1
* Special characters → encoded
* Long messages → WhatsApp limitation

---

## Future Direction

* UI refinement
* presets
* local persistence improvements

---

## Identity

This is:

Order Message Generator

Not:

E-commerce system

---