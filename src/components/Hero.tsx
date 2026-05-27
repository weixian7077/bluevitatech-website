import { useTranslation } from 'react-i18next';
import { useStore } from '../store/useStore';
import { useContent } from '../hooks/useContent';
import { Link } from 'react-router-dom';
import { ChevronDown, Zap, Shield, Globe, Award } from 'lucide-react';

export function Hero() {
  const { t } = useTranslation();
  const { language } = useStore();
  const { content, isLoading } = useContent();

  if (isLoading || !content) {
    return (
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100 pt-20"
      >
        <div className="text-center text-slate-500">Loading...</div>
      </section>
    );
  }

  const hero = content.hero;
  const title = language === 'zh' ? hero.title : hero.titleEn;
  const subtitle = language === 'zh' ? hero.subtitle : hero.subtitleEn;
  const description = language === 'zh' ? hero.description : hero.descriptionEn;
  const exploreProducts = language === 'zh' ? hero.exploreProducts : hero.exploreProductsEn;
  const badgeText = language === 'zh' ? hero.badge : hero.badgeEn;
  
  const bg = hero.background || {};
  const primaryColor = bg.primaryColor || '#0891b2';
  const secondaryColor = bg.secondaryColor || '#06b6d4';
  const gradientStart = bg.gradientStart || '#f0f9ff';
  const gradientEnd = bg.gradientEnd || '#ffffff';
  const bgImage = bg.backgroundImage || '';
  const overlayOpacity = bg.overlayOpacity !== undefined ? bg.overlayOpacity : 0.5;
  const badgeIcon = hero.badgeIcon || '🏆';

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{
        background: bgImage 
          ? `url(${bgImage}) no-repeat center center fixed, linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`
          : `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
        backgroundSize: bgImage ? 'cover' : 'auto',
      }}
    >
      {bgImage && (
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(135deg, ${gradientStart}${Math.round(overlayOpacity * 255).toString(16).padStart(2, '0')}, ${gradientEnd}${Math.round(overlayOpacity * 255).toString(16).padStart(2, '0')})` 
          }}
        />
      )}
      
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[800px] h-[800px] rounded-full blur-[200px] opacity-40 animate-pulse-glow"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            top: '-300px',
            right: '0%',
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-30 animate-pulse-glow"
          style={{
            background: `linear-gradient(135deg, ${secondaryColor}, ${primaryColor})`,
            bottom: '-150px',
            left: '-10%',
            animationDelay: '2s',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 animate-float"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            top: '50%',
            left: '40%',
          }}
        />
      </div>

      <div className="absolute inset-0 bg-dots-pattern opacity-50" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-md border border-primary-200/50 rounded-full text-primary-700 font-semibold text-sm mb-10 animate-fade-in shadow-lg shadow-primary-500/10">
            <span className="text-2xl">{badgeIcon}</span>
            <span>{badgeText}</span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-10 leading-[1.1] tracking-tight animate-slide-up">
            <span className="gradient-text">{title}</span>
          </h1>

          <p className="text-2xl md:text-3xl text-primary-600 font-bold mb-8 animate-slide-up animate-delay-100">
            {subtitle}
          </p>

          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto mb-8 leading-relaxed animate-slide-up animate-delay-200">
            {description}
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-10 animate-slide-up animate-delay-300">
            <Link to="/products" className="btn-primary text-lg px-10 py-5">
              {exploreProducts}
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 animate-slide-up animate-delay-400">
            {[
              { value: '20+', label: language === 'zh' ? hero.stats.experience : hero.stats.experienceEn, icon: Zap },
              { value: '80%', label: language === 'zh' ? hero.stats.publicClients : hero.stats.publicClientsEn, icon: Globe },
              { value: 'FDA', label: language === 'zh' ? hero.stats.fdaCert : hero.stats.fdaCertEn, icon: Shield },
              { value: 'EDLA', label: language === 'zh' ? '谷歌EDLA企业认证' : 'Google EDLA Certified', icon: Award },
            ].map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="w-24 h-24 mx-auto mb-5 bg-gradient-to-br from-white to-primary-50 rounded-3xl flex items-center justify-center shadow-soft-lg group-hover:shadow-card group-hover:-translate-y-2 transition-all duration-400 border border-primary-100/50">
                  <stat.icon className="w-10 h-10 text-primary-600 opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-4xl md:text-5xl font-black gradient-text mb-3 group-hover:scale-110 transition-transform duration-400">
                  {stat.value}
                </div>
                <div className="text-base md:text-lg text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
