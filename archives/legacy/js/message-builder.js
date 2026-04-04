// message-builder.js

/* function buildOrderMessage(orderData) {

  const customerName = orderData.customerName || "-";
  const product = orderData.product || "-";
  const qty = orderData.qty || "1";
  const note = orderData.note && orderData.note.trim() !== "" 
                ? orderData.note 
                : "-";

  const message =
`ORDER BARU

Nama: ${customerName}
Produk: ${product}
Kuantiti: ${qty}

Catatan: ${note}`;

  return message;
} */// message-builder.js

function buildOrderMessage(orderData) {
  const customerName = orderData.customerName || "-";
  const customerPhone = orderData.customerPhone || "-";
  const items = Array.isArray(orderData.items) ? orderData.items : [];

  const validItems = items.filter(function (item) {
    return item.product && Number(item.qty) >= 1;
  });

  const itemLines = validItems.map(function (item, index) {
    const noteText = item.note && item.note.trim() !== "" ? item.note.trim() : "-";

    return [
      `Item ${index + 1}`,
      `Produk: ${item.product}`,
      `Kuantiti: ${item.qty}`,
      `Catatan: ${noteText}`
    ].join("\n");
  });

  const message = [
    "*ORDER BARU*",
    "",
    `Nama: ${customerName}`,
    `Telefon: ${customerPhone}`,
    "",
    "*Item Pesanan*",
    "",
    itemLines.join("\n\n")
  ].join("\n");

  return message;
}

