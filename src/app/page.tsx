
import React from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HomePage from '@/components/pages/home';
import { LanguageProvider } from '@/contexts/language-context';
import { getServices, getPartners } from '@/app/admin/actions';

export default async function Home() {
  const services = await getServices();
  const partners = await getPartners();

  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <HomePage services={services} partners={partners} />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
