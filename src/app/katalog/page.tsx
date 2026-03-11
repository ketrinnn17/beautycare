"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function KatalogPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKatalog = async () => {
      setLoading(true);
      // Mengambil SEMUA produk dari tabel 'products'
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchKatalog();
  }, []);

  if (loading) return <div className="text-center py-20 text-pink-500 font-bold">Membuka lemari kecantikan...</div>;

  return (
    <div className="min-h-screen bg-[#FFF5F7] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Semua Koleksi</h1>
          <p className="text-gray-500">Temukan produk impianmu untuk hasil yang memukau.</p>
        </header>

        {products.length === 0 ? (
          <div className="text-center text-gray-400 py-20">Belum ada produk yang tersedia.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="group bg-white rounded-[40px] p-5 border border-pink-50 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Gambar */}
                <div className="relative h-64 w-full mb-6 overflow-hidden rounded-[30px] bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/80 backdrop-blur-md text-pink-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase">
                      {product.cat}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="px-2">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-400 font-medium mt-1 mb-4">{product.brand || 'BeautyCare Official'}</p>
                  
                  <div className="mb-6">
                    <span className="text-2xl font-black text-pink-600">{product.price}</span>
                  </div>

                  {/* LINK DETAIL: Pastikan mengarah ke [id] */}
                  <Link 
                    href={`/katalog/${product.id}`}
                    className="block w-full py-4 bg-pink-50 text-pink-600 text-center rounded-[20px] font-bold text-sm hover:bg-pink-500 hover:text-white transition-all duration-300"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}