'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Search, Trophy, Menu, X, LogIn, User } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Beranda', href: '/', icon: Gamepad2 },
  { name: 'Lacak Pesanan', href: '/track', icon: Search },
  { name: 'Top Sultan', href: '/leaderboard', icon: Trophy },
];

interface NavbarProps {
  onOpenAuth?: (view: 'LOGIN' | 'REGISTER') => void;
  user?: { name: string; email: string } | null;
  onLogout?: () => void;
  currentView?: string;
  onNavigate?: (view: string) => void;
  onSearch?: (query: string) => void;
}

export default function Navbar({
  onOpenAuth,
  user,
  onLogout,
  currentView,
  onNavigate,
  onSearch,
}: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-[#0a0514]/80 backdrop-blur-xl border-white/10 py-4 shadow-lg' 
          : 'bg-transparent border-transparent py-6'
      }`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
              <Gamepad2 className="text-white relative z-10" size={20} />
            </div>
            <div>
              <span className="block text-lg font-black text-white leading-none">FREEZYLE</span>
              <span className="text-[10px] font-bold text-purple-400 tracking-widest">STORE PRO</span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center bg-white/5 border border-white/5 rounded-full p-1.5 backdrop-blur-md">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className={`relative px-5 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                  {isActive && (
                    <motion.div layoutId="nav-pill" className="absolute inset-0 bg-purple-600 rounded-full shadow-lg" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <link.icon size={16} /> {link.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* AUTH BUTTONS */}
          <div className="hidden md:flex items-center gap-3">
             {user ? (
               <>
                 <span className="text-sm text-gray-300">{user.name}</span>
                 <button onClick={onLogout} className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-black transition-all flex items-center gap-2">
                   <User size={18} /> Keluar
                 </button>
               </>
             ) : (
               <>
                 <button onClick={() => onOpenAuth?.('LOGIN')} className="px-5 py-2.5 rounded-xl bg-white text-black text-sm font-black hover:bg-gray-200 transition-all flex items-center gap-2">
                    <User size={18} /> Masuk
                 </button>
                 <button onClick={() => onOpenAuth?.('REGISTER')} className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-black hover:bg-purple-700 transition-all">
                    Daftar
                 </button>
               </>
             )}
          </div>

          {/* MOBILE TOGGLE */}
          <button className="md:hidden p-2 text-white" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-y-0 right-0 w-[80%] bg-[#0f0818] border-l border-white/10 z-[60] p-6 flex flex-col md:hidden">
             <div className="flex justify-between items-center mb-8">
                <h3 className="font-black text-white">MENU</h3>
                <button onClick={() => setIsMobileMenuOpen(false)}><X className="text-gray-400"/></button>
             </div>
             <div className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 p-4 rounded-xl border ${pathname === link.href ? 'bg-purple-600/20 border-purple-500/50 text-purple-400' : 'bg-white/5 border-transparent text-gray-400'}`}>
                    <link.icon size={20} /> <span className="font-bold">{link.name}</span>
                  </Link>
                ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}