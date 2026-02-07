'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function TrackPage() {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'FOUND' | 'ERROR'>('IDLE');

  const handleTrack = () => {
    if (!orderId) { toast.error("Masukkan Nomor Invoice dulu!"); return; }
    setStatus('LOADING');
    
    // Simulasi Loading
    setTimeout(() => {
        if (orderId.toUpperCase().startsWith("ORDER")) setStatus('FOUND');
        else setStatus('ERROR');
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 min-h-[60vh] flex flex-col items-center justify-center max-w-2xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-white mb-4">Lacak <span className="text-purple-500">Pesanan</span></h1>
        <p className="text-gray-400">Masukkan Nomor Invoice (ORDER-XXX) untuk cek status.</p>
      </div>

      <div className="w-full relative flex bg-[#1a102e] rounded-2xl border border-white/10 p-2 shadow-2xl mb-8">
         <input 
            type="text" 
            placeholder="Contoh: ORDER-12345..." 
            className="flex-1 bg-transparent text-white px-6 py-4 outline-none font-bold"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
         />
         <button onClick={handleTrack} disabled={status === 'LOADING'} className="bg-purple-600 hover:bg-purple-500 text-white px-8 rounded-xl font-bold transition-all disabled:opacity-50">
            {status === 'LOADING' ? '...' : <Search />}
         </button>
      </div>

      <AnimatePresence mode='wait'>
        {status === 'FOUND' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full bg-[#130a22] border border-green-500/30 p-6 rounded-3xl">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-400"><CheckCircle2/></div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Transaksi Ditemukan</h3>
                        <p className="text-green-400 text-sm">Pembayaran Berhasil</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between"><span className="text-gray-500">Item</span><span className="font-bold">Mobile Legends - 86 Diamonds</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Total</span><span className="font-bold text-purple-400">Rp 21.500</span></div>
                </div>
            </motion.div>
        )}
        {status === 'ERROR' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl flex items-center gap-2">
                <AlertCircle size={20}/> Invoice tidak ditemukan.
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}