import { Navigation } from '../components/Navigation';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-24">
        <Contact />
      </div>
      <Footer />
    </div>
  );
}