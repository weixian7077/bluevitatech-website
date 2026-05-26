import { useTranslation } from 'react-i18next';
import { Zap, Flame, Sparkles, Rocket } from 'lucide-react';
import { useContent } from '@/hooks/useContent';

const aiModels = [
  { key: 'nano', icon: Sparkles },
  { key: 'flash', icon: Zap },
  { key: 'pro', icon: Flame },
  { key: 'ultra', icon: Rocket },
];

export function AIInnovation() {
  const { t } = useTranslation();
  const { getText, isLoading, language } = useContent();

  if (isLoading) {
    return (
      <section id="ai" className="py-24 bg-gradient-to-br from-primary-50 via-white to-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center">{language === 'zh' ? '加载中...' : 'Loading...'}</div>
        </div>
      </section>
    );
  }

  const title = getText('ai.title', 'ai.titleEn') || t('ai.title');
  const subtitle = getText('ai.subtitle', 'ai.subtitleEn') || t('ai.subtitle');
  const intro = getText('ai.intro', 'ai.introEn') || t('ai.intro');

  return (
    <section id="ai" className="py-24 bg-gradient-to-br from-primary-50 via-white to-accent/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{title}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-slate-600 text-center leading-relaxed text-lg">{intro}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiModels.map(({ key, icon: Icon }, index) => {
            const modelTitle = getText(`ai.models.${key}.title`) || t(`ai.models.${key}.title`);
            const modelDesc = getText(`ai.models.${key}.desc`, `ai.models.${key}.descEn`) || t(`ai.models.${key}.desc`);

            return (
              <div
                key={key}
                className="bg-white border border-primary-100 rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all group animate-fade-in"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-white mx-auto mb-5 shadow-lg group-hover:shadow-xl transition-shadow">
                  <Icon className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-3">{modelTitle}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {modelDesc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
