import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@/i18n';
import { Home } from '@/pages/Home';
import { AboutPage } from '@/pages/AboutPage';
import { ProductsPage } from '@/pages/ProductsPage';
import { TechnologyPage } from '@/pages/TechnologyPage';
import { PartnersPage } from '@/pages/PartnersPage';
import { ContactPage } from '@/pages/ContactPage';
import { AdminLayout } from '@/pages/AdminLayout';
import { ProductAdmin } from '@/pages/ProductAdmin';
import { PartnerAdmin } from '@/pages/PartnerAdmin';
import { ContentAdmin } from '@/pages/ContentAdmin';
import { ProductModal } from '@/components/ProductModal';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/tech" element={<TechnologyPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<ProductAdmin />} />
          <Route path="products" element={<ProductAdmin />} />
          <Route path="partners" element={<PartnerAdmin />} />
          <Route path="content" element={<ContentAdmin />} />
        </Route>
      </Routes>
      <ProductModal />
    </Router>
  );
}
