
'use client';

import LanguageSwitcher from '@/components/common/language-switcher';
import { useLocalization } from '@/hooks/use-localization';
import { Mail, Phone } from 'lucide-react';
import { Button } from '../ui/button';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
)

export default function TopBar() {
  const { t } = useLocalization();
  const waUrl = `https://wa.me/6282151545477?text=${encodeURIComponent(t('waRegistration'))}`;

  return (
    <div className="bg-primary text-primary-foreground text-xs">
      <div className="container flex h-10 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <a href="mailto:rsu_meloy@yahoo.co.id" className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail className="h-4 w-4" />
            <span className="hidden md:inline">rsu_meloy@yahoo.co.id</span>
          </a>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 hover:text-white transition-colors">
            <WhatsAppIcon className="h-4 w-4" />
            <span>{t('ugdText')}</span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="h-7 animate-pulse border-primary-foreground/50 bg-white/10 text-primary-foreground hover:bg-white/20 rounded-full text-xs"
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
