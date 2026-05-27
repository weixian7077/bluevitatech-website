import { useTranslation } from 'react-i18next';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import { useContent } from '../hooks/useContent';
import { ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { useMemo } from 'react';

interface ProductCardProps {
  product: Product;
}

function generateProductImage(product: Product, language: string): string {
  const name = language === 'zh' ? product.nameZh : product.nameEn;
  const brief = language === 'zh' ? product.briefZh : product.briefEn;
  const category = language === 'zh' ? product.categoryZh : product.categoryEn;
  
  let prompt = '';
  
  if (category.includes('医疗') || category.toLowerCase().includes('medical')) {
    prompt = `Professional medical device, ${name}, modern healthcare technology, clean white background, product photography, high quality, 4K`;
  } else if (category.includes('通信') || category.toLowerCase().includes('communication')) {
    prompt = `Modern smartphone or tablet device, ${name}, sleek design, technology product, clean white background, product photography, 4K`;
  } else if (category.includes('IoT') || category.toLowerCase().includes('iot')) {
    prompt = `Electronic module component, ${name}, circuit board technology, clean white background, product photography, high tech, 4K`;
  } else {
    prompt = `Professional product, ${name}, ${brief}, clean white background, modern design, product photography, 4K`;
  }
  
  const encodedPrompt = encodeURIComponent(prompt);
  return `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodedPrompt}&image_size=landscape_4_3`;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation();
  const { language, setSelectedProduct, setProductModalOpen } = useStore();
  const { getText } = useContent();

  const handleClick = () => {
    setSelectedProduct(product);
    setProductModalOpen(true);
  };

  const name = language === 'zh' ? product.nameZh : product.nameEn;
  const category = language === 'zh' ? product.categoryZh : product.categoryEn;
  const brief = language === 'zh' ? product.briefZh : product.briefEn;
  const viewDetails = getText('products.viewDetails', 'products.viewDetailsEn') || t('products.viewDetails');
  
  const imageUrl = useMemo(() => {
    if (product.image) {
      return product.image;
    }
    return generateProductImage(product, language);
  }, [product, language]);

  return (
    <article
      onClick={handleClick}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 border border-slate-100"
    >
      <div className="relative h-72 bg-gradient-to-br from-slate-50 via-primary-50/30 to-accent-50/30 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain p-6 group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              const placeholder = document.createElement('div');
              placeholder.className = 'flex flex-col items-center justify-center text-slate-300';
              placeholder.innerHTML = `
                <svg class="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              `;
              parent.appendChild(placeholder);
            }
          }}
        />

        {product.tags.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className={clsx(
                  'px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg backdrop-blur-sm',
                  tag.toLowerCase() === 'edla' 
                    ? 'bg-gradient-to-r from-primary to-primary-600 shadow-primary/30' 
                    : 'bg-gradient-to-r from-accent to-accent-600 shadow-accent/30'
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="flex items-center gap-2 text-white text-sm font-semibold">
            {viewDetails}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      <div className="relative p-7">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent" />
          <div className="text-xs font-bold text-primary uppercase tracking-wider">
            {category}
          </div>
        </div>

        <h3 className="font-bold text-xl text-slate-800 mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-tight">
          {name}
        </h3>
        
        <p className="text-sm text-slate-500 line-clamp-2 mb-5 leading-relaxed">
          {brief}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-primary">
            <span className="text-sm font-semibold group-hover:gap-3 transition-all flex items-center gap-1">
              {viewDetails}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </div>
          
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-50 to-accent-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowRight className="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>
    </article>
  );
}
