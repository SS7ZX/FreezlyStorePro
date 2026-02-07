import { supabase } from '@/lib/supabaseClient';
import Footer from '@/components/layout/Footer';
import GameTopUpForm from '@/components/features/GameTopUpForm';
import { notFound } from 'next/navigation';
import HeaderWrapper from '@/components/layout/HeaderWrapper';

export const revalidate = 0;

// Perbaikan Utama: Tambahkan Promise pada tipe params
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function GameDetail({ params }: PageProps) {
  // Perbaikan Utama: Await params sebelum dipakai
  const { slug } = await params;

  // 1. Ambil Data Game
  const { data: game } = await supabase
    .from('games')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!game) {
    return notFound(); 
  }

  // 2. Ambil Produk
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('game_id', game.id)
    .order('price', { ascending: true });

  return (
    <main className="min-h-screen bg-[#0a0514] selection:bg-purple-500/30">
      <HeaderWrapper />

      {/* BANNER */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0514] via-[#0a0514]/40 to-transparent z-10" />
        <img 
            src={game.banner_url} 
            alt={game.title} 
            className="w-full h-full object-cover object-top" 
        />
        <div className="absolute bottom-0 left-0 w-full z-20 container mx-auto px-4 pb-24 flex items-end gap-6">
            <div className="w-24 h-24 rounded-[2rem] overflow-hidden border-4 border-[#0a0514] shadow-2xl bg-gray-800">
                <img src={game.thumbnail_url} alt="icon" className="w-full h-full object-cover" />
            </div>
            <div className="mb-4">
                <h1 className="text-3xl md:text-5xl font-black text-white italic uppercase drop-shadow-lg">
                    {game.title}
                </h1>
                <p className="text-purple-300 font-medium">Official Store</p>
            </div>
        </div>
      </div>

      {/* FORM TRANSAKSI */}
      <GameTopUpForm products={products || []} />

      <Footer />
    </main>
  );
}