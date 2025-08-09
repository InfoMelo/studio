'use client';

import { useContext } from 'react';
import { LanguageContext } from '@/contexts/language-context';

export const useLocalization = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LanguageProvider');
  }
  return context;
};
