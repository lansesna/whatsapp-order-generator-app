# SETUP — WhatsApp Order Generator

## Purpose

This document explains how to:

- run the application locally
- configure vendor/shop data
- deploy the application to production (static hosting)

---

## 1. Run Locally

No build step required.

### Option A — Open directly

Open:

```
index.html
````

in a browser.

---

### Option B — Use simple local server (recommended)

```
npx serve .
```

or

```
python -m http.server
```

Then open:

```
http://localhost:3000
```

---

## 2. Configuration

All configuration is stored in:

```
js/config.js
```

---

### Vendor / Shop Configuration

Example:

```
const APP_CONFIG = {
  vendor: {
    name: "Nama Kedai",
    phone: "60123456789"
  }
};
```

* `vendor.name` -> displayed in UI
* `vendor.phone` -> used for WhatsApp message delivery

---

### Product List

```
const APP_CONFIG = {
  products: ["Produk A", "Produk B", "Produk C"]
};
```

Used for:

* dropdown selection
* order input

---

### App Settings

```
const APP_CONFIG = {
  settings: {
    previewPlaceholder: "Preview mesej...",
    previewStateText: {
      empty: "Isi maklumat untuk mula.",
      invalid: "Betulkan maklumat pesanan."
    },
    localStorageKeys: {
      customerName: "wag_lastCustomerName",
      customerPhone: "wag_lastCustomerPhone"
    }
  }
};
```

---

### Canonical Config Model

Use one `APP_CONFIG` object that keeps all sections together:

```
const APP_CONFIG = {
  vendor: {
    name: "Nama Kedai",
    phone: "60123456789"
  },
  products: ["Produk A", "Produk B", "Produk C"],
  settings: {
    previewPlaceholder: "Preview mesej...",
    previewStateText: {
      empty: "Isi maklumat untuk mula.",
      invalid: "Betulkan maklumat pesanan."
    },
    localStorageKeys: {
      customerName: "wag_lastCustomerName",
      customerPhone: "wag_lastCustomerPhone"
    }
  }
};
```

---

### Notes

* configuration is static (no backend)
* one vendor per deployment (current version)

---

## 3. Deployment (Production)

This application is designed for **static hosting**.

### Supported platforms

* Netlify
* Vercel
* GitHub Pages
* any static file host

---

### Deployment Steps

1. Upload repository or build folder

2. Ensure root contains:

   * `index.html`
   * `css/`
   * `js/`

3. Set root as public directory (if needed)

4. Deploy

5. Keep asset version query strings in `index.html` updated for each release, for example:
   - `css/style.css?v=0.1.4`
   - `js/app.js?v=0.1.4`
   - this helps reduce stale browser cache after deploy

---

### Result

Application is accessible via:

```
https://your-domain/
```

---

## 4. Current Limitations

* single vendor (config-based)
* no vendor registration
* no database
* no dynamic routing
* no persistent product storage

---

## 5. Planned Evolution

Configuration and persistence will evolve:

### Stage 1 (current)

* static config (`config.js`)

### Stage 2

* structured local config (multiple vendors)

### Stage 3

* static routing (e.g. `?vendor=shop-a`)

### Stage 4

* persistence layer (local or hosted)

---

## 6. Configuration Safety

When modifying config:

* keep phone number numeric (no spaces or symbols)
* ensure product list is not empty
* avoid breaking structure of config object
* keep required production values filled (`vendor.name`, `vendor.phone`)

---

## 7. Troubleshooting

### WhatsApp not opening correctly

Check:

* phone number format
* message encoding
* browser popup blocking

---

### Copy not working

Check:

* browser permissions for clipboard
* fallback behavior (older browsers)

---

### UI not updating

Check:

* JavaScript errors in console
* correct script loading order

---

## 8. Development Notes

* no framework is used
* no build step required
* changes are immediately visible after refresh
* production deploy should be validated on a static host URL (not localhost-only assumptions)

---

## Summary

This application is:

* static-first
* config-driven
* easy to deploy
* safe for early production use

Future improvements will add configurability and persistence without breaking current simplicity.

---

