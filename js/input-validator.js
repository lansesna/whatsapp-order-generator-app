function hasAtLeastOneValidItem(items) {
  return items.some(function (item) {
    return item.product && Number(item.qty) >= 1;
  });
}

function validateOrderData(orderData) {
  if (!orderData.customerName) {
    return {
      valid: false,
      message: "Sila masukkan nama pelanggan"
    };
  }

  if (!orderData.items || !orderData.items.length || !hasAtLeastOneValidItem(orderData.items)) {
    return {
      valid: false,
      message: "Sila pilih sekurang-kurangnya satu produk"
    };
  }

  for (let i = 0; i < orderData.items.length; i += 1) {
    const item = orderData.items[i];

    if (!item.product) {
      return {
        valid: false,
        message: `Sila pilih produk untuk Item ${i + 1}`
      };
    }

    if (!item.qty || Number(item.qty) < 1) {
      return {
        valid: false,
        message: `Kuantiti Item ${i + 1} mesti sekurang-kurangnya 1`
      };
    }
  }

  return {
    valid: true,
    message: ""
  };
}