"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  // State Form
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    cat: '',
    brand: '',
    image: ''
  });

  // 1. Ambil data produk dari Supabase saat halaman dibuka
  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) throw error;

        if (data) {
          setFormData({
            name: data.name || '',
            price: data.price?.toString() || '',
            cat: data.cat || '',
            brand: data.brand || '',
            image: data.image || ''
          });
        }
      } catch (err: any) {
        alert("Gagal mengambil data: " + err.message);
        router.push('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id, router]);

  // 2. Fungsi untuk menyimpan perubahan ke Supabase
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setUpdating(true);
      
      const { error } = await supabase
        .from('products')
        .update({
          name: formData.name,
          price: parseInt(formData.price) || 0, // Pastikan jadi angka murni (anti-NaN)
          cat: formData.cat,
          brand: formData.brand,
          image: formData.image
        })
        .eq('id', params.id);

      if (error) throw error;

      alert("Produk berhasil diperbarui! ✨");
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      alert("Gagal update produk: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF5F7] flex items-center justify-center">
        <p className="text-pink-500 font-bold animate-pulse">Memuat data produk...</p>
      </div>
    );
  }

  return (
    // Penambahan bg-[#FFF5F7] dan text-black agar tidak gelap/dark mode
    <div className="min-h-screen bg-[#FFF5F7] text-black py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
            <Link href="/dashboard" className="bg-white p-3 rounded-full shadow-sm hover:bg-pink-50 transition-colors">
                ⬅️
            </Link>
            <h1 className="text-3xl font-black text-gray-900">Edit Produk</h1>
        </div>

        <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-xl border border-pink-50">
          <form onSubmit={handleUpdate} className="space-y-6">
            
            {/* Nama Produk */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Nama Produk</label>
              <input
                type="text"
                required
                className="w-full px-6 py-4 rounded-2xl border-2 border-pink-50 bg-pink-50/30 focus:border-pink-400 focus:bg-white outline-none transition-all text-black"
                placeholder="Masukkan nama produk..."
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            {/* Harga Produk */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Harga (Rupiah)</label>
              <input
                type="number"
                required
                className="w-full px-6 py-4 rounded-2xl border-2 border-pink-50 bg-pink-50/30 focus:border-pink-400 focus:bg-white outline-none transition-all text-black"
                placeholder="Contoh: 50000"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Kategori</label>
              <select
                className="w-full px-6 py-4 rounded-2xl border-2 border-pink-50 bg-pink-50/30 focus:border-pink-400 focus:bg-white outline-none transition-all text-black appearance-none"
                value={formData.cat}
                onChange={(e) => setFormData({...formData, cat: e.target.value})}
              >
                <option value="Skincare">Skincare</option>
                <option value="Makeup">Makeup</option>
                <option value="Bodycare">Bodycare</option>
                <option value="Fragrance">Fragrance</option>
              </select>
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Brand</label>
              <input
                type="text"
                className="w-full px-6 py-4 rounded-2xl border-2 border-pink-50 bg-pink-50/30 focus:border-pink-400 focus:bg-white outline-none transition-all text-black"
                placeholder="Nama brand..."
                value={formData.brand}
                onChange={(e) => setFormData({...formData, brand: e.target.value})}
              />
            </div>

            {/* URL Gambar */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">URL Gambar Produk</label>
              <input
                type="text"
                className="w-full px-6 py-4 rounded-2xl border-2 border-pink-50 bg-pink-50/30 focus:border-pink-400 focus:bg-white outline-none transition-all text-black"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
              />
            </div>

            {/* Tombol Aksi */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={updating}
                className="py-4 bg-pink-500 text-white rounded-2xl font-bold shadow-lg shadow-pink-200 hover:bg-pink-600 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {updating ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
