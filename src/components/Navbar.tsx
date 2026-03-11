"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="flex justify-between items-center px-8 py-5 bg-[#FFEDF2] backdrop-blur-md sticky top-0 z-50 border-b border-pink-200">
      
      {/* 1. LOGO */}
      <Link href="/">
        <h1 className="text-2xl font-extrabold text-pink-600 tracking-tight cursor-pointer">
          BeautyCare.
        </h1>
      </Link>

      {/* 2. CONTAINER KANAN */}
      <div className="flex items-center space-x-6"> 
        
        {/* Menu Navigasi (Efek Pink Pindah ke sini) */}
        <div className="hidden md:flex items-center space-x-2">
          <Link 
            href="/" 
            className={`px-6 py-2.5 rounded-full font-bold transition-all duration-300 ${
              isActive('/') 
                ? 'bg-pink-500 text-white shadow-md' // Pink pekat saat aktif
                : 'text-pink-600 hover:bg-white/50'
            }`}
          >
            Home
          </Link>
          <Link 
            href="/katalog" 
            className={`px-6 py-2.5 rounded-full font-bold transition-all duration-300 ${
              isActive('/katalog') 
                ? 'bg-pink-500 text-white shadow-md' // Pink pekat saat aktif
                : 'text-pink-600 hover:bg-white/50'
            }`}
          >
            Katalog
          </Link>
        </div>

        {/* Tombol Login & Register (Hanya Tulisan) */}
        <div className="flex items-center space-x-1 border-l border-pink-200 pl-6">
          <Link 
            href="/login" 
            className={`px-4 py-2 rounded-full font-bold transition-all ${
              isActive('/login') ? 'bg-pink-500 text-white shadow-md' : 'text-pink-600 hover:bg-white/50'
            }`}
          >
            Login
          </Link>
          <Link 
            href="/register" 
            className={`px-4 py-2 rounded-full font-bold transition-all ${
              isActive('/register') ? 'bg-pink-500 text-white shadow-md' : 'text-pink-600 hover:bg-white/50'
            }`}
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}