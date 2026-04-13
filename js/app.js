document.addEventListener("DOMContentLoaded", function () {
  let currentMessage = "";
  let currentWhatsAppURL = "";

  const generateBtn = document.getElementById("generateBtn");
  const addItemBtn = document.getElementById("addItemBtn");
  const openWhatsAppBtn = document.getElementById("openWhatsAppBtn");
  const copyMessageBtn = document.getElementById("copyMessageBtn");
  const copyLinkBtn = document.getElementById("copyLinkBtn");
  const messageBox = document.getElementById("messageBox");
  const validationFeedback = document.getElementById("validationFeedback");
  const shopNameLabel = document.getElementById("shopNameLabel");

  const customerNameInput = document.getElementById("customerName");
  const customerPhoneInput = document.getElementById("customerPhone");
  const itemsContainer = document.getElementById("orderItemsContainer");

  function setButtonsDisabled(isDisabled) {
    openWhatsAppBtn.disabled = isDisabled;
    copyMessageBtn.disabled = isDisabled;
    copyLinkBtn.disabled = isDisabled;
  }

  function renderShopIdentity() {
    if (!shopNameLabel) {
      return;
    }

    shopNameLabel.textContent = (APP_CONFIG.vendor && APP_CONFIG.vendor.name) || "Kedai";
  }

  function setPreviewState(state, text) {
    messageBox.dataset.state = state;
    messageBox.textContent = text;
  }

  function hasMeaningfulItemInput(item) {
    return Boolean(
      item.product ||
      (item.note && item.note.trim()) ||
      Number(item.qty) > 1
    );
  }

  function isEmptyOrderState(orderData) {
    if (orderData.customerName || orderData.customerPhone) {
      return false;
    }

    return !orderData.items.some(hasMeaningfulItemInput);
  }

  function resetPreview() {
    currentMessage = "";
    currentWhatsAppURL = "";
    const previewStateText = APP_CONFIG.settings && APP_CONFIG.settings.previewStateText;
    const previewPlaceholder = APP_CONFIG.settings && APP_CONFIG.settings.previewPlaceholder;
    setPreviewState("empty", (previewStateText && previewStateText.empty) || previewPlaceholder);
    setButtonsDisabled(true);
  }

  function renderValidationFeedback(validationMessage) {
    validationFeedback.textContent = validationMessage || "";
  }

  function saveCustomerDraft(orderData) {
    const localStorageKeys = APP_CONFIG.settings && APP_CONFIG.settings.localStorageKeys;

    if (!localStorageKeys) {
      return;
    }

    localStorage.setItem(
      localStorageKeys.customerName,
      orderData.customerName || ""
    );
    localStorage.setItem(
      localStorageKeys.customerPhone,
      orderData.customerPhone || ""
    );
  }

  function restoreCustomerDraft() {
    const localStorageKeys = APP_CONFIG.settings && APP_CONFIG.settings.localStorageKeys;

    if (!localStorageKeys) {
      return;
    }

    const savedName = localStorage.getItem(localStorageKeys.customerName);
    const savedPhone = localStorage.getItem(localStorageKeys.customerPhone);

    if (savedName) {
      customerNameInput.value = savedName;
    }

    if (savedPhone) {
      customerPhoneInput.value = savedPhone;
    }
  }

  function buildCurrentOutput(orderData) {
    const composedData = composeOrderMessageData(orderData);
    const formattedMessage = formatOrderMessage(composedData);
    const whatsappURL = generateWhatsAppURL(formattedMessage);

    return {
      message: formattedMessage,
      url: whatsappURL
    };
  }

  function updateOrderPreview() {
    const orderData = getOrderFormData();

    if (isEmptyOrderState(orderData)) {
      renderValidationFeedback("");
      resetPreview();
      return;
    }

    const validation = validateOrderData(orderData);

    if (!validation.valid) {
      renderValidationFeedback(validation.message);
      currentMessage = "";
      currentWhatsAppURL = "";
      const previewStateText = APP_CONFIG.settings && APP_CONFIG.settings.previewStateText;
      const previewPlaceholder = APP_CONFIG.settings && APP_CONFIG.settings.previewPlaceholder;
      setPreviewState("invalid", (previewStateText && previewStateText.invalid) || previewPlaceholder);
      setButtonsDisabled(true);
      return;
    }

    renderValidationFeedback("");

    const output = buildCurrentOutput(orderData);

    currentMessage = output.message;
    currentWhatsAppURL = output.url;

    saveCustomerDraft(orderData);

    setPreviewState("valid", currentMessage);
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

  restoreCustomerDraft();
  renderShopIdentity();
  bindStaticFieldEvents();
  bindItemContainerEvents();
  setupInitialItem();
  resetPreview();
});
