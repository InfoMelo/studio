'use client';
import { LanguageProvider } from '@/contexts/language-context';
import AboutPage from '@/components/pages/about';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function AboutPageContent() {
  const searchParams = useSearchParams();
  const subPage = searchParams.get('page') || 'profile';

  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
            <AboutPage subPage={subPage} />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default function About() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AboutPageContent />
    </Suspense>
  )
}
