"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login Gagal: " + error.message);
      setLoading(false);
    } else {
      alert("Selamat Datang!");
      // Gunakan window.location agar halaman reload total dan session terbaca middleware
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-[32px] shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">Login Admin</h2>
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-4 mb-4 bg-gray-50 rounded-2xl text-black outline-none focus:ring-2 focus:ring-pink-300"
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-4 mb-6 bg-gray-50 rounded-2xl text-black outline-none focus:ring-2 focus:ring-pink-300"
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button className="w-full bg-pink-500 text-white p-4 rounded-2xl font-bold hover:bg-pink-600 transition">
          {loading ? "Mengecek..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}
