import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackgroundWrapper from '@/components/layout/BackgroundWrapper';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Freezyle Store Pro',
  description: 'Top Up Game Terpercaya & Termurah',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-[#05020a] text-white antialiased overflow-x-hidden`}>
        <Toaster position="top-center" richColors theme="dark" />
        
        <BackgroundWrapper>
          <div className="relative flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-24 pb-12">
               {children}
            </main>
            <Footer />
          </div>
        </BackgroundWrapper>
      </body>
    </html>
  );
}