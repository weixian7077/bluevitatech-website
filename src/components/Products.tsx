import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import { useContent } from '../hooks/useContent';
import { Package } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || '';

export function Products() {
  const { t } = useTranslation();
  const { products, setProducts } = useStore();
  const { getText, language } = useContent();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/products`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [setProducts]);

  const title = getText('products.title', 'products.titleEn') || t('products.title');
  const subtitle = getText('products.subtitle', 'products.subtitleEn') || t('products.subtitle');

  return (
    <section id="products" className="pt-8 pb-16 bg-gradient-to-b from-white via-primary-50/30 to-white relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-accent/5 to-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="section-title mb-12 text-center">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 animate-pulse"
              >
                <div className="h-72 bg-gradient-to-br from-slate-200 via-primary-50/30 to-accent-50/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" 
                       style={{ transform: 'skewX(-20deg)' }} />
                </div>
                <div className="p-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                    <div className="h-3 bg-slate-200 rounded w-1/4" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-5 bg-slate-200 rounded-lg w-3/4" />
                    <div className="h-4 bg-slate-200 rounded w-1/2" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-3 bg-slate-100 rounded w-full" />
                    <div className="h-3 bg-slate-100 rounded w-2/3" />
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="h-4 bg-slate-100 rounded w-24" />
                    <div className="w-8 h-8 bg-slate-100 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-slide-up opacity-0"
                style={{ 
                  animationDelay: `${index * 80}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {!isLoading && products.length === 0 && (
          <div className="text-center py-16 px-6">
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-50 via-accent-50 to-primary-50 rounded-3xl flex items-center justify-center transform rotate-3 shadow-xl border border-primary-100">
                <Package className="w-12 h-12 text-primary" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              {language === 'zh' ? '暂无产品' : 'No products available'}
            </h3>
            
            <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
              {language === 'zh' 
                ? '暂无产品信息，请稍后再试' 
                : 'No product information available. Please try again later.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
