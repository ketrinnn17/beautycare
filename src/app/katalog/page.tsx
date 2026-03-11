"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function KatalogPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchKatalog = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Error fetching:", error.message);
        } else if (data) {
          setProducts(data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchKatalog();
  }, []);

  // Filter produk berdasarkan nama (Case Insensitive)
  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5F7]">
      <div className="text-pink-500 font-black animate-bounce">Membuka lemari kecantikan...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF5F7] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Semua Koleksi</h1>
          <p className="text-gray-500 mb-8">Temukan produk impianmu untuk hasil yang memukau.</p>

          {/* FITUR PENCARIAN */}
          <div className="max-w-md mx-auto relative group">
            <input
              type="text"
              placeholder="Cari nama produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-7 py-4 rounded-2xl border-2 border-pink-100 bg-white shadow-sm focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none text-black transition-all duration-300"
            />
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-xl">
              🔍
            </div>
          </div>
        </header>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">✨</div>
            <p className="text-gray-400 font-medium">
              {searchQuery ? `Duh, produk "${searchQuery}" nggak ketemu nih.` : "Belum ada koleksi tersedia."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="group bg-white rounded-[40px] p-5 border border-pink-50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                {/* Gambar */}
                <div className="relative h-64 w-full mb-6 overflow-hidden rounded-[30px] bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-pink-600 text-[10px] font-black px-4 py-1.5 rounded-full shadow-sm uppercase tracking-widest">
                      {product.cat}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="px-2">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-pink-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-400 font-medium mt-1 mb-4">
                    {product.brand || 'BeautyCare Official'}
                  </p>
                  
                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-xs font-bold text-pink-400">Rp</span>
                    <span className="text-2xl font-black text-pink-600">
                      {Number(product.price).toLocaleString('id-ID')}
                    </span>
                  </div>

                  <Link 
                    href={`/katalog/${product.id}`}
                    className="block w-full py-4 bg-gray-900 text-white text-center rounded-[22px] font-bold text-sm hover:bg-pink-500 shadow-lg hover:shadow-pink-200 transition-all duration-300"
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
