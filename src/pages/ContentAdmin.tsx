import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, RefreshCw, Plus, Trash2, ChevronRight, ChevronDown, Settings, Upload, Image, Type, Palette, FileText, List, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../store/useStore';

const API_BASE = import.meta.env.VITE_API_BASE || '';

interface ContentItem {
  key: string;
  value: any;
  type: 'string' | 'object' | 'array';
  path: string;
  label?: string;
}

export function ContentAdmin() {
  const { t } = useTranslation();
  const { language, refreshContent } = useStore();
  const [content, setContent] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  const [editingPath, setEditingPath] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newType, setNewType] = useState<'string' | 'object' | 'array'>('string');
  const [showAddForm, setShowAddForm] = useState(false);
  const [parentPath, setParentPath] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/content`, {
        cache: 'no-store',
      });
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`${API_BASE}/api/content`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      if (response.ok) {
        alert(language === 'zh' ? '保存成功！' : 'Saved successfully!');
        refreshContent();
      } else {
        alert(language === 'zh' ? '保存失败，请重试' : 'Save failed, please retry');
      }
    } catch (error) {
      console.error('Failed to save content:', error);
      alert(language === 'zh' ? '保存失败，请重试' : 'Save failed, please retry');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleExpand = (path: string) => {
    const newExpanded = new Set(expandedPaths);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedPaths(newExpanded);
  };

  const updateValue = (path: string, value: any) => {
    const keys = path.split('.');
    const newContent = JSON.parse(JSON.stringify(content));
    let current = newContent;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (current[keys[i]] === undefined) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setContent(newContent);
  };

  const deleteField = (path: string) => {
    if (!confirm(language === 'zh' ? '确定要删除这个字段吗？' : 'Are you sure you want to delete this field?')) {
      return;
    }
    
    const keys = path.split('.');
    const newContent = JSON.parse(JSON.stringify(content));
    let current = newContent;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    delete current[keys[keys.length - 1]];
    setContent(newContent);
  };

  const addField = (parentPath: string = '') => {
    if (!newKey.trim()) {
      alert(language === 'zh' ? '请输入字段名称' : 'Please enter field name');
      return;
    }

    const fullPath = parentPath ? `${parentPath}.${newKey}` : newKey;
    const keys = fullPath.split('.');
    const newContent = JSON.parse(JSON.stringify(content));
    let current = newContent;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (current[keys[i]] === undefined) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }

    if (newType === 'string') {
      current[keys[keys.length - 1]] = newValue || '';
    } else if (newType === 'object') {
      current[keys[keys.length - 1]] = {};
    } else if (newType === 'array') {
      current[keys[keys.length - 1]] = [];
    }

    setContent(newContent);
    setNewKey('');
    setNewValue('');
    setNewType('string');
    setShowAddForm(false);
    setParentPath('');
  };

  const startEdit = (path: string, currentValue: any) => {
    setEditingPath(path);
    setEditValue(typeof currentValue === 'string' ? currentValue : JSON.stringify(currentValue, null, 2));
  };

  const saveEdit = () => {
    if (editingPath) {
      try {
        let parsedValue = editValue;
        try {
          parsedValue = JSON.parse(editValue);
        } catch {
          parsedValue = editValue;
        }
        updateValue(editingPath, parsedValue);
      } catch (error) {
        console.error('Failed to parse value:', error);
        updateValue(editingPath, editValue);
      }
      setEditingPath(null);
      setEditValue('');
    }
  };

  const cancelEdit = () => {
    setEditingPath(null);
    setEditValue('');
  };

  const renderContent = (data: any, path: string = '', depth: number = 0) => {
    if (data === null || data === undefined) {
      return (
        <div className="text-slate-400 italic pl-4 py-1" style={{ paddingLeft: `${depth * 20 + 16}px` }}>
          {language === 'zh' ? '无数据' : 'No data'}
        </div>
      );
    }

    if (typeof data === 'object' && !Array.isArray(data)) {
      const entries = Object.entries(data);
      
      if (entries.length === 0) {
        return (
          <div className="py-2" style={{ paddingLeft: `${depth * 20 + 16}px` }}>
            <span className="text-slate-400 italic">
              {language === 'zh' ? '空对象 {}' : 'Empty object {}'}
            </span>
            <button
              onClick={() => {
                setParentPath(path);
                setShowAddForm(true);
              }}
              className="ml-4 text-primary hover:text-primary-600 transition-colors"
              title={language === 'zh' ? '添加字段' : 'Add field'}
            >
              <Plus className="w-4 h-4 inline" />
            </button>
          </div>
        );
      }

      return (
        <div className="py-1">
          {entries.map(([key, value]) => {
            const currentPath = path ? `${path}.${key}` : key;
            const isExpanded = expandedPaths.has(currentPath);
            const isObject = typeof value === 'object' && value !== null;
            const isArray = Array.isArray(value);

            return (
              <div key={key} className="border-l-2 border-slate-200 hover:border-primary-300 transition-colors">
                <div 
                  className="flex items-center gap-2 py-2 hover:bg-slate-50 transition-colors rounded"
                  style={{ paddingLeft: `${depth * 20 + 16}px` }}
                >
                  {isObject ? (
                    <button
                      onClick={() => toggleExpand(currentPath)}
                      className="text-slate-400 hover:text-primary transition-colors"
                    >
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  ) : (
                    <span className="w-4" />
                  )}

                  <span className="font-medium text-slate-700 min-w-[120px]">{key}</span>

                  {!isObject && editingPath === currentPath ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="input-field flex-1"
                        autoFocus
                      />
                      <button onClick={saveEdit} className="btn-primary text-sm py-1">
                        {language === 'zh' ? '保存' : 'Save'}
                      </button>
                      <button onClick={cancelEdit} className="btn-outline text-sm py-1">
                        {language === 'zh' ? '取消' : 'Cancel'}
                      </button>
                    </div>
                  ) : (
                    <>
                      {isObject ? (
                        <span className="text-slate-400 text-sm">
                          {isArray ? (
                            <span>[{isExpanded ? '...' : `${Object.keys(value).length} 项`}]</span>
                          ) : (
                            <span>{isExpanded ? '{...}' : `{${Object.keys(value).length} 个属性}`}</span>
                          )}
                        </span>
                      ) : (
                        <span 
                          className="text-slate-600 text-sm cursor-pointer hover:text-primary flex-1 truncate"
                          onClick={() => startEdit(currentPath, value)}
                          title={String(value)}
                        >
                          {String(value).substring(0, 100)}
                          {String(value).length > 100 && '...'}
                        </span>
                      )}

                      <button
                        onClick={() => startEdit(currentPath, value)}
                        className="text-slate-400 hover:text-primary transition-colors"
                        title={language === 'zh' ? '编辑' : 'Edit'}
                      >
                        <Type className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => deleteField(currentPath)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                        title={language === 'zh' ? '删除' : 'Delete'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {isExpanded && (
                  <div className="mt-1">
                    {renderContent(value, currentPath, depth + 1)}
                  </div>
                )}
              </div>
            );
          })}

          <button
            onClick={() => {
              setParentPath(path);
              setShowAddForm(true);
            }}
            className="flex items-center gap-2 text-primary hover:text-primary-600 transition-colors py-2 mt-2"
            style={{ paddingLeft: `${depth * 20 + 16}px` }}
          >
            <Plus className="w-4 h-4" />
            {language === 'zh' ? '添加字段' : 'Add field'}
          </button>
        </div>
      );
    }

    if (Array.isArray(data)) {
      if (data.length === 0) {
        return (
          <div className="py-2" style={{ paddingLeft: `${depth * 20 + 16}px` }}>
            <span className="text-slate-400 italic">
              {language === 'zh' ? '空数组 []' : 'Empty array []'}
            </span>
          </div>
        );
      }

      return (
        <div className="py-1">
          {data.map((item, index) => {
            const currentPath = `${path}[${index}]`;
            const isExpanded = expandedPaths.has(currentPath);
            const isObject = typeof item === 'object' && item !== null;

            return (
              <div key={index} className="border-l-2 border-slate-200 hover:border-primary-300 transition-colors">
                <div 
                  className="flex items-center gap-2 py-2 hover:bg-slate-50 transition-colors rounded"
                  style={{ paddingLeft: `${depth * 20 + 16}px` }}
                >
                  {isObject ? (
                    <button
                      onClick={() => toggleExpand(currentPath)}
                      className="text-slate-400 hover:text-primary transition-colors"
                    >
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  ) : (
                    <span className="w-4" />
                  )}

                  <span className="font-medium text-slate-700">[{index}]</span>

                  {!isObject && editingPath === currentPath ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="input-field flex-1"
                        autoFocus
                      />
                      <button onClick={saveEdit} className="btn-primary text-sm py-1">
                        {language === 'zh' ? '保存' : 'Save'}
                      </button>
                      <button onClick={cancelEdit} className="btn-outline text-sm py-1">
                        {language === 'zh' ? '取消' : 'Cancel'}
                      </button>
                    </div>
                  ) : !isObject && (
                    <span 
                      className="text-slate-600 text-sm cursor-pointer hover:text-primary flex-1 truncate"
                      onClick={() => startEdit(currentPath, item)}
                      title={String(item)}
                    >
                      {String(item).substring(0, 100)}
                      {String(item).length > 100 && '...'}
                    </span>
                  )}

                  {!isObject && (
                    <>
                      <button
                        onClick={() => startEdit(currentPath, item)}
                        className="text-slate-400 hover:text-primary transition-colors"
                        title={language === 'zh' ? '编辑' : 'Edit'}
                      >
                        <Type className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => deleteField(currentPath)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                        title={language === 'zh' ? '删除' : 'Delete'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {isExpanded && (
                  <div className="mt-1">
                    {renderContent(item, currentPath, depth + 1)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div 
        className="text-slate-600 py-1"
        style={{ paddingLeft: `${depth * 20 + 16}px` }}
      >
        {String(data)}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-500">{language === 'zh' ? '加载中...' : 'Loading...'}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          {language === 'zh' ? '内容管理 - 完整编辑器' : 'Content Management - Full Editor'}
        </h2>
        <div className="flex gap-3">
          <button
            onClick={fetchContent}
            className="btn-secondary flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            {language === 'zh' ? '刷新' : 'Refresh'}
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn-primary flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isSaving ? (language === 'zh' ? '保存中...' : 'Saving...') : (language === 'zh' ? '保存所有更改' : 'Save All Changes')}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">
            {language === 'zh' ? '📝 使用说明' : '📝 Instructions'}
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• {language === 'zh' ? '点击字段右侧的图标可以编辑或删除' : 'Click the icon on the right side of a field to edit or delete'}</li>
            <li>• {language === 'zh' ? '点击对象/数组可以展开或收起' : 'Click on objects/arrays to expand or collapse'}</li>
            <li>• {language === 'zh' ? '点击字段值可以直接编辑' : 'Click on field values to edit directly'}</li>
            <li>• {language === 'zh' ? '使用底部的"添加字段"按钮添加新内容' : 'Use the "Add Field" button at the bottom to add new content'}</li>
            <li>• {language === 'zh' ? '修改完成后点击"保存所有更改"' : 'Click "Save All Changes" when done modifying'}</li>
          </ul>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 max-h-[600px] overflow-y-auto">
          {renderContent(content)}
        </div>

        <div className="mt-6 border-t pt-6">
          <button
            onClick={() => {
              setParentPath('');
              setShowAddForm(true);
            }}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {language === 'zh' ? '添加新字段' : 'Add New Field'}
          </button>
        </div>

        {showAddForm && (
          <div className="mt-6 p-4 bg-primary-50 rounded-lg border-2 border-primary-200">
            <h3 className="font-semibold text-primary-900 mb-4">
              {language === 'zh' ? '➕ 添加新字段' : '➕ Add New Field'}
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="input-label">
                  {language === 'zh' ? '字段名称 (key)' : 'Field Name (key)'}
                </label>
                <input
                  type="text"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  className="input-field"
                  placeholder={language === 'zh' ? '例如: title, subtitle, description' : 'e.g., title, subtitle, description'}
                />
              </div>

              <div>
                <label className="input-label">
                  {language === 'zh' ? '字段类型' : 'Field Type'}
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="input-field"
                >
                  <option value="string">{language === 'zh' ? '文本' : 'Text'}</option>
                  <option value="object">{language === 'zh' ? '对象' : 'Object'}</option>
                  <option value="array">{language === 'zh' ? '数组' : 'Array'}</option>
                </select>
              </div>

              {newType === 'string' && (
                <div>
                  <label className="input-label">
                    {language === 'zh' ? '初始值' : 'Initial Value'}
                  </label>
                  <textarea
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="input-field min-h-[100px]"
                    placeholder={language === 'zh' ? '输入初始值...' : 'Enter initial value...'}
                  />
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => addField(parentPath)}
                  className="btn-primary"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  {language === 'zh' ? '确认添加' : 'Confirm Add'}
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewKey('');
                    setNewValue('');
                    setNewType('string');
                    setParentPath('');
                  }}
                  className="btn-outline"
                >
                  {language === 'zh' ? '取消' : 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 bg-yellow-50 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-900 mb-2">
          💡 {language === 'zh' ? '专业提示' : 'Pro Tips'}
        </h3>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• {language === 'zh' ? '可以使用路径添加嵌套字段，例如: hero.background.primaryColor' : 'You can add nested fields using paths, e.g., hero.background.primaryColor'}</li>
          <li>• {language === 'zh' ? '删除对象会删除该对象及其所有子字段' : 'Deleting an object will delete it and all its child fields'}</li>
          <li>• {language === 'zh' ? '建议定期保存，避免意外丢失修改' : 'It is recommended to save regularly to avoid accidental loss of changes'}</li>
          <li>• {language === 'zh' ? '颜色值使用十六进制格式，如: #06b6d4' : 'Color values use hex format, e.g., #06b6d4'}</li>
        </ul>
      </div>
    </div>
  );
}
