export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  nameZh: string;
  nameEn: string;
  categoryZh: string;
  categoryEn: string;
  tags: string[];
  briefZh: string;
  briefEn: string;
  specsZh: Spec[];
  specsEn: Spec[];
  image: string;
  cat: 'comm' | 'medical' | 'iot';
}

export interface Partner {
  id: string;
  name: string;
  typeZh: string;
  typeEn: string;
  icon: string;
  image: string;
  link: string;
}

export type Language = 'zh' | 'en';
