'use client';

import React from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HomePage from '@/components/pages/home';
import { LanguageProvider } from '@/contexts/language-context';
import { useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter();
  
  const handleNavClick = (pageId: string) => {
    router.push(`/${pageId.split('/')[0]}`);
  };

  const handleSearch = (term: string) => {
    router.push(`/doctors?search=${term}`);
  };

  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col">
        <Header onNavClick={handleNavClick} />
        <main className="flex-1">
          <HomePage onNavClick={handleNavClick} onSearch={handleSearch} />
        </main>
        <Footer onNavClick={handleNavClick} />
      </div>
    </LanguageProvider>
  );
}
