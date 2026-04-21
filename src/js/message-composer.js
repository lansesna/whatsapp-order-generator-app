function normalizeOptionalText(value) {
  const trimmed = String(value || "").trim();
  return trimmed !== "" ? trimmed : "-";
}

function composeOrderMessageData(orderData) {
  const customerName = normalizeOptionalText(orderData.customerName);
  const customerPhone = normalizeOptionalText(orderData.customerPhone);

  const items = Array.isArray(orderData.items) ? orderData.items : [];

  const validItems = items
    .filter(function (item) {
      return item.product && Number(item.qty) >= 1;
    })
    .map(function (item, index) {
      return {
        index: index + 1,
        product: item.product,
        qty: Number(item.qty),
        note: normalizeOptionalText(item.note)
      };
    });

  return {
    title: "ORDER BARU",
    customerName: customerName,
    customerPhone: customerPhone,
    itemsHeading: "Item Pesanan",
    items: validItems
  };
}