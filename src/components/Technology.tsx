import { useTranslation } from 'react-i18next';
import { useContent } from '@/hooks/useContent';
import { useStore } from '@/store/useStore';
import { Cpu, Shield, Globe, Zap, Award, Network } from 'lucide-react';

const techIcons = [Cpu, Shield, Globe, Zap, Award, Network];

export function Technology() {
  const { t } = useTranslation();
  const { getText, isLoading } = useContent();
  const { language } = useStore();

  if (isLoading) {
    return (
      <section id="tech" className="py-16 bg-gradient-to-br from-slate-50 via-white to-primary-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center">{language === 'zh' ? '加载中...' : 'Loading...'}</div>
        </div>
      </section>
    );
  }

  const title = getText('tech.title', 'tech.titleEn') || t('tech.title');
  const subtitle = getText('tech.subtitle', 'tech.subtitleEn') || t('tech.subtitle');
  const intro = getText('tech.intro', 'tech.introEn') || '企业级智能医疗电子方案';
  const introTitle = language === 'zh' ? '企业级智能医疗电子方案' : 'Enterprise-Grade Smart Medical Electronics Solutions';
  
  const techPoints = [
    { icon: Cpu, title: language === 'zh' ? '核心技术团队' : 'Core Technology Team', text: language === 'zh' ? '始于2002年，拥有超过20年的移动终端平台持续精耕的核心技术团队' : 'Since 2002, a core technology team with over 20 years of continuous refinement in mobile terminal platforms' },
    { icon: Network, title: language === 'zh' ? '北美运营商经验' : 'North American Operator Experience', text: language === 'zh' ? '始于2005年，拥有超过20年专注于北美运营商(Verizon/T-Mobile/AT&T)高门槛专属定制的产品管理和开发体系和供应体系' : 'Since 2005, over 20 years of experience focused on high-threshold exclusive customization for North American carriers (Verizon/T-Mobile/AT&T) with dedicated product management, development, and supply systems' },
    { icon: Globe, title: language === 'zh' ? '芯片平台授权' : 'Chip Platform Authorization', text: language === 'zh' ? '拥有国际主流的移动通信终端芯片平台的技术开发授权和支持' : 'Possesses technology development authorization and support from international mainstream mobile communication terminal chip platforms' },
    { icon: Zap, title: language === 'zh' ? 'AI算力支持' : 'AI Computing Power Support', text: language === 'zh' ? '基于产品平台的NPU/CPU/GPU算力，整合多种AI模型训练，处理边缘计算策略，为客户提供构建AI应用和智能体应用的产品' : 'Based on the product platform\'s NPU/CPU/GPU computing power, integrating multiple AI model training, handling edge computing strategies, providing products for customers to build AI applications and intelligent agent applications' },
    { icon: Shield, title: language === 'zh' ? '谷歌EDLA认证' : 'Google EDLA Certification', text: language === 'zh' ? '通过谷歌EDLA认证，为企业客户提供智能手机、平板、物联网终端、数据终端、智能医疗终端产品' : 'Google EDLA certified, providing smartphones, tablets, IoT terminals, data terminals, and smart medical terminal products for enterprise customers' },
    { icon: Award, title: language === 'zh' ? '移动互联网部署' : 'Mobile Internet Deployment', text: language === 'zh' ? '产品支持移动互联网系统部署(移动客户端+服务器服务端)和应用，为客户实现产品跨维度拓展' : 'Products support mobile internet system deployment (mobile client + server) and applications, enabling customers to achieve cross-dimensional product expansion' },
  ];

  return (
    <section id="tech" className="py-16 bg-gradient-to-br from-slate-50 via-white to-primary-50/30 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-accent/5 to-primary/5 rounded-full blur-3xl translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="section-title mb-10 text-center">
          <h2>{title}</h2>
          <p className="text-slate-600">{subtitle}</p>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="relative bg-gradient-to-br from-white via-primary-50/30 to-accent-50/20 rounded-3xl p-6 md:p-12 lg:p-16 shadow-xl border border-primary-100/50 overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-primary/8 to-accent/8 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-tr from-accent/8 to-primary/8 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />
            
            <div className="relative">
              <div className="flex items-start gap-5 mb-8">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-14 h-14 bg-gradient-to-br from-primary via-primary-500 to-accent rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/25">
                    <Cpu className="w-7 h-7" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">{introTitle}</h3>
                  <p className="text-slate-700 text-base md:text-lg leading-relaxed">
                    {intro}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {techPoints.map((point, index) => {
                  const Icon = point.icon;
                  return (
                    <div
                      key={index}
                      className="group relative p-5 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-100/80 hover:border-primary/20 hover:bg-white hover:shadow-xl transition-all duration-500 animate-slide-up"
                      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative">
                        <div className="flex items-start gap-4">
                          <div className="w-11 h-11 bg-gradient-to-br from-primary/15 to-accent/15 rounded-xl flex items-center justify-center text-primary group-hover:from-primary group-hover:to-accent group-hover:text-white transition-all duration-300 flex-shrink-0">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-slate-800 mb-2 text-sm group-hover:text-primary transition-colors">
                              {point.title}
                            </h4>
                            <p className="text-slate-600 text-sm leading-relaxed group-hover:text-slate-700 transition-colors">
                              {point.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          </div>
      </div>
    </section>
  );
}
