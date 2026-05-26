import { useTranslation } from 'react-i18next';
import { MapPin, Building2, Mail, Globe, Phone } from 'lucide-react';
import { useContent } from '@/hooks/useContent';

export function Contact() {
  const { t } = useTranslation();
  const { getText, isLoading, language } = useContent();

  if (isLoading) {
    return (
      <section id="contact" className="py-24 bg-gradient-to-b from-white to-primary-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center">{language === 'zh' ? '加载中...' : 'Loading...'}</div>
        </div>
      </section>
    );
  }

  const title = getText('contact.title', 'contact.titleEn') || t('contact.title');
  const subtitle = getText('contact.subtitle', 'contact.subtitleEn') || t('contact.subtitle');

  const items = [
    {
      icon: MapPin,
      label: getText('contact.address', 'contact.addressEn') || t('contact.address'),
      value: getText('contact.addressValue', 'contact.addressValueEn') || t('contact.addressValue'),
      color: 'from-primary to-accent',
    },
    {
      icon: Phone,
      label: getText('contact.phone', 'contact.phoneEn') || t('contact.phone'),
      value: getText('contact.phoneValue') || '+86 752 1234 5678',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Mail,
      label: getText('contact.email', 'contact.emailEn') || t('contact.email'),
      value: getText('contact.emailValue') || t('contact.emailValue'),
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: Globe,
      label: getText('contact.website', 'contact.websiteEn') || t('contact.website'),
      value: getText('contact.websiteValue') || t('contact.websiteValue'),
      color: 'from-violet-500 to-violet-600',
    },
  ];

  const offices = [
    {
      city: getText('contact.offices.china', 'contact.offices.chinaEn') || '中国总部',
      address: getText('contact.offices.chinaAddr') || '广东省惠州市仲恺高新区',
    },
    {
      city: getText('contact.offices.us', 'contact.offices.usEn') || '美国分部',
      address: getText('contact.offices.usAddr') || 'California, USA',
    },
  ];

  return (
    <section id="contact" className="py-16 bg-gradient-to-b from-white via-primary-50/30 to-primary-50/50 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-accent/5 to-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="section-title">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {items.map(({ icon: Icon, label, value, color }, index) => (
            <div
              key={index}
              className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-7 shadow-lg hover:shadow-2xl border border-slate-200/50 hover:border-transparent transition-all duration-500 animate-slide-up overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              
              <div className="relative z-10">
                <div className={`relative mb-6 inline-block`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-2xl blur-lg opacity-50 group-hover:opacity-75 group-hover:scale-125 transition-all duration-300`} />
                  <div className={`relative w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>
                </div>
                
                <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-3 group-hover:scale-105 transition-transform duration-300">
                  {label}
                </h4>
                <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}
