'use client';

import LanguageSwitcher from '@/components/common/language-switcher';
import { useLocalization } from '@/hooks/use-localization';
import { Mail, Clock, Phone } from 'lucide-react';
import { Button } from '../ui/button';

export default function TopBar() {
  const { t } = useLocalization();

  return (
    <div className="bg-primary text-primary-foreground text-xs">
      <div className="container px-4 md:px-6 flex h-10 items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="mailto:rsu_meloy@yahoo.co.id" className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail className="h-4 w-4" />
            <span className="hidden md:inline">rsu_meloy@yahoo.co.id</span>
          </a>
          <div className="hidden sm:flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{t('ugdText')}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="h-7 border-primary-foreground/50 hover:bg-primary-foreground/10 hover:text-primary-foreground text-primary-foreground rounded-full text-xs"
            asChild
          >
            <a href="tel:054924222">
              <Phone className="h-3 w-3 mr-2" />
              {t('kontakDarurat')}: (0549) 24222
            </a>
          </Button>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
