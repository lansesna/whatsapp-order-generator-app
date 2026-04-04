# PCB1-Q01 Blueprint Architecture 

v0.1

## WhatsApp Order Generator

---

## 1. Tujuan Blueprint

Blueprint ini menerangkan struktur teknikal awal untuk PCB1-Q01 supaya pembangunan kekal:

* kecil
* jelas
* modular
* no-expense
* tidak bercampur dengan PCB1-Q02

Ia direka untuk menyokong pembangunan dari:

* **v0.1** → generator asas
* **v0.2** → UI lebih kemas + validation
* **v0.3** → Google Sheets config
* **v0.4** → order request logging

tetapi masih berada dalam sempadan **WhatsApp Order Generator**, bukan sistem e-commerce penuh.

---

# 2. Prinsip Reka Bentuk

Blueprint ini berpandukan beberapa prinsip:

### 2.1 Static-first

Mulakan dengan frontend static dahulu.

Kenapa:

* paling murah
* paling cepat siap
* paling mudah debug
* sesuai untuk PCB

### 2.2 WhatsApp as output, not backend

WhatsApp hanyalah destinasi output mesej, bukan sistem backend anda.

Maknanya:

* kita tidak integrate WhatsApp API
* kita hanya hasilkan link click-to-chat
* kita tidak urus mesej masuk/keluar secara automatik

### 2.3 Form-first, not dashboard-first

Jangan mula dengan dashboard cantik berlapis-lapis. Itu perangkap kosmetik digital.

Mulakan dengan:

* borang
* template mesej
* link generation
* open WhatsApp

### 2.4 Sheets as lightweight config/log layer

Google Sheets bukan “database enterprise”. Ia hanya lapisan ringan untuk:

* config produk
* config template
* log order request

Itu cukup untuk fasa awal.

---

# 3. Gambaran Besar Architecture

## 3.1 High-level system flow

```text
User opens tool
    ↓
User fills order form
    ↓
Frontend validates input
    ↓
Frontend builds order message
    ↓
Frontend encodes WhatsApp URL
    ↓
[Optional] Frontend logs request to Apps Script
    ↓
Frontend opens WhatsApp link
```

---

## 3.2 High-level architecture components

```text
[Frontend Static Site]
    |
    |-- Order Form UI
    |-- Validation Logic
    |-- Message Builder
    |-- WhatsApp URL Encoder
    |-- Open / Copy Actions
    |
    +---- optional fetch ----> [Google Apps Script Web App]
                                  |
                                  |-- Read products
                                  |-- Read templates
                                  |-- Log order request
                                  |
                                  +----> [Google Sheets]
```

---

# 4. Seni bina modul

Kita pecahkan sistem kepada modul kecil supaya logik bersih.

## 4.1 Frontend Layer

Ini ialah jantung versi awal.

Komponen utama:

### A. `OrderForm`

Tanggungjawab:

* papar input field
* kumpul data pengguna
* trigger proses generate

Input field minimum:

* customer name
* product
* quantity
* note optional

Field tambahan optional:

* source
* phone merchant
* variant

---

### B. `Validator`

Tanggungjawab:

* semak field wajib
* semak kuantiti sah
* semak nombor WhatsApp merchant sah
* trim whitespace bodoh yang selalu menyelinap macam cicak

Contoh semakan:

* nama tidak kosong
* produk dipilih
* quantity ≥ 1
* nombor telefon mengandungi digit sah

---

### C. `MessageBuilder`

Tanggungjawab:

* bina mesej order berdasarkan template

Input:

* customer data
* product data
* template text

Output:

* mesej akhir dalam bentuk plain text

Contoh output:

```text
ORDER BARU

Nama: Ali
Produk: Sambal Pedas
Kuantiti: 2
Catatan: Kurang pedas
```

---

### D. `WhatsAppLinkEncoder`

Tanggungjawab:

* tukar mesej kepada URL sah

Format asas:

```text
https://wa.me/<phone>?text=<encoded_message>
```

Output:

* URL click-to-chat

---

### E. `ActionController`

Tanggungjawab:

* butang Open WhatsApp
* butang Copy Message
* butang Copy Link

---

### F. `ConfigLoader` optional

Digunakan bila masuk v0.3+.

Tanggungjawab:

* fetch produk dari Apps Script
* fetch template dari Apps Script
* preload setting merchant

---

### G. `OrderLogger` optional

Digunakan bila masuk v0.4+.

Tanggungjawab:

* hantar log request ke Apps Script sebelum buka WhatsApp

---

# 5. Backend Ringan

Untuk v0.1, backend **tidak wajib**.

Tetapi blueprint ini sediakan tempat untuk backend ringan bila perlu.

## 5.1 Google Apps Script Web App

Peranan:

* endpoint baca config
* endpoint log request
* jambatan antara frontend dengan Google Sheets

Ia bukan backend kompleks. Ia cuma pelayan kecil yang cukup untuk MVP.

### Fungsi utama

* `doGet(e)` → baca data
* `doPost(e)` → simpan log

---

## 5.2 Google Sheets

Peranan:

