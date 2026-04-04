# PCB1-Q01 Technical Specification

v0.1

## WhatsApp Order Generator

---

# 1. Module Identity

**Module name**
PCB1-Q01 — WhatsApp Order Generator

**Purpose**
Menjana mesej pesanan WhatsApp daripada input borang pelanggan dan menghasilkan pautan click-to-chat.

**System type**

```
Static Web Tool
```

**Technology stack**

Frontend

* HTML
* CSS
* JavaScript (vanilla)

Optional layer (later stage)

* Google Apps Script Web App
* Google Sheets

Hosting

* GitHub Pages / Netlify / Vercel

---

# 2. Core Feature Set (v0.1)

Fungsi minimum yang mesti wujud.

1. Order form UI
2. Input validation
3. Order message generation
4. WhatsApp URL encoding
5. Message preview
6. Open WhatsApp button
7. Copy message button
8. Copy link button
9. Mobile friendly layout

---

# 3. Order Form Fields

## 3.1 Required fields

### Customer Name

```
type: text
id: customerName
required: yes
max length: 60
```

Tujuan

Nama pelanggan untuk dikenalpasti oleh peniaga.

---

### Product

```
type: select
id: product
required: yes
source: static list (v0.1)
```

Contoh pilihan

```
Sambal Pedas
Sambal Original
Sambal Extra Pedas
```

---

### Quantity

```
type: number
id: qty
required: yes
min: 1
max: 999
```

Default value

```
1
```

---

## 3.2 Optional fields

### Note

```
type: textarea
id: note
required: no
max length: 200
```

Contoh

```
kurang pedas
ambil petang
```

---

### Source (optional but useful)

```
type: hidden / select
id: source
required: no
```

Contoh

```
ig-bio
fb-ads
landing-page
```

Ini penting untuk tracking channel pada masa depan.

---

# 4. Merchant Configuration

Untuk v0.1, konfigurasi merchant disimpan dalam JS config.

Contoh:

```javascript
const MERCHANT_CONFIG = {
  merchantPhone: "60123456789",
  merchantName: "Kedai Sambal",
  currency: "RM"
}
```

---

# 5. Product Data Structure

v0.1 menggunakan data statik.

Contoh:

```javascript
const PRODUCTS = [
  {
    id: "P001",
    name: "Sambal Pedas",
    price: 12
  },
  {
    id: "P002",
    name: "Sambal Original",
    price: 10
  },
  {
    id: "P003",
    name: "Sambal Extra Pedas",
    price: 14
  }
];
```

---

# 6. Order Message Template

Template default:

```
ORDER BARU

Nama: {{customer_name}}
Produk: {{product}}
Kuantiti: {{qty}}

Catatan: {{note}}
```

---

# 7. Template Rendering Rules

Placeholder yang disokong:

```
{{customer_name}}
{{product}}
{{qty}}
{{note}}
```

---

## Jika note kosong

Output menjadi:

```
Catatan: -
```

Ini lebih stabil daripada membuang baris.

---

# 8. Message Builder Logic

Input object:

```javascript
{
  customerName: "Ali",
  productName: "Sambal Pedas",
  qty: 2,
  note: "kurang pedas"
}
```

Output message:

```
ORDER BARU

Nama: Ali
Produk: Sambal Pedas
Kuantiti: 2

Catatan: kurang pedas
```

---

# 9. WhatsApp URL Generation

Format rasmi:

```
https://wa.me/<phone>?text=<encoded_message>
```

Contoh sebenar:

```
https://wa.me/60123456789?text=ORDER%20BARU%0A%0ANama%3A%20Ali%0AProduk%3A%20Sambal%20Pedas
```

Encoding dilakukan menggunakan:

```
encodeURIComponent()
```

---

# 10. Action Buttons

## Generate Order

Function

* validate form
* generate message
* update preview

---

## Open WhatsApp

Function

1. generate link
2. open new tab

```
window.open(waUrl)
```

---

## Copy Message

Function

```
navigator.clipboard.writeText(message)
```

---

## Copy Link

Function

```
navigator.clipboard.writeText(waUrl)
```

---

# 11. Validation Matrix

| Field        | Rule          | Error message                         |
| ------------ | ------------- | ------------------------------------- |
| customerName | tidak kosong  | "Sila masukkan nama"                  |
| product      | mesti dipilih | "Sila pilih produk"                   |
| qty          | ≥1            | "Kuantiti mesti sekurang-kurangnya 1" |

---

# 12. UI Layout Specification

Layout utama:

```
Header
Order Form
Generate Button
Message Preview
Action Buttons
```

---

## Mobile Layout

```
[Title]

Nama Pelanggan
[ input ]

Produk
[ dropdown ]

Kuantiti
[ input ]

Catatan
[ textarea ]

[ Generate Order ]

Message Preview

[ Open WhatsApp ]
[ Copy Message ]
[ Copy Link ]
```

---

# 13. Message Preview Component

Preview box menunjukkan mesej sebelum dihantar.

Tujuan:

* user boleh semak mesej
* elak kesilapan

UI cadangan:

```
-------------------------
ORDER BARU

Nama: Ali
Produk: Sambal Pedas
Kuantiti: 2

Catatan: kurang pedas
-------------------------
```

---

# 14. Local Storage (Optional v0.2)

Untuk kemudahan pengguna.

Data yang boleh disimpan:

```
lastCustomerName
lastProduct
lastQty
```

Contoh:

```javascript
localStorage.setItem("lastCustomerName", "Ali")
```

---

# 15. Optional Logging (Future v0.4)

Jika logging diaktifkan:

Frontend akan POST data ke Apps Script.

Payload contoh:

```json
{
  "customer_name": "Ali",
  "product_id": "P001",
  "product_name": "Sambal Pedas",
  "qty": 2,
  "note": "kurang pedas",
  "source": "landing-page",
  "timestamp": "2026-03-16T20:40:00"
}
```

---

# 16. Project Folder Specification

Struktur projek:

```
pcb1-q01-whatsapp-order-generator
│
├── index.html
├── css
│   └── style.css
│
├── js
│   ├── app.js
│   ├── config.js
│   ├── form.js
│   ├── validator.js
│   ├── message-builder.js
│   ├── whatsapp.js
│   └── api.js
│
├── data
│   └── products.js
│
└── README.md
```

---

# 17. Functional Flow

Urutan operasi sebenar sistem.

```
User buka page
      ↓
Isi order form
      ↓
Klik Generate Order
      ↓
Validation
      ↓
Message Builder
      ↓
Preview message
      ↓
Klik Open WhatsApp
      ↓
Generate wa.me URL
      ↓
Open WhatsApp chat
```

---

# 18. Acceptance Criteria

PCB1-Q01 v0.1 dianggap **siap** apabila:

1. order form berfungsi
2. validation berfungsi
3. mesej pesanan dijana dengan betul
4. WhatsApp link dijana dengan betul
5. WhatsApp terbuka dengan mesej siap
6. UI berfungsi dengan baik pada mobile
7. tool boleh diakses melalui hosting static

---

# 19. Known Limitations (v0.1)

Perlu dinyatakan supaya jangkaan realistik.

v0.1 **tidak menyokong**:

* multiple product order
* payment link
* shipping calculation
* order management
* WhatsApp automation
* chatbot
* team inbox

Ia hanyalah **order generator**.

---

# 20. Version Declaration

Status semasa:

```
PCB1-Q01
Version: 0.1
Status: Development Specification
```

Versi **1.0** hanya boleh diisytihar apabila:

* tool stabil
* UI matang
* validation lengkap
* mobile UX baik
* digunakan dalam situasi sebenar

---
