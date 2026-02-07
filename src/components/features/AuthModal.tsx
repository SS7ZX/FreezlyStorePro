'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Github, Gamepad2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView: 'LOGIN' | 'REGISTER';
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

export default function AuthModal({ isOpen, onClose, initialView, onLoginSuccess }: AuthModalProps) {
  const [view, setView] = useState(initialView);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  // Reset view saat modal dibuka
  useEffect(() => {
    if (isOpen) setView(initialView);
  }, [isOpen, initialView]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Simulasi Login Sukses
      setTimeout(() => {
        onLoginSuccess({
            name: name || "Sultan_Freezyle",
            email: email || "sultan@example.com"
        });
        onClose();
      }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Gelap */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose} 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative z-10 w-full max-w-md bg-[#130d21] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 p-6 text-center relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                    <X size={20} />
                </button>
                <div className="w-16 h-16 bg-purple-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg rotate-3">
                    <Gamepad2 size={32} className="text-white" />
                </div>
                <h2 className="text-2xl font-black italic text-white">
                    {view === 'LOGIN' ? 'WELCOME BACK!' : 'JOIN THE CLUB'}
                </h2>
                <p className="text-gray-400 text-sm mt-2">Masuk untuk akses fitur eksklusif</p>
            </div>

            {/* Form */}
            <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {view === 'REGISTER' && (
                        <div className="relative group">
                            <User className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={20} />
                            <input 
                                type="text" 
                                placeholder="Username"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-[#0a0514] border border-white/10 rounded-xl py-3 pl-12 text-white focus:border-purple-500 outline-none transition-colors" 
                            />
                        </div>
                    )}
                    
                    <div className="relative group">
                        <Mail className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={20} />
                        <input 
                            type="email" 
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#0a0514] border border-white/10 rounded-xl py-3 pl-12 text-white focus:border-purple-500 outline-none transition-colors" 
                        />
                    </div>

                    <div className="relative group">
                        <Lock className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={20} />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="w-full bg-[#0a0514] border border-white/10 rounded-xl py-3 pl-12 text-white focus:border-purple-500 outline-none transition-colors" 
                        />
                    </div>

                    <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-3 rounded-xl font-bold text-white shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
                        {view === 'LOGIN' ? 'LOG IN' : 'CREATE ACCOUNT'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-400 mt-6">
                        {view === 'LOGIN' ? "Belum punya akun? " : "Sudah punya akun? "}
                        <button onClick={() => setView(view === 'LOGIN' ? 'REGISTER' : 'LOGIN')} className="text-purple-400 font-bold hover:underline">
                            {view === 'LOGIN' ? 'Daftar Sekarang' : 'Log In'}
                        </button>
                    </p>
                </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}