'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, ShieldCheck, CheckCircle2, Zap, CreditCard, 
  Wallet, QrCode, Mail, AlertTriangle, Loader2
} from 'lucide-react';
import { Toaster, toast } from 'sonner'; // Modern notification
import InvoiceModal from './InvoiceModal';
import OrderTracker from './OrderTracker';

const PAYMENT_CHANNELS = [
  { id: 'qris', name: 'QRIS', category: 'QRIS', icon: QrCode, fee: 0 },
  { id: 'gopay', name: 'GoPay', category: 'E-WALLET', icon: Wallet, fee: 1000 },
  { id: 'dana', name: 'DANA', category: 'E-WALLET', icon: Wallet, fee: 1000 },
  { id: 'bca', name: 'BCA Virtual Account', category: 'VIRTUAL ACCOUNT', icon: CreditCard, fee: 4500 },
];

interface Product {
  id: string;
  name: string;
  price: number;
}

export default function GameTopUpForm({ products }: { products: Product[] }) {
  // Form States
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  
  // UI States
  const [isCheckingId, setIsCheckingId] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<typeof PAYMENT_CHANNELS[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Validation States
  const [errors, setErrors] = useState<{userId?: string; email?: string}>({});

  // 1. Validasi Real-time
  const validateForm = () => {
    const newErrors: {userId?: string; email?: string} = {};
    if (!userId) newErrors.userId = "User ID wajib diisi";
    if (!email) {
      newErrors.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Format email tidak valid";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 2. Simulasi Cek ID dengan Error Handling
  const checkUsername = async () => {
    if (userId.length < 4) return;
    setIsCheckingId(true);
    setNickname('');
    
    try {
      // Simulasi delay fetch API
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      if (userId === "1234") { // Skenario ID Salah
        toast.error("User ID tidak ditemukan. Silakan cek kembali.");
      } else {
        setNickname("ProPlayer_Indo");
        toast.success("ID Terverifikasi: ProPlayer_Indo");
      }
    } catch (e) {
      toast.error("Gagal verifikasi ID. Masalah server.");
    } finally {
      setIsCheckingId(false);
    }
  };

  // 3. Handle Order submission
  const onSubmit = () => {
    if (!validateForm()) {
      toast.error("Mohon perbaiki kesalahan pada form");
      return;
    }
    if (!selectedProduct) {
      toast.error("Silakan pilih nominal top up");
      return;
    }
    if (!selectedPayment) {
      toast.error("Silakan pilih metode pembayaran");
      return;
    }
    setIsModalOpen(true);
  };

  const handleProcessPayment = async () => {
    setIsModalOpen(false);
    setIsProcessing(true);

    try {
      const res = await fetch('/api/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: (selectedProduct?.price || 0) + (selectedPayment?.fee || 0),
          email,
          gameTitle: 'Game Store Pro',
          productItem: selectedProduct?.name
        }),
      });

      const data = await res.json();
      if (data.invoiceUrl) {
        toast.success("Invoice berhasil dibuat! Mengalihkan...");
        setTimeout(() => window.location.href = data.invoiceUrl, 1500);
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      toast.error(err.message || "Gagal menghubungi server pembayaran");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <section className="relative z-30 container mx-auto px-4 -mt-20 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* KOLOM KIRI: INPUT DATA & PRODUK */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* STEP 1: AKUN */}
            <div className={`bg-[#1a102e] border ${errors.userId || errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-3xl p-6 md:p-8 shadow-2xl transition-all`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${userId && email && !errors.userId && !errors.email ? 'bg-green-500' : 'bg-purple-500'} text-white`}>
                  {userId && email && !errors.userId && !errors.email ? <CheckCircle2 size={16}/> : "1"}
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Data Akun</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">User ID</label>
                  <div className="relative">
                    <User className={`absolute left-4 top-3.5 ${errors.userId ? 'text-red-400' : 'text-gray-500'}`} size={18}/>
                    <input 
                      type="text" 
                      placeholder="Masukkan User ID"
                      className={`w-full bg-black/40 border ${errors.userId ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-purple-500'} rounded-xl pl-12 pr-4 py-3.5 text-white outline-none transition-all`}
                      value={userId}
                      onChange={(e) => { setUserId(e.target.value); setErrors({...errors, userId: undefined}); }}
                      onBlur={checkUsername}
                    />
                  </div>
                  {errors.userId && <p className="text-red-400 text-[10px] flex items-center gap-1"><AlertTriangle size={10}/> {errors.userId}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Alamat Email</label>
                  <div className="relative">
                    <Mail className={`absolute left-4 top-3.5 ${errors.email ? 'text-red-400' : 'text-gray-500'}`} size={18}/>
                    <input 
                      type="email" 
                      placeholder="email@anda.com"
                      className={`w-full bg-black/40 border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-purple-500'} rounded-xl pl-12 pr-4 py-3.5 text-white outline-none transition-all`}
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setErrors({...errors, email: undefined}); }}
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-[10px] flex items-center gap-1"><AlertTriangle size={10}/> {errors.email}</p>}
                </div>
              </div>

              {/* Verified Nickname Banner */}
              <AnimatePresence>
                {nickname && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-6 bg-purple-500/10 border border-purple-500/20 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400"><ShieldCheck size={20}/></div>
                    <p className="text-sm font-medium text-purple-200">Nickname: <span className="text-white font-bold tracking-wide">{nickname}</span></p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* STEP 2: NOMINAL */}
            <div className="bg-[#1a102e] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${selectedProduct ? 'bg-green-500' : 'bg-purple-500'} text-white`}>
                  {selectedProduct ? <CheckCircle2 size={16}/> : "2"}
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Pilih Nominal</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <button 
                    key={item.id} 
                    onClick={() => setSelectedProduct(item)}
                    className={`group relative p-5 rounded-2xl border text-left transition-all ${
                      selectedProduct?.id === item.id 
                      ? 'bg-purple-600 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.3)]' 
                      : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex flex-col h-full justify-between">
                      <p className={`font-black text-lg italic tracking-tight ${selectedProduct?.id === item.id ? 'text-white' : 'text-gray-100'}`}>
                        {item.name}
                      </p>
                      <p className={`text-sm mt-1 font-bold ${selectedProduct?.id === item.id ? 'text-purple-200' : 'text-purple-400'}`}>
                        Rp {item.price.toLocaleString()}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: PEMBAYARAN */}
          <div className="lg:col-span-4">
            <div className="bg-[#1a102e] border border-white/10 rounded-3xl p-6 shadow-2xl sticky top-24">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${selectedPayment ? 'bg-green-500' : 'bg-purple-500'} text-white`}>
                  {selectedPayment ? <CheckCircle2 size={16}/> : "3"}
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Pembayaran</h3>
              </div>

              <div className="space-y-3">
                {PAYMENT_CHANNELS.map((ch) => (
                  <button 
                    key={ch.id} 
                    onClick={() => setSelectedPayment(ch)}
                    className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all group ${
                      selectedPayment?.id === ch.id ? 'bg-white/10 border-purple-500 ring-1 ring-purple-500' : 'bg-black/20 border-white/5 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ch.icon size={22} className="text-black" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-black text-white uppercase">{ch.name}</p>
                        <p className="text-[10px] text-gray-500 font-bold tracking-widest">{ch.category}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* RINGKASAN & BUTTON */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center px-1">
                  <span className="text-gray-400 font-medium">Total Harga</span>
                  <span className="text-2xl font-black text-purple-400 tracking-tighter">
                    Rp {( (selectedProduct?.price || 0) + (selectedPayment?.fee || 0) ).toLocaleString()}
                  </span>
                </div>
                
                <button 
                  onClick={onSubmit}
                  disabled={isCheckingId}
                  className="w-full py-4 rounded-xl font-black text-white text-lg italic uppercase tracking-widest bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-900/20 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isCheckingId ? <Loader2 className="animate-spin" /> : <Zap size={20} className="fill-white" />}
                  Bayar Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InvoiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleProcessPayment}
        productName={selectedProduct?.name || '-'}
        price={`Rp ${( (selectedProduct?.price || 0) + (selectedPayment?.fee || 0) ).toLocaleString()}`}
      />

      {isProcessing && <OrderTracker onComplete={() => {}} />}
    </>
  );
}