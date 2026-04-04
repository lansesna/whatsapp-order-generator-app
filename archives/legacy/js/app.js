// app.js

/* document.addEventListener("DOMContentLoaded", function () {

  let currentMessage = "";
  let currentWhatsAppURL = "";

  const generateBtn = document.getElementById("generateBtn");
  const openWhatsAppBtn = document.getElementById("openWhatsAppBtn");
  const copyMessageBtn = document.getElementById("copyMessageBtn");
  const copyLinkBtn = document.getElementById("copyLinkBtn");
  const messageBox = document.getElementById("messageBox");

  const customerNameInput = document.getElementById("customerName");
  const productInput = document.getElementById("product");
  const qtyInput = document.getElementById("qty");
  const noteInput = document.getElementById("note");

  const savedName = localStorage.getItem("lastCustomerName");

  if (savedName) {
    customerNameInput.value = savedName;
  }

  function updateOrderPreview() {

  const orderData = getOrderFormData();

  // Jika field wajib belum lengkap, kosongkan preview dan disable action buttons
  if (!orderData.customerName || !orderData.product || orderData.qty < 1) {
    currentMessage = "";
    currentWhatsAppURL = "";

    messageBox.textContent = "Message preview will appear here";

    openWhatsAppBtn.disabled = true;
    copyMessageBtn.disabled = true;
    copyLinkBtn.disabled = true;

    return;
  }

  // Build message
  currentMessage = buildOrderMessage(orderData);

  localStorage.setItem("lastCustomerName", orderData.customerName);

  // Generate WhatsApp URL
  currentWhatsAppURL = generateWhatsAppURL(currentMessage);

  // Update preview
  messageBox.textContent = currentMessage;

  // Enable action buttons
  openWhatsAppBtn.disabled = false;
  copyMessageBtn.disabled = false;
  copyLinkBtn.disabled = false;
}

// Generate Order
generateBtn.addEventListener("click", function () {

  const orderData = getOrderFormData();

  if (!orderData.customerName) {
    alert("Sila masukkan nama pelanggan");
    return;
  }

  if (!orderData.product) {
    alert("Sila pilih produk");
    return;
  }

  if (orderData.qty < 1) {
    alert("Kuantiti mesti sekurang-kurangnya 1");
    return;
  }

  updateOrderPreview();

});

  customerNameInput.addEventListener("input", updateOrderPreview);
  productInput.addEventListener("change", updateOrderPreview);
  qtyInput.addEventListener("input", updateOrderPreview);
  noteInput.addEventListener("input", updateOrderPreview);

  // Open WhatsApp
  openWhatsAppBtn.addEventListener("click", function () {

    if (!currentWhatsAppURL) {
      alert("Generate order dahulu");
      return;
    }

    openWhatsAppChat(currentWhatsAppURL);

  });



  // Copy message
  copyMessageBtn.addEventListener("click", function () {

    if (!currentMessage) {
      alert("Tiada mesej untuk disalin");
      return;
    }

    copyMessage(currentMessage);

  });



  // Copy link
  copyLinkBtn.addEventListener("click", function () {

    if (!currentWhatsAppURL) {
      alert("Tiada link untuk disalin");
      return;
    }

    copyWhatsAppLink(currentWhatsAppURL);

  });

}); */

// app.js

