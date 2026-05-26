import { Navigation } from '@/components/Navigation';
import { Partners } from '@/components/Partners';
import { Footer } from '@/components/Footer';

export function PartnersPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-24">
        <Partners />
      </div>
      <Footer />
    </div>
  );
}