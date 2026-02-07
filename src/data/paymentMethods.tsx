import { QrCode, Wallet, CreditCard, Building2 } from 'lucide-react';

export const PAYMENT_CATEGORIES = [
  {
    id: "ewallet",
    name: "E-Wallet & QRIS",
    icon: QrCode,
    methods: [
      { id: "qris", name: "QRIS (All Payment)", icon: "/images/qris.png", fee_flat: 750, fee_percent: 0.7 },
      { id: "gopay", name: "GoPay", icon: "/images/gopay.png", fee_flat: 0, fee_percent: 2 },
      { id: "dana", name: "DANA", icon: "/images/dana.png", fee_flat: 0, fee_percent: 1.5 },
      { id: "ovo", name: "OVO", icon: "/images/ovo.png", fee_flat: 0, fee_percent: 3 },
    ]
  },
  {
    id: "va",
    name: "Virtual Account",
    icon: Building2,
    methods: [
      { id: "bca_va", name: "BCA Virtual Account", icon: "/images/bca.png", fee_flat: 4500, fee_percent: 0 },
      { id: "bri_va", name: "BRI Virtual Account", icon: "/images/bri.png", fee_flat: 3000, fee_percent: 0 },
      { id: "mandiri_va", name: "Mandiri VA", icon: "/images/mandiri.png", fee_flat: 3500, fee_percent: 0 },
    ]
  }
];