document.addEventListener("DOMContentLoaded", function () {
  let currentMessage = "";
  let currentWhatsAppURL = "";

  const generateBtn = document.getElementById("generateBtn");
  const addItemBtn = document.getElementById("addItemBtn");
  const openWhatsAppBtn = document.getElementById("openWhatsAppBtn");
  const copyMessageBtn = document.getElementById("copyMessageBtn");
  const copyLinkBtn = document.getElementById("copyLinkBtn");
  const messageBox = document.getElementById("messageBox");

  const customerNameInput = document.getElementById("customerName");
  const customerPhoneInput = document.getElementById("customerPhone");
  const itemsContainer = document.getElementById("orderItemsContainer");

  const savedName = localStorage.getItem("lastCustomerName");
  const savedPhone = localStorage.getItem("lastCustomerPhone");

  if (savedName) {
    customerNameInput.value = savedName;
  }

  if (savedPhone) {
    customerPhoneInput.value = savedPhone;
  }

  function setButtonsDisabled(isDisabled) {
    openWhatsAppBtn.disabled = isDisabled;
    copyMessageBtn.disabled = isDisabled;
    copyLinkBtn.disabled = isDisabled;
  }

  function resetPreview() {
    currentMessage = "";
    currentWhatsAppURL = "";
    messageBox.textContent = "Preview mesej akan muncul di sini apabila maklumat wajib diisi.";
    setButtonsDisabled(true);
  }

  function updateOrderPreview() {
    const orderData = getOrderFormData();
    const validation = validateOrderData(orderData);

    if (!validation.valid) {
      resetPreview();
      return;
    }

    currentMessage = buildOrderMessage(orderData);
    currentWhatsAppURL = generateWhatsAppURL(currentMessage);

    localStorage.setItem("lastCustomerName", orderData.customerName);
    localStorage.setItem("lastCustomerPhone", orderData.customerPhone || "");

    messageBox.textContent = currentMessage;
    setButtonsDisabled(false);
  }

  function bindStaticFieldEvents() {
    customerNameInput.addEventListener("input", updateOrderPreview);
    customerPhoneInput.addEventListener("input", updateOrderPreview);
  }

  function bindItemContainerEvents() {
    itemsContainer.addEventListener("input", function (event) {
      const orderItem = event.target.closest(".order-item");

      if (!orderItem) {
        return;
      }

      if (
        event.target.classList.contains("item-product") ||
        event.target.classList.contains("item-qty") ||
        event.target.classList.contains("item-note")
      ) {
        const itemIndex = Number(orderItem.dataset.itemIndex || 0);
        updateOrderItemHeader(orderItem, itemIndex);
        updateOrderPreview();
      }
    });

    itemsContainer.addEventListener("change", function (event) {
      const orderItem = event.target.closest(".order-item");

      if (!orderItem) {
        return;
      }

      if (event.target.classList.contains("item-product")) {
        const itemIndex = Number(orderItem.dataset.itemIndex || 0);
        updateOrderItemHeader(orderItem, itemIndex);
        updateOrderPreview();
      }
    });

    itemsContainer.addEventListener("click", function (event) {
      const toggleBtn = event.target.closest(".order-item-toggle");
      const removeText = event.target.closest(".order-item-remove-text");

      if (!toggleBtn) {
        return;
      }

      const orderItem = toggleBtn.closest(".order-item");

      if (!orderItem) {
        return;
      }

      if (removeText && document.querySelectorAll(".order-item").length > 1) {
        event.stopPropagation();
        removeOrderItem(orderItem);
        updateOrderPreview();
        return;
      }

      toggleOrderItem(orderItem);
    });
  }

  function setupInitialItem() {
    addOrderItem({
      product: "",
      qty: 1,
      note: ""
    });
  }

  generateBtn.addEventListener("click", function () {
    const orderData = getOrderFormData();
    const validation = validateOrderData(orderData);

    if (!validation.valid) {
      alert(validation.message);
      return;
    }

    updateOrderPreview();
  });

  addItemBtn.addEventListener("click", function () {
    const newItem = addOrderItem({
      product: "",
      qty: 1,
      note: ""
    });

    const body = newItem.querySelector(".order-item-body");
    const firstField = body.querySelector(".item-product");

    newItem.classList.remove("is-collapsed");
    newItem.querySelector(".order-item-toggle").setAttribute("aria-expanded", "true");

    if (firstField) {
      firstField.focus();
    }

    updateOrderPreview();
  });

  openWhatsAppBtn.addEventListener("click", function () {
    if (!currentWhatsAppURL) {
      alert("Generate order dahulu");
      return;
    }

    openWhatsAppChat(currentWhatsAppURL);
  });

  copyMessageBtn.addEventListener("click", function () {
    if (!currentMessage) {
      alert("Tiada mesej untuk disalin");
      return;
    }

    copyMessage(currentMessage);
  });

  copyLinkBtn.addEventListener("click", function () {
    if (!currentWhatsAppURL) {
      alert("Tiada link untuk disalin");
      return;
    }

    copyWhatsAppLink(currentWhatsAppURL);
  });

  bindStaticFieldEvents();
  bindItemContainerEvents();
  setupInitialItem();
  resetPreview();
});