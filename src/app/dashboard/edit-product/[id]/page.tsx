"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  // State untuk form
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    cat: '',
    brand: '',
    image: ''
  });

  // 1. Ambil data lama saat halaman dimuat
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) throw error;
        if (data) {
          setFormData({
            name: data.name,
            price: data.price.toString(), // Pastikan jadi string untuk input
            cat: data.cat,
            brand: data.brand || '',
            image: data.image
          });
        }
      } catch (err) {
        console.error("Gagal ambil data:", err);
        alert("Produk tidak ditemukan!");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchProduct();
  }, [params.id]);

  // 2. Fungsi simpan perubahan
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: formData.name,
          price: parseInt(formData.price), // Ubah kembali ke angka
          cat: formData.cat,
          brand: formData.brand,
          image: formData.image
        })
        .eq('id', params.id);

      if (error) throw error;

      alert("Produk berhasil diperbarui! ✨");
      router.push('/dashboard'); // Balik ke dashboard
      router.refresh(); // Segarkan data
    } catch (err: any) {
      alert("Gagal update: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Menyiapkan data produk...</div>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Produk</h1>
      
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nama Produk</label>
          <input
            type="text"
            className="w-full p-2 border rounded text-black"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Harga (Angka Saja)</label>
          <input
            type="number"
            className="w-full p-2 border rounded text-black"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Kategori</label>
          <select 
            className="w-full p-2 border rounded text-black"
            value={formData.cat}
            onChange={(e) => setFormData({...formData, cat: e.target.value})}
          >
            <option value="Skincare">Skincare</option>
            <option value="Makeup">Makeup</option>
            <option value="Bodycare">Bodycare</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">URL Gambar</label>
          <input
            type="text"
            className="w-full p-2 border rounded text-black"
            value={formData.image}
            onChange={(e) => setFormData({...formData, image: e.target.value})}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-pink-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-pink-600"
          >
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-200 px-6 py-2 rounded-lg font-bold"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
