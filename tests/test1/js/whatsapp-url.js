function normalizeWhatsAppPhone(phone) {
  return String(phone || "").replace(/[^\d]/g, "");
}

function emitActionFeedback(message, status) {
  document.dispatchEvent(new CustomEvent("wag:action-feedback", {
    detail: {
      message: message,
      status: status
    }
  }));
}

function generateWhatsAppURL(message) {
  const phone = normalizeWhatsAppPhone(APP_CONFIG.vendor && APP_CONFIG.vendor.phone);
  const encodedMessage = encodeURIComponent(message);

  if (!phone) {
    return `https://wa.me/?text=${encodedMessage}`;
  }

  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

function openWhatsAppChat(waUrl) {
  window.open(waUrl, "_blank", "noopener,noreferrer");
  emitActionFeedback("WhatsApp dibuka pada tab baharu", "success");
}

function copyTextToClipboard(text, successMessage, errorMessage) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text)
      .then(function () {
        emitActionFeedback(successMessage, "success");
      })
      .catch(function () {
        return fallbackCopyText(text, successMessage, errorMessage);
      });
  }

  return fallbackCopyText(text, successMessage, errorMessage);
}

function fallbackCopyText(text, successMessage, errorMessage) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "absolute";
  textArea.style.left = "-9999px";

  document.body.appendChild(textArea);
  textArea.select();

  try {
    const copied = document.execCommand("copy");
    if (copied) {
      emitActionFeedback(successMessage, "success");
    } else {
      emitActionFeedback(errorMessage, "error");
    }
  } catch (error) {
    emitActionFeedback(errorMessage, "error");
  }

  document.body.removeChild(textArea);

  return Promise.resolve();
}

function copyWhatsAppLink(waUrl) {
  return copyTextToClipboard(
    waUrl,
    "Link WhatsApp berjaya disalin",
    "Gagal menyalin link WhatsApp"
  );
}

function copyMessage(message) {
  return copyTextToClipboard(
    message,
    "Mesej berjaya disalin",
    "Gagal menyalin mesej"
  );
}
