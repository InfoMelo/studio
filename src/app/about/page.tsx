
import { LanguageProvider } from '@/hooks/language-context';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import AboutPageContent from './AboutPageContent';
import { getArticles, getPartners, getVacancies } from '../admin/actions';
import LoadingLogo from '@/components/common/loading-logo';

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
          <Suspense fallback={<div className='h-screen w-full flex items-center justify-center'><LoadingLogo /></div>}>
            <AboutPageContent articles={articles} partners={partners} vacancies={vacancies} />
          </Suspense>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
