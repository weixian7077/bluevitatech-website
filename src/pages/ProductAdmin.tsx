import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Pencil, Trash2, X, Upload } from 'lucide-react';
import { Product, Spec } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE || '';

export function ProductAdmin() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    nameZh: '',
    nameEn: '',
    categoryZh: '',
    categoryEn: '',
    tags: [],
    briefZh: '',
    briefEn: '',
    specsZh: [],
    specsEn: [],
    image: '',
    cat: 'comm',
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        nameZh: '',
        nameEn: '',
        categoryZh: '',
        categoryEn: '',
        tags: [],
        briefZh: '',
        briefEn: '',
        specsZh: [],
        specsEn: [],
        image: '',
        cat: 'comm',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSave = async () => {
    try {
      const url = editingProduct
        ? `${API_BASE}/api/products/${editingProduct.id}`
        : `${API_BASE}/api/products`;
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchProducts();
        handleCloseModal();
      }
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(t('admin.products.confirmDelete'))) return;

    try {
      const response = await fetch(`${API_BASE}/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...(formData.tags || []), tagInput.trim()] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags?.filter((t) => t !== tag) || [] });
  };

  const handleAddSpec = (lang: 'Zh' | 'En') => {
    const key = `specs${lang}` as keyof Product;
    setFormData({
      ...formData,
      [key]: [...((formData[key] as Spec[]) || []), { label: '', value: '' }],
    });
  };

  const handleUpdateSpec = (lang: 'Zh' | 'En', index: number, field: 'label' | 'value', value: string) => {
    const key = `specs${lang}` as keyof Product;
    const specs = [...((formData[key] as Spec[]) || [])];
    specs[index] = { ...specs[index], [field]: value };
    setFormData({ ...formData, [key]: specs });
  };

  const handleRemoveSpec = (lang: 'Zh' | 'En', index: number) => {
    const key = `specs${lang}` as keyof Product;
    const specs = [...((formData[key] as Spec[]) || [])];
    specs.splice(index, 1);
    setFormData({ ...formData, [key]: specs });
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
        <h2 className="text-xl font-bold text-slate-800">{t('admin.products.title')}</h2>
        <button onClick={() => handleOpenModal()} className="btn-primary">
          <Plus className="w-4 h-4" />
          {t('admin.products.add')}
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-slate-500">{t('common.loading')}</div>
      ) : (
        <div className="bg-white rounded-xl border border-primary-100 overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-primary-50 to-accent/10 border-b border-primary-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-bold text-slate-700">产品名称</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-slate-700">分类</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-slate-700">标签</th>
                <th className="text-right px-6 py-4 text-sm font-bold text-slate-700">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-primary-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {product.image ? (
                        <img src={product.image} alt="" className="w-12 h-12 object-cover rounded-lg shadow-sm" />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex items-center justify-center text-lg">
                          📦
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-slate-800">{product.nameZh}</div>
                        <div className="text-xs text-slate-500">{product.nameEn}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{product.categoryZh}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1.5 flex-wrap">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-gradient-to-r from-primary to-accent text-white text-xs rounded-full font-medium shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(product)}
                        className="p-2 rounded-lg text-slate-500 hover:text-primary hover:bg-primary-50 transition-all"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
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
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-primary-100 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-slate-800">
                {editingProduct ? t('admin.products.edit') : t('admin.products.add')}
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-lg text-slate-500 hover:bg-primary-50 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">{t('admin.products.nameZh')}</label>
                  <input
                    type="text"
                    value={formData.nameZh || ''}
                    onChange={(e) => setFormData({ ...formData, nameZh: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">{t('admin.products.nameEn')}</label>
                  <input
                    type="text"
                    value={formData.nameEn || ''}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">{t('admin.products.categoryZh')}</label>
                  <input
                    type="text"
                    value={formData.categoryZh || ''}
                    onChange={(e) => setFormData({ ...formData, categoryZh: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">{t('admin.products.categoryEn')}</label>
                  <input
                    type="text"
                    value={formData.categoryEn || ''}
                    onChange={(e) => setFormData({ ...formData, categoryEn: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="input-label">产品类型</label>
                <select
                  value={formData.cat || 'comm'}
                  onChange={(e) => setFormData({ ...formData, cat: e.target.value as Product['cat'] })}
                  className="input-field"
                >
                  <option value="comm">通信终端</option>
                  <option value="medical">医疗终端</option>
                  <option value="iot">IoT模块</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">{t('admin.products.briefZh')}</label>
                  <textarea
                    value={formData.briefZh || ''}
                    onChange={(e) => setFormData({ ...formData, briefZh: e.target.value })}
                    className="input-field min-h-[80px]"
                  />
                </div>
                <div>
                  <label className="input-label">{t('admin.products.briefEn')}</label>
                  <textarea
                    value={formData.briefEn || ''}
                    onChange={(e) => setFormData({ ...formData, briefEn: e.target.value })}
                    className="input-field min-h-[80px]"
                  />
                </div>
              </div>

              <div>
                <label className="input-label">{t('admin.products.tags')}</label>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {formData.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-primary to-accent text-white text-sm rounded-full"
                    >
                      {tag}
                      <button onClick={() => handleRemoveTag(tag)} className="hover:opacity-80">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    placeholder="输入标签后按回车添加"
                    className="input-field flex-1"
                  />
                  <button onClick={handleAddTag} className="btn-secondary py-2">
                    添加
                  </button>
                </div>
              </div>

              <div>
                <label className="input-label">{t('admin.products.image')}</label>
                <div className="flex gap-4 items-start">
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt=""
                      className="w-24 h-24 object-cover rounded-xl shadow-sm"
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

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="input-label mb-0">{t('admin.products.specsZh')}</label>
                  <button
                    onClick={() => handleAddSpec('Zh')}
                    className="text-sm text-primary hover:text-primary-dark font-medium"
                  >
                    + {t('admin.products.addSpec')}
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.specsZh?.map((spec, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={spec.label}
                        onChange={(e) => handleUpdateSpec('Zh', index, 'label', e.target.value)}
                        placeholder={t('admin.products.specLabel')}
                        className="input-field flex-1"
                      />
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) => handleUpdateSpec('Zh', index, 'value', e.target.value)}
                        placeholder={t('admin.products.specValue')}
                        className="input-field flex-1"
                      />
                      <button
                        onClick={() => handleRemoveSpec('Zh', index)}
                        className="p-2 text-slate-400 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="input-label mb-0">{t('admin.products.specsEn')}</label>
                  <button
                    onClick={() => handleAddSpec('En')}
                    className="text-sm text-primary hover:text-primary-dark font-medium"
                  >
                    + {t('admin.products.addSpec')}
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.specsEn?.map((spec, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={spec.label}
                        onChange={(e) => handleUpdateSpec('En', index, 'label', e.target.value)}
                        placeholder={t('admin.products.specLabel')}
                        className="input-field flex-1"
                      />
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) => handleUpdateSpec('En', index, 'value', e.target.value)}
                        placeholder={t('admin.products.specValue')}
                        className="input-field flex-1"
                      />
                      <button
                        onClick={() => handleRemoveSpec('En', index)}
                        className="p-2 text-slate-400 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-primary-100 bg-gradient-to-r from-primary-50 to-white">
              <button onClick={handleCloseModal} className="btn-secondary">
                {t('admin.products.cancel')}
              </button>
              <button onClick={handleSave} className="btn-primary">
                {t('admin.products.save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
