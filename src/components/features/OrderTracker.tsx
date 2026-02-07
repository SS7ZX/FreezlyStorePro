'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Check, Server, ShieldCheck } from 'lucide-react';

export default function OrderTracker({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  useEffect(() => {
    const t1 = setTimeout(() => setStep(2), 1500);
    const t2 = setTimeout(() => setStep(3), 3000);
    const t3 = setTimeout(() => onComplete(), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-black text-white italic mb-8 animate-pulse">MEMPROSES...</h2>
      <div className="space-y-4 w-full max-w-sm">
        <StepItem active={step >= 1} completed={step > 1} text="Menghubungkan Server" icon={Server} />
        <StepItem active={step >= 2} completed={step > 2} text="Verifikasi Pembayaran" icon={ShieldCheck} />
        <StepItem active={step >= 3} completed={step >= 3} text="Transaksi Berhasil" icon={Check} />
      </div>
    </div>
  );
}

function StepItem({ active, completed, text, icon: Icon }: any) {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: active ? 1 : 0.3, x: 0 }}
      className={`flex items-center gap-4 p-4 rounded-xl border ${active ? 'bg-purple-500/10 border-purple-500/30' : 'bg-white/5 border-white/5'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${completed ? 'bg-green-500' : 'bg-gray-700'}`}>
        {completed ? <Check size={16} className="text-white"/> : <Icon size={16} className="text-white"/>}
      </div>
      <p className="font-bold text-white">{text}</p>
    </motion.div>
  );
}