import { Navigation } from '@/components/Navigation';
import { Technology } from '@/components/Technology';
import { Footer } from '@/components/Footer';

export function TechnologyPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-24">
        <Technology />
      </div>
      <Footer />
    </div>
  );
}