* simpan config
* simpan template
* simpan log

Bukan untuk:

* transactional system berat
* analytics kompleks
* multi-user concurrency serius

---

# 6. Struktur Data

Untuk blueprint v0.1, saya cadangkan data model sangat ringkas.

## 6.1 Data model frontend

### `merchantConfig`

```json
{
  "merchantPhone": "60123456789",
  "defaultTemplate": "ORDER BARU\n\nNama: {{customer_name}}\nProduk: {{product}}\nKuantiti: {{qty}}\nCatatan: {{note}}"
}
```

### `orderInput`

```json
{
  "customerName": "Ali",
  "productId": "P001",
  "productName": "Sambal Pedas",
  "qty": 2,
  "note": "Kurang pedas"
}
```

### `generatedOrder`

```json
{
  "message": "ORDER BARU\n\nNama: Ali\nProduk: Sambal Pedas\nKuantiti: 2\nCatatan: Kurang pedas",
  "waUrl": "https://wa.me/60123456789?text=..."
}
```

---

# 7. Struktur Google Sheets

Untuk v0.1 blueprint, cukup cadangkan tiga sheet sahaja.

## 7.1 Sheet: `products`

Header:

```text
id | name | price | is_active | sort_order
```

Contoh:

```text
P001 | Sambal Pedas | 12.00 | TRUE | 1
P002 | Sambal Original | 10.00 | TRUE | 2
```

Kegunaan:

* dropdown produk
* paparan produk aktif sahaja

---

## 7.2 Sheet: `templates`

Header:

```text
id | name | template_text | is_active
```

Contoh:

```text
T001 | Default Order | ORDER BARU\n\nNama: {{customer_name}}\nProduk: {{product}}\nKuantiti: {{qty}}\nCatatan: {{note}} | TRUE
```

Kegunaan:

* simpan template mesej
* tukar format tanpa ubah code besar

---

## 7.3 Sheet: `order_logs`

Header:

```text
id | created_at | customer_name | product_id | product_name | qty | note | source | total_text | wa_phone
```

Contoh:

```text
L001 | 2026-03-16 20:15:00 | Ali | P001 | Sambal Pedas | 2 | Kurang pedas | ig-bio | 24.00 | 60123456789
```

Kegunaan:

* rekod request yang dijana
* audit ringan
* semakan source asas

---

# 8. API Blueprint

Ini bukan kod lagi. Ini spesifikasi ringan supaya implementasi nanti tidak berserabut seperti wayar extension kedai runcit.

## 8.1 GET products

Request:

```text
GET ?action=getProducts
```

Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "P001",
      "name": "Sambal Pedas",
      "price": 12.00
    }
  ]
}
```

---

## 8.2 GET templates

Request:

```text
GET ?action=getTemplates
```

Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "T001",
      "name": "Default Order",
      "template_text": "ORDER BARU\n\nNama: {{customer_name}}\nProduk: {{product}}\nKuantiti: {{qty}}\nCatatan: {{note}}"
    }
  ]
}
```

---

## 8.3 POST log order request

Request body:

```json
{
  "action": "logOrderRequest",
  "customer_name": "Ali",
  "product_id": "P001",
  "product_name": "Sambal Pedas",
  "qty": 2,
  "note": "Kurang pedas",
  "source": "landing-page"
}
```

Response:

```json
{
  "success": true,
  "message": "Order request logged"
}
```

---

# 9. Folder Structure Project

Untuk v0.1, jangan rumitkan. Guna struktur fail mudah.

## 9.1 Versi plain HTML/CSS/JS

```text
pcb1-q01-whatsapp-order-generator/
│
├── index.html
├── /css
│   └── style.css
├── /js
│   ├── app.js
│   ├── form.js
│   ├── validator.js
│   ├── message-builder.js
│   ├── whatsapp.js
│   ├── config.js
│   └── api.js
├── /data
│   └── mock-products.json
└── README.md
```

---

## 9.2 Tanggungjawab fail

### `index.html`

* layout utama
* form
* preview mesej
* button actions

### `style.css`

* styling mobile-first
* spacing
* typography
* responsive layout

### `app.js`

* bootstrap aplikasi
* bind event utama

### `form.js`

* baca input borang
* hantar data ke validator / builder

### `validator.js`

* validate semua input

### `message-builder.js`

* render template menjadi mesej sebenar

### `whatsapp.js`

* encode URL
* open WhatsApp
* copy link

### `config.js`

* config tempatan / default values

### `api.js`

* fungsi fetch ke Apps Script bila perlu

---

# 10. User Flow Blueprint

## 10.1 User flow asas v0.1

```text
User buka page
    ↓
User isi nama
    ↓
User pilih produk
    ↓
User isi quantity
    ↓
User tambah note (optional)
    ↓
Klik "Generate Order"
    ↓
System validate input
    ↓
System generate message preview
    ↓
System generate WhatsApp link
    ↓
User klik "Open WhatsApp"
    ↓
WhatsApp dibuka dengan mesej siap
```

---

## 10.2 User flow dengan logging v0.4

