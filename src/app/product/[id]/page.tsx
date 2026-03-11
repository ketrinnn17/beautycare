"use client";

import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Data Produk dengan URL gambar asli agar langsung muncul
const mockProducts = [
  {
    id: '1',
    name: 'Glow Serum',
    brand: 'Radiant Skin',
    category: 'Skincare',
    price: 'Rp 150.000',
    description: 'Serum pencerah wajah dengan kandungan Vitamin C dan Hyaluronic Acid untuk kulit glowing dan terhidrasi secara maksimal sepanjang hari.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '2',
    name: 'Velvet Matte Lipstick',
    brand: 'Glamour Cosmetics',
    category: 'Makeup',
    price: 'Rp 85.000',
    description: 'Lipstik matte bertekstur velvet yang lembut dengan pigmentasi tinggi. Memberikan hasil akhir yang elegan namun tetap menjaga kelembapan bibir.',
    image: 'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?q=80&w=1189&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Hydrating Facial Toner',
    brand: 'Aqua Pure',
    category: 'Skincare',
    price: 'Rp 120.000',
    description: 'Toner hidrasi intensif untuk menyeimbangkan pH kulit. Sangat lembut dan memberikan kesegaran instan bagi kulit yang lelah.',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '4',
    name: 'Eyeshadow Palette Nude',
    brand: 'Color Burst',
    category: 'Makeup',
    price: 'Rp 210.000',
    description: 'Palet eyeshadow dengan 12 warna nude yang mewah. Mudah diaplikasikan (blendable) untuk kreasi tampilan mata yang menawan.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '5',
    name: 'SPF 50 Sunscreen',
    brand: 'SunShield',
    category: 'Skincare',
    price: 'Rp 95.000',
    description: 'Tabir surya ringan dengan SPF 50 PA+++. Melindungi tanpa rasa lengket (non-greasy) dan tidak meninggalkan white-cast.',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '6',
    name: 'BB Cream Natural',
    brand: 'BeautyBlend',
    category: 'Makeup',
    price: 'Rp 180.000',
    description: 'BB Cream dengan coverage natural yang menyamarkan noda hitam dan meratakan warna kulit sekaligus melembapkan.',
    image: 'https://images.unsplash.com/photo-1599733594230-6b823276abcc?auto=format&fit=crop&q=80&w=600',
  },
];

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-pink-50 items-center justify-center p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Produk tidak ditemukan</h1>
        <button
          onClick={() => router.push('/katalog')}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full transition-all"
        >
          Kembali ke Katalog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5F7]">
      <main className="flex-grow p-4 md:p-8 max-w-6xl mx-auto w-full">
        {/* Tombol Back */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center space-x-2 text-pink-500 hover:text-pink-600 mb-8 font-bold transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          <span>Kembali</span>
        </button>

        <div className="bg-white rounded-[40px] shadow-sm overflow-hidden flex flex-col lg:flex-row border border-pink-100">
          
          {/* Sisi Kiri: Gambar Produk */}
          <div className="lg:w-1/2 bg-pink-50 p-6 flex justify-center items-center relative min-h-[400px]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 left-4">
               <span className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-pink-500 uppercase tracking-widest shadow-sm">
                  {product.category}
               </span>
            </div>
          </div>

          {/* Sisi Kanan: Detail Informasi */}
          <div className="lg:w-1/2 p-8 md:p-12 space-y-6 self-center">
            <div>
              <p className="text-pink-400 font-bold uppercase tracking-wider text-sm mb-2">{product.brand}</p>
              <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">{product.name}</h1>
            </div>

            <p className="text-4xl font-black text-pink-500">{product.price}</p>
            
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-gray-800 border-b border-pink-100 pb-2">Deskripsi</h2>
              <p className="text-gray-600 leading-relaxed text-lg italic">"{product.description}"</p>
            </div>

            {/* Tombol Aksi (Hanya Beli/Keranjang) */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="flex-grow bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg active:scale-95 text-lg">
                Tambah ke Keranjang
              </button>
              <button className="px-6 py-4 bg-pink-50 text-pink-500 rounded-2xl hover:bg-pink-100 transition-all font-bold text-xl border border-pink-200">
                ❤
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}