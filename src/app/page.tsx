
import React, { Suspense } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HomePage from '@/components/pages/home';
import { LanguageProvider } from '@/hooks/language-context';
import { getServices, getPartners } from './admin/actions';
import LoadingLogo from '@/components/common/loading-logo';

export default async function Home() {
  const services = await getServices();
  const partners = await getPartners();

  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Suspense fallback={<div className='h-screen w-full flex items-center justify-center'><LoadingLogo /></div>}>
            <HomePage services={services} partners={partners} />
          </Suspense>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