```text
User klik "Open WhatsApp"
    ↓
System log request ke Apps Script
    ↓
Jika log success / fail, teruskan
    ↓
System buka WhatsApp
```

Penting:
**logging tidak boleh block fungsi utama**.
Kalau logging gagal, order generator masih mesti berfungsi. Jangan biar satu kegagalan kecil menjatuhkan seluruh khemah.

---

# 11. UI Blueprint

## 11.1 Bahagian utama page

Saya cadangkan page awal ada 4 blok sahaja:

### A. Header

* tajuk tool
* ringkasan ringkas

### B. Order Form

* nama pelanggan
* produk
* kuantiti
* nota

### C. Message Preview

* papar mesej yang dijana

### D. Action Buttons

* Generate
* Open WhatsApp
* Copy Message
* Copy Link

Itu sudah cukup. Jangan tambah dashboard analytics palsu yang tiada data sebenar. Itu sekadar kostum.

---

## 11.2 Susunan mobile-first

```text
[Title]

[Customer Name Input]

[Product Dropdown]

[Quantity Input]

[Note Textarea]

[Generate Button]

[Message Preview Box]

[Open WhatsApp Button]
[Copy Message Button]
[Copy Link Button]
```

---

# 12. Validation Rules v0.1

Supaya tingkah laku sistem konsisten, tetapkan rule awal.

## Wajib

* customer name tidak kosong
* produk mesti dipilih
* qty mesti integer ≥ 1
* merchant phone mesti sah

## Optional

* note boleh kosong

## Sanitisation

* trim ruang kosong awal/akhir
* buang line break berlebihan jika perlu
* elak placeholder tinggal kosong dalam mesej akhir

---

# 13. Message Template Rules

Untuk v0.1, template system mesti ringkas.

## Placeholder minimum

* `{{customer_name}}`
* `{{product}}`
* `{{qty}}`
* `{{note}}`

## Rule

Jika `note` kosong:

* boleh kosongkan nilai sahaja
  atau
* buang baris itu pada versi kemudian

Untuk v0.1, paling mudah:

```text
Catatan: -
```

Itu cukup waras.

---

# 14. Version Roadmap dalam Architecture

## v0.1

* hardcoded merchant phone
* hardcoded template
* hardcoded product list
* generate message
* generate wa link
* open WhatsApp

## v0.2

* better validation
* message preview
* copy link / copy message
* localStorage simpan setting asas

## v0.3

* products dari Google Sheets
* template dari Google Sheets
* Apps Script doGet

## v0.4

* log request ke Google Sheets
* Apps Script doPost

## v0.5

* multiple product simple
* source tag
* improved formatting

Belum 1.0 lagi.
1.0 hanya patut diisytihar bila tool ini:

* stabil,
* diuji pada mobile,
* generate link dengan konsisten,
* dan anda sendiri yakin ia benar-benar membantu use case sebenar.

---

# 15. Sempadan Tegas dengan PCB1-Q02

Dalam blueprint ini, tiada modul berikut:

* reply template engine
* follow-up script engine
* payment reminder generator
* customer support script library

Semua itu milik **PCB1-Q02**.

Q01 hanya sampai:

> “membina mesej pesanan”

Q02 bermula selepas itu:

> “membina mesej balasan”

Garis ini mesti keras. Kalau lembik, dua modul akan bercantum jadi makhluk pelik separuh generator separuh operator WhatsApp.

---

# 16. Risiko Awal

## 16.1 Scope creep

Risiko terbesar.

Simptom:

* tambah payment
* tambah shipping
* tambah status order
* tambah reply template
* tambah customer history

Penyelesaian:

* semak setiap feature dengan soalan:
  **adakah ini membantu jana pesanan, atau mengurus selepas pesanan?**

Kalau selepas pesanan, besar kemungkinan ia bukan Q01.

---

## 16.2 Apps Script dependency terlalu awal

Jika anda terus bergantung kepada Sheets/App Script dari hari pertama, anda mungkin lambat nampak logik sebenar frontend.

Penyelesaian:

* mula dengan hardcoded data dahulu pada v0.1

---

## 16.3 UI overdesign

Membina UI terlalu cantik sebelum flow asas stabil.

Penyelesaian:

* utamakan fungsi
* kosmetik kemudian

---

# 17. Keputusan Architecture v0.1

## Dipilih

* static frontend
* no-expense hosting
* WhatsApp click-to-chat
* Google Sheets sebagai optional config/log layer
* modular JS files
* mobile-first form flow

## Belum dipilih

* framework frontend
* auth system
* backend database penuh
* WhatsApp Cloud API
* payment/shipping integrations

---

# 18. Rumusan Blueprint v0.1

Secara ringkas, seni bina PCB1-Q01 v0.1 ialah:

```text
Static Order Form Tool
    ↓
Generate Structured Order Message
    ↓
Encode WhatsApp Link
    ↓
Open Chat
    ↓
Optional Config / Logging via Sheets
```

Ini ialah seni bina yang:

* kecil
* murah
* realistis
* sesuai untuk PCB
* cukup kuat untuk berkembang perlahan-lahan

---