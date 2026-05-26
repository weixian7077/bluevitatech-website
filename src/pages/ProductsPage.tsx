import { Navigation } from '@/components/Navigation';
import { Products } from '@/components/Products';
import { Footer } from '@/components/Footer';

export function ProductsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-24">
        <Products />
      </div>
      <Footer />
    </div>
  );
}
