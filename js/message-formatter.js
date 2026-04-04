function formatOrderMessage(messageData) {
  const lines = [];

  lines.push(`*${messageData.title}*`);
  lines.push("");
  lines.push(`Nama: ${messageData.customerName}`);
  lines.push(`Telefon: ${messageData.customerPhone}`);
  lines.push("");
  lines.push(`*${messageData.itemsHeading}*`);
  lines.push("");

  messageData.items.forEach(function (item, index) {
    lines.push(`Item ${item.index}`);
    lines.push(`Produk: ${item.product}`);
    lines.push(`Kuantiti: ${item.qty}`);
    lines.push(`Catatan: ${item.note}`);

    if (index < messageData.items.length - 1) {
      lines.push("");
    }
  });

  return lines.join("\n");
}