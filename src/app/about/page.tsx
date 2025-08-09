
import { LanguageProvider } from '@/contexts/language-context';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import AboutPageContent from './AboutPageContent';
import { getArticles, getPartners, getVacancies } from '../admin/actions';

export const metadata: Metadata = {
  title: 'Profil Rumah Sakit',
  description: 'Pelajari lebih lanjut tentang sejarah, visi, dan misi RSU Meloy dalam memberikan pelayanan kesehatan berkualitas di Sangatta.',
  openGraph: {
    title: 'Profil dan Sejarah RSU Meloy',
    description: 'Kenali lebih dekat komitmen kami dalam melayani masyarakat melalui sejarah dan pencapaian kami.',
  },
};

export default async function About() {
  const articles = await getArticles();
  const partners = await getPartners();
  const vacancies = await getVacancies();
  
  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Suspense fallback={<div>Loading...</div>}>
            <AboutPageContent articles={articles} partners={partners} vacancies={vacancies} />
          </Suspense>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
