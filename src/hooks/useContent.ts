import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';

const API_BASE = import.meta.env.VITE_API_BASE || '';

export function useContent() {
  const { language, contentRefresh } = useStore();
  const [content, setContent] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

    fetchContent();
  }, [contentRefresh]);

  const getText = (zhPath: string, enPath?: string): string => {
    const path = language === 'zh' ? zhPath : (enPath || zhPath);
    const keys = path.split('.');
    let current = content;

    for (const key of keys) {
      if (current === undefined || current === null) return '';
      current = current[key];
    }

    return typeof current === 'string' ? current : '';
  };

  const getZhText = (path: string): string => {
    const keys = path.split('.');
    let current = content;

    for (const key of keys) {
      if (current === undefined || current === null) return '';
      current = current[key];
    }

    return typeof current === 'string' ? current : '';
  };

  const getEnText = (path: string): string => {
    const keys = path.split('.');
    let current = content;

    for (const key of keys) {
      if (current === undefined || current === null) return '';
      current = current[key];
    }

    return typeof current === 'string' ? current : '';
  };

  return { content, isLoading, getText, getZhText, getEnText, language };
}
