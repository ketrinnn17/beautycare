"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
// Ikon untuk mempercantik tampilan
import { FiPlus, FiEdit, FiTrash2, FiPackage } from 'react-icons/fi';

export default function DashboardAdmin() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fungsi mengambil data asli dari Supabase
  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Gagal ambil data:', error.message);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Fungsi Hapus Produk
  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) {
        alert('Gagal menghapus: ' + error.message);
      } else {
        fetchProducts(); // Refresh tabel otomatis
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Admin</h1>

        {/* Card Statistik - Angka ini sekarang otomatis update */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-[32px] shadow-sm border border-pink-100 flex items-center gap-4">
            <div className="bg-pink-100 p-4 rounded-2xl text-pink-600">
              <FiPackage size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Produk</p>
              <p className="text-2xl font-bold text-gray-800">{products.length}</p>
            </div>
          </div>
        </div>

        {/* Tabel Daftar Produk */}
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Daftar Produk</h2>
            <Link 
              href="/dashboard/add-product" 
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-pink-200"
            >
              <FiPlus /> Tambah Produk Baru
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Nama Produk</th>
                  <th className="px-6 py-4 font-semibold">Kategori</th>
                  <th className="px-6 py-4 font-semibold">Harga</th>
                  <th className="px-6 py-4 font-semibold">Brand</th>
                  <th className="px-6 py-4 font-semibold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr><td colSpan={5} className="text-center py-20 text-gray-400">Menghubungkan ke database...</td></tr>
                ) : products.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-20 text-gray-400">Belum ada data produk.</td></tr>
                ) : (
                  products.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4">
                        <span className="bg-pink-50 text-pink-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
                          {item.cat}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{item.price}</td>
                      <td className="px-6 py-4 text-gray-500">{item.brand}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <Link 
                            href={`/dashboard/edit-product/${item.id}`} 
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-colors"
                          >
                            <FiEdit size={18} />
                          </Link>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}