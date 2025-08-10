
import React, { Suspense } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HomePage from '@/components/pages/home';
import { LanguageProvider } from '@/hooks/language-context';
import { getServices, getPartners } from './admin/actions';

export default async function Home() {
  const services = await getServices();
  const partners = await getPartners();

  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage services={services} partners={partners} />
          </Suspense>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
