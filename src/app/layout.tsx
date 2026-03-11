// app/layout.tsx
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar /> 
        {children} {/* Ini adalah isi dari page.tsx */}
        <Footer />
      </body>
    </html>
  );
}