import { Navigation } from '@/components/Navigation';
import { About } from '@/components/About';
import { Footer } from '@/components/Footer';

export function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-24">
        <About />
      </div>
      <Footer />
    </div>
  );
}