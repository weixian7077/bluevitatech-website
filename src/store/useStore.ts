import { create } from 'zustand';
import { Product, Partner, Language } from '@/types';

interface AppState {
  language: Language;
  setLanguage: (lang: Language) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  partners: Partner[];
  setPartners: (partners: Partner[]) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isProductModalOpen: boolean;
  setProductModalOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  contentRefresh: number;
  refreshContent: () => void;
}

export const useStore = create<AppState>((set) => ({
  language: (localStorage.getItem('language') as Language) || 'zh',
  setLanguage: (lang) => {
    localStorage.setItem('language', lang);
    set({ language: lang });
  },
  products: [],
  setProducts: (products) => set({ products }),
  partners: [],
  setPartners: (partners) => set({ partners }),
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  isProductModalOpen: false,
  setProductModalOpen: (open) => set({ isProductModalOpen: open }),
  isMobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  contentRefresh: 0,
  refreshContent: () => set((state) => ({ contentRefresh: state.contentRefresh + 1 })),
}));
