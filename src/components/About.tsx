import { useTranslation } from 'react-i18next';
import { Globe, Award, Wrench, TrendingUp } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const defaultIcons = {
  global: Globe,
  qualification: Award,
  tech: Wrench,
  market: TrendingUp,
};

export function About() {
  const { t } = useTranslation();
  const { content, isLoading, getText, language } = useContent();

  if (isLoading) {
    return (
      <section id="about" className="py-24 bg-gradient-to-b from-white to-slate-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center">{language === 'zh' ? '加载中...' : 'Loading...'}</div>
        </div>
      </section>
    );
  }

  const title = getText('about.title', 'about.titleEn');
  const subtitle = getText('about.subtitle', 'about.subtitleEn');
  const mainTitle = getText('about.mainTitle', 'about.mainTitleEn');
  const p1 = getText('about.p1', 'about.p1En');
  const p2 = getText('about.p2', 'about.p2En');
  const p3 = getText('about.p3', 'about.p3En');

  const aboutData = content.about || {};
  const highlightsData = aboutData.highlights || {};
  const highlights = Object.keys(highlightsData).map(key => ({ key }));

  const highlightsBottomData = aboutData.highlightsBottom || {};
  const highlightsBottom = Object.keys(highlightsBottomData).map(key => ({ key }));

  const stats = [
    { value: getText('about.stats.foundedValue', 'about.stats.foundedValueEn'), label: getText('about.stats.founded', 'about.stats.foundedEn') },
    { value: getText('about.stats.capitalValue', 'about.stats.capitalValueEn'), label: getText('about.stats.capital', 'about.stats.capitalEn') },
    { value: getText('about.stats.accumulationValue', 'about.stats.accumulationValueEn'), label: getText('about.stats.accumulation', 'about.stats.accumulationEn') },
    { value: getText('about.stats.fdaValue', 'about.stats.fdaValueEn'), label: getText('about.stats.fda', 'about.stats.fdaEn') },
  ];

  return (
    <section id="about" className="pt-16 pb-8 bg-gradient-to-b from-white via-slate-50/30 to-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-primary/8 via-accent/5 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-[600px] h-[600px] bg-gradient-to-tr from-accent/8 via-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/3 via-accent/2 to-primary/3 rounded-full blur-3xl opacity-50" />
        
        <div className="absolute top-32 right-1/4 w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-accent/30 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-primary/30 rounded-full animate-bounce" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        
        <div className="absolute top-1/4 left-10 opacity-20">
          <div className="w-32 h-32 border-2 border-primary/30 rounded-full rotate-45" />
          <div className="w-24 h-24 border border-accent/40 rounded-full -mt-20 -ml-10 rotate-12" />
        </div>
        <div className="absolute bottom-1/4 right-10 opacity-20">
          <div className="w-40 h-40 border-2 border-accent/30 rounded-full" />
          <div className="w-28 h-28 border border-primary/40 rounded-full -mt-32 -mr-20 rotate-45" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="section-title mb-10 text-center">
          <h2 className="mb-3">{title || t('about.title')}</h2>
          <p className="text-slate-600">{subtitle || t('about.subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-5 relative">
            <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-primary via-accent to-transparent rounded-full opacity-30" />
            
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
              {mainTitle || t('about.mainTitle')}
            </h3>
            
            <div className="space-y-4 text-slate-600 leading-relaxed text-base">
              {p1 && (
                <p className="relative pl-5 border-l-2 border-primary/20 animate-fade-in hover:border-primary/40 transition-colors">
                  {p1}
                </p>
              )}
              {p2 && (
                <p className="relative pl-5 border-l-2 border-accent/20 animate-fade-in animate-delay-100 hover:border-accent/40 transition-colors">
                  {p2}
                </p>
              )}
              {p3 && (
                <p className="relative pl-5 border-l-2 border-primary/20 animate-fade-in animate-delay-200 hover:border-primary/40 transition-colors">
                  {p3}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {highlightsBottom.map(({ key }, index) => {
                const Icon = defaultIcons[key as keyof typeof defaultIcons] || Globe;
                const highlightBottomIcon = getText(`about.highlightsBottom.${key}.icon`);
                const highlightBottomTitle = getText(`about.highlightsBottom.${key}.title`, `about.highlightsBottom.${key}.titleEn`);
                const highlightBottomDesc = getText(`about.highlightsBottom.${key}.desc`, `about.highlightsBottom.${key}.descEn`);

                return (
                  <div key={key} className="flex items-center gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/50 hover:border-primary/30 hover:shadow-md transition-all animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      {highlightBottomIcon ? (
                        <span className="text-xl">{highlightBottomIcon}</span>
                      ) : (
                        <Icon className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-slate-500 truncate">{highlightBottomTitle}</div>
                      <div className="text-sm font-semibold text-slate-700 truncate">{highlightBottomDesc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 h-full">
            {highlights.map(({ key }, index) => {
              const Icon = defaultIcons[key as keyof typeof defaultIcons] || Globe;
              const highlightTitle = getText(`about.highlights.${key}.title`, `about.highlights.${key}.titleEn`);
              const highlightDesc = getText(`about.highlights.${key}.desc`, `about.highlights.${key}.descEn`);
              const highlightIcon = getText(`about.highlights.${key}.icon`);

              if (!highlightTitle && !highlightDesc) return null;

              return (
                <div
                  key={key}
                  className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-slate-200/50 hover:border-primary/30 hover:shadow-xl transition-all duration-500 animate-slide-up overflow-hidden flex flex-col justify-between"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex flex-col">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary via-primary to-accent rounded-xl flex items-center justify-center text-white mb-4 shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 flex-shrink-0">
                      {highlightIcon ? (
                        <span className="text-xl sm:text-2xl">{highlightIcon}</span>
                      ) : (
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                      )}
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-800 mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                      {highlightTitle || t(`about.highlights.${key}.title`)}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {highlightDesc || t(`about.highlights.${key}.desc`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl blur-xl" />
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-10 border border-slate-200/50 shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="relative group text-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 -m-4" />
                  <div className="relative p-4">
                    <div className="text-5xl md:text-6xl font-black gradient-text mb-3 group-hover:scale-110 transition-transform duration-500 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                      {stat.value}
                    </div>
                    <div className="text-slate-600 font-medium text-sm md:text-base">{stat.label}</div>
                    <div className="mt-3 w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
