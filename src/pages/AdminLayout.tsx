import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Package, Users, Settings, ArrowLeft, Globe } from 'lucide-react';
import { useStore } from '../store/useStore';
import { clsx } from 'clsx';

const navItems = [
  { path: '/admin/products', labelKey: 'admin.products.title', icon: Package },
  { path: '/admin/partners', labelKey: 'admin.partners.title', icon: Users },
  { path: '/admin/content', labelKey: 'admin.content.title', icon: Settings },
];

export function AdminLayout() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { language, setLanguage } = useStore();

  const toggleLanguage = () => {
    const newLang = language === 'zh' ? 'en' : 'zh';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50/30">
      <header className="bg-white border-b border-primary-100 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">{t('admin.backHome')}</span>
              </Link>
              <h1 className="text-lg font-bold text-slate-800">{t('admin.title')}</h1>
            </div>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 hover:text-primary hover:bg-primary-50 transition-all"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language === 'zh' ? 'EN' : '中文'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <aside className="w-56 flex-shrink-0">
            <nav className="bg-white rounded-xl border border-primary-100 p-3 sticky top-24 shadow-sm">
              {navItems.map(({ path, labelKey, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={clsx(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all',
                    location.pathname === path
                      ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md'
                      : 'text-slate-600 hover:bg-primary-50 hover:text-primary'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {t(labelKey)}
                </Link>
              ))}
            </nav>
          </aside>

          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
