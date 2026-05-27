import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Partner } from '../types';
import { useStore } from '../store/useStore';
import { useContent } from '../hooks/useContent';
import { ExternalLink, Building2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || '';

export function Partners() {
  const { t } = useTranslation();
  const { partners, setPartners } = useStore();
  const { getText, isLoading: contentLoading, language } = useContent();

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/partners`);
        if (response.ok) {
          const data = await response.json();
          setPartners(data);
        }
      } catch (error) {
        console.error('Failed to fetch partners:', error);
      }
    };

    fetchPartners();
  }, [setPartners]);

  const title = getText('partners.title', 'partners.titleEn') || t('partners.title');
  const subtitle = getText('partners.subtitle', 'partners.subtitleEn') || t('partners.subtitle');

  return (
    <section id="partners" className="py-16 bg-gradient-to-b from-white to-primary-50/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-accent/5 to-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="section-title">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {partners.map((partner, index) => (
            <PartnerCard key={partner.id} partner={partner} index={index} />
          ))}
        </div>

        {partners.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 bg-primary-50 rounded-full flex items-center justify-center">
              <Building2 className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">
              {language === 'zh' ? '暂无合作伙伴' : 'No partners'}
            </h3>
            <p className="text-slate-500">
              {language === 'zh' ? '暂无合作伙伴信息' : 'No partner information available'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

interface PartnerCardProps {
  partner: Partner;
  index: number;
}

function PartnerCard({ partner, index }: PartnerCardProps) {
  const content = (
    <div
      className="group relative bg-gradient-to-br from-white to-slate-50 rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg hover:shadow-2xl border border-slate-100/50 hover:border-primary/20 transition-all duration-500 animate-slide-up cursor-pointer h-full flex flex-col items-center justify-center overflow-hidden aspect-square"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tl from-accent/10 to-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 mb-3 md:mb-5 flex-1 flex items-center justify-center w-full">
        {partner.image ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150" />
            <img
              src={partner.image}
              alt={partner.name}
              className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain relative z-10 group-hover:scale-110 group-hover:drop-shadow-lg transition-all duration-300"
            />
          </div>
        ) : (
          <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center text-2xl md:text-3xl lg:text-4xl group-hover:scale-110 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/10">
            {partner.icon || '🏢'}
          </div>
        )}
      </div>
      
      <div className="relative z-10 text-center space-y-1 md:space-y-2 w-full">
        <h4 className="font-bold text-slate-800 text-xs md:text-sm mb-1 group-hover:text-primary transition-colors duration-300 leading-tight truncate">
          {partner.name}
        </h4>
        <p className="text-[10px] md:text-xs text-slate-500 group-hover:text-slate-600 transition-colors duration-300 line-clamp-2">
          {partner.typeZh}
        </p>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl" />
    </div>
  );

  if (partner.link) {
    return (
      <a
        href={partner.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
        title={partner.name}
      >
        {content}
      </a>
    );
  }

  return content;
}
