"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Mock Data for Products (must be the same as in other pages using it)
const mockProducts = [
  {
    id: '1',
    name: 'Glow Serum',
    brand: 'Radiant Skin',
    category: 'Skincare',
    price: 'Rp 150.000',
    description: 'Serum pencerah wajah dengan kandungan Vitamin C dan Hyaluronic Acid untuk kulit glowing dan terhidrasi.',
    image: '/product-glow-serum.png',
  },
  {
    id: '2',
    name: 'Velvet Matte Lipstick',
    brand: 'Glamour Cosmetics',
    category: 'Makeup',
    price: 'Rp 85.000',
    description: 'Lipstik matte bertekstur velvet yang lembut dengan pigmentasi tinggi, tahan lama dan nyaman di bibir.',
    image: '/product-lipstick.png',
  },
  {
    id: '3',
    name: 'Hydrating Facial Toner',
    brand: 'Aqua Pure',
    category: 'Skincare',
    price: 'Rp 120.000',
    description: 'Toner hidrasi intensif untuk menyeimbangkan pH kulit dan mempersiapkan kulit menerima produk selanjutnya.',
    image: '/product-toner.png',
  },
  {
    id: '4',
    name: 'Eyeshadow Palette Nude',
    brand: 'Color Burst',
    category: 'Makeup',
    price: 'Rp 210.000',
    description: 'Palet eyeshadow dengan 12 warna nude yang serbaguna untuk tampilan sehari-hari maupun glamor.',
    image: '/product-eyeshadow.png',
  },
  {
    id: '5',
    name: 'SPF 50 Sunscreen',
    brand: 'SunShield',
    category: 'Skincare',
    price: 'Rp 95.000',
    description: 'Tabir surya ringan dengan SPF 50 PA+++ yang melindungi kulit dari sinar UVA/UVB tanpa rasa lengket.',
    image: '/product-sunscreen.png',
  },
  {
    id: '6',
    name: 'BB Cream Natural',
    brand: 'BeautyBlend',
    category: 'Makeup',
    price: 'Rp 180.000',
    description: 'BB Cream dengan coverage natural yang menyamarkan noda dan meratakan warna kulit, diperkaya pelembab.',
    image: '/product-bb-cream.png',
  },
];

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (id) {
      const productToEdit = mockProducts.find((p) => p.id === id);
      if (productToEdit) {
        setName(productToEdit.name);
        setBrand(productToEdit.brand);
        setCategory(productToEdit.category);
        setPrice(productToEdit.price);
        setDescription(productToEdit.description);
        setImageUrl(productToEdit.image);
      } else {
        alert('Produk tidak ditemukan!');
        router.push('/dashboard');
      }
    }
  }, [id, router]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name) newErrors.name = 'Nama produk wajib diisi';
    if (!brand) newErrors.brand = 'Brand wajib diisi';
    if (!category) newErrors.category = 'Kategori wajib diisi';
    if (!price) newErrors.price = 'Harga wajib diisi';
    if (!description) newErrors.description = 'Deskripsi wajib diisi';
    if (!imageUrl) newErrors.imageUrl = 'URL Gambar wajib diisi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const updatedProduct = {
        id: String(id), // Ensure ID is string
        name,
        brand,
        category,
        price,
        description,
        image: imageUrl,
      };
      console.log('Produk berhasil diupdate (simulasi):', updatedProduct);
      alert('Produk berhasil diupdate!');
      // In a real app, you would send this to an API
      // and then update the global product state.
      router.push(`/product/${id}`); // Redirect to product detail page
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-pink-600 text-white p-4 shadow-md flex items-center justify-between">
        <h2 className="text-2xl font-bold">Edit Produk</h2>
        <Link href="/dashboard" className="text-pink-100 hover:text-white transition-colors">
          Kembali ke Dashboard
        </Link>
      </header>

      <main className="flex-grow p-8 max-w-4xl mx-auto w-full">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Nama Produk
              </label>
              <input
                type="text"
                id="name"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.name ? 'border-red-500' : ''
                }`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="brand" className="block text-gray-700 text-sm font-bold mb-2">
                Brand
              </label>
              <input
                type="text"
                id="brand"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.brand ? 'border-red-500' : ''
                }`}
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              {errors.brand && <p className="text-red-500 text-xs italic mt-1">{errors.brand}</p>}
            </div>

            <div>
              <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
                Kategori
              </label>
              <select
                id="category"
                className={`shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.category ? 'border-red-500' : ''
                }`}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Pilih Kategori</option>
                <option value="Skincare">Skincare</option>
                <option value="Makeup">Makeup</option>
              </select>
              {errors.category && <p className="text-red-500 text-xs italic mt-1">{errors.category}</p>}
            </div>

            <div>
              <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
                Harga (contoh: Rp 150.000)
              </label>
              <input
                type="text"
                id="price"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.price ? 'border-red-500' : ''
                }`}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {errors.price && <p className="text-red-500 text-xs italic mt-1">{errors.price}</p>}
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                Deskripsi
              </label>
              <textarea
                id="description"
                rows={5}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.description ? 'border-red-500' : ''
                }`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              {errors.description && <p className="text-red-500 text-xs italic mt-1">{errors.description}</p>}
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-2">
                URL Gambar Produk (e.g., /product-new.png)
              </label>
              <input
                type="text"
                id="imageUrl"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.imageUrl ? 'border-red-500' : ''
                }`}
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              {errors.imageUrl && <p className="text-red-500 text-xs italic mt-1">{errors.imageUrl}</p>}
            </div>

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors"
            >
              Simpan Perubahan
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}