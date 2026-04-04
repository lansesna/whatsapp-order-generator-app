// whatsapp.js

/* function generateWhatsAppURL(message) {

  const phone = MERCHANT_CONFIG.merchantPhone;

  const encodedMessage = encodeURIComponent(message);

  const waUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

  return waUrl;
}

function openWhatsAppChat(waUrl) {

  window.open(waUrl, "_blank");

}

function copyWhatsAppLink(waUrl) {

  navigator.clipboard.writeText(waUrl);

  alert("WhatsApp link copied");

}

function copyMessage(message) {

  navigator.clipboard.writeText(message);

  alert("Message copied");

} */

// whatsapp.js

function generateWhatsAppURL(message) {
  const phone = MERCHANT_CONFIG.merchantPhone;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

function openWhatsAppChat(waUrl) {
  window.open(waUrl, "_blank");
}

function copyWhatsAppLink(waUrl) {
  navigator.clipboard.writeText(waUrl)
    .then(function () {
      alert("WhatsApp link copied");
    })
    .catch(function () {
      alert("Gagal menyalin WhatsApp link");
    });
}

function copyMessage(message) {
  navigator.clipboard.writeText(message)
    .then(function () {
      alert("Message copied");
    })
    .catch(function () {
      alert("Gagal menyalin mesej");
    });
}

