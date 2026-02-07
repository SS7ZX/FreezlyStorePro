'use client';

import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#05030a] border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* KOLOM 1: BRAND */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black italic text-white tracking-tighter">
              FREEZYLE<span className="text-purple-500">.STORE</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Platform Top Up Game termurah, tercepat, dan terpercaya di Indonesia. 
              Proses otomatis 24 jam non-stop.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialIcon icon={Instagram} />
              <SocialIcon icon={Facebook} />
              <SocialIcon icon={Twitter} />
              <SocialIcon icon={Youtube} />
            </div>
          </div>

          {/* KOLOM 2: PETA SITUS */}
          <div>
            <h3 className="text-white font-bold mb-6">Peta Situs</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-purple-400 transition-colors">Beranda</Link></li>
              <li><Link href="/#games" className="hover:text-purple-400 transition-colors">Semua Game</Link></li>
              <li><Link href="/track" className="hover:text-purple-400 transition-colors">Lacak Pesanan</Link></li>
              <li><Link href="/terms" className="hover:text-purple-400 transition-colors">Syarat & Ketentuan</Link></li>
            </ul>
          </div>

          {/* KOLOM 3: DUKUNGAN */}
          <div>
            <h3 className="text-white font-bold mb-6">Dukungan</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/faq" className="hover:text-purple-400 transition-colors">WhatsApp CS</Link></li>
              <li><Link href="/contact" className="hover:text-purple-400 transition-colors">Email Support</Link></li>
              <li><Link href="/partnership" className="hover:text-purple-400 transition-colors">Partnership</Link></li>
            </ul>
          </div>

          {/* KOLOM 4: KONTAK */}
          <div>
            <h3 className="text-white font-bold mb-6">Hubungi Kami</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-purple-500 mt-0.5" />
                <span>Jl. Teknologi No. 99, Cyber City, Jakarta Selatan 12000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-purple-500" />
                <span>support@freezyle.store</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-purple-500" />
                <span>+62 812-3456-7890</span>
              </li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © 2024 Freezyle Store Pro. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon: Icon }: any) {
  return (
    <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition-all duration-300">
      <Icon size={18} />
    </a>
  );
}