import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe } from 'lucide-react';
import { useStore } from '../store/useStore';
import { clsx } from 'clsx';
import { useContent } from '../hooks/useContent';

const API_BASE = import.meta.env.VITE_API_BASE || '';

export function Navigation() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { language, setLanguage, isMobileMenuOpen, setMobileMenuOpen } = useStore();
  const { getText, isLoading } = useContent();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const toggleLanguage = () => {
    const newLang = language === 'zh' ? 'en' : 'zh';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { href: '/', labelKey: 'nav.home', label: getText('nav.home', 'nav.homeEn') || (language === 'zh' ? '首页' : 'Home') },
    { href: '/about', labelKey: 'nav.about', label: getText('nav.about', 'nav.aboutEn') || t('nav.about') },
    { href: '/products', labelKey: 'nav.products', label: getText('nav.products', 'nav.productsEn') || t('nav.products') },
    { href: '/tech', labelKey: 'nav.tech', label: getText('nav.tech', 'nav.techEn') || t('nav.tech') },
    { href: '/partners', labelKey: 'nav.partners', label: getText('nav.partners', 'nav.partnersEn') || t('nav.partners') },
    { href: '/contact', labelKey: 'nav.contact', label: getText('nav.contact', 'nav.contactEn') || t('nav.contact') },
  ];

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled 
          ? 'py-3' 
          : 'py-4'
      )}
    >
      <div 
        className={clsx(
          'container mx-auto px-5 transition-all duration-500',
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-2xl border border-white/20' 
            : 'bg-transparent'
        )}
      >
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
              <span className="relative z-10 text-xl">B</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent text-lg leading-tight">{language === 'zh' ? '源医科技' : 'BluevitaTech'}</span>
              <span className="text-xs text-slate-400 font-medium">BluevitaTech</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={clsx(
                  'relative px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg group',
                  location.pathname === link.href
                    ? 'text-primary'
                    : 'text-slate-600 hover:text-primary'
                )}
              >
                {location.pathname === link.href && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-accent/10 rounded-lg shadow-sm"></div>
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {link.label}
                  <div className={clsx(
                    'w-1.5 h-1.5 rounded-full transition-all duration-300',
                    location.pathname === link.href 
                      ? 'bg-primary scale-100' 
                      : 'bg-slate-300 scale-0 group-hover:scale-100'
                  )} />
                </span>
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300 group-hover:w-6"
                  style={{ display: location.pathname === link.href ? 'block' : 'none' }}
                />
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-600 hover:text-primary transition-all duration-300 font-medium text-sm group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <Globe className="w-4 h-4 relative z-10 group-hover:rotate-180 transition-transform duration-500" />
              <span className="relative z-10">{language === 'zh' ? 'EN' : '中文'}</span>
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-slate-600 hover:text-primary hover:bg-primary-50 transition-all duration-300 active:scale-95"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/20 overflow-hidden animate-slide-down">
            <div className="container mx-auto px-4 py-5 flex flex-col gap-1.5">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={clsx(
                    'px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-between group',
                    location.pathname === link.href
                      ? 'bg-gradient-to-r from-primary-50 to-accent/10 text-primary shadow-sm'
                      : 'text-slate-600 hover:bg-primary-50 hover:text-primary'
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span>{link.label}</span>
                  <div className={clsx(
                    'w-2 h-2 rounded-full transition-all duration-300',
                    location.pathname === link.href 
                      ? 'bg-primary scale-100' 
                      : 'bg-slate-300 scale-0 group-hover:scale-100'
                  )} />
                </Link>
              ))}
              <div className="flex items-center gap-2.5 pt-4 border-t border-slate-100 mt-2.5">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-slate-600 hover:text-primary hover:bg-primary-50 transition-all duration-300 flex-1 font-medium text-sm"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language === 'zh' ? 'English' : '中文'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
