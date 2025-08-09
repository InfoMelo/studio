'use client';
import { LanguageProvider } from '@/contexts/language-context';
import AboutPage from '@/components/pages/about';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function AboutPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subPage = searchParams.get('page') || 'profile';

  const handleNavClick = (pageId: string) => {
    const [main, sub] = pageId.split('/');
    if (main === 'about' && sub) {
        router.push(`/about?page=${sub}`);
    } else {
        router.push(`/${main}`);
    }
  };

  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col">
        <Header onNavClick={handleNavClick} />
        <main className="flex-1">
            <AboutPage subPage={subPage} />
        </main>
        <Footer onNavClick={handleNavClick} />
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
