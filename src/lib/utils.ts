import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Product } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateProductImage(product: Product, language: string): string {
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
