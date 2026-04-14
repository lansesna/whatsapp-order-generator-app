const APP_CONFIG = {
  vendor: {
    name: "Kedai Sambal",
    phone: "60163216939",
    description: "",
    contactLabel: "",
    note: "",
    hasLogoPlaceholder: false
  },
  products: [
    "Sambal Pedas",
    "Sambal Original",
    "Sambal Extra Pedas"
  ],
  settings: {
    previewPlaceholder: "Preview mesej akan muncul di sini apabila maklumat wajib diisi.",
    orderFlowHint: "Selepas hantar, terus sahkan pesanan anda dengan vendor di WhatsApp.",
    previewStateText: {
      empty: "Isi maklumat pelanggan dan pilih item untuk lihat preview mesej.",
      invalid: "Preview belum tersedia. Sila betulkan maklumat pesanan."
    },
    localStorageKeys: {
      customerName: "wag_lastCustomerName",
      customerPhone: "wag_lastCustomerPhone"
    }
  }
};
