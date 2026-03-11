export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10 px-8">
      <div className="max-w-7xl mx-auto text-center md:flex md:justify-between md:items-center">
        <div className="mb-6 md:mb-0">
          <h1 className="text-2xl font-bold text-pink-400 tracking-tight">BeautyCare.</h1>
          <p className="text-gray-400 mt-2">© 2026 BeautyCare. All rights reserved.</p>
        </div>
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-pink-400 transition">Privasi</a>
          <a href="#" className="text-gray-400 hover:text-pink-400 transition">Syarat & Ketentuan</a>
          <a href="#" className="text-gray-400 hover:text-pink-400 transition">Kontak</a>
        </div>
      </div>
    </footer>
  );
}