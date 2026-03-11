"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase'; 

export default function AddProduct() {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name) newErrors.name = 'Nama produk wajib diisi';
    if (!brand) newErrors.brand = 'Brand wajib diisi';
    if (!category) newErrors.category = 'Kategori wajib diisi';
    if (!price) newErrors.price = 'Harga wajib diisi';
    if (!description) newErrors.description = 'Deskripsi wajib diisi';
    if (!imageUrl) newErrors.imageUrl = 'URL Gambar wajib diisi';
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);

      const { error: supabaseError } = await supabase.from('products').insert([
        {
          name: name,
          brand: brand,
          cat: category, 
          price: price,
          description: description,
          image: imageUrl,
        },
      ]);

      if (supabaseError) {
        alert('Gagal menyimpan: ' + supabaseError.message);
        setLoading(false);
      } else {
        alert('Mantap! Produk berhasil masuk database.');
        router.push('/katalog');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-pink-600 text-white p-4 shadow-md flex items-center justify-between">
        <h2 className="text-xl font-bold">Admin: Tambah Produk</h2>
        <Link href="/dashboard" className="text-sm bg-pink-700 px-4 py-2 rounded-xl hover:bg-pink-800 transition">
          Kembali
        </Link>
      </header>

      <main className="flex-grow p-6 max-w-2xl mx-auto w-full">
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-pink-100">
          <form onSubmit={handleSubmit} className="space-y-5 text-gray-900">
            
            {/* Nama Produk */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Nama Produk</label>
              <input
                type="text"
                placeholder="Contoh: Brightening Serum"
                className={`w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-pink-400 outline-none transition text-gray-900 placeholder:text-gray-400 ${formErrors.name ? 'ring-2 ring-red-400' : ''}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {formErrors.name && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.name}</p>}
            </div>

            {/* Brand */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Brand</label>
              <input
                type="text"
                placeholder="Contoh: Radiant Skin"
                className={`w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-pink-400 outline-none transition text-gray-900 placeholder:text-gray-400 ${formErrors.brand ? 'ring-2 ring-red-400' : ''}`}
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              {formErrors.brand && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.brand}</p>}
            </div>

{/* Kategori dengan Background Pink Pastel & Tanda Panah */}
<div>
  <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Kategori</label>
  <div className="relative">
    <select
      name="category"
      /* bg-pink-50 adalah warna pink pastel yang lembut */
      className={`w-full p-4 bg-pink-50 rounded-2xl border-none focus:ring-2 focus:ring-pink-400 outline-none appearance-none text-gray-900 transition-all ${
        formErrors.category ? 'ring-2 ring-red-400' : ''
      }`}
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="" className="text-gray-400">Pilih Kategori</option>
      <option value="Skincare" className="text-gray-900">Skincare</option>
      <option value="Makeup" className="text-gray-900">Makeup</option>
    </select>
    
    {/* Ikon Tanda Panah Bawah berwarna pink lebih gelap agar kontras */}
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-pink-500">
      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </div>
  </div>
  {formErrors.category && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.category}</p>}
</div>

            {/* Harga */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Harga</label>
              <input
                type="text"
                placeholder="Contoh: Rp 150.000"
                className={`w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-pink-400 outline-none transition text-gray-900 placeholder:text-gray-400 ${formErrors.price ? 'ring-2 ring-red-400' : ''}`}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {formErrors.price && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.price}</p>}
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Deskripsi</label>
              <textarea
                placeholder="Jelaskan manfaat produk..."
                rows={3}
                className={`w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-pink-400 outline-none transition text-gray-900 placeholder:text-gray-400 ${formErrors.description ? 'ring-2 ring-red-400' : ''}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              {formErrors.description && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.description}</p>}
            </div>

            {/* Link Foto */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Link Foto</label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                className={`w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-pink-400 outline-none transition text-gray-900 placeholder:text-gray-400 ${formErrors.imageUrl ? 'ring-2 ring-red-400' : ''}`}
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              {formErrors.imageUrl && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.imageUrl}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-pink-600 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? "Menyimpan ke Database..." : "Tambah Produk"}
            </button>

          </form>
        </div>
      </main>
    </div>
  );
}