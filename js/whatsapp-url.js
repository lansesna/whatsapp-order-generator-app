function normalizeWhatsAppPhone(phone) {
  return String(phone || "").replace(/[^\d]/g, "");
}

function generateWhatsAppURL(message) {
  const phone = normalizeWhatsAppPhone(APP_CONFIG.merchantPhone);
  const encodedMessage = encodeURIComponent(message);

  if (!phone) {
    return `https://wa.me/?text=${encodedMessage}`;
  }

  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

function openWhatsAppChat(waUrl) {
  window.open(waUrl, "_blank", "noopener,noreferrer");
}

function copyTextToClipboard(text, successMessage, errorMessage) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text)
      .then(function () {
        alert(successMessage);
      })
      .catch(function () {
        fallbackCopyText(text, successMessage, errorMessage);
      });
  }

  fallbackCopyText(text, successMessage, errorMessage);
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
      alert(successMessage);
    } else {
      alert(errorMessage);
    }
  } catch (error) {
    alert(errorMessage);
  }

  document.body.removeChild(textArea);
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