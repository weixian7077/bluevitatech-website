import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useEffect, useMemo } from 'react';
import { Product } from '@/types';

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

export function ProductModal() {
  const { t } = useTranslation();
  const { language, selectedProduct, isProductModalOpen, setProductModalOpen } = useStore();

  useEffect(() => {
    if (isProductModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isProductModalOpen]);

  if (!selectedProduct || !isProductModalOpen) {
    return null;
  }

  const name = language === 'zh' ? selectedProduct.nameZh : selectedProduct.nameEn;
  const specs = language === 'zh' ? selectedProduct.specsZh : selectedProduct.specsEn;
  
  const imageUrl = useMemo(() => {
    if (selectedProduct.image) {
      return selectedProduct.image;
    }
    return generateProductImage(selectedProduct, language);
  }, [selectedProduct, language]);

  const handleClose = () => {
    setProductModalOpen(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-primary-100 sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-slate-800">{name}</h3>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full border border-primary-200 flex items-center justify-center text-slate-500 hover:bg-primary-50 hover:text-primary hover:border-primary transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid md:grid-cols-2">
            <div className="min-h-[300px] bg-gradient-to-br from-primary-50 to-primary-100/50 flex items-center justify-center p-6">
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full max-h-[400px] object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const placeholder = document.createElement('div');
                    placeholder.className = 'text-9xl opacity-50';
                    placeholder.textContent = '📦';
                    parent.appendChild(placeholder);
                  }
                }}
              />
            </div>

            <div className="p-6">
              <h4 className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-4">产品规格参数</h4>
              <div className="space-y-0">
                {specs.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-3.5 border-b border-primary-50 last:border-b-0"
                  >
                    <span className="text-sm text-slate-500 font-medium">{spec.label}</span>
                    <span className="text-sm font-semibold text-slate-700 text-right max-w-[60%]">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
