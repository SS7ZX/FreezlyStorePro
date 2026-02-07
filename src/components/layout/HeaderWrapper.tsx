'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import AuthModal from '@/components/features/AuthModal';

export default function HeaderWrapper() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authView, setAuthView] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Handler saat user klik Login/Register di Navbar
  const handleOpenAuth = (view: 'LOGIN' | 'REGISTER') => {
    setAuthView(view);
    setIsAuthOpen(true);
  };

  // Handler saat Login Sukses
  const handleLoginSuccess = (userData: { name: string; email: string }) => {
    setUser(userData);
    setIsAuthOpen(false);
  };

  // Handler Logout
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <Navbar 
        onOpenAuth={handleOpenAuth}
        user={user}
        onLogout={handleLogout}
        currentView="HOME"
        onNavigate={(view: string) => console.log("Navigate to:", view)} // Logika navigasi nanti
        onSearch={(query: string) => console.log("Search:", query)}      // Logika search nanti
      />

      {/* Modal Login dipasang disini agar bisa dikontrol state-nya */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialView={authView}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}