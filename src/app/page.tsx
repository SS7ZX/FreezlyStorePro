'use client';

import Hero from '@/components/features/Hero';
import EventCarousel from '@/components/features/EventCarousel';
import Features from '@/components/features/Features'; // Pastikan export default di file aslinya
import GameCard from '@/components/ui/GameCard';
import { motion } from 'framer-motion';

// Mock Data Game (Bisa ambil dari src/data/games.ts)
const GAMES = [
  { id: 'mlbb', name: 'Mobile Legends', publisher: 'Moonton', image: '/mlbb.jpg', isPopular: true },
  { id: 'pubg', name: 'PUBG Mobile', publisher: 'Tencent', image: '/pubg.jpg', isPopular: true },
  { id: 'ff', name: 'Free Fire', publisher: 'Garena', image: '/ff.jpg', isPopular: false },
  { id: 'genshin', name: 'Genshin Impact', publisher: 'HoYoverse', image: '/genshin.jpg', isPopular: true },
  { id: 'valorant', name: 'Valorant', publisher: 'Riot Games', image: '/val.jpg', isPopular: false },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* 1. HERO SECTION */}
      <Hero />
      
      {/* 2. PROMO CAROUSEL */}
      <section className="container mx-auto px-4 relative z-10">
         <div className="mb-6 flex items-center gap-3">
            <div className="h-8 w-1 bg-purple-500 rounded-full"/>
            <h2 className="text-2xl font-black italic">EVENT & PROMO</h2>
         </div>
         <EventCarousel />
      </section>

      {/* 3. GAME LIST GRID */}
      <section className="container mx-auto px-4" id="games">
         <div className="mb-8 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2">PILIH <span className="text-purple-500">GAME</span></h2>
            <p className="text-gray-400">Top up game favoritmu dalam hitungan detik.</p>
         </div>

         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {GAMES.map((game, index) => (
                <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                >
                    <GameCard game={game} />
                </motion.div>
            ))}
         </div>
      </section>

      {/* 4. FEATURES & TRUST */}
      <Features />
    </div>
  );
}