import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 py-20 max-w-7xl mx-auto">
      <div className="md:w-1/2 space-y-6">
        <span className="bg-pink-100 text-pink-500 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
          New Collection 2026
        </span>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-800">
          Pancarkan Aura <br /> 
          <span className="text-pink-400">Cantik Alamimu</span>
        </h2>
        <p className="text-gray-600 text-lg">
          Temukan rangkaian skincare dan makeup pilihan yang dirancang khusus untuk kesehatan kulitmu.
        </p>

        <Link 
        href="/katalog"
        className="bg-pink-500 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-pink-600 shadow-lg active:scale-95 transition">
          Lihat Katalog
        </Link>
      </div>

      <div className="md:w-1/2 mt-12 md:mt-0 relative flex justify-center">
        <div className="w-80 h-96 bg-pink-200 rounded-[40px] rotate-6 absolute -z-10 opacity-60"></div>
        <div className="w-80 h-96 bg-white rounded-[40px] relative border-8 border-white shadow-2xl overflow-hidden">
          {/* Pakai img biasa */}
          <img
            src="https://images.unsplash.com/photo-1696366170134-904df2f002dc?q=80&w=387&auto=format&fit=crop"
            alt="Beauty Model"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}