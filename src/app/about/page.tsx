
import { LanguageProvider } from '@/contexts/language-context';
import AboutPage from '@/components/pages/about';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profil Rumah Sakit',
  description: 'Pelajari lebih lanjut tentang sejarah, visi, dan misi RSU Meloy dalam memberikan pelayanan kesehatan berkualitas di Sangatta.',
  openGraph: {
    title: 'Profil dan Sejarah RSU Meloy',
    description: 'Kenali lebih dekat komitmen kami dalam melayani masyarakat melalui sejarah dan pencapaian kami.',
  },
};

function AboutPageContent() {
  'use client';
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

function About() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AboutPageContent />
    </Suspense>
  )
}

export default About;
