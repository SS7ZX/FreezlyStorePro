import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#0a0514] flex items-center justify-center p-4">
      <div className="bg-[#1a102e] p-8 rounded-3xl text-center max-w-md border border-white/10 shadow-2xl">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.6)]">
          <CheckCircle2 size={40} className="text-white" />
        </div>
        <h1 className="text-3xl font-black text-white italic mb-2">PEMBAYARAN BERHASIL!</h1>
        <p className="text-gray-400 mb-8">
          Diamond akan masuk ke akun kamu dalam 1-5 menit. Terima kasih sudah top up di Freezyle.
        </p>
        <Link 
          href="/" 
          className="block w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all"
        >
          Top Up Lagi
        </Link>
      </div>
    </main>
  );
}