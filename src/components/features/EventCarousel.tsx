'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const EVENTS = [
  { id: 1, title: "Mobile Legends", desc: "Promo Diamond Kuning Diskon 50%!", color: "from-yellow-600 to-orange-600" },
  { id: 2, title: "Valorant Points", desc: "Bonus 2x Points untuk pembelian via QRIS", color: "from-red-600 to-pink-600" },
  { id: 3, title: "PUBG Mobile", desc: "Royal Pass Season Baru Telah Tiba", color: "from-green-600 to-emerald-600" },
];

export default function EventCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % EVENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative h-[200px] md:h-[300px] rounded-3xl overflow-hidden border border-white/10">
        <AnimatePresence mode='wait'>
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 bg-gradient-to-r ${EVENTS[current].color} flex items-center px-10 md:px-20`}
          >
            <div className="relative z-10">
               <h2 className="text-4xl md:text-6xl font-black italic text-white mb-2">{EVENTS[current].title}</h2>
               <p className="text-white/90 text-xl">{EVENTS[current].desc}</p>
            </div>
            
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-4 right-4 flex gap-2 z-20">
           {EVENTS.map((_, i) => (
             <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-white' : 'w-2 bg-white/30'}`} />
           ))}
        </div>
      </div>
    </div>
  );
}