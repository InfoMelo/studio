
'use client';

import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { translations } from '@/lib/data';
import type { Translations } from '@/lib/types';

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('id');

  const t = useCallback((key: string): string => {
    return (translations as Translations)[language]?.[key] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
