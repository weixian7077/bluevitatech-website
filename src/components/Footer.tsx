import { useTranslation } from 'react-i18next';
import { useContent } from '@/hooks/useContent';
import { useStore } from '@/store/useStore';
import { Heart } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();
  const { getText, isLoading } = useContent();
  const { language } = useStore();

  const copyright = getText('footer.copyright', 'footer.copyrightEn') || t('footer.copyright');
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: language === 'zh' ? '首页' : 'Home', href: '#' },
    { label: language === 'zh' ? '公司简介' : 'About Us', href: '#about' },
    { label: language === 'zh' ? '产品中心' : 'Products', href: '#products' },
    { label: language === 'zh' ? '核心技术' : 'Technology', href: '#tech' },
    { label: language === 'zh' ? '合作伙伴' : 'Partners', href: '#partners' },
    { label: language === 'zh' ? '联系我们' : 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary-light to-accent" />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="mb-6">
              <span className="font-bold text-xl">{language === 'zh' ? '源医科技' : 'BluevitaTech'}</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              {language === 'zh' ? '专注于企业级智能医疗电子和移动通信终端解决方案' : 'Specializing in enterprise-grade smart medical electronics and mobile communication terminal solutions'}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-lg">
              {language === 'zh' ? '快速链接' : 'Quick Links'}
            </h4>
            <ul className="grid grid-cols-2 gap-4">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-white/70 hover:text-primary-light transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-lg">
              {language === 'zh' ? '联系我们' : 'Contact Us'}
            </h4>
            <div className="space-y-3 text-sm text-white/70">
              <p>{getText('contact.addressValue', 'contact.addressValueEn') || '广东省惠州市仲恺高新区'}</p>
              <p>{getText('contact.emailValue') || 'contact@bluevitatech.com'}</p>
              <p>{getText('contact.phoneValue') || '+86 752 1234 5678'}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              © 2026 BluevitaTech Co., Ltd. All Rights Reserved.. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
