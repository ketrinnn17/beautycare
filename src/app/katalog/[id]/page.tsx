"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function DetailProduk() {
  const params = useParams(); // Mengambil ID dari URL
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetail = async () => {
      if (params.id) {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', params.id)
          .single(); // Ambil satu data saja

        if (data) setProduct(data);
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [params.id]);

  if (loading) return <div className="text-center py-20">Sedang memuat detail produk...</div>;
  if (!product) return <div className="text-center py-20">Produk tidak ditemukan.</div>;

  return (
    <div className="min-h-screen bg-[#FFF5F7] py-20 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-[40px] shadow-sm overflow-hidden border border-pink-50">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* SISI KIRI: GAMBAR */}
          <div className="h-[400px] md:h-full bg-gray-50">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* SISI KANAN: INFO */}
          <div className="p-8 md:p-12">
            <Link href="/" className="text-pink-500 text-sm font-bold mb-6 block">
              ← Kembali ke Home
            </Link>
            
            <span className="bg-pink-100 text-pink-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase">
              {product.cat}
            </span>
            
            <h1 className="text-4xl font-black text-gray-900 mt-4 mb-2">{product.name}</h1>
            <p className="text-lg text-gray-400 mb-6">{product.brand || 'BeautyCare Official'}</p>
            
            <div className="text-3xl font-black text-pink-600 mb-8">
              {product.price}
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h3 className="font-bold text-gray-800 mb-2">Deskripsi Produk:</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description || 'Tidak ada deskripsi untuk produk ini.'}
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}