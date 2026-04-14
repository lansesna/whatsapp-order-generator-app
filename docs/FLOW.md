# FLOW — WhatsApp Order Generator

---

## 1. Vendor Flow (Target)

```

Vendor setup
→ define shop profile
→ define product list
→ system generates shareable URL
→ vendor shares link to buyers

```

Notes:
- Vendor flow is partially future (not fully implemented in v0.1)
- Currently simulated via local config

---

## 2. Buyer Flow (Current)

```

1. Open vendor page
2. Fill in order details
3. Add one or more items
4. Preview updates automatically in real-time
5. No manual "Generate Order" step
6. When satisfied, choose action:
   - Open WhatsApp
   - Copy message
   - Copy link

```

Outcome:
- WhatsApp opens with structured order message
- or message/link is copied
- item card summaries stay in sync with product, qty, and concise note context
- add/remove item flow keeps mobile context stable (new item revealed, focus directed, reduced jump on remove)
- temporary invalid edits keep last valid preview visible while actions remain disabled
- subtle hint reminds buyer that confirmation continues in WhatsApp with vendor
- footer provides simple external feedback/report action (developer channel, separate from vendor contact)
- collapse/expand affordance is visually clearer for faster item scanning
- action status is shown inline (non-blocking feedback)
- interaction is fully live-preview-first (no manual generate step)

---

## 3. System Flow (Implementation)

```

UI (form.js)
↓
getOrderFormData()
↓
validateOrderData()
↓
composeOrderMessageData()
↓
formatOrderMessage()
↓
generateWhatsAppURL()
↓
UI update (preview + actions)

```

---

## 4. Data Flow

```

Form Input
→ structured object
→ validated
→ normalized
→ formatted message string
→ encoded WhatsApp URL

```

Key rule:
- message string is single source of truth

---

## 5. UI Layout (Wireframe)

### Mobile Layout

```

---

## WhatsApp Order Generator

Nama Pelanggan
[________________________]

▼ Item
Produk [Dropdown]
Kuantiti [1]
Catatan [...]

[ + Tambah Item ]

---

## Preview

[ Open WhatsApp ]
[ Copy Message ] [ Copy Link ]

```

---

### Desktop Layout

```

---

## Order Form                    Preview

[input form]                  [message]

---

```
                           [ Open WhatsApp ]
                           [ Copy ] [ Link ]
```

```

---

## 6. Current vs Target Flow

### Current (v0.1)

```

Static page
→ config-driven product list
→ buyer fills form
→ system generates message
→ WhatsApp link opens

```

---

### Target (v1.0)

```

Vendor config
→ vendor-specific page
→ buyer interacts with page
→ system generates message
→ WhatsApp order sent to vendor

```

---

## 7. Node Interaction Flow

```

Application
→ Input Validator
→ Message Composer
→ Message Formatter
→ WhatsApp Message Generator (Very Small Tool)

```

Notes:
- Application orchestrates flow
- Very Small tool handles WhatsApp transport
- responsibilities must remain separated

---

## 8. Key Principles

### Single Source of Truth
```

message string → preview + WhatsApp link

```

---

### Deterministic Output
```

same input → same message → same link

```

---

### Separation of Concerns

- form.js → input extraction
- input-validator.js → validation
- message-composer.js → structure
- message-formatter.js → final message
- whatsapp-url.js → transport
- app.js → UI orchestration

---

## 9. Failure Handling

- empty state -> onboarding guidance shown in preview area
- missing customer name -> block
- no valid items -> block
- invalid quantity -> corrected to minimum
- invalid after previously valid -> keep last valid preview visible + show correction guidance + disable actions
- invalid state -> correction guidance shown in preview + validation message
---

## 10. Performance Expectations

- instant preview (<100ms)
- smooth interaction with multiple items
- minimal DOM re-rendering

---

