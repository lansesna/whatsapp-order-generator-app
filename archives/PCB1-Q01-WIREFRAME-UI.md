# PCB1-Q01 Wireframe UI 

v0.2

## WhatsApp Order Generator

Tujuan wireframe ini:

* memastikan susunan UI jelas
* mengelakkan overdesign awal
* memudahkan implementasi HTML

Reka bentuk akan **mobile-first** kerana majoriti pesanan WhatsApp datang dari telefon.

---

# 1. Mobile Wireframe (utama)

Ini susunan asas untuk telefon.

```
--------------------------------
WhatsApp Order Generator
--------------------------------

Nama Pelanggan
[________________________]

▼ --- collapsible section---
Produk
[ Sambal Pedas  ▼ ]

Kuantiti
[ 1 ]

Catatan (optional)
[________________________]
[________________________]

---end collapsible section---

▼ ---collapsible section---
Produk
[ Sambal Pedas  ▼ ]

Kuantiti
[ 1 ]

Catatan (optional)
[________________________]
[________________________]

---end collapsible section---

▼ ---collapsible section---
Produk
[ Sambal Pedas  ▼ ]

Kuantiti
[ 1 ]

Catatan (optional)
[________________________]
[________________________]

---end collapsible section---

icon button add more collasible section

[ Generate Order ]

--------------------------------
Message Preview
--------------------------------
ORDER BARU

Nama: Ali
Produk: Sambal Pedas
Kuantiti: 1

Catatan: -
--------------------------------

[ Open WhatsApp ]

[ Copy Message ]
[ Copy Link ]
```

---

# 2. UI Sections Explained

## A. Header

Tujuan:

* memberitahu user apa tool ini

Contoh teks:

```
WhatsApp Order Generator
```

Optional kecil:

```
Generate structured WhatsApp orders
```

---

## B. Order Form

Ini ialah jantung tool.

Field yang ada:

```
Customer Name
Customer Telephone (optional)
Product
Quantity
Note
```

Reka bentuk:

* vertical stacking
* collapsible item section
* input besar
* spacing selesa
* mudah digunakan dengan ibu jari

---

## C. Generate Button

Butang ini trigger proses utama.

Label:

```
Generate Order
```

Function:

* validate form
* generate message
* update preview

---

## D. Message Preview

Preview sangat penting.

Tanpa preview:

* user tidak nampak mesej sebenar
* kesilapan hanya nampak dalam WhatsApp

Preview memberi **visual confirmation**.

Contoh:

```
ORDER BARU

Nama: Ali
Tel: -
Produk: Sambal Pedas
Kuantiti: 2

Catatan: kurang pedas
```

kalau lebih dari satu item

```
ORDER BARU

Nama: Ali
Tel: -
Produk: Sambal Pedas
Kuantiti: 2

Catatan: kurang pedas

Produk: Sambal Extra Pedas
Kuantiti: 1

Catatan: pedas kaw kaw
```

---

## E. Action Buttons

Selepas preview, user ada 3 pilihan.

### Open WhatsApp

fungsi utama.

```
Open WhatsApp
```

klik → buka link

---

### Copy Message

berguna jika:

* user mahu edit mesej
* mahu hantar ke platform lain

---

### Copy Link

berguna jika:

* mahu share link order

---

# 3. Desktop Layout

Untuk desktop kita boleh gunakan dua kolum.

```
----------------------------------------------------
WhatsApp Order Generator
----------------------------------------------------

Order Form                 Message Preview

Nama Pelanggan             -------------------------
[___________]              ORDER BARU
                           Nama: Ali
Produk                     Produk: Sambal Pedas
[Dropdown ▼]               Kuantiti: 2

Kuantiti                   Catatan: -
[1]

Catatan
[____________]

[ Generate Order ]         -------------------------

                           [ Open WhatsApp ]

                           [ Copy Message ]
                           [ Copy Link ]
```

---

# 4. HTML Layout Blueprint

Struktur HTML asas yang disyorkan:

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

Ini membuatkan struktur HTML sangat jelas.

---

# 5. CSS Layout Strategy

Gunakan pendekatan:

```
mobile first
```

Cadangan teknik:

```
flexbox
```

untuk susunan.

Contoh konsep:

```
.order-form
display: flex
flex-direction: column
gap: 12px
```

Desktop nanti boleh guna:

```
grid
```

untuk dua kolum.

---

# 6. UI Behaviour

Beberapa behaviour penting:

### sebelum generate

Preview kosong atau:

```
Message preview will appear here
```

---

### selepas generate

Preview dipaparkan.

---

### jika validation gagal

Contoh error:

```
Sila masukkan nama pelanggan
```

---

### selepas Open WhatsApp

Tidak perlu redirect page.

Gunakan:

```
window.open()
```

---

# 7. UX Detail yang Penting

Beberapa perkara kecil tetapi memberi impak besar.

### quantity default

```
1
```

supaya user tidak perlu isi.

---

### input besar

Untuk mobile:

```
height 44px
```

minimum.

---

### preview box

Gunakan font:

```
monospace
```

supaya format mesej jelas.

---

### spacing

Cadangan:

```
margin-bottom: 16px
```

antara field.

---

# 8. Minimal Visual Style

Untuk v0.1 jangan terlalu fancy.

Cadangan gaya:

Background:

```
#f7f7f7
```

Card:

```
white
border-radius 8px
padding 16px
```

Button utama:

```
green
```

untuk konsisten dengan WhatsApp.

---

# 9. Interaction Flow

Flow UI sebenar:

```
User buka tool
      ↓
Isi borang
      ↓
Klik Generate Order
      ↓
Preview muncul
      ↓
Klik Open WhatsApp
      ↓
WhatsApp terbuka dengan mesej siap
```

---

# 10. Design Philosophy

Tool ini **bukan aplikasi besar**.

Ia hanya perlu:

```
cepat
ringkas
jelas
boleh digunakan dalam 5 saat
```

Jika user perlu belajar menggunakan tool ini, maka kita telah gagal.

---

# 11. Reality Check

Versi v0.2 UI ini boleh siap dengan:

* satu HTML
* satu CSS
* beberapa fail JS kecil

Tidak perlu:

* framework
* component library
* bundler
* build system

Untuk PCB, ini pendekatan yang paling sihat.

---

# 12. Status

```
PCB1-Q01
UI Wireframe
Version 0.2
Status: Ready for Implementation
```

---