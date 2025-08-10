
'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center rounded-full border border-primary-foreground/50 p-0.5">
      <Button
        variant={language === 'id' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('id')}
        className={`h-6 rounded-full px-3 text-xs ${language === 'id' ? 'bg-primary-foreground/90 text-primary hover:bg-primary-foreground' : 'text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground'}`}
      >
        ID
      </Button>
      <Button
        variant={language === 'en' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className={`h-6 rounded-full px-3 text-xs ${language === 'en' ? 'bg-primary-foreground/90 text-primary hover:bg-primary-foreground' : 'text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground'}`}
      >
        EN
      </Button>
    </div>
  );
}
