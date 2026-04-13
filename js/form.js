function sanitizePhone(phone) {
  return String(phone || "").trim();
}

function buildProductOptionsHtml(products) {
  return products
    .map(function (product) {
      return `<option value="${escapeHtml(product)}">${escapeHtml(product)}</option>`;
    })
    .join("");
}

function populateProductOptions(selectElement) {
  if (!selectElement) {
    return;
  }

  const defaultOption = '<option value="">Pilih produk</option>';
  selectElement.innerHTML = defaultOption + buildProductOptionsHtml(APP_CONFIG.products || []);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getItemSummaryText(itemData) {
  const product = itemData.product || "Belum dipilih";
  const qty = Number(itemData.qty) > 0 ? `x${Number(itemData.qty)}` : "x1";
  return `${product} ${qty}`;
}

function updateOrderItemHeader(orderItemEl, index) {
  const titleEl = orderItemEl.querySelector(".order-item-title");
  const summaryEl = orderItemEl.querySelector(".order-item-summary");

  const product = orderItemEl.querySelector(".item-product").value;
  const qty = orderItemEl.querySelector(".item-qty").value || "1";

  titleEl.textContent = `Item ${index + 1}`;
  summaryEl.textContent = product ? `${product} x${qty}` : "Belum dipilih";
  orderItemEl.dataset.itemIndex = String(index);
}

function refreshAllItemHeaders() {
  const items = document.querySelectorAll(".order-item");

  items.forEach(function (item, index) {
    updateOrderItemHeader(item, index);

    const removeText = item.querySelector(".order-item-remove-text");
    removeText.textContent = items.length === 1 ? "" : "Buang";
  });
}

function createOrderItemElement(initialData) {
  const template = document.getElementById("orderItemTemplate");
  const fragment = template.content.cloneNode(true);
  const orderItemEl = fragment.querySelector(".order-item");

  const productInput = orderItemEl.querySelector(".item-product");
  const qtyInput = orderItemEl.querySelector(".item-qty");
  const noteInput = orderItemEl.querySelector(".item-note");

  populateProductOptions(productInput);

  if (initialData) {
    productInput.value = initialData.product || "";
    qtyInput.value = initialData.qty || 1;
    noteInput.value = initialData.note || "";
  }

  return orderItemEl;
}

function addOrderItem(initialData) {
  const container = document.getElementById("orderItemsContainer");
  const itemEl = createOrderItemElement(initialData);

  container.appendChild(itemEl);
  refreshAllItemHeaders();

  return itemEl;
}

function removeOrderItem(itemEl) {
  const container = document.getElementById("orderItemsContainer");
  const items = container.querySelectorAll(".order-item");

  if (items.length <= 1) {
    return;
  }

  itemEl.remove();
  refreshAllItemHeaders();
}

function toggleOrderItem(itemEl) {
  const toggleBtn = itemEl.querySelector(".order-item-toggle");
  const isCollapsed = itemEl.classList.toggle("is-collapsed");

  toggleBtn.setAttribute("aria-expanded", String(!isCollapsed));
}

function getOrderItemsData() {
  const itemElements = document.querySelectorAll(".order-item");

  return Array.from(itemElements).map(function (itemEl) {
    const product = itemEl.querySelector(".item-product").value.trim();
    const qtyValue = itemEl.querySelector(".item-qty").value;
    const note = itemEl.querySelector(".item-note").value.trim();

    let qty = parseInt(qtyValue, 10);

    if (Number.isNaN(qty) || qty < 1) {
      qty = 1;
    }

    return {
      product: product,
      qty: qty,
      note: note
    };
  });
}

function getOrderFormData() {
  const customerName = document.getElementById("customerName").value.trim();
  const customerPhone = sanitizePhone(document.getElementById("customerPhone").value);
  const items = getOrderItemsData();

  return {
    customerName: customerName,
    customerPhone: customerPhone,
    items: items
  };
}
