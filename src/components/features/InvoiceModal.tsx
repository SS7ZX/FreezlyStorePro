'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
  price: string;
}

export default function InvoiceModal({ isOpen, onClose, onConfirm, productName, price }: InvoiceModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()}
              className="bg-[#1a102e] border border-white/10 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-purple-900/30 p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-white font-bold flex items-center gap-2"><CheckCircle2 className="text-purple-400"/> Konfirmasi</h3>
                <button onClick={onClose}><X className="text-gray-400 hover:text-white"/></button>
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-white/5 p-4 rounded-xl"><p className="text-gray-400 text-xs">ITEM</p><p className="text-white font-bold">{productName}</p></div>
                <div className="flex justify-between items-center bg-purple-500/10 p-4 rounded-xl border border-purple-500/20"><span className="text-purple-200">Total</span><span className="text-purple-300 font-black text-xl">{price}</span></div>
              </div>
              <div className="p-6 grid grid-cols-2 gap-3">
                <button onClick={onClose} className="py-3 text-gray-400 font-bold hover:bg-white/5 rounded-xl">Batal</button>
                <button onClick={onConfirm} className="py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg">Bayar</button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}