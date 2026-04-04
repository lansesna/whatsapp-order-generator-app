# FLOW — WhatsApp Order Generator

## 1. User Flow

User
→ Fill form
→ Add items
→ Generate
→ Review
→ Send / Copy

---

## 2. System Flow

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

## 3. Data Flow

```

Form Input
→ structured object
→ validated
→ normalized
→ formatted string
→ encoded URL

```

---

## 4. Key Principle

Single source of truth:

message → preview + WhatsApp link

No duplication.

---

## 5. UI Layout (Wireframe)

### Mobile

```
### Mobile Layout

--------------------------------
WhatsApp Order Generator
--------------------------------

Nama Pelanggan
[________________________]

▼ Item
Produk [Dropdown]
Kuantiti [1]
Catatan [...]

[ + Tambah Item ]

[ Generate Order ]

--------------------------------
Preview
--------------------------------

[ Open WhatsApp ]
[ Copy Message ] [ Copy Link ]
```

---

### Desktop

```
### Desktop Layout

-------------------------------------------------------
Order Form                    Preview
-------------------------------------------------------

[input form]                  [message]

-------------------------------------------------------
[ Generate ]

                               [ Open WhatsApp ]
                               [ Copy ] [ Link ]
```

---
