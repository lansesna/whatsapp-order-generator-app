document.addEventListener("DOMContentLoaded", function () {
  let currentMessage = "";
  let currentWhatsAppURL = "";

  const addItemBtn = document.getElementById("addItemBtn");
  const openWhatsAppBtn = document.getElementById("openWhatsAppBtn");
  const copyMessageBtn = document.getElementById("copyMessageBtn");
  const copyLinkBtn = document.getElementById("copyLinkBtn");
  const messageBox = document.getElementById("messageBox");
  const validationFeedback = document.getElementById("validationFeedback");
  const actionFeedback = document.getElementById("actionFeedback");
  const shopNameLabel = document.getElementById("shopNameLabel");
  const vendorDescriptionLabel = document.getElementById("vendorDescriptionLabel");
  const vendorContactLabel = document.getElementById("vendorContactLabel");
  const vendorNoteLabel = document.getElementById("vendorNoteLabel");
  const vendorLogoPlaceholder = document.getElementById("vendorLogoPlaceholder");

  const customerNameInput = document.getElementById("customerName");
  const customerPhoneInput = document.getElementById("customerPhone");
  const itemsContainer = document.getElementById("orderItemsContainer");
  const vendorConfig = APP_CONFIG.vendor || {};
  const appSettings = APP_CONFIG.settings || {};
  const previewStateText = appSettings.previewStateText || {};
  const localStorageKeys = appSettings.localStorageKeys || {};
  let actionFeedbackTimer = null;

  function setButtonsDisabled(isDisabled) {
    openWhatsAppBtn.disabled = isDisabled;
    copyMessageBtn.disabled = isDisabled;
    copyLinkBtn.disabled = isDisabled;
  }

  function renderShopIdentity() {
    if (!shopNameLabel) {
      return;
    }

    shopNameLabel.textContent = vendorConfig.name || "Kedai Kak Ani";

    if (vendorDescriptionLabel) {
      vendorDescriptionLabel.textContent = vendorConfig.description || "";
    }

    if (vendorContactLabel) {
      vendorContactLabel.textContent = vendorConfig.contactLabel || "";
    }

    if (vendorNoteLabel) {
      vendorNoteLabel.textContent = vendorConfig.note || "";
    }

    if (vendorLogoPlaceholder) {
      vendorLogoPlaceholder.classList.toggle(
        "is-visible",
        Boolean(vendorConfig.hasLogoPlaceholder)
      );
    }
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
    setPreviewState("empty", previewStateText.empty || appSettings.previewPlaceholder || "");
    setButtonsDisabled(true);
  }

  function renderValidationFeedback(validationMessage) {
    validationFeedback.textContent = validationMessage || "";
  }

  function renderActionFeedback(message, status) {
    if (!actionFeedback) {
      return;
    }

    actionFeedback.textContent = message || "";
    actionFeedback.classList.remove("is-success", "is-error");

    if (status === "success") {
      actionFeedback.classList.add("is-success");
    } else if (status === "error") {
      actionFeedback.classList.add("is-error");
    }

    if (actionFeedbackTimer) {
      clearTimeout(actionFeedbackTimer);
    }

    actionFeedbackTimer = setTimeout(function () {
      actionFeedback.textContent = "";
      actionFeedback.classList.remove("is-success", "is-error");
    }, 2600);
  }

  function saveCustomerDraft(orderData) {
    if (!localStorageKeys.customerName || !localStorageKeys.customerPhone) {
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
    if (!localStorageKeys.customerName || !localStorageKeys.customerPhone) {
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
      setPreviewState("invalid", previewStateText.invalid || appSettings.previewPlaceholder || "");
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
      const removeAction = event.target.closest(".order-item-actions");

      if (!toggleBtn) {
        return;
      }

      const orderItem = toggleBtn.closest(".order-item");

      if (!orderItem) {
        return;
      }

      if (removeAction && document.querySelectorAll(".order-item").length > 1) {
        event.stopPropagation();
        removeOrderItem(orderItem);
        updateOrderPreview();
        return;
      }

      toggleOrderItem(orderItem);
    });
  }

  function bindActionFeedbackEvents() {
    document.addEventListener("wag:action-feedback", function (event) {
      const detail = event.detail || {};
      renderActionFeedback(detail.message || "", detail.status || "");
    });
  }

  function setupInitialItem() {
    addOrderItem({
      product: "",
      qty: 1,
      note: ""
    });
  }

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
      renderActionFeedback("Lengkapkan maklumat pesanan dahulu", "error");
      return;
    }

    openWhatsAppChat(currentWhatsAppURL);
  });

  copyMessageBtn.addEventListener("click", function () {
    if (!currentMessage) {
      renderActionFeedback("Tiada mesej untuk disalin", "error");
      return;
    }

    copyMessage(currentMessage);
  });

  copyLinkBtn.addEventListener("click", function () {
    if (!currentWhatsAppURL) {
      renderActionFeedback("Tiada link untuk disalin", "error");
      return;
    }

    copyWhatsAppLink(currentWhatsAppURL);
  });

  restoreCustomerDraft();
  renderShopIdentity();
  bindStaticFieldEvents();
  bindItemContainerEvents();
  bindActionFeedbackEvents();
  setupInitialItem();
  resetPreview();
});
