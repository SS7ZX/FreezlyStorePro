'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Trophy, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export default function Features() {
  return (
    <div className="container mx-auto px-4 py-20 space-y-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TransactionLookup />
        <TopSpenders />
      </div>
    </div>
  );
}

// --- KOMPONEN CEK TRANSAKSI ---
function TransactionLookup() {
  const [trxId, setTrxId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trxId) return;
    setLoading(true);
    setResult(null);
    
    // Simulasi API
    setTimeout(() => {
      setLoading(false);
      setResult({
        id: trxId,
        status: 'SUCCESS',
        item: '86 Diamonds',
        game: 'Mobile Legends',
        date: '2024-02-07 14:30'
      });
    }, 1500);
  };

  return (
    <div className="bg-[#130d21]/50 border border-white/10 p-8 rounded-[2rem] relative overflow-hidden group hover:border-purple-500/30 transition-colors">
       <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
          <Search size={100} />
       </div>
       <h2 className="text-2xl font-black italic text-white mb-6 flex items-center gap-2">
         <Search className="text-purple-500" /> TRACK ORDER
       </h2>

       <form onSubmit={handleSearch} className="flex gap-2 mb-6 relative z-10">
          <input 
            type="text" 
            value={trxId}
            onChange={(e) => setTrxId(e.target.value)}
            placeholder="Masukkan ID Transaksi (Contoh: TRX-123)"
            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
          />
          <button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-500 text-white px-6 rounded-xl font-bold transition-colors disabled:opacity-50">
            {loading ? <Loader2 className="animate-spin" /> : 'Cek'}
          </button>
       </form>

       {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
             <div className="flex items-center gap-3 text-green-400 font-bold mb-2">
                <CheckCircle2 /> Transaksi Ditemukan
             </div>
             <div className="text-sm text-gray-300 space-y-1">
                <p>Item: <span className="text-white">{result.item}</span></p>
                <p>Status: <span className="text-green-400">{result.status}</span></p>
             </div>
          </motion.div>
       )}
    </div>
  );
}

// --- KOMPONEN TOP SPENDERS ---
function TopSpenders() {
  const topSpenders = [
    { name: "Sultan_Indo", total: "Rp 15.400.000", rank: 1 },
    { name: "ProPlayer99", total: "Rp 12.100.000", rank: 2 },
    { name: "GamerGanteng", total: "Rp 9.800.000", rank: 3 },
  ];

  return (
    <div className="bg-[#130d21]/50 border border-white/10 p-8 rounded-[2rem] relative overflow-hidden group hover:border-yellow-500/30 transition-colors">
       <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
         <Trophy size={100} className="text-yellow-500"/>
       </div>
       <h2 className="text-2xl font-black italic text-white mb-6 flex items-center gap-2">
         <Trophy className="text-yellow-500" /> TOP SULTAN
       </h2>
       
       <div className="space-y-3 relative z-10">
          {topSpenders.map((user, i) => (
             <div key={i} className={`flex items-center justify-between p-4 rounded-xl border ${i === 0 ? 'bg-gradient-to-r from-yellow-500/20 to-transparent border-yellow-500/30' : 'bg-white/5 border-white/5'}`}>
                <div className="flex items-center gap-4">
                   <div className={`w-8 h-8 flex items-center justify-center font-black rounded-full ${i===0?'bg-yellow-400 text-black': i===1?'bg-gray-300 text-black':'bg-orange-700 text-white'}`}>
                      {user.rank}
                   </div>
                   <span className="font-bold text-white">{user.name}</span>
                </div>
                <span className="font-mono text-yellow-400 font-bold">{user.total}</span>
             </div>
          ))}
       </div>
    </div>
  );
}