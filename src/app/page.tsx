
import Hero from '../components/Hero';
import PopularProducts from '../components/PopularProducts';
import Benefit from '../components/Benefit'; // Corrected import


export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFF5F7] text-gray-800">
      {/* TODO: Place hero-image.png in the public directory */}
      
      <div>
        <Hero />
        <Benefit /> {/* Corrected usage */}
        <PopularProducts />
      </div>
      
    </main>
  );
}