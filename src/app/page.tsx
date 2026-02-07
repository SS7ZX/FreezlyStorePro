import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/features/Hero';
import EventCarousel from '@/components/features/EventCarousel';
import Features from '@/components/features/Features';
import FloatingWidget from '@/components/features/FloatingWidget';
import HeaderWrapper from '@/components/layout/HeaderWrapper'; // <--- IMPORT BARU

// Agar data selalu fresh
export const revalidate = 0;

export default async function Home() {
  // 1. Ambil List Game dari Supabase
  const { data: games } = await supabase
    .from('games')
    .select('*')
    .order('title', { ascending: true });
    

  return (
    <main className="min-h-screen bg-[#0a0514] selection:bg-purple-500/30">
      
      {/* --- BAGIAN YANG DIPERBAIKI --- */}
      {/* Kita ganti Navbar dengan HeaderWrapper yang aman */}
      <HeaderWrapper /> 
      {/* ----------------------------- */}

      {/* HERO SECTION */}
      <Hero />

      {/* CAROUSEL EVENT */}
      <div className="my-10">
        <EventCarousel />
      </div>

      {/* FITUR */}
      <Features />

      {/* LIST GAME */}
      <div id="games" className="container mx-auto px-6 py-20">
        <div className="flex items-center gap-4 mb-10">
           <div className="h-10 w-2 bg-purple-600 rounded-full" />
           <h2 className="text-3xl md:text-4xl font-black italic text-white tracking-tighter">
             PILIH GAME
           </h2>
        </div>

        {/* Grid Game */}
        {games && games.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {games.map((game) => (
              <Link key={game.id} href={`/game/${game.slug}`} className="group relative">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-[#130d21] group-hover:border-purple-500/50 transition-all duration-300 shadow-xl group-hover:shadow-purple-500/20 group-hover:-translate-y-2">
                  <img 
                    src={game.thumbnail_url} 
                    alt={game.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute bottom-0 left-0 w-full p-4 text-center">
                    <h3 className="text-white font-bold text-sm md:text-base leading-tight group-hover:text-purple-300 transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
                      {game.publisher}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <p className="text-gray-400 mb-4">Belum ada game tersedia.</p>
            <p className="text-xs text-gray-600">Pastikan database Supabase sudah diisi.</p>
          </div>
        )}
      </div>

      <Footer />
      <FloatingWidget />
    </main>
  );
}