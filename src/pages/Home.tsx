import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';

export function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Footer />
    </div>
  );
}
