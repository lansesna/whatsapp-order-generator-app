# STRUCTURE.md

## Purpose

This document defines the exact file and folder responsibilities for the WhatsApp Order Generator Application.

It ensures:
- clean separation of concerns
- safe modification by agents
- predictable system behavior

---

## Project Structure

```text
index.html
css/style.css

js/
  config.js
  form.js
  input-validator.js
  message-composer.js
  message-formatter.js
  whatsapp-url.js
  app.js

docs/
  PRODUCT.md
  FLOW.md
  SETUP.md
  STRUCTURE.md
  TASKS.md
````

---

## File Responsibilities

### index.html

* defines UI structure
* contains form layout
* defines input fields and buttons

DO NOT:

* add business logic
* add data processing logic

---

### css/style.css

* defines visual styling
* layout and responsiveness
* mobile-first design

DO NOT:

* encode behavior
* depend on JS logic

---

### js/config.js

* contains static configuration
* merchant phone number
* merchant name
* product options

Used by:

* form rendering
* WhatsApp transport

DO NOT:

* add logic
* mutate dynamically

---

### js/form.js

* extracts input data from DOM
* normalizes raw input into structured object

Responsibilities:

* read form values
* build `orderData` object
* handle dynamic item inputs

DO NOT:

* validate data
* format message
* generate WhatsApp links

---

### js/input-validator.js

* validates order data

Responsibilities:

* ensure required fields exist
* enforce minimum quantity
* validate item structure

Example logic:

* customer name required
* at least one valid item required
* quantity ≥ 1

Reference implementation:


DO NOT:

* modify data
* format message
* interact with UI directly

---

### js/message-composer.js

* prepares structured message data

Responsibilities:

* normalize optional fields
* filter valid items
* map data into structured message object

Reference implementation:


Output example:

```
{
  title,
  customerName,
  customerPhone,
  itemsHeading,
  items[]
}
```

DO NOT:

* format final message string
* generate WhatsApp URL

---

### js/message-formatter.js

* generates final message string

THIS IS THE SINGLE SOURCE OF TRUTH FOR MESSAGE FORMAT

Responsibilities:

* convert structured data into formatted string
* control exact wording and layout

Reference implementation:


DO NOT:

* access DOM
* validate data
* generate URLs

---

### js/whatsapp-url.js

* handles WhatsApp transport logic

Responsibilities:

* normalize phone number
* encode message using encodeURIComponent
* generate WhatsApp URL
* open WhatsApp
* copy message / link

Reference implementation:


DO NOT:

* format message
* validate input

---

### js/app.js

* orchestrates the entire flow

Responsibilities:

* bind UI events
* call:

  * form extraction
  * validation
  * composition
  * formatting
  * transport
* update preview
* handle user actions

Reference:


DO NOT:

* implement business logic directly
* duplicate validation or formatting logic

---

## Execution Pipeline

```
form.js
→ input-validator.js
→ message-composer.js
→ message-formatter.js
→ whatsapp-url.js
→ app.js (UI update)
```

---

## Data Contracts

### orderData (input)

```
{
  customerName: string,
  customerPhone: string,
  items: [
    {
      product: string,
      qty: number,
      note: string
    }
  ]
}
```

---

### messageData (intermediate)

```
{
  title: string,
  customerName: string,
  customerPhone: string,
  itemsHeading: string,
  items: [...]
}
```

---

### finalMessage (output)

```
string (formatted message)
```

---

## Modification Rules

### Adding new field

1. Add to HTML
2. Extract in form.js
3. Validate in input-validator.js (if required)
4. Include in message-composer.js
5. Format in message-formatter.js

---

### Changing message format

Modify ONLY:

message-formatter.js

---

### Changing validation rules

Modify ONLY:

input-validator.js

---

### Changing WhatsApp behavior

Modify ONLY:

whatsapp-url.js

---

### Changing UI behavior

Modify:

* app.js
* HTML / CSS

---

## Critical Rules

### Single Source of Truth

Final message MUST be generated ONLY by:

message-formatter.js

---

### No Logic Duplication

Do NOT:

* build message in multiple files
* encode WhatsApp URL outside whatsapp-url.js
* validate inside UI

---

### Deterministic Output

Same input must always produce:

* same message
* same WhatsApp URL

---

## Summary

This structure ensures:

* clear responsibility boundaries
* safe agent modifications
* predictable system behavior

All changes must respect this structure.

---