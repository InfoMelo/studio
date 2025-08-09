
'use client';

import AboutPage from '@/components/pages/about';
import { useSearchParams } from 'next/navigation';
import type { Article, Partner, Vacancy } from '@/lib/types';

interface AboutPageContentProps {
  articles: Article[];
  partners: Partner[];
  vacancies: Vacancy[];
}

export default function AboutPageContent({ articles, partners, vacancies }: AboutPageContentProps) {
  const searchParams = useSearchParams();
  const subPage = searchParams.get('page') || 'profile';

  return (
    <AboutPage subPage={subPage} articles={articles} partners={partners} vacancies={vacancies} />
  );
}
