"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function PopularProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopular = async () => {
      setLoading(true);
      // Mengambil 4 produk terbaru
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(4)
        .order('created_at', { ascending: false });

      if (data) {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchPopular();
  }, []);

  if (loading) return <div className="text-center py-20 text-pink-500 font-medium">Memuat produk cantik...</div>;

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 italic">Produk Terlaris</h2>
          <p className="text-gray-500 mt-2">Pilihan favorit para beauty enthusiast.</p>
        </div>
        <Link href="/katalog" className="text-pink-600 font-bold hover:text-pink-700 transition duration-300">
          Lihat Semua Katalog →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="group bg-white rounded-[40px] p-5 border border-pink-50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            {/* Area Gambar */}
            <div className="relative h-64 w-full mb-6 overflow-hidden rounded-[30px] bg-gray-50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/80 backdrop-blur-md text-pink-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                  {product.cat}
                </span>
              </div>
            </div>

            {/* Area Teks */}
            <div className="px-2">
              <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{product.name}</h3>
              <p className="text-sm text-gray-400 font-medium mt-1">{product.brand || 'BeautyCare Official'}</p>
              
              <div className="mt-4 mb-6">
                <span className="text-2xl font-black text-pink-600">
                  {product.price}
                </span>
              </div>

              {/* Tombol Lihat Detail Sesuai Desain Sebelumnya */}
              <Link 
                href={`/katalog/${product.id}`}
                className="block w-full py-4 bg-pink-50 text-pink-600 text-center rounded-[20px] font-bold text-sm hover:bg-pink-500 hover:text-white hover:shadow-lg hover:shadow-pink-200 transition-all duration-300"
              >
                Lihat Detail
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}