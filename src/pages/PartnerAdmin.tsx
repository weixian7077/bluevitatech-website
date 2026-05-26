import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Pencil, Trash2, X, Upload, ExternalLink } from 'lucide-react';
import { Partner } from '@/types';

const API_BASE = import.meta.env.VITE_API_BASE || '';

export function PartnerAdmin() {
  const { t } = useTranslation();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [formData, setFormData] = useState<Partial<Partner>>({
    name: '',
    typeZh: '',
    typeEn: '',
    icon: '',
    image: '',
    link: '',
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/partners`);
      if (response.ok) {
        const data = await response.json();
        setPartners(data);
      }
    } catch (error) {
      console.error('Failed to fetch partners:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (partner?: Partner) => {
    if (partner) {
      setEditingPartner(partner);
      setFormData(partner);
    } else {
      setEditingPartner(null);
      setFormData({
        name: '',
        typeZh: '',
        typeEn: '',
        icon: '',
        image: '',
        link: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPartner(null);
  };

  const handleSave = async () => {
    try {
      const url = editingPartner
        ? `${API_BASE}/api/partners/${editingPartner.id}`
        : `${API_BASE}/api/partners`;
      const method = editingPartner ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchPartners();
        handleCloseModal();
      }
    } catch (error) {
      console.error('Failed to save partner:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(t('admin.partners.confirmDelete'))) return;

    try {
      const response = await fetch(`${API_BASE}/api/partners/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPartners(partners.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete partner:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const response = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        body: formDataUpload,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({ ...formData, image: data.url });
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">{t('admin.partners.title')}</h2>
        <button onClick={() => handleOpenModal()} className="btn-primary">
          <Plus className="w-4 h-4" />
          {t('admin.partners.add')}
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-slate-500">{t('common.loading')}</div>
      ) : (
        <div className="bg-white rounded-xl border border-primary-100 overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-primary-50 to-accent/10 border-b border-primary-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-bold text-slate-700">名称</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-slate-700">类型</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-slate-700">链接</th>
                <th className="text-right px-6 py-4 text-sm font-bold text-slate-700">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-50">
              {partners.map((partner) => (
                <tr key={partner.id} className="hover:bg-primary-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {partner.image ? (
                        <img src={partner.image} alt="" className="w-12 h-12 object-contain rounded-lg shadow-sm bg-white" />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex items-center justify-center text-xl">
                          {partner.icon || '🏢'}
                        </div>
                      )}
                      <span className="font-semibold text-slate-800">{partner.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{partner.typeZh}</td>
                  <td className="px-6 py-4">
                    {partner.link && (
                      <a
                        href={partner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-dark font-medium"
                      >
                        {partner.link}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(partner)}
                        className="p-2 rounded-lg text-slate-500 hover:text-primary hover:bg-primary-50 transition-all"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(partner.id)}
                        className="p-2 rounded-lg text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-primary-100 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-slate-800">
                {editingPartner ? t('admin.partners.edit') : t('admin.partners.add')}
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-lg text-slate-500 hover:bg-primary-50 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div>
                <label className="input-label">{t('admin.partners.name')}</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="input-label">{t('admin.partners.typeZh')}</label>
                  <input
                    type="text"
                    value={formData.typeZh || ''}
                    onChange={(e) => setFormData({ ...formData, typeZh: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">{t('admin.partners.typeEn')}</label>
                  <input
                    type="text"
                    value={formData.typeEn || ''}
                    onChange={(e) => setFormData({ ...formData, typeEn: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="input-label">{t('admin.partners.link')}</label>
                <input
                  type="url"
                  value={formData.link || ''}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://"
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">{t('admin.partners.icon')} (Emoji)</label>
                <input
                  type="text"
                  value={formData.icon || ''}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="🏢"
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">{t('admin.partners.image')}</label>
                <div className="flex gap-4 items-start">
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt=""
                      className="w-24 h-24 object-contain rounded-xl shadow-sm bg-white"
                    />
                  )}
                  <label className="flex-1 border-2 border-dashed border-primary-200 rounded-xl p-6 text-center cursor-pointer hover:border-primary hover:bg-primary-50/30 transition-colors">
                    <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-slate-600">{t('admin.upload.dragDrop')}</p>
                    <p className="text-xs text-slate-400 mt-1">{t('admin.upload.supported')}</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-primary-100 bg-gradient-to-r from-primary-50 to-white">
              <button onClick={handleCloseModal} className="btn-secondary">
                {t('admin.partners.cancel')}
              </button>
              <button onClick={handleSave} className="btn-primary">
                {t('admin.partners.save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
