"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Registrasi Berhasil! Kamu bisa langsung login.");
      router.push('/login');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-[32px] shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">Buat Akun BeautyCare</h2>
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-4 mb-4 bg-gray-50 rounded-2xl text-black outline-none focus:ring-2 focus:ring-pink-300"
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-4 mb-6 bg-gray-50 rounded-2xl text-black outline-none focus:ring-2 focus:ring-pink-300"
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button className="w-full bg-pink-500 text-white p-4 rounded-2xl font-bold hover:bg-pink-600 transition">
          {loading ? "Mendaftarkan..." : "Daftar Sekarang"}
        </button>


{/* TAMBAHKAN KODE DI BAWAH INI */}
<div className="mt-6 text-center">
  <p className="text-gray-600 text-sm">
    Sudah punya akun?{" "}
    <Link href="/login" className="text-pink-600 font-bold hover:underline">
      Login di sini
    </Link>
  </p>
</div>
      </form>
    </div>
  );
}