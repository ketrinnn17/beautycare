export default function Benefit() {
  const benefits = [
    { title: "Bahan Alami Pilihan", description: "Menggunakan ekstrak tumbuhan dan mineral alami terbaik untuk kulit sehatmu." },
    { title: "Formulasi Ilmiah", description: "Dikembangkan oleh ahli dermatologi untuk hasil yang efektif dan aman." },
    { title: "Tanpa Bahan Berbahaya", description: "Bebas paraben, sulfat, dan pewarna buatan, cocok untuk kulit sensitif." },
    { title: "Cruelty-Free", description: "Produk kami tidak diuji pada hewan, mendukung kecantikan yang etis." },
  ];

  return (
    <section className="bg-pink-50 py-20 px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-12">Mengapa Memilih BeautyCare?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="text-4xl text-pink-400 mb-4">✨</div> {/* Icon placeholder */}
              <h4 className="text-xl font-semibold mb-2">{benefit.title}</h4>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}